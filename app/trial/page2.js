"use client"
import React, { useEffect, useRef } from 'react';

const GridCanvas = () => {
  const canvasRef = useRef(null);
  const targetMousePos = useRef({ x: -1000, y: -1000 });
  const currentMousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Lerp function for smooth interpolation
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };
    
    // Set canvas size to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Calculate deformation offset based on distance from mouse
    const getDeformationOffset = (x, y, maxDistance, maxDeformation) => {
      const dx = x - currentMousePos.current.x;
      const dy = y - currentMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > maxDistance) {
        return { offsetX: 0, offsetY: 0 };
      }
      
      // Calculate influence (1 at center, 0 at maxDistance)
      const influence = 1 - (distance / maxDistance);
      // Use easing for smoother deformation
      const easedInfluence = influence * influence * (3 - 2 * influence); // smoothstep
      
      // Calculate displacement direction (TOWARD mouse - negative direction)
      const angle = Math.atan2(dy, dx);
      const displacement = easedInfluence * maxDeformation;
      
      return {
        offsetX: -Math.cos(angle) * displacement, // Negative for inward curve
        offsetY: -Math.sin(angle) * displacement  // Negative for inward curve
      };
    };

    // Get color based on distance from mouse
    const getColorForDistance = (distance, maxDistance) => {
      if (distance > maxDistance) {
        return {
          line: 'rgba(255, 255, 255, 0.08)',
          dot: 'rgba(255, 255, 255, 0.3)'
        };
      }
      
      // Calculate intensity based on distance (inverse relationship)
      const influence = 1 - (distance / maxDistance);
      const easedInfluence = influence * influence * (3 - 2 * influence);
      
      // Dark, vibrant blue at center
      const r = 30 + (easedInfluence * 40);
      const g = 80 + (easedInfluence * 100);
      const b = 200 + (easedInfluence * 55);
      const alpha = 0.4 + (easedInfluence * 0.6);
      
      return {
        line: `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`,
        dot: `rgba(${r}, ${g}, ${b}, ${alpha})`
      };
    };

    const drawGrid = () => {
      const gridSize = 60;
      const dotRadius = 1.5;
      const deformRadius = 150; // Radius of deformation effect
      const maxDeformation = 12; // Reduced to prevent loops/crossovers
      const colorRadius = 120; // Radius for color effect (can be same or different from deform)
      
      // Apply lerp to smooth mouse movement
      const lerpFactor = 0.15;
      currentMousePos.current.x = lerp(currentMousePos.current.x, targetMousePos.current.x, lerpFactor);
      currentMousePos.current.y = lerp(currentMousePos.current.y, targetMousePos.current.y, lerpFactor);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 0.5;
      
      // Draw vertical lines with deformation and color gradient
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const segments = Math.ceil(canvas.height / 5);
        
        for (let i = 0; i < segments; i++) {
          const y1 = (canvas.height / segments) * i;
          const y2 = (canvas.height / segments) * (i + 1);
          const midY = (y1 + y2) / 2;
          
          // Get deformation for both points
          const offset1 = getDeformationOffset(x, y1, deformRadius, maxDeformation);
          const offset2 = getDeformationOffset(x, y2, deformRadius, maxDeformation);
          
          const deformedX1 = x + offset1.offsetX;
          const deformedY1 = y1 + offset1.offsetY;
          const deformedX2 = x + offset2.offsetX;
          const deformedY2 = y2 + offset2.offsetY;
          
          // Get color based on distance from mouse at segment midpoint
          const deformedMidX = x + getDeformationOffset(x, midY, deformRadius, maxDeformation).offsetX;
          const deformedMidY = midY + getDeformationOffset(x, midY, deformRadius, maxDeformation).offsetY;
          const distanceToMouse = Math.sqrt(
            (currentMousePos.current.x - deformedMidX) ** 2 + 
            (currentMousePos.current.y - deformedMidY) ** 2
          );
          
          const colors = getColorForDistance(distanceToMouse, colorRadius);
          ctx.strokeStyle = colors.line;
          
          ctx.beginPath();
          ctx.moveTo(deformedX1, deformedY1);
          ctx.lineTo(deformedX2, deformedY2);
          ctx.stroke();
        }
      }
      
      // Draw horizontal lines with deformation and color gradient
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const segments = Math.ceil(canvas.width / 5);
        
        for (let i = 0; i < segments; i++) {
          const x1 = (canvas.width / segments) * i;
          const x2 = (canvas.width / segments) * (i + 1);
          const midX = (x1 + x2) / 2;
          
          const offset1 = getDeformationOffset(x1, y, deformRadius, maxDeformation);
          const offset2 = getDeformationOffset(x2, y, deformRadius, maxDeformation);
          
          const deformedX1 = x1 + offset1.offsetX;
          const deformedY1 = y + offset1.offsetY;
          const deformedX2 = x2 + offset2.offsetX;
          const deformedY2 = y + offset2.offsetY;
          
          // Get color based on distance from mouse at segment midpoint
          const deformedMidX = midX + getDeformationOffset(midX, y, deformRadius, maxDeformation).offsetX;
          const deformedMidY = y + getDeformationOffset(midX, y, deformRadius, maxDeformation).offsetY;
          const distanceToMouse = Math.sqrt(
            (currentMousePos.current.x - deformedMidX) ** 2 + 
            (currentMousePos.current.y - deformedMidY) ** 2
          );
          
          const colors = getColorForDistance(distanceToMouse, colorRadius);
          ctx.strokeStyle = colors.line;
          
          ctx.beginPath();
          ctx.moveTo(deformedX1, deformedY1);
          ctx.lineTo(deformedX2, deformedY2);
          ctx.stroke();
        }
      }
      
      // Draw dots at intersections with deformation and color
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const offset = getDeformationOffset(x, y, deformRadius, maxDeformation);
          const deformedX = x + offset.offsetX;
          const deformedY = y + offset.offsetY;
          
          // Calculate distance from mouse to deformed dot position
          const distance = Math.sqrt(
            (currentMousePos.current.x - deformedX) ** 2 + 
            (currentMousePos.current.y - deformedY) ** 2
          );
          
          const colors = getColorForDistance(distance, colorRadius);
          ctx.fillStyle = colors.dot;
          
          ctx.beginPath();
          ctx.arc(deformedX, deformedY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      drawGrid();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      targetMousePos.current = { x: -1000, y: -1000 };
    };

    resizeCanvas();
    animate();
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="h-screen w-screen bg-[#111111] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block"
      />
    </section>
  );
};

export default GridCanvas;