"use client";
import React, { useRef, useState } from "react";
import { Circle } from "../Svg/Lines/Circle";
import { Connect } from "../Svg/Connect";
import { Build } from "../Svg/Build";
import { Operate } from "../Svg/Operate";
import { Orchestrate } from "../Svg/Orchestrate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Image from "next/image";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger, SplitText);

const iconData = [
  {
    key: "connect",
    icon: Connect,
    label: "Connect",
    text: "Ingest enterprise data through managed connectors and DataOps pipelines.",
    textClass: "absolute left-25 top-30  space-y-[0.6vw]",
  },
  {
    key: "build",
    icon: Build,
    label: "Build",
    text: "Author and test agents in AgenticAI Studio (fine-tune, simulate, validate).",
    textClass: "absolute right-20 top-30  space-y-[0.6vw]",
  },
 
  {
    key: "orchestrate",
    icon: Orchestrate,
    label: "Orchestrate",
    text: "Compose agents, models and enterprise logic into auditable workflows using Workflow Builder.",
    textClass: "absolute right-20 bottom-25 space-y-[0.6vw]",
  },
   {
    key: "operate",
    icon: Operate,
    label: "Operate",
    text: "Enforce runtime policies, monitor telemetry, and maintain immutable audit trails and reports.",
    textClass: "absolute left-25 bottom-25  space-y-[0.6vw]",
  },
];

