"use client";
import React, { useRef, useEffect } from "react";

/**
 * Variants:
 *  - "default" - horizontal wave from bottom
 *  - "bottomRight" - diagonal wave from bottom-right corner
 *  - "rightVertical" - vertical wave from right side
 *  - "leftVertical" - vertical wave from left side
 *  - "topLeft" - diagonal wave from top-left corner
 */
const WaveGridCanvas = ({
  variant = "default",

  // ===== Wave params =====
  HOVER_ALPHA_BOOST = 4.1,

  lowerWaveFreq = 0.5,
  lowerWaveAmp = 0.12,
  lowerWaveSpeed = 0.8,
  lowerBoundaryBase = 0.12,
  lowerFadeSoftness = 0.15,
  lowerVerticalSpeed = 0.15,
  lowerVerticalAmp = 0.08,

  upperWaveFreq = 0.8,
  upperWaveAmp = 0.1,
  upperWaveSpeed = 0.8,
  topBoundaryBase = 0.57,
  topFadeSoftness = 0.3,
  upperVerticalSpeed = 0.12,
  upperVerticalAmp = 0.08,

  color = "rgba(54, 87, 255, 0.95)",
  fps = 120,

  // ===== Grid params =====
  gridSize = 60,
  deformRadius = 150,
  gridStroke = "rgba(255, 255, 255, 0.12)",
  gridLineWidth = 1,

  // ===== Spring physics params =====
  springStiffness = 0.09,
  springDamping = 0.88,
  mouseInfluence = 0.01,

  mouseSmoothingBase = 0.2,

  topOffsetPx = 0,
    
}) => {
  const canvasRef = useRef(null);

  const targetMousePos = useRef({ x: -1000, y: -1000 });
  const currentMousePos = useRef({ x: -1000, y: -1000 });

  // Spring mesh vertices
  const verticesRef = useRef(null);
  const gridDimensionsRef = useRef({ cols: 0, rows: 0 });

  // Variant-specific overflow extensions
  const getOverflowExtension = (variant) => {
    switch (variant) {
      case "default":
        return { top: 0, bottom: 0.3, left: 0, right: 0 };
      case "bottomRight":
        return { top: 0, bottom: 0.1, left: 0, right: 0.2 };
      case "rightVertical":
        return { top: 0, bottom: 0.1, left: 0, right: 0.3 };
      case "leftVertical":
        return { top: 0, bottom: 0, left: 0.3, right: 0 };
      case "topLeft":
        return { top: 0.2, bottom: 0, left: 0.2, right: 0 };
      default:
        return { top: 0, bottom: 0, left: 0, right: 0 };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // ==== helpers (inlined for perf) ====
    const parseColor = (colorStr) => {
      const rgbaMatch = String(colorStr).match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
      );
      if (rgbaMatch) {
        return {
          r: parseInt(rgbaMatch[1], 10),
          g: parseInt(rgbaMatch[2], 10),
          b: parseInt(rgbaMatch[3], 10),
          a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
        };
      }
      const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        String(colorStr)
      );
      if (hexMatch) {
        return {
          r: parseInt(hexMatch[1], 16),
          g: parseInt(hexMatch[2], 16),
          b: parseInt(hexMatch[3], 16),
          a: 1,
        };
      }
      return { r: 54, g: 87, b: 255, a: 0.95 };
    };

    const colorData = parseColor(color);
    const r = colorData.r | 0;
    const g = colorData.g | 0;
    const b = colorData.b | 0;
    const a255 = (colorData.a * 255) | 0;

    // Offscreen gradient buffer (quarter-res for speed)
    const gradientCanvas = document.createElement("canvas");
    const gradientCtx = gradientCanvas.getContext("2d", { alpha: true });
    if (!gradientCtx) return;

    // Resize-dependent state
    let dpr = 1;
    let logicalWidth = 0;
    let logicalHeight = 0;
    let viewportLogicalWidth = 0;
    let viewportLogicalHeight = 0;
    let extensionTop = 0;
    let extensionBottom = 0;
    let extensionLeft = 0;
    let extensionRight = 0;

    // gradient buffers
    let gradWidth = 0;
    let gradHeight = 0;
    let gradImageData = null;
    let gradData = null;

    // precomputed phase arrays
    let xPhase = null;
    let yPhase = null;
    let uvY = null;

    // boundary arrays
    let lowerE0 = null;
    let topE0 = null;
    let invLowerRange = null;
    let invTopRange = null;

    // UV lookup tables for corner variants
    let uvLookupU = null;
    let uvLookupV = null;

    let lastVariant = variant;

    // Precomputed constants
    const TWO_PI = Math.PI * 2;
    const lowerFreq07 = lowerWaveFreq * 0.7;
    const lowerFreq13 = lowerWaveFreq * 1.3;
    const upperFreq075 = upperWaveFreq * 0.75;
    const upperFreq125 = upperWaveFreq * 1.25;

    // ===== UV mapping per variant =====
    const mapUV = (logicalX, logicalY) => {
      const xInViewport = logicalX - extensionLeft;
      const yInViewport = logicalY - extensionTop;

      const u01 = xInViewport / Math.max(1, viewportLogicalWidth);
      const v01 = yInViewport / Math.max(1, viewportLogicalHeight);

      if (variant === "rightVertical") {
        const fromRight01 = 1.7 - u01;
        return { u: v01, v: 1.2 - fromRight01 };
      }

      if (variant === "leftVertical") {
        const fromLeft01 = u01;
        return { u: v01, v: 1.2 - fromLeft01 };
      }

      if (variant === "topLeft") {
        const fromRight = 1 - u01;
        const fromBottom = 1 - v01;
        const dist = Math.sqrt(fromRight * fromRight + fromBottom * fromBottom);
        return { u: (u01 + v01) * 0.5, v: 1.6 - dist };
      }

      if (variant === "bottomRight") {
        const fromLeft = u01;
        const fromTop = v01;
        const dist = Math.sqrt(fromLeft * fromLeft + fromTop * fromTop);
        return { u: (u01 + (1 - v01)) * 0.5, v: 1.6 - dist };
      }

      // default
      return { u: u01, v: 1.2 - v01 };
    };

    // ===== Build spring mesh vertices =====
    const buildVertices = () => {
      const cols = Math.floor(logicalWidth / gridSize) + 1;
      const rows = Math.floor(logicalHeight / gridSize) + 1;

      gridDimensionsRef.current = { cols, rows };

      const vertices = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          vertices.push({
            x: col * gridSize,
            y: row * gridSize,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
          });
        }
      }

      verticesRef.current = vertices;
    };

    // ===== Direct deformation (NO elastic / NO spring) =====
    const updateVertexPhysics = () => {
      const vertices = verticesRef.current;
      if (!vertices) return;
    
      const mouseX = currentMousePos.current.x;
      const mouseY = currentMousePos.current.y;
      const radiusSq = deformRadius * deformRadius;
    
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
    
        const dx = mouseX - v.x;
        const dy = mouseY - v.y;
        const distSq = dx * dx + dy * dy;
    
        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = 1 - dist / deformRadius;
    
          // Smooth push toward mouse (no velocity / no spring)
          v.dx = dx * force * mouseInfluence * 40;
          v.dy = dy * force * mouseInfluence * 40;
        } else {
          // Immediately relax back (no elastic bounce)
          v.dx *= 0.85;
          v.dy *= 0.85;
        }
      }
    };

    const rebuildGradientBuffers = () => {
      // quarter-res for speed
      gradWidth = Math.max(1, Math.floor(canvas.width / 4));
      gradHeight = Math.max(1, Math.floor(canvas.height / 4));

      if (gradientCanvas.width !== gradWidth) gradientCanvas.width = gradWidth;
      if (gradientCanvas.height !== gradHeight) gradientCanvas.height = gradHeight;

      gradImageData = gradientCtx.createImageData(gradWidth, gradHeight);
      gradData = gradImageData.data;

      xPhase = new Float32Array(gradWidth);
      yPhase = new Float32Array(gradHeight);
      uvY = new Float32Array(gradHeight);

      const boundaryLen = (variant === "rightVertical" || variant === "leftVertical") ? gradHeight : gradWidth;
      lowerE0 = new Float32Array(boundaryLen);
      topE0 = new Float32Array(boundaryLen);
      invLowerRange = new Float32Array(boundaryLen);
      invTopRange = new Float32Array(boundaryLen);

      const fourOverDpr = 4 / dpr;

      // Precompute UV lookup for corner variants
      if (variant === "bottomRight" || variant === "topLeft") {
        uvLookupU = new Float32Array(gradWidth * gradHeight);
        uvLookupV = new Float32Array(gradWidth * gradHeight);

        for (let y = 0; y < gradHeight; y++) {
          const logicalY = y * fourOverDpr;
          const rowOffset = y * gradWidth;

          for (let x = 0; x < gradWidth; x++) {
            const logicalX = x * fourOverDpr;
            const { u, v } = mapUV(logicalX, logicalY);
            uvLookupU[rowOffset + x] = u * TWO_PI;
            uvLookupV[rowOffset + x] = v;
          }
        }
      } else {
        uvLookupU = null;
        uvLookupV = null;
      }

      for (let x = 0; x < gradWidth; x++) {
        const logicalX = x * fourOverDpr;
        const { u } = mapUV(logicalX, extensionTop);
        xPhase[x] = u * TWO_PI;
      }

      for (let y = 0; y < gradHeight; y++) {
        const logicalY = y * fourOverDpr;
        const { u } = mapUV(extensionLeft, logicalY);
        yPhase[y] = u * TWO_PI;
      }

      for (let y = 0; y < gradHeight; y++) {
        const logicalY = y * fourOverDpr;
        const { v } = mapUV(extensionLeft, logicalY);
        uvY[y] = v;
      }
    };

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const overflow = getOverflowExtension(variant);
      extensionTop = viewportHeight * overflow.top;
      extensionBottom = viewportHeight * overflow.bottom;
      extensionLeft = viewportWidth * overflow.left;
      extensionRight = viewportWidth * overflow.right;

      const totalWidth = viewportWidth + extensionLeft + extensionRight;
      const totalHeight = viewportHeight + extensionTop + extensionBottom;

      const newWidth = Math.floor(totalWidth * dpr);
      const newHeight = Math.floor(totalHeight * dpr);

      const sizeChanged =
        Math.abs(canvas.width - newWidth) > 2 || Math.abs(canvas.height - newHeight) > 2;

      const variantChanged = lastVariant !== variant;

      if (sizeChanged) {
        canvas.width = newWidth;
        canvas.height = newHeight;

        canvas.style.width = `${totalWidth}px`;
        canvas.style.height = `${totalHeight}px`;
        canvas.style.position = "absolute";
        canvas.style.left = `${-extensionLeft}px`;
        canvas.style.top = `${topOffsetPx - extensionTop}px`;

        logicalWidth = totalWidth;
        logicalHeight = totalHeight;
        viewportLogicalWidth = viewportWidth;
        viewportLogicalHeight = viewportHeight;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;

        // Rebuild vertices when size changes
        buildVertices();
      }

      if (sizeChanged || variantChanged || !gradImageData || !gradData) {
        rebuildGradientBuffers();
        lastVariant = variant;
      }
    };

    // ==== Wave update (optimized) ====
    const updateGradientCanvas = (timeSeconds) => {
      if (!gradImageData || !gradData) rebuildGradientBuffers();

      const lowerVerticalMovement =
        Math.sin(timeSeconds * lowerVerticalSpeed) * lowerVerticalAmp;
      const upperVerticalMovement =
        Math.sin(timeSeconds * upperVerticalSpeed) * upperVerticalAmp;

      const tL = timeSeconds * lowerWaveSpeed;
      const tU = timeSeconds * upperWaveSpeed;
      const tL085 = tL * 0.85;
      const tL06 = tL * 0.6;
      const tU08 = tU * 0.8;
      const tU065 = tU * 0.65;

      // Corner variants: use precomputed UV lookup
      if (variant === "bottomRight" || variant === "topLeft") {
        const data = gradData;
        const uLookup = uvLookupU;
        const vLookup = uvLookupV;

        for (let y = 0; y < gradHeight; y++) {
          const rowOffset = y * gradWidth;
          let idx = rowOffset * 4;

          for (let x = 0; x < gradWidth; x++) {
            const lookupIdx = rowOffset + x;
            const phase = uLookup[lookupIdx];
            const v = vLookup[lookupIdx];

            const l1 = Math.sin(phase * lowerWaveFreq + tL);
            const l2 = Math.sin(phase * lowerFreq07 + tL085);
            const l3 = Math.sin(phase * lowerFreq13 + tL06);
            const lowerWaveCombined = (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * lowerWaveAmp;

            const lowerB = lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

            const u1 = Math.sin(phase * upperWaveFreq + tU);
            const u2 = Math.sin(phase * upperFreq075 + tU08);
            const u3 = Math.sin(phase * upperFreq125 + tU065);
            const upperWaveCombined = (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * upperWaveAmp;

            const topB = topBoundaryBase + upperWaveCombined + upperVerticalMovement;

            const waveHeight = topB - lowerB > 0.1 ? topB - lowerB : 0.1;
            const extendedLowerFade = lowerFadeSoftness + waveHeight * 0.05;
            const extendedTopFade = topFadeSoftness + waveHeight * 0.05;

            const lowerA = lowerB - extendedLowerFade;
            const lowerC = lowerB + extendedLowerFade;
            const topA = topB - extendedTopFade;
            const topC = topB + extendedTopFade;

            let t = (v - lowerA) / (lowerC - lowerA || 1e-6);
            t = t < 0 ? 0 : t > 1 ? 1 : t;
            const fromBottom = t * t * (3 - 2 * t);

            let tt = (v - topA) / (topC - topA || 1e-6);
            tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
            const fromTop = 1 - tt * tt * (3 - 2 * tt);

            const alpha = (fromBottom * fromTop * a255) | 0;

            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = alpha;
            idx += 4;
          }
        }

        gradientCtx.putImageData(gradImageData, 0, 0);
        return;
      }

      // Vertical variants: boundaries per-Y
      if (variant === "rightVertical" || variant === "leftVertical") {
        const data = gradData;
        const fourOverDpr = 4 / dpr;

        for (let y = 0; y < gradHeight; y++) {
          const phase = yPhase[y];

          const l1 = Math.sin(phase * lowerWaveFreq + tL);
          const l2 = Math.sin(phase * lowerFreq07 + tL085);
          const l3 = Math.sin(phase * lowerFreq13 + tL06);
          const lowerWaveCombined = (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * lowerWaveAmp;

          const lowerB = lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

          const u1 = Math.sin(phase * upperWaveFreq + tU);
          const u2 = Math.sin(phase * upperFreq075 + tU08);
          const u3 = Math.sin(phase * upperFreq125 + tU065);
          const upperWaveCombined = (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * upperWaveAmp;

          const topB = topBoundaryBase + upperWaveCombined + upperVerticalMovement;

          const waveHeight = topB - lowerB > 0.1 ? topB - lowerB : 0.1;
          const extendedLowerFade = lowerFadeSoftness + waveHeight * 0.05;
          const extendedTopFade = topFadeSoftness + waveHeight * 0.05;

          const lowerA = lowerB - extendedLowerFade;
          const lowerC = lowerB + extendedLowerFade;
          const lowerRange = lowerC - lowerA;

          lowerE0[y] = lowerA;
          invLowerRange[y] = lowerRange !== 0 ? 1 / lowerRange : 0;

          const topA = topB - extendedTopFade;
          const topC = topB + extendedTopFade;
          const topRange = topC - topA;

          topE0[y] = topA;
          invTopRange[y] = topRange !== 0 ? 1 / topRange : 0;
        }

        for (let y = 0; y < gradHeight; y++) {
          let idx = y * gradWidth * 4;
          const lE0 = lowerE0[y];
          const invLR = invLowerRange[y];
          const tE0 = topE0[y];
          const invTR = invTopRange[y];

          for (let x = 0; x < gradWidth; x++) {
            const logicalX = x * fourOverDpr;
            const { v } = mapUV(logicalX, extensionTop);

            let t = (v - lE0) * invLR;
            t = t < 0 ? 0 : t > 1 ? 1 : t;
            const fromBottom = t * t * (3 - 2 * t);

            let tt = (v - tE0) * invTR;
            tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
            const fromTop = 1 - tt * tt * (3 - 2 * tt);

            const alpha = (fromBottom * fromTop * a255) | 0;

            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = alpha;
            idx += 4;
          }
        }

        gradientCtx.putImageData(gradImageData, 0, 0);
        return;
      }

      // default: boundaries per-X
      const data = gradData;

      for (let x = 0; x < gradWidth; x++) {
        const phase = xPhase[x];

        const l1 = Math.sin(phase * lowerWaveFreq + tL);
        const l2 = Math.sin(phase * lowerFreq07 + tL085);
        const l3 = Math.sin(phase * lowerFreq13 + tL06);
        const lowerWaveCombined = (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * lowerWaveAmp;

        const lowerB = lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

        const u1 = Math.sin(phase * upperWaveFreq + tU);
        const u2 = Math.sin(phase * upperFreq075 + tU08);
        const u3 = Math.sin(phase * upperFreq125 + tU065);
        const upperWaveCombined = (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * upperWaveAmp;

        const topB = topBoundaryBase + upperWaveCombined + upperVerticalMovement;

        const waveHeight = topB - lowerB > 0.1 ? topB - lowerB : 0.1;
        const extendedLowerFade = lowerFadeSoftness + waveHeight * 0.05;
        const extendedTopFade = topFadeSoftness + waveHeight * 0.05;

        const lowerA = lowerB - extendedLowerFade;
        const lowerC = lowerB + extendedLowerFade;
        const lowerRange = lowerC - lowerA;

        lowerE0[x] = lowerA;
        invLowerRange[x] = lowerRange !== 0 ? 1 / lowerRange : 0;

        const topA = topB - extendedTopFade;
        const topC = topB + extendedTopFade;
        const topRange = topC - topA;

        topE0[x] = topA;
        invTopRange[x] = topRange !== 0 ? 1 / topRange : 0;
      }

      for (let y = 0; y < gradHeight; y++) {
        const v = uvY[y];
        let idx = y * gradWidth * 4;

        for (let x = 0; x < gradWidth; x++) {
          let t = (v - lowerE0[x]) * invLowerRange[x];
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const fromBottom = t * t * (3 - 2 * t);

          let tt = (v - topE0[x]) * invTopRange[x];
          tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
          const fromTop = 1 - tt * tt * (3 - 2 * tt);

          const alpha = (fromBottom * fromTop * a255) | 0;

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = alpha;
          idx += 4;
        }
      }

      gradientCtx.putImageData(gradImageData, 0, 0);
    };

    // Extract stroke RGB once
    let strokeR = 255,
      strokeG = 255,
      strokeB = 255,
      baseAlpha = 0.12;

    const rgbMatch = String(gridStroke).match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/i
    );
    if (rgbMatch) {
      strokeR = parseInt(rgbMatch[1], 10);
      strokeG = parseInt(rgbMatch[2], 10);
      strokeB = parseInt(rgbMatch[3], 10);
      baseAlpha = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1;
    }

    // ==== Draw grid using spring mesh vertices ====
    const drawGrid = () => {
      const vertices = verticesRef.current;
      if (!vertices) return;

      const { cols, rows } = gridDimensionsRef.current;
      if (cols === 0 || rows === 0) return;

      ctx.lineWidth = gridLineWidth;

      const mx = currentMousePos.current.x;
      const my = currentMousePos.current.y;

      const radius = deformRadius;
      const invRadius = radius > 0 ? 1 / radius : 0;

      // Smoothstep (0..1 -> 0..1)
      const smoothstep01 = (t) => t * t * (3 - 2 * t);

      // Distance falloff -> alpha
      const alphaAt = (x, y) => {
        // when mouse is "off screen"
        if (mx < -999 || my < -999) return baseAlpha;

        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist >= radius) return baseAlpha;

        // 1 at center -> 0 at edge
        let t = 1 - dist * invRadius;
        t = t < 0 ? 0 : t > 1 ? 1 : t;

        const eased = smoothstep01(t);

        // boost opacity at center, fade to baseAlpha at edge
        const boosted = baseAlpha * (1 + (HOVER_ALPHA_BOOST - 1) * eased);

        // clamp
        return boosted > 1 ? 1 : boosted;
      };

      const getVertex = (col, row) => {
        if (col < 0 || col >= cols || row < 0 || row >= rows) return null;
        return vertices[row * cols + col];
      };

      // ---- Vertical lines (draw as segments) ----
      for (let col = 0; col < cols; col++) {
        let prev = null;

        for (let row = 0; row < rows; row++) {
          const v = getVertex(col, row);
          if (!v) continue;

          const px = v.x + v.dx;
          const py = v.y + v.dy;

          if (prev) {
            // midpoint of the segment for falloff
            const midX = (prev.x + px) * 0.5;
            const midY = (prev.y + py) * 0.5;

            const aSeg = alphaAt(midX, midY);
            ctx.strokeStyle = `rgba(${strokeR},${strokeG},${strokeB},${aSeg})`;

            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(px, py);
            ctx.stroke();
          }

          prev = { x: px, y: py };
        }
      }

      // ---- Horizontal lines (draw as segments) ----
      for (let row = 0; row < rows; row++) {
        let prev = null;

        for (let col = 0; col < cols; col++) {
          const v = getVertex(col, row);
          if (!v) continue;

          const px = v.x + v.dx;
          const py = v.y + v.dy;

          if (prev) {
            const midX = (prev.x + px) * 0.5;
            const midY = (prev.y + py) * 0.5;

            const aSeg = alphaAt(midX, midY);
            ctx.strokeStyle = `rgba(${strokeR},${strokeG},${strokeB},${aSeg})`;

            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(px, py);
            ctx.stroke();
          }

          prev = { x: px, y: py };
        }
      }
    };

    // ==== animation ====
    let rafId = 0;
    let lastFrameTime = 0;
    let lastTime = performance.now();
    const targetFrameTime = 1000 / fps;

    const animate = (now) => {
      rafId = requestAnimationFrame(animate);

      const deltaMs = now - lastFrameTime;
      if (deltaMs < targetFrameTime - 1) return;
      lastFrameTime = now;

      resizeCanvas();

      const dt = now - lastTime;
      lastTime = now;

      const lerpFactor = 1 - Math.pow(1 - mouseSmoothingBase, dt * 0.06);
      currentMousePos.current.x += (targetMousePos.current.x - currentMousePos.current.x) * lerpFactor;
      currentMousePos.current.y += (targetMousePos.current.y - currentMousePos.current.y) * lerpFactor;

      // Update spring physics for all vertices
      updateVertexPhysics();

      const t = now * 0.001;

      updateGradientCanvas(t);

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.drawImage(gradientCanvas, 0, 0, logicalWidth, logicalHeight);

      drawGrid();
    };

    // ==== events ====
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMousePos.current.x = e.clientX - rect.left;
      targetMousePos.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMousePos.current.x = -1000;
      targetMousePos.current.y = -1000;
    };

    // init
    resizeCanvas();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 80);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    variant,
    lowerWaveFreq,
    lowerWaveAmp,
    lowerWaveSpeed,
    lowerBoundaryBase,
    lowerFadeSoftness,
    lowerVerticalSpeed,
    lowerVerticalAmp,
    upperWaveFreq,
    upperWaveAmp,
    upperWaveSpeed,
    topBoundaryBase,
    topFadeSoftness,
    upperVerticalSpeed,
    upperVerticalAmp,
    color,
    fps,
    gridSize,
    deformRadius,
    gridStroke,
    gridLineWidth,
    springStiffness,
    springDamping,
    mouseInfluence,
    mouseSmoothingBase,
    topOffsetPx,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full pointer-events-auto absolute inset-0"
    />
  );
};

export default WaveGridCanvas;