"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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
 * Only used for pagination "commit" detection (no snap).
 */
const SNAP_POINTS = [0.18, 0.4, 0.7, 0.99];

export default function CoreEnterpriseSystemSticky() {
  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const coreEnterTitle = useRef(null);
  const wholeContent = useRef(null);
  const [mob, setMob] = useState(false);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);

  const currRef = useRef(null);
  const slashRef = useRef(null);
  const totalRef = useRef(null);

  const setTitleRef = (el, i) => {
    if (el) titleRefs.current[i] = el;
  };
  const setDescRef = (el, i) => {
    if (el) descRefs.current[i] = el;
  };

  // Helper: split safely (prevents nested SplitText wrappers)
  const safeSplit = (el, options) => {
    if (!el) return null;
    if (el._splitInstance?.revert) el._splitInstance.revert();
    const s = new SplitText(el, options);
    el._splitInstance = s;
    return s;
  };

  // =========================
  // Scroll intensity spin (circles) - ROBUST
  // =========================
  useGSAP(() => {
    if (!outerRef.current || !innerRef.current) return;

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
    let lastY = window.scrollY;

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
  });

  // =========================
  // Content animation (scrubbed) - ROBUST
  // ✅ Titles + Descs = yPercent lines
  // ✅ NO snap
  // =========================
  useGSAP(() => {
    const titles = titleRefs.current.filter(Boolean);
    const descs = descRefs.current.filter(Boolean);

    if (!titles.length || !descs.length) return;

    const splits = [];

    const titleSplits = titles.map((el) => {
      const s = safeSplit(el, { type: "lines", mask: "lines" });
      if (s) splits.push(s);
      return s;
    });

    const descSplits = descs.map((el) => {
      const s = safeSplit(el, { type: "lines", mask: "lines" });
      if (s) splits.push(s);
      return s;
    });

    // Initial states
    titleSplits.forEach(
      (s) => s?.lines && gsap.set(s.lines, { yPercent: 100 }),
    );
    descSplits.forEach((s) => s?.lines && gsap.set(s.lines, { yPercent: 100 }));
    if (globalThis.innerWidth > 1024) {
      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "15% top",
          end: "75% bottom",
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
      SLIDES.forEach((_, i) => {
        const tS = titleSplits[i];
        const dS = descSplits[i];
        if (!tS?.lines || !dS?.lines) return;

        tl.to(tS.lines, { yPercent: 0, duration: 0.6, stagger: 0.08 }).to(
          dS.lines,
          { yPercent: 0, duration: 0.6, stagger: 0.06 },
          "<",
        );

        if (i !== SLIDES.length - 1) {
          tl.to(tS.lines, { yPercent: -100, duration: 0.6, stagger: 0.08 }).to(
            dS.lines,
            { yPercent: -100, duration: 0.6, stagger: 0.06 },
            "<",
          );
        }
      });
    } else {
      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "75% bottom",
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
      SLIDES.forEach((_, i) => {
        const tS = titleSplits[i];
        const dS = descSplits[i];
        if (!tS?.lines || !dS?.lines) return;

        tl.to(tS.lines, { yPercent: 0, duration: 0.6, stagger: 0.08 }).to(
          dS.lines,
          { yPercent: 0, duration: 0.6, stagger: 0.06 },
          "<",
        );

        if (i !== SLIDES.length - 1) {
          tl.to(tS.lines, { yPercent: -100, duration: 0.6, stagger: 0.08 }).to(
            dS.lines,
            { yPercent: -100, duration: 0.6, stagger: 0.06 },
            "<",
          );
        }
      });
    }
  });

  // =========================
  // Pagination: fade commit near key points - ROBUST
  // =========================
  useGSAP(() => {
    if (!currRef.current || !slashRef.current || !totalRef.current) return;

    const group = [currRef.current, slashRef.current, totalRef.current];

    gsap.set(group, { autoAlpha: 1, willChange: "opacity" });

    currRef.current.textContent = "1";
    totalRef.current.textContent = String(SLIDES.length);

    let activeIndex = 0;

    const COMMIT_THRESHOLD = 0.06;
    const FADE_OUT = 0.18;
    const FADE_IN = 0.22;
    if (globalThis.innerWidth > 1024) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "15% top",
        end: "75% bottom",
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;

          let nearest = 0;
          let best = Infinity;

          for (let i = 0; i < SNAP_POINTS.length; i++) {
            const d = Math.abs(p - SNAP_POINTS[i]);
            if (d < best) {
              best = d;
              nearest = i;
            }
          }

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
                currRef.current.textContent = String(activeIndex + 1);
                totalRef.current.textContent = String(SLIDES.length);
              })
              .to(group, {
                autoAlpha: 1,
                duration: FADE_IN,
                ease: "power2.out",
              });
          }
        },
      });
    } else {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "10% top",
        end: "75% bottom",
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;

          let nearest = 0;
          let best = Infinity;

          for (let i = 0; i < SNAP_POINTS.length; i++) {
            const d = Math.abs(p - SNAP_POINTS[i]);
            if (d < best) {
              best = d;
              nearest = i;
            }
          }

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
                currRef.current.textContent = String(activeIndex + 1);
                totalRef.current.textContent = String(SLIDES.length);
              })
              .to(group, {
                autoAlpha: 1,
                duration: FADE_IN,
                ease: "power2.out",
              });
          }
        },
      });
    }
  });

  // =========================
  // Title + circles intro anim + end fade/scale - ROBUST
  // =========================
  useGSAP(() => {
    gsap.set(".pagination", { opacity: 0 });

    const titleSplit = safeSplit(coreEnterTitle.current, {
      type: "lines",
      linesClass: "Headingline++",
      lineThreshold: 0.1,
    });

    if (titleSplit?.lines) {
      gsap.set(titleSplit.lines, { maskPosition: "100% 100%" });
    }
    if (globalThis.innerWidth > 1024) {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          end: "40% top",
          scrub: true,
          // markers: true,
        },
      });
      gsap.set(".circle-container", { opacity: 0, scale: 0.9 });
      intro
        .to(".circle-container", {
          opacity: 1,
          scale: 1,
          ease: "power1.out",
          duration: 1.2,
        })
        .to(titleSplit?.lines || [], {
          maskPosition: "0% 100%",
          stagger: 0.2,
          delay: 0.1,
          duration: 3,
          ease: "power3.out",
        })
        .to(
          ".pagination",
          {
            opacity: 1,
            duration: 1,
          },
          "<",
        );

      const outro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "62% top",
          end: "75% top",
          scrub: true,
        },
      });

      outro
        .to(wholeContent.current, { opacity: 0, duration: 0.4 })
        .to(".circle-container", {
          scale: 10,
          duration: 2,
          ease: "power1.in",
          delay: -0.2,
        });
    } else {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "30% top",
          scrub: true,
          // markers: true,
        },
      });

      intro
        .from(".circle-container", {
          opacity: 0,
          scale: 0.9,
          ease: "power1.out",
          duration: 1.2,
        })
        // .from(
        //   innerRef.current,
        //   {
        //     opacity: 0,
        //     scale: 0.9,
        //     ease: "power1.out",
        //     duration: 1.2,
        //   },
        //   "<"
        // )
        .to(titleSplit?.lines || [], {
          maskPosition: "0% 100%",
          stagger: 0.2,
          delay: 0.1,
          duration: 3,
          ease: "power3.out",
        })
        .to(
          ".pagination",
          {
            opacity: 1,
            duration: 1,
          },
          "<",
        );

      const outro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "58% top",
          end: "70% top",
          scrub: true,
          //  markers:true,
        },
      });

      outro
        .to(wholeContent.current, { opacity: 0, duration: 1 })
        .to(".circle-container", {
          opacity: 0,
          duration: 1,
          ease: "power1.in",
          delay: -0.2,
        });
    }
  });

  return (
    <section
      ref={sectionRef}
      id="coreEnterprise"
      style={{ height: `${SLIDES.length * 150}vh` }}
      className="relative w-screen bg-white flex justify-center z-[2] mt-[-50vh]"
    >
      <div className="w-screen h-screen sticky top-0 overflow-hidden circle-container">
        {/* Outer circle */}
        <div className="w-screen h-screen absolute overflow-hidden ">
          <div
            ref={outerRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74vw] max-sm:w-[150vw]"
          >
            <Image
              src="/assets/homepage/dotted-circle.svg"
              alt="circle-img"
              className="w-full h-full"
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
              src="/assets/homepage/inner-circle.svg"
              alt="circle-img"
              className="w-full h-full"
              width={1080}
              height={1080}
            />
          </div>
        </div>

        {/* Content */}
        <div
          ref={wholeContent}
          className="relative z-15 text-center space-y-[4vw] mt-[10vw] max-sm:mt-[30vw] max-sm:space-y-[7vw] max-sm:px-[7vw]"
        >
          <h2
            ref={coreEnterTitle}
            className="text-76 mb-[7vw] max-sm:mb-[25vw] text-[#0A1B4B]"
          >
            Run AI as a Core Enterprise System
          </h2>

          {/* Slides stack */}
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
                  className="text-44 font-medium text-[#0A1B4B]"
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

          {/* Pagination (fade only) */}
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
