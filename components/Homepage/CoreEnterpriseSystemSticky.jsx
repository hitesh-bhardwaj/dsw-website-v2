"use client";

import React, { useRef } from "react";
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

// Commit points (no snap)
const SNAP_POINTS = [0.18, 0.4, 0.7, 0.99];

export default function CoreEnterpriseSystemSticky() {
  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const coreEnterTitle = useRef(null);
  const wholeContent = useRef(null);

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

  // SplitText helper (ensures no nested wrappers)
  const safeSplit = (el, options) => {
    if (!el) return null;
    if (el._splitInstance?.revert) el._splitInstance.revert();
    const s = new SplitText(el, options);
    el._splitInstance = s;
    return s;
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        // --------------------------------
        // 1) Constant spin + scroll-boost (optimized)
        // --------------------------------
        const outer = outerRef.current;
        const inner = innerRef.current;

        let removeScroll = null;
        let removeTicker = null;

        if (outer && inner) {
          gsap.set([outer, inner], {
            transformOrigin: "50% 50%",
            willChange: "transform",
          });

          const outerTL = gsap.to(outer, {
            rotation: "+=360",
            duration: 80,
            ease: "none",
            repeat: -1,
          });

          const innerTL = gsap.to(inner, {
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

          // RAF throttle scroll sampling
          let raf = 0;
          const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
              raf = 0;
              const y = window.scrollY;
              const dy = Math.abs(y - lastY);
              lastY = y;
              boost = Math.min(boost + dy * SENS, MAX);
            });
          };

          const tick = () => {
            boost *= DECAY;
            const t = BASE + boost;
            outerTL.timeScale(t);
            innerTL.timeScale(t);
          };

          window.addEventListener("scroll", onScroll, { passive: true });
          gsap.ticker.add(tick);

          removeScroll = () => {
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
          };

          removeTicker = () => {
            gsap.ticker.remove(tick);
            outerTL.kill();
            innerTL.kill();
          };
        }

        // --------------------------------
        // 2) Title split + intro/outro + pagination
        //    Use matchMedia to avoid duplicated code
        // --------------------------------
        gsap.set(".pagination", { opacity: 0 });

        const titleSplit = safeSplit(coreEnterTitle.current, {
          type: "lines",
          linesClass: "Headingline++",
          lineThreshold: 0.1,
        });

        if (titleSplit?.lines?.length) {
          gsap.set(titleSplit.lines, { maskPosition: "100% 100%" });
        }

        // --------------------------------
        // 3) Slide stack split + scrub timeline (optimized)
        // --------------------------------
        const titles = titleRefs.current.filter(Boolean);
        const descs = descRefs.current.filter(Boolean);

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

        titleSplits.forEach((s) => s?.lines && gsap.set(s.lines, { yPercent: 100 }));
        descSplits.forEach((s) => s?.lines && gsap.set(s.lines, { yPercent: 100 }));

        // Pagination elements
        const group = [currRef.current, slashRef.current, totalRef.current].filter(Boolean);
        if (currRef.current) currRef.current.textContent = "1";
        if (totalRef.current) totalRef.current.textContent = String(SLIDES.length);
        if (group.length) gsap.set(group, { autoAlpha: 1, willChange: "opacity" });

        const buildSlidesTL = (start, end) => {
          const tl = gsap.timeline({
            defaults: { ease: "power1.inOut" },
            scrollTrigger: {
              trigger: section,
              start,
              end,
              scrub: true,
              invalidateOnRefresh: true,
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

          return tl;
        };

        const buildPaginationST = (start, end) => {
          if (!group.length) return null;

          let activeIndex = 0;
          const COMMIT_THRESHOLD = 0.06;
          const FADE_OUT = 0.18;
          const FADE_IN = 0.22;

          return ScrollTrigger.create({
            trigger: section,
            start,
            end,
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
                  .to(group, { autoAlpha: 0, duration: FADE_OUT, ease: "power2.out" })
                  .add(() => {
                    if (currRef.current) currRef.current.textContent = String(activeIndex + 1);
                    if (totalRef.current) totalRef.current.textContent = String(SLIDES.length);
                  })
                  .to(group, { autoAlpha: 1, duration: FADE_IN, ease: "power2.out" });
              }
            },
          });
        };

        const buildIntroOutro = (introStart, introEnd, outroStart, outroEnd, isDesktop) => {
          // Intro
          const intro = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: introStart,
              end: introEnd,
              scrub: true,
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
            .to(".pagination", { opacity: 1, duration: 1 }, "<");

          // Outro
          const outro = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: outroStart,
              end: outroEnd,
              scrub: true,
            },
          });

          if (isDesktop) {
            outro
              .to(wholeContent.current, { opacity: 0, duration: 0.4 })
              .to(".circle-container", {
                scale: 10,
                duration: 2,
                ease: "power1.in",
                delay: -0.2,
              });
          } else {
            outro
              .to(wholeContent.current, { opacity: 0, duration: 1 })
              .to(".circle-container", {
                opacity: 0,
                duration: 1,
                ease: "power1.in",
                delay: -0.2,
              });
          }

          return { intro, outro };
        };

        // --------------------------------
        // matchMedia = no duplicate code, handles resize refresh properly
        // --------------------------------
        const mm = ScrollTrigger.matchMedia({
          "(min-width: 1025px)": () => {
            buildSlidesTL("15% top", "75% bottom");
            buildPaginationST("15% top", "75% bottom");
            buildIntroOutro("top 10%", "40% top", "62% top", "75% top", true);
          },
          "(max-width: 1024px)": () => {
            buildSlidesTL("10% top", "75% bottom");
            buildPaginationST("10% top", "75% bottom");
            buildIntroOutro("top top", "30% top", "58% top", "70% top", false);
          },
        });

        // --------------------------------
        // Cleanup (critical)
        // --------------------------------
        return () => {
          // revert SplitText wrappers
          splits.forEach((s) => s?.revert?.());
          titleSplit?.revert?.();

          // remove boost/ticker
          removeScroll?.();
          removeTicker?.();

          // kill matchMedia handlers
          mm?.kill?.();

          // kill any lingering triggers in scope
          ScrollTrigger.getAll().forEach((t) => {
            // Only kill triggers that belong to this section
            if (t?.trigger === section) t.kill();
          });
        };
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

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
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74vw] max-sm:w-[150vw] max-md:w-[130vw]"
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
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-sm:w-[100vw] max-md:w-[90vw]"
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
          className="relative z-15 text-center space-y-[4vw] mt-[10vw] max-sm:mt-[30vw] max-md:mt-[45vw] max-sm:space-y-[7vw] max-sm:px-[7vw] max-md:px-[6vw] max-md:space-y-[7vw]"
        >
          <h2
            ref={coreEnterTitle}
            className="text-76 mb-[7vw] max-md:leading-[1.2] max-sm:leading-[1.4] max-sm:mb-[25vw] text-[#0A1B4B]"
          >
            Run AI as a Core Enterprise System
          </h2>

          {/* Slides stack */}
          <div className="w-full h-fit relative">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`w-full h-fit space-y-[4vw] max-sm:space-y-[7vw] max-md:space-y-[6vw] ${
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
                  className="text-30 px-[30vw] max-md:px-[10vw] mx-auto max-sm:px-0"
                >
                  {slide.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination mx-auto w-fit">
            <div className="text-[1.67vw] max-sm:text-[6.5vw] text-[#1727FF] relative flex mx-auto w-fit items-baseline max-md:text-[4vw]">
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