const HowAgenticWorks = () => {
  const [activeItem, setActiveItem] = useState("connect");
  const [hovered, setHovered] = useState(null);

  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const blueCircleWrapRef = useRef(null);

  const textBlockRefs = useRef([]); // SplitText targets
  const cardRefs = useRef([]); // inner "bg-card-bg" circles

  useGSAP(
    () => {
      /* =========================
         Scroll intensity spin
      ========================= */
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

      /* =========================
         Draw blue circle on scroll
      ========================= */
      const circleEl =
        blueCircleWrapRef.current?.querySelector("circle") || null;

      let drawTween;
      if (circleEl) {
        const len = circleEl.getTotalLength();
        gsap.set(circleEl, { strokeDasharray: len, strokeDashoffset: len });

        drawTween = gsap.to(circleEl, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 80%",
            scrub: true,
            // markers: true,
          },
        });
      }

      /* =========================
         SplitText reveal + active color logic
         - reveal motion unchanged (yPercent 100 -> 0)
         - only one is blue at a time
         - last TEXT stays blue always
         - card BG animates normally (NO permanent last card bg)
      ========================= */
      const PRIMARY_BLUE = "#1727ff";
      const INACTIVE = "#111111";

      const splits = textBlockRefs.current.map((el) => {
        if (!el) return null;
        return new SplitText(el, { type: "lines", mask: "lines" });
      });

      splits.forEach((split) => {
        if (!split) return;
        gsap.set(split.lines, { yPercent: 100, opacity: 1 });
        gsap.set(split.lines, { color: INACTIVE });
      });

      // baseline card bg (so we can return to it)
      const baseCardBg = cardRefs.current[0]
        ? window.getComputedStyle(cardRefs.current[0]).backgroundColor
        : null;

      if (baseCardBg) {
        cardRefs.current.forEach(
          (c) => c && gsap.set(c, { backgroundColor: baseCardBg }),
        );
      }

      const lastIdx = splits.length - 1;

      // last TEXT should be blue always (but we won't force last card bg)
      if (splits[lastIdx] && globalThis.innerWidth > 1024)
        gsap.set(splits[lastIdx].lines, { color: PRIMARY_BLUE });

      const revealTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom bottom",
          scrub: true,
          // markers: true,
        },
      });

      textBlockRefs.current.forEach((_, i) => {
        const split = splits[i];
        const card = cardRefs.current[i];
        if (!split) return;

        const at = i;

        // deactivate previous at the moment this step starts
        if (i > 0) {
          const prevSplit = splits[i - 1];
          const prevCard = cardRefs.current[i - 1];

          // 🔻 do NOT deactivate the last TEXT (it must always be blue)
          if (i - 1 !== lastIdx && prevSplit) {
            if (globalThis.innerWidth > 1024) {
              revealTL.to(
                prevSplit.lines,
                { color: INACTIVE, duration: 0.2, ease: "none" },
                at,
              );
            } else {
              revealTL.to(
                prevSplit.lines,
                { opacity: 0, duration: 0.2, ease: "none" },
                at,
              );
            }
          }
        }

        // activate current text (if current is last, it’s already blue but ok)
        if (globalThis.innerWidth > 1024) {
          revealTL.to(
            split.lines,
            { color: PRIMARY_BLUE, duration: 0.2, ease: "none" },
            at,
          );
        }

        // card bg active (normal behavior, last card is NOT permanent)
        if (baseCardBg && card) {
          revealTL.to(
            card,
            { color: PRIMARY_BLUE, duration: 0.2, ease: "none" },
            at,
          );
        }

        // reveal motion (UNCHANGED)
        revealTL.to(
          split.lines,
          {
            yPercent: 0,
            stagger: 0.03,
            ease: "power2.out",
            duration: 1,
          },
          at,
        );
      });

      return () => {
        revealTL.kill();
        splits.forEach((s) => s?.revert());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-[7%] h-[400vh]  max-md:w-full max-md:py-[15%]"
    >
      <div className="w-screen h-screen py-[10%] sticky top-0 max-md:overflow-hidden max-md:top-[-3%]">
        <div
          ref={outerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] max-md:w-[120vw] max-sm:w-[160vw] h-auto"
        >
          <Image
            src="/assets/homepage/dotted-circle.svg"
            alt="Dotted circle"
            width={1080}
            height={1080}
            className="h-full w-full opacity-35"
          />
        </div>

        <div
          ref={innerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-md:w-[100vw] max-sm:w-[120vw] h-auto"
        >
          <Image
            src="/assets/homepage/inner-circle.svg"
            alt="Inner Circle"
            width={1080}
            height={1080}
          />
        </div>

        {/* TEXTS - Desktop only */}
        {iconData.map((item, idx) => (
          <div
            key={item.key + "-text"}
            className={`${item.textClass} max-md:top-[80%] w-[25%] max-md:w-[70%] max-sm:w-[75%] max-md:left-[12%] text-primary-blue`}
            ref={(el) => (textBlockRefs.current[idx] = el)}
          >
            <div className="flex max-md:mb-[5vw]">
              <h3 className="flex items-center gap-[0.5vw] max-md:text-primary-blue">
                <span className="w-1.5 h-1.5 mr-2 bg-current" />
                <span className="text-44">{item.label}</span>
              </h3>
            </div>
            <p className="text-24 max-sm:text-24 max-md:text-[2.4vw] leading-[1.2] mt-[0.6vw]">{item.text}</p>
          </div>
        ))}

        {/* CENTER DIAGRAM */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-[42vw] h-[42vw] max-md:w-[70vw] max-sm:h-[70vh] max-md:h-[70vw]">
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <HeadingAnim>
              <h2 className="text-56 ">
                How AgenticAI <br /> runtime works
              </h2>
            </HeadingAnim>
          </div>

          <div className="w-full h-full relative">
            {/* ICONS */}
            {iconData.map((item, idx) => {
              const IconComp = item.icon;
              const isActive = activeItem === item.key;
              const isHovered = hovered === item.key;
              const iconColor = isHovered || isActive ? "#2563eb" : "#000";

              const pos = [
                "absolute top-24 left-15 max-md:top-[10%] max-md:left-[-2%] max-sm:top-[25%] max-sm:left-[-10%]",
                "absolute top-22 right-15 max-md:top-[10%] max-md:right-[-2%] max-sm:top-[25%] max-sm:right-[-10%]",
                "absolute bottom-22 right-15 max-md:bottom-[10%] max-md:right-[-2%] max-sm:bottom-[25%] max-sm:right-[-10%]",
                "absolute bottom-22 left-15 max-md:bottom-[10%] max-md:left-[-2%] max-sm:bottom-[25%] max-sm:left-[-10%]",
              ];

              return (
                <div
                  key={item.key + "-icon"}
                  className={`${pos[idx]} z-2 rounded-full border bg-white border-primary-blue p-[0.3vw] flex items-center justify-center cursor-pointer max-md:p-[1vw]`}
                  onMouseEnter={() => setHovered(item.key)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    ref={(el) => (cardRefs.current[idx] = el)}
                    className="border-primary-blue p-[1.5vw] rounded-full bg-card-bg border"
                  >
                    <IconComp
                      className="w-[4vw] h-[4vw] transition-all duration-200 ease-in max-md:h-[12vw] max-md:w-[12vw] max-sm:w-[15vw] max-sm:h-[15vw] max-sm:p-[2.5vw] max-md:p-[2vw]"
                      color={iconColor}
                    />
                  </div>
                </div>
              );
            })}

            <Circle className="absolute inset-0 w-[35vw] h-auto m-auto z-0 max-md:w-[70vw] max-sm:w-[90vw] max-sm:left-[-15%] opacity-20" />

            <div
              ref={blueCircleWrapRef}
              className="absolute inset-0 w-[35vw] h-auto m-auto z-0 max-md:w-[80vw] max-sm:w-[90vw] max-md:left-[-7%] max-sm:left-[-15%] text-primary-blue blue-fill-circle rotate-[220deg]"
            >
              <svg
                className="w-full h-full"
                width="672"
                height="672"
                viewBox="0 0 672 672"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="336"
                  cy="336"
                  r="335.25"
                  strokeWidth="1.5"
                  className="stroke-current"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowAgenticWorks;
