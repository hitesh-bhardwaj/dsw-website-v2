"use client";
import React, { useRef, useEffect } from "react";

const WaveGradientCanvas = ({
  // Lower wave - smoother, more visible movement
  lowerWaveFreq = 0.5,
  lowerWaveAmp = 0.12,
  lowerWaveSpeed = 0.8, // right-to-left movement
  lowerBoundaryBase = 0.12, // ✅ moved down (uvY is bottom-anchored now)
  lowerFadeSoftness = 0.15,
  lowerVerticalSpeed = 0.15,
  lowerVerticalAmp = 0.08,

  // Upper wave - smoother, more visible movement
  upperWaveFreq = 0.6,
  upperWaveAmp = 0.12,
  upperWaveSpeed = 0.8, // right-to-left movement
  topBoundaryBase = 0.57, // ✅ moved down with the band
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

    // Grid config
    const gridConfig = {
      spacing: 80,
      color: "rgba(255, 255, 255, 0.4)",
      lineWidth: 0.5,
    };

    // ---- helpers (no per-pixel allocations) ----
    const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
    const smoothstep = (e0, e1, x) => {
      const t = clamp01((x - e0) / (e1 - e0));
      return t * t * (3.0 - 2.0 * t);
    };

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

    // ---- resize-dependent state ----
    let dpr = 1;
    let logicalWidth = 0;
    let logicalHeight = 0;
    let extensionPixels = 0;
    let viewportLogicalHeight = 0;

    let gradWidth = 0;
    let gradHeight = 0;

    // Reusable ImageData + buffer (big GC win)
    let gradImageData = null;
    let gradData = null;

    // Precomputed arrays
    let xPhase = null; // Float32Array(gradWidth)
    let uvY = null; // Float32Array(gradHeight)

    // Grid path cache
    let gridPath = null;
    const buildGridPath = () => {
      const p = new Path2D();

      for (let x = 0; x <= logicalWidth; x += gridConfig.spacing) {
        p.moveTo(x, 0);
        p.lineTo(x, logicalHeight);
      }

      for (let y = 0; y <= logicalHeight; y += gridConfig.spacing) {
        p.moveTo(0, y);
        p.lineTo(logicalWidth, y);
      }

      gridPath = p;
    };

    const rebuildGradientBuffers = () => {
      gradWidth = Math.floor(canvas.width / 2);
      gradHeight = Math.floor(canvas.height / 2);

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
      const twoPi = Math.PI * 2;
      const invCanvasW = 1 / canvas.width;

      for (let x = 0; x < gradWidth; x++) {
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

      if (
        Math.abs(canvas.width - newWidth) > 10 ||
        Math.abs(canvas.height - newHeight) > 10
      ) {
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

        buildGridPath();
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

    const updateGradientCanvas = () => {
      const time = timeRef.current;

      const lowerVerticalMovement =
        Math.sin(time * lowerVerticalSpeed) * lowerVerticalAmp;
      const upperVerticalMovement =
        Math.sin(time * upperVerticalSpeed) * upperVerticalAmp;

      const tL = time * lowerWaveSpeed;
      const tU = time * upperWaveSpeed;

      for (let y = 0; y < gradHeight; y++) {
        const v = uvY[y];
        const rowBase = y * gradWidth * 4;

        for (let x = 0; x < gradWidth; x++) {
          const xp = xPhase[x];

          const lowerWave1 = Math.sin(xp * lowerWaveFreq + tL);
          const lowerWave2 = Math.sin(xp * lowerWaveFreq * 0.7 + tL * 0.85);
          const lowerWave3 = Math.sin(xp * lowerWaveFreq * 1.3 + tL * 0.6);
          const lowerWaveCombined =
            (lowerWave1 * 0.5 + lowerWave2 * 0.3 + lowerWave3 * 0.2) *
            lowerWaveAmp;
          const lowerBoundaryWavy =
            lowerBoundaryBase + lowerWaveCombined + lowerVerticalMovement;

          const upperWave1 = Math.sin(xp * upperWaveFreq + tU);
          const upperWave2 = Math.sin(xp * upperWaveFreq * 0.75 + tU * 0.8);
          const upperWave3 = Math.sin(xp * upperWaveFreq * 1.25 + tU * 0.65);
          const upperWaveCombined =
            (upperWave1 * 0.5 + upperWave2 * 0.3 + upperWave3 * 0.2) *
            upperWaveAmp;
          const topBoundaryWavy =
            topBoundaryBase + upperWaveCombined + upperVerticalMovement;

          const waveHeight = Math.max(0.1, topBoundaryWavy - lowerBoundaryWavy);
          const extendedLowerFade = lowerFadeSoftness + waveHeight * 0.05;
          const extendedTopFade = topFadeSoftness + waveHeight * 0.05;

          const fromBottom = smoothstep(
            lowerBoundaryWavy - extendedLowerFade,
            lowerBoundaryWavy + extendedLowerFade,
            v
          );

          const fromTop =
            1.0 -
            smoothstep(
              topBoundaryWavy - extendedTopFade,
              topBoundaryWavy + extendedTopFade,
              v
            );

          const finalAlpha = fromBottom * fromTop * colorData.a;

          const idx = rowBase + x * 4;
          gradData[idx] = colorData.r;
          gradData[idx + 1] = colorData.g;
          gradData[idx + 2] = colorData.b;
          gradData[idx + 3] = (finalAlpha * 255) | 0;
        }
      }

      gradientCtx.putImageData(gradImageData, 0, 0);
    };

    const targetFrameTime = 1000 / fps;

    const animate = (now) => {
      animationRef.current = requestAnimationFrame(animate);

      const deltaTime = now - lastFrameTimeRef.current;
      if (deltaTime < targetFrameTime - 1) return;

      lastFrameTimeRef.current = now;
      timeRef.current += deltaTime / 1000;

      updateGradientCanvas();

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      ctx.drawImage(gradientCanvas, 0, 0, logicalWidth, logicalHeight);

      ctx.strokeStyle = gridConfig.color;
      ctx.lineWidth = gridConfig.lineWidth;
      if (gridPath) ctx.stroke(gridPath);
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
      className="block w-full bg-transparent pointer-events-none"
      style={{
        position: "absolute", // ✅ prevents clipping by section containers
        left: 0,
        top:100, // actual top offset is managed in resizeCanvas via canvas.style.top
        zIndex: 1, // ✅ ensure it stays above other sections
      }}
    />
  );
};

export default WaveGradientCanvas;