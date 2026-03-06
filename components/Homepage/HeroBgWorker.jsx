"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroBgWorker - Web Worker-based canvas rendering
 *
 * Offloads all canvas rendering to a Web Worker using OffscreenCanvas.
 * Uses blob URL to work around Next.js/Turbopack worker loading issues.
 */
export default function HeroBgWorker({ variant = "default", topOffsetPx = 0, ...customConfig }) {
  const canvasRef = useRef(null);
  const workerRef = useRef(null);
  const transferredRef = useRef(false);
  const [isSupported, setIsSupported] = useState(true);
  const [canvasStyle, setCanvasStyle] = useState({});

  useEffect(() => {
    // Feature detection
    if (!("OffscreenCanvas" in window)) {
      setIsSupported(false);
      return;
    }

    if (!window.Worker) {
      setIsSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent double transfer (React Strict Mode)
    if (transferredRef.current) {
      return;
    }

    // Mark as initializing immediately
    transferredRef.current = true;

    // Async worker initialization
    const initializeWorker = async () => {
      try {
        // Fetch worker code as text
        const response = await fetch("/workers/hero-shader.worker.js");
        const workerCode = await response.text();

        // Create blob URL
        const blob = new Blob([workerCode], { type: "application/javascript" });
        const workerUrl = URL.createObjectURL(blob);

        // Create worker from blob
        const worker = new Worker(workerUrl);
        workerRef.current = worker;

        // Clean up blob URL
        URL.revokeObjectURL(workerUrl);

        // Worker error handler
        worker.onerror = (error) => {
          console.error("Worker error:", error);
        };

        // Get initial dimensions
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const initialWidth = window.innerWidth;
        const initialHeight = window.innerHeight;

        // Transfer canvas to worker
        const offscreen = canvas.transferControlToOffscreen();

        // Configuration
        const config = {
          variant,
          fps: 60,
          gridSize: 80,
          HOVER_ALPHA_BOOST: 4.1,
          lowerWaveFreq: 0.5,
          lowerWaveAmp: 0.12,
          lowerWaveSpeed: 0.8,
          lowerBoundaryBase: 0.12,
          lowerFadeSoftness: 0.15,
          lowerVerticalSpeed: 0.15,
          lowerVerticalAmp: 0.08,
          upperWaveFreq: 0.8,
          upperWaveAmp: 0.1,
          upperWaveSpeed: 0.8,
          topBoundaryBase: 0.57,
          topFadeSoftness: 0.3,
          upperVerticalSpeed: 0.12,
          upperVerticalAmp: 0.08,
          color: "rgba(54, 87, 255, 0.95)",
          gridStroke: "rgba(255, 255, 255, 0.12)",
          gridLineWidth: 1,
          deformRadius: 150,
          mouseInfluence: 0.01,
          mouseSmoothingBase: 0.2,
          topOffsetPx: 0,
          dpr,
          initialWidth,
          initialHeight,
          ...customConfig,
        };

        // Send init message to worker
        worker.postMessage(
          {
            type: "init",
            data: { canvas: offscreen, config },
          },
          [offscreen]
        );

        // Resize handler
        const handleResize = () => {
          const w = workerRef.current;
          if (!w) return;

          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const overflow = getOverflowExtension(variant);
          const extLeft = vw * overflow.left;
          const extTop = vh * overflow.top;
          const extRight = vw * overflow.right;
          const extBottom = vh * overflow.bottom;
          const totW = vw + extLeft + extRight;
          const totH = vh + extTop + extBottom;

          // Update canvas styling
          setCanvasStyle({
            position: "absolute",
            left: `${-extLeft}px`,
            top: `${topOffsetPx - extTop}px`,
            width: `${totW}px`,
            height: `${totH}px`,
            pointerEvents: "auto",
          });

          // Notify worker of resize
          w.postMessage({
            type: "resize",
            data: {
              width: vw,
              height: vh,
              dpr: Math.min(window.devicePixelRatio || 1, 1.5),
            },
          });
        };

        // Mouse handler (throttled)
        let lastMouseUpdate = 0;

        // Get overflow extensions for the variant
        const getOverflowExtension = (variant) => {
          switch (variant) {
            case "default":
              return { top: 0, bottom: 0.3, left: 0, right: 0 };
            case "bottomRight":
              return { top: 0, bottom: 0.1, left: 0, right: 0.2 };
            case "bottomLeft":
              return { top: 0, bottom: 0.1, left: 0.2, right: 0 };
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

        const overflow = getOverflowExtension(variant);
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const extensionLeft = viewportWidth * overflow.left;
        const extensionTop = viewportHeight * overflow.top;
        const extensionRight = viewportWidth * overflow.right;
        const extensionBottom = viewportHeight * overflow.bottom;

        // Calculate total canvas size including overflow
        const totalWidth = viewportWidth + extensionLeft + extensionRight;
        const totalHeight = viewportHeight + extensionTop + extensionBottom;

        // Set canvas element styling
        setCanvasStyle({
          position: "absolute",
          left: `${-extensionLeft}px`,
          top: `${topOffsetPx - extensionTop}px`,
          width: `${totalWidth}px`,
          height: `${totalHeight}px`,
          pointerEvents: "auto",
        });

        const handleMouseMove = (e) => {
          const now = performance.now();
          if (now - lastMouseUpdate < 16) return;
          lastMouseUpdate = now;

          const w = workerRef.current;
          const c = canvasRef.current;
          if (!w || !c) return;

          const rect = c.getBoundingClientRect();

          // Adjust for canvas overflow extensions
          w.postMessage({
            type: "updateMouse",
            data: {
              position: {
                x: e.clientX - rect.left + extensionLeft,
                y: e.clientY - rect.top + extensionTop,
              },
            },
          });
        };

        const handleMouseLeave = () => {
          const w = workerRef.current;
          if (!w) return;
          w.postMessage({
            type: "updateMouse",
            data: { position: { x: -1000, y: -1000 } },
          });
        };

        // Set up event listeners
        window.addEventListener("resize", handleResize, { passive: true });
        canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
        canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        // Initial resize
        handleResize();

        // Cleanup function
        return () => {
          const w = workerRef.current;
          if (w) {
            w.postMessage({ type: "stop" });
            w.terminate();
            workerRef.current = null;
          }
          window.removeEventListener("resize", handleResize);
          const c = canvasRef.current;
          if (c) {
            c.removeEventListener("mousemove", handleMouseMove);
            c.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      } catch (error) {
        console.error("❌ Worker initialization failed:", error);
        setIsSupported(false);
      }
    };

    // Call async init and store cleanup
    let cleanup;
    initializeWorker().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    // Return cleanup function
    return () => {
      if (cleanup) cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once

  if (!isSupported) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      id="hero-bg-worker"
      className="max-md:hidden"
      style={canvasStyle}
    />
  );
}
