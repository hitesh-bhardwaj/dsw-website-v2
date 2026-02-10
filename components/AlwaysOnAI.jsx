"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeadingAnim from "./Animations/HeadingAnim";
import Copy from "./Animations/Copy";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- SVG sizing (matches your viewBox) ---
const VB_W = 1440;
const VB_H = 700;
const MID_Y = VB_H / 2;

// ✅ Start/end far outside the screen horizontally
const START = { x: -600, y: MID_Y };
const END = { x: VB_W + 600, y: MID_Y };

// Control points X (still inside viewBox so curves look natural)
const C1X = VB_W * 0.30;
const C2X = VB_W * 0.70;

// ---- helpers ----
function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

// ✅ Smooth stagger: all arcs animate over the whole scroll, but delayed by index
function staggeredProgress(p, i, count, stagger = 0.08) {
  const delay = i * stagger;                 // later arcs start later
  const span = 1 - delay;                    // remaining timeline for that arc
  return clamp01((p - delay) / Math.max(1e-6, span));
}

export default function AlwaysOnAI({content}) {
  const sectionRef = useRef(null);
  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:"#alwaysOnAi",
        start:"top 70%",
        end:"85% 70%",
        scrub:true,
        // markers:true

      }
    })
    tl.to(".upper-slinky",{
      rotateX:-80,
      top:"-40%"
    })
    .to(".mid-slinky",{
      rotateX:0,
      top:"0%"
    },"<")
    .to(".lower-slinky",{
      rotateX:-10,
      top:"55%"
    },"<")
  })

  return (
    <section
      ref={sectionRef}
      id="alwaysOnAi"
      style={{perspective:"1500px"}}
      className="relative w-full bg-white py-[20%] px-[5vw] overflow-hidden"
    >
      {/* Background Line Effect */}
       {/* before // top-[-60] 0deg */}
      {/* after // top-[-40] 60deg */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rings-perspective top-[-60%] w-[120%] left-[-10%] upper-slinky rotate-x-[10deg] ">
        <svg
          width="1920"
          height="639"
          className="w-full"
          viewBox="0 0 1920 639"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-15 638.257C258.004 533.347 1024.08 386.474 1904.35 638.257M-15 503.472C233.891 320.656 970.099 60.8523 1923.81 484.167M-15 325.597C280.848 80.2714 1082.8 -263.184 1923.81 325.597"
            stroke="#0205FA"
            strokeOpacity="0.2"
          />
        </svg>
      </div>

      {/* before // top-[-20] -180deg */}
      {/* after // top-[-10] 0deg */}

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rings-perspective top-[-20%] w-[120%] left-[-10%] rotate-x-[-180deg] mid-slinky">
        <svg
          width="1918"
          height="214"
          viewBox="0 0 1918 214"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-8.6543 130.803C350.792 192.473 1239.15 278.812 1917.04 130.803M-8.6543 0.499023C354.74 24.0548 1248.63 57.033 1917.04 0.499023"
            stroke="#0205FA"
            strokeOpacity="0.2"
          />
        </svg>
      </div>
      {/* before // top-[10] -60deg */}
      {/* after // top-[35] 0deg */}

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rings-perspective top-[10%] w-[101%] lower-slinky rotate-x-[60deg]">
        <svg
          width="1920"
          height="639"
          viewBox="0 0 1920 639"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-3.1543 0.480469C269.85 105.39 1035.93 252.263 1916.19 0.480469M-3.1543 135.266C245.736 318.082 981.945 577.885 1935.65 154.57M-3.1543 313.141C292.694 558.466 1094.64 901.921 1935.65 313.141"
            stroke="#0205FA"
            strokeOpacity="0.2"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center space-y-[2vw] ">
          <HeadingAnim>
            <h2 className="text-76 text-[#0A1B4B] font-heading leading-[1.2] ">
             {content.heading}
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-30 font-sans w-[55%] mx-auto ">
              {content.para}
            </p>
          </Copy>
        </div>

        <div className="relative w-[70vw] h-auto mx-auto fadeup my-[5vw] ">
          <Image
            src="/assets/homepage/laptop-dashboard-quality.png"
            alt="DSW UnifyAI Dashboard"
            width={800}
            height={700}
            className="object-contain h-full w-full"
            priority
          />
        </div>

        <div className="text-center ">
          <Copy>
          <p className="text-44 font-heading max-w-[58.23vw] font-normal mx-auto">
            {content.tagline}
          </p>
          </Copy>
        </div>
      </div>
    </section>
  );
}
