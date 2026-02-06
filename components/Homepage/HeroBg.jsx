"use client";
import React, { useRef, useEffect } from 'react';

const HeroBg = () => {
  return (
    <>
    <div className='absolute top-0 left-0 h-screen w-screen z-1'>
        <InteractiveBackground/>

    </div>
    </>
  )
}

export default HeroBg




function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // grid config
    const gridConfig = {
      spacing: 80, // Distance between grid lines
      color: 'rgba(255, 255, 255, 0.4)', // White with opacity
      lineWidth: 0.5,
    };
    const canvasClearStyle = 'rgba(255, 255, 255, 1)';

    // Wave config
    const waveConfig = {
      height: 300, // Height of wave area from bottom (increased to cover more area)
      amplitude: 120, // Wave height variation (increased for dramatic rise/fall)
      frequency: 0.0025, // Wave frequency (controls wavelength)
      speed: 0.6, // Animation speed (increased for more visible movement)
      topBlur: 50, // Blur amount at the top (very high for ethereal effect)
      bottomBlur: 50, // Blur amount at the bottom (still blurred)
      color: 'rgba(54, 87, 255, 1)', // #3657FF solid color
    };
    let waveOffset = 0;

    function drawGrid() {
      ctx.strokeStyle = gridConfig.color;
      ctx.lineWidth = gridConfig.lineWidth;
      ctx.beginPath();

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridConfig.spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridConfig.spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();
    }

    function drawWave() {
      // Add vertical oscillation for rise and fall effect
      const verticalOffset = Math.sin(waveOffset * 0.5) * 40; // Oscillates up and down by 40px
      const waveY = canvas.height - waveConfig.height + verticalOffset;
      
      // Generate wave points using sine wave
      const points = [];
      const step = 5;
      
      for (let x = 0; x <= canvas.width; x += step) {
        // Combine horizontal wave with vertical rise/fall
        const sineValue = Math.sin((x * waveConfig.frequency) + (waveOffset * 2));
        const y = waveY + sineValue * waveConfig.amplitude;
        points.push({ x, y });
      }

      // Draw multiple passes with decreasing blur and opacity for gradient effect
      const passes = 8;
      
      for (let pass = 0; pass < passes; pass++) {
        const progress = pass / (passes - 1); // 0 to 1
        
        // Calculate blur: more at top (0), less at bottom (1)
        const blurAmount = waveConfig.topBlur * (1 - progress) + waveConfig.bottomBlur * progress;
        ctx.filter = `blur(${blurAmount}px)`;
        
        // Calculate opacity: very subtle throughout for ethereal effect
        const opacity = 0.05 + (progress * 0.45); // Start at 0.05, end at 0.50 (much more subtle)
        
        ctx.beginPath();
        
        // Start from bottom
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(points[0].x, points[0].y);
        
        // Draw smooth curve through points
        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        
        // Complete the shape
        const lastPoint = points[points.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        // Create vertical gradient from wave top to bottom
        const gradient = ctx.createLinearGradient(0, waveY - waveConfig.amplitude, 0, canvas.height);
        
        // Top of wave: almost invisible, very ethereal
        gradient.addColorStop(0, `rgba(120, 140, 255, ${opacity * 0.1})`);
        // Upper middle: still very light
        gradient.addColorStop(0.25, `rgba(80, 110, 255, ${opacity * 0.3})`);
        // Middle: gradually building
        gradient.addColorStop(0.5, `rgba(54, 87, 255, ${opacity * 0.6})`);
        // Lower middle: more visible
        gradient.addColorStop(0.75, `rgba(42, 70, 220, ${opacity * 0.85})`);
        // Bottom: still subtle but more concentrated
        gradient.addColorStop(1, `rgba(30, 50, 200, ${opacity})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.filter = 'none';
      ctx.globalAlpha = 1;
    }

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    let lastTime = performance.now();

    function canvasLoop(now = performance.now()) {
      const delta = now - lastTime;
      lastTime = now;

      // Update wave animation (convert delta to seconds)
      waveOffset += (waveConfig.speed * delta) / 1000;

      // Clear canvas
      ctx.fillStyle = canvasClearStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw wave first (behind grid)
      drawWave();

      // Draw static grid on top
      drawGrid();

      requestAnimationFrame(canvasLoop);
    }

    window.addEventListener('resize', initCanvas);

    initCanvas();
    canvasLoop();

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  return (
    <div
      id="canvas-18971"
      className="max-sm:hidden max-md:hidden bg-white"
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100vh',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}