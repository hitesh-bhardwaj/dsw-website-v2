"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import Image from "next/image";

export function WorldMap() {
  const svgRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(svgRef, { amount: 0.3, once: false });

  // Make sure we also animate on hard reload even if already in view
  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  // Avoid SSR hydration mismatch for window width
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // lat/lng -> svg coords
  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (420 / 180);
    return { x, y };
  };

  // curved arc
  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 60;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const locations = [
    { name: "USA", coords: { lat: 80.9, lng: -150 } },
    { name: "Ireland", coords: { lat: 97, lng: -30.2 } },
    { name: "India", coords: { lat: 38, lng: 95 } },
  ];

  const connections = [
    { start: locations[2].coords, end: locations[1].coords },
    { start: locations[2].coords, end: locations[0].coords },
    { start: locations[1].coords, end: locations[0].coords },
  ];

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: (i) => ({
      pathLength: 1,
      transition: { duration: 1.5, delay: i * 1.2, ease: "easeInOut" },
    }),
  };

  return (
    <div className="relative w-full aspect-[2/1] rounded-lg max-sm:p-0">
      <Image
        width={700}
        height={500}
        src="/assets/contact-us/dsw-location.png"
        className="h-auto w-[90%] max-sm:w-[100%] mx-auto absolute inset-0 object-contain pointer-events-none select-none opacity-80"
        alt="world map"
        draggable={false}
      />

      <motion.svg
        ref={svgRef}
        viewBox="0 -200 800 650"
        initial="hidden"
        animate={controls}
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {connections.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={i}
              d={createCurvedPath(s, e)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth={isMobile ? 5 : 1.5}
              variants={pathVariants}
              custom={i}
            />
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f58a3d" stopOpacity="0" />
            <stop offset="10%" stopColor="#f58a3d" stopOpacity="0.5" />
            <stop offset="90%" stopColor="#f58a3d" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f58a3d" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
