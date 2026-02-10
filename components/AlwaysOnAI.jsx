'use client';

import Image from 'next/image';
import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeadingAnim from './Animations/HeadingAnim';
import Copy from './Animations/Copy';

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

export default function AlwaysOnAI() {
  const sectionRef = useRef(null);
  const pathRefs = useRef([]);

  const setPathRef = (el) => {
    if (!el) return;
    if (!pathRefs.current.includes(el)) pathRefs.current.push(el);
  };

  const ARC_COUNT = 8;

  // ✅ Reduced vertical gapping between arcs (smaller pulls)
  const GAP_BOOST = 2.8; // try 0.85 for even tighter

  const arcParams = useMemo(() => {
    return Array.from({ length: ARC_COUNT }).map((_, i) => {
      const t = ARC_COUNT === 1 ? 0 : i / (ARC_COUNT - 1);

      // Smaller pull range = less separation (vertical gapping)
      const upPull = (60 + t * 140) * GAP_BOOST;
      const downPull = (70 + t * 180) * GAP_BOOST;

      const opacity = 0.7 - t * 0.45;

      return { upPull, downPull, opacity };
    });
  }, [ARC_COUNT, GAP_BOOST]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const paths = pathRefs.current;
      const params = arcParams.slice(0, paths.length);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        end: 'bottom top',
        scrub: 1, // ✅ smoother than true; adds a little easing
        onUpdate: (self) => {
          const p = self.progress; // 0..1

          paths.forEach((pathEl, i) => {
            const cfg = params[i];
            if (!cfg) return;

            // ✅ smooth + staggered
            const local = staggeredProgress(p, i, ARC_COUNT, 0.085);
            const t = smoothstep(local);

            // pull goes from up -> down
            const pull = lerp(-cfg.upPull, cfg.downPull, t);

            // keep endpoints centered vertically
            const y0 = START.y;
            const y1 = END.y;

            const d = `M ${START.x} ${y0}
                       C ${C1X} ${y0 + pull},
                         ${C2X} ${y1 + pull},
                         ${END.x} ${y1}`;

            pathEl.setAttribute('d', d.replace(/\s+/g, ' ').trim());
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [arcParams]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-[10.42vw] px-[3.91vw] overflow-hidden"
    >
      {/* Background curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-screen h-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {Array.from({ length: ARC_COUNT }).map((_, i) => {
            const cfg = arcParams[i];
            const initialPull = -cfg.upPull;

            const d = `M ${START.x} ${START.y}
                       C ${C1X} ${START.y + initialPull},
                         ${C2X} ${END.y + initialPull},
                         ${END.x} ${END.y}`;

            return (
              <path
                key={i}
                ref={setPathRef}
                d={d.replace(/\s+/g, ' ').trim()}
                stroke="#D9DAFE"
                strokeWidth="1.15"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity={cfg.opacity}
              />
            );
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center space-y-[2vw]">
          <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] font-heading leading-[1.2] ">
            Always-On AI. Built as Infrastructure.
          </h2>
          </HeadingAnim>
          <Copy>
          <p className="text-30 font-sans max-w-[47.92vw] mx-auto">
            AI only scales when enterprises can build it safely, trust it in daily workflows, and run it continuously
          </p>
          </Copy>
        </div>

        <div className="relative w-[30vw] h-[50vw] mx-auto fadeup">
          <Image
            src="/laptop-dashboard.png"
            alt="DSW UnifyAI Dashboard"
            fill
            className="object-contain h-full w-full scale-[2.8]"
            priority
          />
        </div>

        <div className="text-center">
          <Copy>
          <p className="text-[2.3vw] font-heading max-w-[58.23vw] font-normal mx-auto">
            The AI Operating System makes this possible by running as part of your core enterprise architecture.
          </p>
          </Copy>
        </div>
      </div>
    </section>
  );
}
