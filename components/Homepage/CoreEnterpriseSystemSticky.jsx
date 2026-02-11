"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    title: "Runtime Governance, Enforced by the Kernel",
    desc: "Governance is enforced in real time as AI executes, ensuring policies, validations, and approvals cannot be bypassed.",
  },
  {
    title: "Audit Trails That Can’t Be Skipped",
    desc: "Every decision, tool call, and approval is recorded automatically for compliance and traceability.",
  },
  {
    title: "Policy Controls at Execution Time",
    desc: "Define guardrails once and enforce them everywhere, across agents, models, and workflows.",
  },
  {
    title: "Enterprise-Grade Access & Approvals",
    desc: "Role-based controls and approval flows ensure the right people authorize the right actions.",
  },
];

/**
 * ✅ CUSTOM SNAP POINTS (0..1, ascending)
 * This only controls snapping behavior.
 * The index animation is scrubbed in the SAME timeline as content (so it feels identical).
 */
const SNAP_POINTS = [0.18, 0.4, 0.7, 0.99];

export default function CoreEnterpriseSystemSticky() {
  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // refs for mapped slides
  const titleRefs = useRef([]);
  const descRefs = useRef([]);

  // refs for mapped indices (1,2,3,... stacked like slides)
  const indexRefs = useRef([]);

  const setTitleRef = (el, i) => {
    if (el) titleRefs.current[i] = el;
  };

  const setDescRef = (el, i) => {
    if (el) descRefs.current[i] = el;
  };

  const setIndexRef = (el, i) => {
    if (el) indexRefs.current[i] = el;
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

      return () => {
        window.removeEventListener("scroll", onScroll);
        gsap.ticker.remove(tick);
        outerTL.kill();
        innerTL.kill();
      };
    },
    { scope: sectionRef }
  );

  // =========================
  // Content + Index animation (scrubbed together)
  // =========================
  useGSAP(
    () => {
      const titles = titleRefs.current;
      const descs = descRefs.current;
      const indices = indexRefs.current;

      if (!titles.length || !descs.length || !indices.length) return;

      const splits = [];

      // Split all indices once (no dynamic swapping, so it's stable & scrub-friendly)
      const indexSplits = indices.map((el) => {
        const s = new SplitText(el, { type: "chars", mask: "chars" });
        splits.push(s);
        return s;
      });

      // Split all titles/descs once
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

      // Set initial positions so everything is ready for "from" animations.
      // (We keep them all visible; movement controls what you see, like your content stack.)
      indexSplits.forEach((s) => gsap.set(s.chars, { yPercent: 100 }));
      titleSplits.forEach((s) => gsap.set(s.lines, { yPercent: 100 }));
      descSplits.forEach((s) => gsap.set(s.lines, { yPercent: 100 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "94% bottom",
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

      // Build steps per slide:
      // IN: title + desc + index come from below (yPercent 100 -> 0)
      // OUT: title + desc + index go up (0 -> -100) except last slide
      SLIDES.forEach((_, i) => {
        // IN
        tl.to(titleSplits[i].lines, {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.08,
        })
          .to(
            descSplits[i].lines,
            {
              yPercent: 0,
              duration: 0.6,
              stagger: 0.06,
            },
            "<"
          )
          .to(
            indexSplits[i].chars,
            {
              yPercent: 0,
              duration: 0.35,
              stagger: 0.05,
              ease: "power2.out",
            },
            "<+0.05"
          );

        // OUT (skip last)
        if (i !== SLIDES.length - 1) {
          tl.to(titleSplits[i].lines, {
            yPercent: -100,
            duration: 0.6,
            stagger: 0.08,
          })
            .to(
              descSplits[i].lines,
              {
                yPercent: -100,
                duration: 0.6,
                stagger: 0.06,
              },
              "<"
            )
            .to(
              indexSplits[i].chars,
              {
                yPercent: -100,
                duration: 0.35,
                stagger: 0.05,
                ease: "power2.in",
              },
              "<+0.05"
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
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="coreEnterprise"
      style={{ height: `${SLIDES.length * 100}vh` }}
      className="relative w-full bg-white flex justify-center mt-[-20vw] py-[25%] max-sm:mt-[-50vw]"
    >
      <div className="w-screen h-screen sticky top-0 max-sm:overflow-hidden">
        {/* Outer circle */}
        <div
          ref={outerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74vw] max-sm:w-[150vw]"
        >
          <Image src="/assets/homepage/dotted-circle.svg" alt="" width={1080} height={1080} />
        </div>

        {/* Inner circle */}
        <div
          ref={innerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-sm:w-[100vw]"
        >
          <Image src="/assets/homepage/dotted-circle.svg" alt="" width={1080} height={1080} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-[4vw] mt-[10vw] max-sm:mt-[30vw] max-sm:space-y-[7vw] max-sm:px-[7vw]">
          <HeadingAnim>
            <h2 className="text-76 mb-[7vw] max-sm:mb-[25vw] text-[#0A1B4B]">Run AI as a Core Enterprise System</h2>
          </HeadingAnim>

          {/* Slides stack (mapped) */}
          <div className="w-full h-fit relative">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`w-full h-fit space-y-[4vw] max-sm:space-y-[7vw] ${
                  i === 0 ? "relative" : "absolute top-0 left-1/2 -translate-x-1/2"
                }`}
              >
                <h3 ref={(el) => setTitleRef(el, i)} className="text-44 font-medium">
                  {slide.title}
                </h3>

                <p ref={(el) => setDescRef(el, i)} className="text-30 px-[30vw] mx-auto max-sm:px-0">
                  {slide.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination (index stacked + animated like content) */}
          <div className="text-[1.67vw] max-sm:text-[6.5vw] text-[#1727FF] relative flex mx-auto w-fit">
            <div className="relative w-[1.5vw] align-baseline max-sm:w-[6vw]">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => setIndexRef(el, i)}
                  className={`absolute ${i === 0 ? "" : ""}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>{" "}
            / {SLIDES.length}
          </div>
        </div>
      </div>
    </section>
  );
}
