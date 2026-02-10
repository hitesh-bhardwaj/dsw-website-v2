'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeadingAnim from './Animations/HeadingAnim';
import Copy from './Animations/Copy';

gsap.registerPlugin(ScrollTrigger);

export default function AlwaysOnAI() {
  const sectionRef = useRef(null);
  const ringsRef = useRef([]);

  const setRingRef = (el) => {
    if (!el) return;
    if (!ringsRef.current.includes(el)) ringsRef.current.push(el);
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Put perspective on an HTML element (works reliably)
      const bg = sectionRef.current.querySelector('.rings-perspective');
      if (bg) {
        gsap.set(bg, { perspective: 1200, transformStyle: 'preserve-3d' });
      }

      // Ensure transform box/origin works on SVG groups
      ringsRef.current.forEach((g) => {
        // SVG-specific: make CSS transforms reference the shape bounds
        (g).style.transformBox = 'fill-box';
        (g).style.transformOrigin = '50% 50%';
        (g).style.transformStyle = 'preserve-3d';
        (g).style.willChange = 'transform';
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
          // markers: true,
        },
      });

      ringsRef.current.forEach((g, i) => {
        tl.to(
          g,
          {
            rotateX: 180 + i * 6,   // increase if you want stronger tilt
            rotateY: i * 2,        // tiny twist adds depth
            z: i * 2,              // helps some browsers “commit” to 3D
            ease: 'none',
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-[10.42vw] px-[3.91vw] overflow-hidden"
    >
      {/* Background Line Effect */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rings-perspective">
        <svg
          className="absolute w-[120vw] h-[120vw] max-w-none"
          viewBox="0 0 1200 1200"
          fill="none"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const t = i / 7;              // 0..1 for 8 rings
            const rx = 420 + t * 520;
            const ry = 200 + t * 360;

            return (
              <g key={i} ref={setRingRef}>
                <ellipse
                  cx="600"
                  cy="600"
                  rx={rx}
                  ry={ry}
                  stroke="#E6EEFF"
                  strokeWidth="1"
                  opacity={0.85 - t * 0.55}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
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
