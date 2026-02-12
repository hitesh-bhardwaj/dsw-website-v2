"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    title: "Runtime Governance, Enforced by the Kernel",
    desc: "Governance is enforced in real time as AI executes, ensuring policies, validations, and approvals cannot be bypassed.",
  },
  {
    title: "Agent-Safe by Design",
    desc: "Agentic workflows operate within enforced execution boundaries, enabling autonomy at scale with built-in guardrails.",
  },
  {
    title: "Built-in Auditability",
    desc: "Every AI action is automatically logged, traced, and explainable, creating a continuous audit trail without additional tooling.",
  },
  {
    title: "Traceability and Reversibility is Native",
    desc: "Traceability and reversibility are native, providing end-to-end lineage and safe rollback across AI decisions, models, and agent workflows.",
  },
];

/**
 * ✅ CUSTOM SNAP POINTS (0..1, ascending)
 * Controls snapping behavior only.
 */
const SNAP_POINTS = [0.18, 0.4, 0.7, 0.99];

export default function CoreEnterpriseSystemSticky() {
  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const coreEnterTitle = useRef(null);
  const wholeContent = useRef(null);

  // mapped slide content refs
  const titleRefs = useRef([]);
  const descRefs = useRef([]);

  // ✅ single pagination refs (fade only)
  const currRef = useRef(null);
  const slashRef = useRef(null);
  const totalRef = useRef(null);

  const setTitleRef = (el, i) => {
    if (el) titleRefs.current[i] = el;
  };
  const setDescRef = (el, i) => {
    if (el) descRefs.current[i] = el;
  };

  // =========================
  // Scroll intensity spin (circles)
  // =========================
  useGSAP(
    () => {
      gsap.set([outerRef.current, innerRef.current], {
        transformOrigin: "50% 50%",
        willChange: "transform",
      });

      const outerTL = gsap.to(outerRef.current, {
        rotation: "+=360",
        duration: 80,
        ease: "none",
        repeat: -1,
      });

      const innerTL = gsap.to(innerRef.current, {
        rotation: "-=360",
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      const BASE = 0.35;
      const MAX = 8;
      const SENS = 0.08;
      const DECAY = 0.88;

      outerTL.timeScale(BASE);
      innerTL.timeScale(BASE);

      let boost = 0;
      let lastY = typeof window !== "undefined" ? window.scrollY : 0;

      const tick = () => {
        boost *= DECAY;
        const t = BASE + boost;
        outerTL.timeScale(t);
        innerTL.timeScale(t);
      };

      gsap.ticker.add(tick);

      const onScroll = () => {
        const y = window.scrollY;
        const dy = Math.abs(y - lastY);
        lastY = y;
        boost = Math.min(boost + dy * SENS, MAX);
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        gsap.ticker.remove(tick);
        outerTL.kill();
        innerTL.kill();
      };
    },
    { scope: sectionRef },
  );

  // =========================
  // Content animation (scrubbed)
  // ✅ Titles + Descs = yPercent lines
  // ❌ Pagination removed from this timeline
  // =========================
  useGSAP(
    () => {
      const titles = titleRefs.current;
      const descs = descRefs.current;

      if (!titles.length || !descs.length) return;

      const splits = [];

      const titleSplits = titles.map((el) => {
        const s = new SplitText(el, { type: "lines", mask: "lines" });
        splits.push(s);
        return s;
      });

      const descSplits = descs.map((el) => {
        const s = new SplitText(el, { type: "lines", mask: "lines" });
        splits.push(s);
        return s;
      });

      // Initial states (content stack style)
      titleSplits.forEach((s) => gsap.set(s.lines, { yPercent: 100 }));
      descSplits.forEach((s) => gsap.set(s.lines, { yPercent: 100 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "15% top",
          end: "75% bottom",
          scrub: true,
          // markers: true,
          snap: {
            snapTo: SNAP_POINTS,
            duration: { min: 0.15, max: 0.45 },
            ease: "power2.out",
            delay: 0.05,
          },
        },
        defaults: { ease: "power1.inOut" },
      });

      SLIDES.forEach((_, i) => {
        // IN
        tl.to(titleSplits[i].lines, {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.08,
        }).to(
          descSplits[i].lines,
          {
            yPercent: 0,
            duration: 0.6,
            stagger: 0.06,
          },
          "<",
        );

        // OUT (skip last)
        if (i !== SLIDES.length - 1) {
          tl.to(titleSplits[i].lines, {
            yPercent: -100,
            duration: 0.6,
            stagger: 0.08,
          }).to(
            descSplits[i].lines,
            {
              yPercent: -100,
              duration: 0.6,
              stagger: 0.06,
            },
            "<",
          );
        }
      });

      return () => {
        splits.forEach((s) => s?.revert?.());
        ScrollTrigger.getAll().forEach((st) => {
          if (st?.vars?.trigger === sectionRef.current) st.kill();
        });
      };
    },
    { scope: sectionRef },
  );

  // =========================
  // ✅ Pagination: fade in/out on snap commits
  // - Smooth cross-fade for: current, "/", total
  // - Updates only when close to nearest snap point (prevents flicker)
  // =========================
  useGSAP(
    () => {
      if (!currRef.current || !slashRef.current || !totalRef.current) return;

      const group = [currRef.current, slashRef.current, totalRef.current];

      gsap.set(group, { autoAlpha: 1, willChange: "opacity" });

      // initialize visible values
      currRef.current.textContent = "1";
      totalRef.current.textContent = String(SLIDES.length);

      let activeIndex = 0;

      const COMMIT_THRESHOLD = 0.06; // tune 0.04..0.08
      const FADE_OUT = 0.18;
      const FADE_IN = 0.22;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "15% top",
        end: "75% bottom",
        onUpdate(self) {
          const p = self.progress;

          // find nearest snap point index
          let nearest = 0;
          let best = Infinity;

          for (let i = 0; i < SNAP_POINTS.length; i++) {
            const d = Math.abs(p - SNAP_POINTS[i]);
            if (d < best) {
              best = d;
              nearest = i;
            }
          }

          // commit only near a snap point
          if (best <= COMMIT_THRESHOLD && nearest !== activeIndex) {
            activeIndex = nearest;

            gsap
              .timeline({ overwrite: true })
              .to(group, {
                autoAlpha: 0,
                duration: FADE_OUT,
                ease: "power2.out",
              })
              .add(() => {
                // swap only current index; "/" and total stay same but still fade for smoothness
                currRef.current.textContent = String(activeIndex + 1);
                totalRef.current.textContent = String(SLIDES.length);
              })
              .to(group, {
                autoAlpha: 1,
                duration: FADE_IN,
                // delay:0.3,
                ease: "power2.out",
              });
          }
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  // =========================
  // Title + circles intro anim
  // =========================
  useGSAP(
    () => {
      if (!coreEnterTitle.current) return;
      gsap.set(".pagination", {
        opacity: 0,
      });
      const titleEl = new SplitText(coreEnterTitle.current, {
        type: "lines",
        linesClass: "Headingline++",
        lineThreshold: 0.1,
      });

      gsap.set(titleEl.lines, { maskPosition: "100% 100%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "5% top",
          end: "40% top",
          scrub: true,
          // markers: true,
        },
      });

      tl.from(outerRef.current, {
        opacity: 0,
        scale: 0.9,
        ease: "power1.out",
        duration: 1.2,
      })
        .from(
          innerRef.current,
          {
            opacity: 0,
            scale: 0.9,
            ease: "power1.out",
            duration: 1.2,
          },
          "<",
        )
        .to(titleEl.lines, {
          maskPosition: "0% 100%",
          stagger: 0.2,
          // duration: 5.5,
          delay: 0.1,
          duration: 3,
          ease: "power3.out",
        })
        .to(".pagination", {
          opacity: 1,
          
          duration: 1,
        },"<");

      const bl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "58% top",
          end: "80% top",
          scrub: true,
          // markers: true,

        },
        
      });
      bl.to(wholeContent.current, {
        opacity: 0,
        duration:0.4
      })
        .to(
          outerRef.current,
          {
            scale: 5,
           duration:2,
           ease:"power1.in"
          },
          "<",
        )
        .to(
          innerRef.current,
          {
            scale: 5,
            duration:2,
            ease:"power1.in"
          },
          "<",
        )
        

      return () => {
        titleEl?.revert?.();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="coreEnterprise"
      style={{ height: `${SLIDES.length * 150}vh` }}
      className="relative w-full bg-white flex justify-center mt-[-100vh] max-sm:mt-[-50vw] z-[2]"
    >
      <div className="w-screen h-screen sticky top-0 overflow-hidden">
        {/* Outer circle */}
        <div
          ref={outerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74vw] max-sm:w-[150vw]"
        >
          <Image
            src="/assets/homepage/dotted-circle.svg"
            alt=""
            width={1080}
            height={1080}
          />
        </div>

        {/* Inner circle */}
        <div
          ref={innerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-sm:w-[100vw]"
        >
          <Image
            src="/assets/homepage/dotted-circle.svg"
            alt=""
            width={1080}
            height={1080}
          />
        </div>

        {/* Content */}
        <div
          ref={wholeContent}
          className="relative z-10 text-center space-y-[4vw] mt-[10vw] max-sm:mt-[30vw] max-sm:space-y-[7vw] max-sm:px-[7vw]"
        >
          <h2
            ref={coreEnterTitle}
            className="text-76 mb-[7vw] max-sm:mb-[25vw] text-[#0A1B4B]"
          >
            Run AI as a Core Enterprise System
          </h2>

          {/* Slides stack (mapped) */}
          <div className="w-full h-fit relative">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`w-full h-fit space-y-[4vw] max-sm:space-y-[7vw] ${
                  i === 0
                    ? "relative"
                    : "absolute top-0 left-1/2 -translate-x-1/2"
                }`}
              >
                <h3
                  ref={(el) => setTitleRef(el, i)}
                  className="text-44 font-medium"
                >
                  {slide.title}
                </h3>

                <p
                  ref={(el) => setDescRef(el, i)}
                  className="text-30 px-[30vw] mx-auto max-sm:px-0"
                >
                  {slide.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ Pagination (fade only) */}
          <div className="pagination mx-auto w-fit">
            <div className="text-[1.67vw] max-sm:text-[6.5vw] text-[#1727FF] relative flex mx-auto w-fit items-baseline">
              <span ref={currRef} className="inline-block">
                1
              </span>
              <span
                ref={slashRef}
                className="inline-block mx-[0.4vw] max-sm:mx-[1.2vw]"
              >
                /
              </span>
              <span ref={totalRef} className="inline-block">
                {SLIDES.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
