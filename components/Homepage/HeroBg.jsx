"use client";
import React, { useRef, useEffect } from "react";

const WaveGradientCanvas = ({
  // Lower wave - smoother, more visible movement
  lowerWaveFreq = 0.5,
  lowerWaveAmp = 0.12,
  lowerWaveSpeed = 0.8, // right-to-left movement
  lowerBoundaryBase = 0.12,
  lowerFadeSoftness = 0.15,
  lowerVerticalSpeed = 0.15,
  lowerVerticalAmp = 0.08,

  // Upper wave - smoother, more visible movement
  upperWaveFreq = 0.8,
  upperWaveAmp = 0.1,
  upperWaveSpeed = 0.8, // right-to-left movement
  topBoundaryBase = 0.57,
  topFadeSoftness = 0.30,
  upperVerticalSpeed = 0.12,
  upperVerticalAmp = 0.08,

  // Color - more prominent
  color = "rgba(54, 87, 255, 0.95)",

  // Target FPS
  fps = 60,

  // Overflow extension (how much extra space to add beyond viewport)
  overflowExtension = 0.5,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // ---- helpers (no per-pixel allocations) ----
    const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);

    // Fast smoothstep without function calls in inner loops
    const smoothstep01 = (t) => t * t * (3.0 - 2.0 * t);

    const parseColor = (colorStr) => {
      const rgbaMatch = colorStr.match(
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
        colorStr
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

    // ---- gradient canvas (cached) ----
    const gradientCanvas = document.createElement("canvas");
    const gradientCtx = gradientCanvas.getContext("2d", { alpha: true });
    if (!gradientCtx) return;

    // ---- resize-dependent state ----
    let dpr = 1;
    let logicalWidth = 0;
    let logicalHeight = 0;
    let extensionPixels = 0;
    let viewportLogicalHeight = 0;

    let gradWidth = 0;
    let gradHeight = 0;

    // Reusable ImageData + buffer
    let gradImageData = null;
    let gradData = null;

    // Precomputed arrays
    let xPhase = null; // Float32Array(gradWidth)
    let uvY = null; // Float32Array(gradHeight)

    // Option A arrays (precompute per X each frame)
    let lowerE0X = null; // Float32Array(gradWidth)
    let topE0X = null; // Float32Array(gradWidth)
    let invLowerRangeX = null; // Float32Array(gradWidth)
    let invTopRangeX = null; // Float32Array(gradWidth)

    const rebuildGradientBuffers = () => {
      gradWidth = Math.max(1, Math.floor(canvas.width / 2));
      gradHeight = Math.max(1, Math.floor(canvas.height / 2));

      if (
        gradientCanvas.width !== gradWidth ||
        gradientCanvas.height !== gradHeight
      ) {
        gradientCanvas.width = gradWidth;
        gradientCanvas.height = gradHeight;
      }

      gradImageData = gradientCtx.createImageData(gradWidth, gradHeight);
      gradData = gradImageData.data;

      xPhase = new Float32Array(gradWidth);

      lowerE0X = new Float32Array(gradWidth);
      topE0X = new Float32Array(gradWidth);
      invLowerRangeX = new Float32Array(gradWidth);
      invTopRangeX = new Float32Array(gradWidth);

      const twoPi = Math.PI * 2;
      const invCanvasW = 1 / canvas.width;

      for (let x = 0; x < gradWidth; x++) {
        // grad is half-res; map to full-res uv for consistent wave behavior
        const u = (x * 2) * invCanvasW;
        xPhase[x] = u * twoPi;
      }

      // Bottom-anchored uvY
      uvY = new Float32Array(gradHeight);
      const invViewportH = 1 / viewportLogicalHeight;
      const twoOverDpr = 2 / dpr;

      for (let y = 0; y < gradHeight; y++) {
        const logicalY = y * twoOverDpr;
        const yInViewport = logicalY - extensionPixels;
        const vTopOrigin = yInViewport * invViewportH; // 0 top -> 1 bottom
        uvY[y] = 1.2 - vTopOrigin; // 0 bottom -> 1 top
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

      const changed =
        Math.abs(canvas.width - newWidth) > 10 ||
        Math.abs(canvas.height - newHeight) > 10;

      if (changed) {
        canvas.width = newWidth;
        canvas.height = newHeight;

        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${totalHeight}px`;
        canvas.style.top = `-${extensionPixels}px`;

        logicalWidth = viewportWidth;
        logicalHeight = totalHeight;
        viewportLogicalHeight = viewportHeight;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        // Helps when drawing half-res gradient scaled up
        ctx.imageSmoothingEnabled = true;

        rebuildGradientBuffers();
      }
    };

    resizeCanvas();

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", handleResize);

    const updateGradientCanvas = (timeSeconds) => {
      // Vertical motion is per-frame, cheap
      const lowerVerticalMovement =
        Math.sin(timeSeconds * lowerVerticalSpeed) * lowerVerticalAmp;
      const upperVerticalMovement =
        Math.sin(timeSeconds * upperVerticalSpeed) * upperVerticalAmp;

      const tL = timeSeconds * lowerWaveSpeed;
      const tU = timeSeconds * upperWaveSpeed;

      // --- 1) Precompute smoothstep ranges PER X (big win) ---
      for (let x = 0; x < gradWidth; x++) {
        const xp = xPhase[x];

        // Lower combined waves
        const l1 = Math.sin(xp * lowerWaveFreq + tL);
        const l2 = Math.sin(xp * (lowerWaveFreq * 0.7) + (tL * 0.85));
        const l3 = Math.sin(xp * (lowerWaveFreq * 1.3) + (tL * 0.6));
        const lowerWaveCombined =
          (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * lowerWaveAmp;

        const lowerB = lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

        // Upper combined waves
        const u1 = Math.sin(xp * upperWaveFreq + tU);
        const u2 = Math.sin(xp * (upperWaveFreq * 0.75) + (tU * 0.8));
        const u3 = Math.sin(xp * (upperWaveFreq * 1.25) + (tU * 0.65));
        const upperWaveCombined =
          (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * upperWaveAmp;

        const topB = topBoundaryBase + upperWaveCombined + upperVerticalMovement;

        const waveHeight = Math.max(0.1, topB - lowerB);
        const extendedLowerFade = lowerFadeSoftness + waveHeight * 0.05;
        const extendedTopFade = topFadeSoftness + waveHeight * 0.05;

        // lower smoothstep: [lowerB - fade, lowerB + fade]
        const lowerA = lowerB - extendedLowerFade;
        const lowerC = lowerB + extendedLowerFade;
        const lowerRange = lowerC - lowerA;

        lowerE0X[x] = lowerA;
        invLowerRangeX[x] = lowerRange !== 0 ? 1 / lowerRange : 0;

        // top smoothstep: [topB - fade, topB + fade]
        const topA = topB - extendedTopFade;
        const topC = topB + extendedTopFade;
        const topRange = topC - topA;

        topE0X[x] = topA;
        invTopRangeX[x] = topRange !== 0 ? 1 / topRange : 0;
      }

      // --- 2) Fill pixels (no trig here) ---
      const r = colorData.r | 0;
      const g = colorData.g | 0;
      const b = colorData.b | 0;
      const a255 = colorData.a * 255;

      for (let y = 0; y < gradHeight; y++) {
        const v = uvY[y];
        let idx = y * gradWidth * 4;

        for (let x = 0; x < gradWidth; x++) {
          // fromBottom = smoothstep(lowerA, lowerC, v)
          let t = (v - lowerE0X[x]) * invLowerRangeX[x];
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const fromBottom = smoothstep01(t);

          // fromTop = 1 - smoothstep(topA, topC, v)
          let tt = (v - topE0X[x]) * invTopRangeX[x];
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

    const targetFrameTime = 1000 / fps;

    const animate = (now) => {
      animationRef.current = requestAnimationFrame(animate);

      // Optional FPS cap (kept from your code)
      const deltaTimeMs = now - lastFrameTimeRef.current;
      if (deltaTimeMs < targetFrameTime - 1) return;
      lastFrameTimeRef.current = now;

      // IMPORTANT: use absolute time to reduce jitter when frames skip
      const t = now * 0.001;
      timeRef.current = t;

      updateGradientCanvas(t);

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.drawImage(gradientCanvas, 0, 0, logicalWidth, logicalHeight);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [
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
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full bg-transparent pointer-events-none max-sm:hidden"
      style={{
        position: "absolute",
        left: 0,
        top: 80,
        zIndex: 1,
      }}
    />
  );
};

export default WaveGradientCanvas;
