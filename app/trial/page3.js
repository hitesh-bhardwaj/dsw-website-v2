"use client";
import React, { useRef, useEffect } from "react";

/**
 * Variants:
 *  - "default"
 *  - "bottomRight"
 *  - "rightVertical"
 *  - "bottomBoth" (V-shape)
 */
const WaveGridCanvas = ({
  variant = "bottomRight",

  // ===== Wave params =====
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
  fps = 60,

  overflowExtension = 0.5,

  // ===== Grid params =====
  gridSize = 60,
  deformRadius = 260,
  maxDeformation = 7,
  gridStroke = "rgba(255, 255, 255, 0.12)",
  gridLineWidth = 1,

  segmentLength = 12,
  mouseSmoothingBase = 0.1,

  topOffsetPx = 0,
}) => {
  const canvasRef = useRef(null);

  const targetMousePos = useRef({ x: -1000, y: -1000 });
  const currentMousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // ==== helpers ====
    const lerp = (a, b, t) => a + (b - a) * t;
    const smootherstep01 = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const smoothstep01 = (t) => t * t * (3 - 2 * t);

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

    // Offscreen gradient buffer
    const gradientCanvas = document.createElement("canvas");
    const gradientCtx = gradientCanvas.getContext("2d", { alpha: true });
    if (!gradientCtx) return;

    // Resize-dependent state
    let dpr = 1;
    let logicalWidth = 0;
    let logicalHeight = 0;
    let viewportLogicalHeight = 0;
    let extensionPixels = 0;

    // gradient buffers
    let gradWidth = 0;
    let gradHeight = 0;
    let gradImageData = null; // ImageData
    let gradData = null; // Uint8ClampedArray

    // precomputed phase arrays
    let xPhase = null;
    let yPhase = null;
    let uvY = null;

    // boundary arrays
    let lowerE0 = null;
    let topE0 = null;
    let invLowerRange = null;
    let invTopRange = null;

    // IMPORTANT: track last variant so we rebuild buffers when variant changes
    let lastVariant = variant;

    // ===== UV mapping per variant =====
    const mapUV = (logicalX, logicalY) => {
      const xInViewport = logicalX;
      const yInViewport = logicalY - extensionPixels;

      const u01 = xInViewport / Math.max(1, logicalWidth); // 0..1 left->right
      const v01 = yInViewport / Math.max(1, viewportLogicalHeight); // 0..1 top->bottom

      if (variant === "rightVertical") {
        // Phase along Y; V-field from RIGHT edge inward
        const u = v01;
        const fromRight01 = 1 - u01; // ✅ 0 at right
        const v = 1.2 - fromRight01;
        return { u, v };
      }

      if (variant === "bottomRight") {
        // distance from bottom-right
        const fromRight = 1 - u01;
        const fromBottom = 1 - v01;
        const dist = Math.sqrt(fromRight * fromRight + fromBottom * fromBottom);
        const v = 1.6 - dist;

        const u = (u01 + v01) * 0.5;
        return { u, v };
      }

      if (variant === "bottomBoth") {
        // V-shape from both bottom corners
        const fromLeft = u01;
        const fromRight = 1 - u01;
        const fromBottom = 1 - v01;

        const dL = Math.sqrt(fromLeft * fromLeft + fromBottom * fromBottom);
        const dR = Math.sqrt(fromRight * fromRight + fromBottom * fromBottom);
        const dist = Math.min(dL, dR);

        // tweak for look
        const spread = 1.0;
        const intensity = 1.6;

        const v = intensity - dist * spread;

        // mirrored diagonal phase so both sides "flow" inward
        const u =
          u01 < 0.5 ? (u01 + v01) * 0.5 : ((1 - u01) + v01) * 0.5;

        return { u, v };
      }

      // default: horizontal phase, vertical v-field
      return { u: u01, v: 1.2 - v01 };
    };

    const makeImageData = (w, h) => {
      const arr = new Uint8ClampedArray(w * h * 4);
      // Use ImageData constructor if available, else fallback
      try {
        return { imageData: new ImageData(arr, w, h), data: arr };
      } catch {
        const id = gradientCtx.createImageData(w, h);
        // ensure we use its backing store
        return { imageData: id, data: id.data };
      }
    };

    const rebuildGradientBuffers = () => {
      // half-res for speed
      gradWidth = Math.max(1, Math.floor(canvas.width / 2));
      gradHeight = Math.max(1, Math.floor(canvas.height / 2));

      if (gradientCanvas.width !== gradWidth) gradientCanvas.width = gradWidth;
      if (gradientCanvas.height !== gradHeight) gradientCanvas.height = gradHeight;

      const made = makeImageData(gradWidth, gradHeight);
      gradImageData = made.imageData;
      gradData = made.data;

      xPhase = new Float32Array(gradWidth);
      yPhase = new Float32Array(gradHeight);
      uvY = new Float32Array(gradHeight);

      const boundaryLen = variant === "rightVertical" ? gradHeight : gradWidth;
      lowerE0 = new Float32Array(boundaryLen);
      topE0 = new Float32Array(boundaryLen);
      invLowerRange = new Float32Array(boundaryLen);
      invTopRange = new Float32Array(boundaryLen);

      const twoPi = Math.PI * 2;
      const twoOverDpr = 2 / dpr;

      for (let x = 0; x < gradWidth; x++) {
        const logicalX = x * twoOverDpr;
        const { u } = mapUV(logicalX, extensionPixels);
        xPhase[x] = u * twoPi;
      }

      for (let y = 0; y < gradHeight; y++) {
        const logicalY = y * twoOverDpr;
        const { u } = mapUV(0, logicalY);
        yPhase[y] = u * twoPi;
      }

      for (let y = 0; y < gradHeight; y++) {
        const logicalY = y * twoOverDpr;
        const { v } = mapUV(0, logicalY);
        uvY[y] = v;
      }
    };

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      extensionPixels = viewportHeight * overflowExtension;
      const totalHeight = viewportHeight + extensionPixels * 2;

      const newWidth = Math.floor(viewportWidth * dpr);
      const newHeight = Math.floor(totalHeight * dpr);

      const sizeChanged =
        Math.abs(canvas.width - newWidth) > 2 || Math.abs(canvas.height - newHeight) > 2;

      const variantChanged = lastVariant !== variant;

      if (sizeChanged) {
        canvas.width = newWidth;
        canvas.height = newHeight;

        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${totalHeight}px`;
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = `${topOffsetPx - extensionPixels}px`;

        logicalWidth = viewportWidth;
        logicalHeight = totalHeight;
        viewportLogicalHeight = viewportHeight;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
      }

      // ✅ Rebuild if size changed OR variant changed OR buffers not ready
      if (sizeChanged || variantChanged || !gradImageData || !gradData) {
        rebuildGradientBuffers();
        lastVariant = variant;
      }
    };

    // ==== Wave update ====
    const updateGradientCanvas = (timeSeconds) => {
      // Safety: if anything is missing, rebuild
      if (!gradImageData || !gradData) rebuildGradientBuffers();

      const lowerVerticalMovement =
        Math.sin(timeSeconds * lowerVerticalSpeed) * lowerVerticalAmp;
      const upperVerticalMovement =
        Math.sin(timeSeconds * upperVerticalSpeed) * upperVerticalAmp;

      const tL = timeSeconds * lowerWaveSpeed;
      const tU = timeSeconds * upperWaveSpeed;

      const r = colorData.r | 0;
      const g = colorData.g | 0;
      const b = colorData.b | 0;
      const a255 = colorData.a * 255;

      const twoOverDpr = 2 / dpr;

      // Corner variants: per-pixel (bottomRight + bottomBoth)
      if (variant === "bottomRight" || variant === "bottomBoth") {
        for (let y = 0; y < gradHeight; y++) {
          const logicalY = y * twoOverDpr;
          let idx = y * gradWidth * 4;

          for (let x = 0; x < gradWidth; x++) {
            const logicalX = x * twoOverDpr;
            const { u, v } = mapUV(logicalX, logicalY);
            const phase = u * Math.PI * 2;

            const l1 = Math.sin(phase * lowerWaveFreq + tL);
            const l2 = Math.sin(phase * (lowerWaveFreq * 0.7) + tL * 0.85);
            const l3 = Math.sin(phase * (lowerWaveFreq * 1.3) + tL * 0.6);
            const lowerWaveCombined =
              (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * lowerWaveAmp;

            const lowerB =
              lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

            const u1 = Math.sin(phase * upperWaveFreq + tU);
            const u2 = Math.sin(phase * (upperWaveFreq * 0.75) + tU * 0.8);
            const u3 = Math.sin(phase * (upperWaveFreq * 1.25) + tU * 0.65);
            const upperWaveCombined =
              (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * upperWaveAmp;

            const topB =
              topBoundaryBase + upperWaveCombined + upperVerticalMovement;

            const waveHeight = Math.max(0.1, topB - lowerB);
            const extendedLowerFade = lowerFadeSoftness + waveHeight * 0.05;
            const extendedTopFade = topFadeSoftness + waveHeight * 0.05;

            const lowerA = lowerB - extendedLowerFade;
            const lowerC = lowerB + extendedLowerFade;

            const topA = topB - extendedTopFade;
            const topC = topB + extendedTopFade;

            let t = (v - lowerA) / Math.max(1e-6, lowerC - lowerA);
            t = t < 0 ? 0 : t > 1 ? 1 : t;
            const fromBottom = smoothstep01(t);

            let tt = (v - topA) / Math.max(1e-6, topC - topA);
            tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
            const fromTop = 1.0 - smoothstep01(tt);

            const alpha = (fromBottom * fromTop * a255) | 0;

            gradData[idx] = r;
            gradData[idx + 1] = g;
            gradData[idx + 2] = b;
            gradData[idx + 3] = alpha;
            idx += 4;
          }
        }

        gradientCtx.putImageData(gradImageData, 0, 0);
        return;
      }

      // rightVertical: boundaries per-Y, v from X
      if (variant === "rightVertical") {
        for (let y = 0; y < gradHeight; y++) {
          const phase = yPhase[y];

          const l1 = Math.sin(phase * lowerWaveFreq + tL);
          const l2 = Math.sin(phase * (lowerWaveFreq * 0.7) + tL * 0.85);
          const l3 = Math.sin(phase * (lowerWaveFreq * 1.3) + tL * 0.6);
          const lowerWaveCombined =
            (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * lowerWaveAmp;

          const lowerB =
            lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

          const u1 = Math.sin(phase * upperWaveFreq + tU);
          const u2 = Math.sin(phase * (upperWaveFreq * 0.75) + tU * 0.8);
          const u3 = Math.sin(phase * (upperWaveFreq * 1.25) + tU * 0.65);
          const upperWaveCombined =
            (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * upperWaveAmp;

          const topB =
            topBoundaryBase + upperWaveCombined + upperVerticalMovement;

          const waveHeight = Math.max(0.1, topB - lowerB);
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

          for (let x = 0; x < gradWidth; x++) {
            const logicalX = x * twoOverDpr;
            const { v } = mapUV(logicalX, extensionPixels);

            let t = (v - lowerE0[y]) * invLowerRange[y];
            t = t < 0 ? 0 : t > 1 ? 1 : t;
            const fromBottom = smoothstep01(t);

            let tt = (v - topE0[y]) * invTopRange[y];
            tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
            const fromTop = 1.0 - smoothstep01(tt);

            const alpha = (fromBottom * fromTop * a255) | 0;

            gradData[idx] = r;
            gradData[idx + 1] = g;
            gradData[idx + 2] = b;
            gradData[idx + 3] = alpha;
            idx += 4;
          }
        }

        gradientCtx.putImageData(gradImageData, 0, 0);
        return;
      }

      // default: boundaries per-X, v per row
      for (let x = 0; x < gradWidth; x++) {
        const phase = xPhase[x];

        const l1 = Math.sin(phase * lowerWaveFreq + tL);
        const l2 = Math.sin(phase * (lowerWaveFreq * 0.7) + tL * 0.85);
        const l3 = Math.sin(phase * (lowerWaveFreq * 1.3) + tL * 0.6);
        const lowerWaveCombined =
          (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * lowerWaveAmp;

        const lowerB =
          lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

        const u1 = Math.sin(phase * upperWaveFreq + tU);
        const u2 = Math.sin(phase * (upperWaveFreq * 0.75) + tU * 0.8);
        const u3 = Math.sin(phase * (upperWaveFreq * 1.25) + tU * 0.65);
        const upperWaveCombined =
          (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * upperWaveAmp;

        const topB =
          topBoundaryBase + upperWaveCombined + upperVerticalMovement;

        const waveHeight = Math.max(0.1, topB - lowerB);
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
          const fromBottom = smoothstep01(t);

          let tt = (v - topE0[x]) * invTopRange[x];
          tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
          const fromTop = 1.0 - smoothstep01(tt);

          const alpha = (fromBottom * fromTop * a255) | 0;

          gradData[idx] = r;
          gradData[idx + 1] = g;
          gradData[idx + 2] = b;
          gradData[idx + 3] = alpha;
          idx += 4;
        }
      }

      gradientCtx.putImageData(gradImageData, 0, 0);
    };

    // ==== Grid deformation ====
    const getDeformationOffset = (x, y, maxDistance, maxDef) => {
      const dx = x - currentMousePos.current.x;
      const dy = y - currentMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > maxDistance) return { offsetX: 0, offsetY: 0 };

      const influence = 1 - distance / maxDistance;
      const eased = smootherstep01(influence);

      const angle = Math.atan2(dy, dx);
      const displacement = eased * maxDef;

      return {
        offsetX: -Math.cos(angle) * displacement,
        offsetY: -Math.sin(angle) * displacement,
      };
    };

    const getGridAlpha = (x, y, maxDistance, baseAlpha, boostAlpha) => {
      const dx = x - currentMousePos.current.x;
      const dy = y - currentMousePos.current.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d >= maxDistance) return baseAlpha;

      const t = 1 - d / maxDistance;
      const eased = smootherstep01(t);

      return baseAlpha + eased * boostAlpha;
    };

    // Extract stroke RGB
    let strokeR = 255,
      strokeG = 255,
      strokeB = 255;

    const rgbMatch = String(gridStroke).match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i
    );
    if (rgbMatch) {
      strokeR = parseInt(rgbMatch[1], 10);
      strokeG = parseInt(rgbMatch[2], 10);
      strokeB = parseInt(rgbMatch[3], 10);
    }

    const drawGrid = () => {
      ctx.lineWidth = gridLineWidth;

      let baseAlpha = 0.12;
      const aMatch = String(gridStroke).match(
        /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*([\d.]+)\s*)?\)/i
      );
      if (aMatch) baseAlpha = aMatch[1] !== undefined ? parseFloat(aMatch[1]) : 1;

      const boostAlpha = 0.5;

      const vSegments = Math.ceil(logicalHeight / segmentLength);
      const hSegments = Math.ceil(logicalWidth / segmentLength);

      for (let x = 0; x <= logicalWidth; x += gridSize) {
        let prevX = null;
        let prevY = null;

        for (let i = 0; i <= vSegments; i++) {
          const y = (logicalHeight / vSegments) * i;

          const { offsetX, offsetY } = getDeformationOffset(
            x,
            y,
            deformRadius,
            maxDeformation
          );

          const dx = x + offsetX;
          const dy = y + offsetY;

          if (i === 0) {
            prevX = dx;
            prevY = dy;
            continue;
          }

          const mx = (prevX + dx) * 0.5;
          const my = (prevY + dy) * 0.5;

          const a = getGridAlpha(mx, my, deformRadius, baseAlpha, boostAlpha);
          ctx.strokeStyle = `rgba(${strokeR}, ${strokeG}, ${strokeB}, ${a})`;

          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(dx, dy);
          ctx.stroke();

          prevX = dx;
          prevY = dy;
        }
      }

      for (let y = 0; y <= logicalHeight; y += gridSize) {
        let prevX = null;
        let prevY = null;

        for (let i = 0; i <= hSegments; i++) {
          const x = (logicalWidth / hSegments) * i;

          const { offsetX, offsetY } = getDeformationOffset(
            x,
            y,
            deformRadius,
            maxDeformation
          );

          const dx = x + offsetX;
          const dy = y + offsetY;

          if (i === 0) {
            prevX = dx;
            prevY = dy;
            continue;
          }

          const mx = (prevX + dx) * 0.5;
          const my = (prevY + dy) * 0.5;

          const a = getGridAlpha(mx, my, deformRadius, baseAlpha, boostAlpha);
          ctx.strokeStyle = `rgba(${strokeR}, ${strokeG}, ${strokeB}, ${a})`;

          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(dx, dy);
          ctx.stroke();

          prevX = dx;
          prevY = dy;
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

      // fps cap
      const deltaMs = now - lastFrameTime;
      if (deltaMs < targetFrameTime - 1) return;
      lastFrameTime = now;

      // keep buffers fresh if variant changed without resize
      resizeCanvas();

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const lerpFactor = 1 - Math.pow(1 - mouseSmoothingBase, dt * 60);
      currentMousePos.current.x = lerp(
        currentMousePos.current.x,
        targetMousePos.current.x,
        lerpFactor
      );
      currentMousePos.current.y = lerp(
        currentMousePos.current.y,
        targetMousePos.current.y,
        lerpFactor
      );

      const t = now * 0.001;

      updateGradientCanvas(t);

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.drawImage(gradientCanvas, 0, 0, logicalWidth, logicalHeight);

      drawGrid();
    };

    // ==== events ====
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      targetMousePos.current = { x: -1000, y: -1000 };
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
    overflowExtension,
    gridSize,
    deformRadius,
    maxDeformation,
    gridStroke,
    gridLineWidth,
    segmentLength,
    mouseSmoothingBase,
    topOffsetPx,
  ]);

  return (
    <section className="h-screen w-screen bg-white overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{
          position: "absolute",
          left: 0,
          zIndex: 1,
        }}
      />
    </section>
  );
};

export default WaveGridCanvas;
