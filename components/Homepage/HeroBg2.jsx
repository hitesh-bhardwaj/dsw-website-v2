"use client";
import React, { useRef, useEffect } from "react";

const WaveGradientCanvas = ({
  // Lower wave
  lowerWaveFreq = 0.8, // Lower frequency for wider, smooth waves
  lowerWaveAmp = 0.15, // Moderate amplitude
  lowerWaveSpeed = 0.6, // Slow, smooth movement
  lowerBoundaryBase = 0.35,
  lowerFadeSoftness = 0.2,
  // Upper wave
  upperWaveFreq = 1.0, // Different frequency for independent movement
  upperWaveAmp = 0.18, // Slightly different amplitude
  upperWaveSpeed = 0.85, // Different speed for asynchronous movement
  topBoundaryBase = 0.65,
  topFadeSoftness = 0.2,
  // Color (blue with opacity)
  color = "rgba(54, 87, 255, 0.6)",
  // Target FPS
  fps = 60,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    // Grid config
    const gridConfig = {
      spacing: 80,
      color: 'rgba(255, 255, 255, 0.4)',
      lineWidth: 0.5,
    };

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.25);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Draw grid function
    const drawGrid = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      
      ctx.strokeStyle = gridConfig.color;
      ctx.lineWidth = gridConfig.lineWidth;
      ctx.beginPath();

      // Draw vertical lines
      for (let x = 0; x <= width; x += gridConfig.spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      // Draw horizontal lines
      for (let y = 0; y <= height; y += gridConfig.spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();
    };

    // Parse color to RGB and alpha
    const parseColor = (colorStr) => {
      const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (rgbaMatch) {
        return {
          r: parseInt(rgbaMatch[1]),
          g: parseInt(rgbaMatch[2]),
          b: parseInt(rgbaMatch[3]),
          a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
        };
      }
      
      const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorStr);
      if (hexMatch) {
        return {
          r: parseInt(hexMatch[1], 16),
          g: parseInt(hexMatch[2], 16),
          b: parseInt(hexMatch[3], 16),
          a: 1,
        };
      }
      
      return { r: 255, g: 255, b: 255, a: 0.4 };
    };

    const colorData = parseColor(color);

    // Smoothstep function for smooth transitions
    const smoothstep = (e0, e1, x) => {
      const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
      return t * t * (3.0 - 2.0 * t);
    };

    // Animation loop
    let lastTime = performance.now();
    const interval = 1000 / Math.max(1, fps);

    const animate = (now) => {
      if (now - lastTime >= interval) {
        lastTime = now;
        timeRef.current += interval / 1000;

        const width = canvas.getBoundingClientRect().width;
        const height = canvas.getBoundingClientRect().height;

        ctx.clearRect(0, 0, width, height);

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        // Process each pixel
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const uvX = x / width;
            const uvY = y / height;

            // Lower wave with multiple harmonics for smooth, continuous movement
            // Normalize uvX from 0-1 to 0-2π for full wave coverage
            const xPhase = uvX * Math.PI * 2;
            
            // Lower wave - moves RIGHT (negative time)
            const lowerWave1 = Math.sin(xPhase * lowerWaveFreq - timeRef.current * lowerWaveSpeed);
            const lowerWave2 = Math.sin(xPhase * lowerWaveFreq * 0.6 - timeRef.current * lowerWaveSpeed * 0.7);
            const lowerWave3 = Math.sin(xPhase * lowerWaveFreq * 1.4 - timeRef.current * lowerWaveSpeed * 0.4);
            
            const lowerWaveCombined = (lowerWave1 * 0.5 + lowerWave2 * 0.3 + lowerWave3 * 0.2) * lowerWaveAmp;
            const lowerBoundaryWavy = lowerBoundaryBase + lowerWaveCombined;

            // Upper wave - moves LEFT (positive time) with different phase offset
            const upperWave1 = Math.sin(xPhase * upperWaveFreq + timeRef.current * upperWaveSpeed + Math.PI); // Add PI offset
            const upperWave2 = Math.sin(xPhase * upperWaveFreq * 0.75 + timeRef.current * upperWaveSpeed * 0.8 + Math.PI * 0.5);
            const upperWave3 = Math.sin(xPhase * upperWaveFreq * 1.3 + timeRef.current * upperWaveSpeed * 0.5 + Math.PI * 1.5);
            
            const upperWaveCombined = (upperWave1 * 0.5 + upperWave2 * 0.3 + upperWave3 * 0.2) * upperWaveAmp;
            const topBoundaryWavy = topBoundaryBase + upperWaveCombined;

            // Calculate fade zones with larger softness to prevent cutoffs
            const waveHeight = Math.max(0.1, topBoundaryWavy - lowerBoundaryWavy);
            const extendedLowerFade = lowerFadeSoftness + waveHeight * 0.4;
            const extendedTopFade = topFadeSoftness + waveHeight * 0.4;

            // Calculate alpha from bottom wave with smooth fade
            const fromBottom = smoothstep(
              lowerBoundaryWavy - extendedLowerFade,
              lowerBoundaryWavy + extendedLowerFade,
              uvY
            );

            // Calculate alpha from top wave with smooth fade
            const fromTop = 1.0 - smoothstep(
              topBoundaryWavy - extendedTopFade,
              topBoundaryWavy + extendedTopFade,
              uvY
            );

            // Combine alphas smoothly
            const combinedAlpha = fromBottom * fromTop;
            
            // Apply additional smoothing to prevent hard edges
            const finalAlpha = Math.pow(combinedAlpha, 0.9) * colorData.a;

            // Set pixel color
            const idx = (y * width + x) * 4;
            data[idx] = colorData.r;
            data[idx + 1] = colorData.g;
            data[idx + 2] = colorData.b;
            data[idx + 3] = finalAlpha * 255;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        drawGrid();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    lowerWaveFreq,
    lowerWaveAmp,
    lowerWaveSpeed,
    lowerBoundaryBase,
    lowerFadeSoftness,
    upperWaveFreq,
    upperWaveAmp,
    upperWaveSpeed,
    topBoundaryBase,
    topFadeSoftness,
    color,
    fps,
  ]);

  return (
    <canvas
      ref={canvasRef}
      
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent"
      }}
    />
  );
};

export default WaveGradientCanvas;