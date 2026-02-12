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
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const iconData = [
  {
    key: "connect",
    icon: Connect,
    label: "Connect",
    text: "Ingest enterprise data through managed connectors and DataOps pipelines.",
    textClass:
      "absolute left-25 top-2 max-w-[25vw] space-y-[0.6vw] fadeup",
  },
  {
    key: "build",
    icon: Build,
    label: "Build",
    text: "Author and test agents in AgenticAI Studio (fine-tune, simulate, validate).",
    textClass:
      "absolute right-20 top-2 max-w-[25vw] space-y-[0.6vw] fadeup",
  },
  {
    key: "operate",
    icon: Operate,
    label: "Operate",
    text: "Enforce runtime policies, monitor telemetry, and maintain immutable audit trails and reports.",
    textClass:
      "absolute left-25 bottom-25 max-w-[25vw] space-y-[0.6vw] fadeup",
  },
  {
    key: "orchestrate",
    icon: Orchestrate,
    label: "Orchestrate",
    text: "Compose agents, models and enterprise logic into auditable workflows using Workflow Builder.",
    textClass:
      "absolute right-20 bottom-25 space-y-[0.6vw] max-w-[25vw] fadeup",
  },
];

const HowAgenticWorks = () => {
  // ✅ default active = connect on first load
  const [activeItem, setActiveItem] = useState("connect");

  // hover is only for instant hover feedback, but active persists
  const [hovered, setHovered] = useState(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const contentRef = useRef(null);

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

      return () => {
        window.removeEventListener("scroll", onScroll);
        gsap.ticker.remove(tick);
        outerTL.kill();
        innerTL.kill();
      };
    },
    { scope: sectionRef }
  );

  // ✅ Use this for click / hover activation (with mobile fade animation)
  const handleActivate = (key) => {
    if (key === activeItem || isTransitioning) return;

    // On desktop you might not *need* the animation, but it's fine to keep.
    // It will run only when contentRef exists (mobile section is mounted).
    if (!contentRef.current) {
      setActiveItem(key);
      return;
    }

    setIsTransitioning(true);

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setActiveItem(key);

        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => setIsTransitioning(false),
          }
        );
      },
    });
  };

  const currentActiveItem = iconData.find((item) => item.key === activeItem);

  return (
    <section
      ref={sectionRef}
      className="py-[7%] max-sm:px-[7vw] max-sm:h-[95vh] max-sm:w-full  max-sm:overflow-x-hidden max-sm:overflow-y-visible max-sm:py-[15%]"
    >
      <div className="relative w-full h-full py-[10%]">
        <div
          ref={outerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-sm:w-[160vw] h-auto"
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] max-sm:w-[120vw] h-auto"
        >
          <Image
            src="/assets/homepage/dotted-circle.svg"
            alt=""
            width={1080}
            height={1080}
          />
        </div>

        {/* TEXTS - Desktop only */}
        {iconData.map((item) => {
          const isHighlighted = hovered === item.key || activeItem === item.key;

          return (
            <div
              key={item.key + "-text"}
              className={`${item.textClass} max-sm:hidden`}
            >
              <div className="flex">
                <h3 className="flex items-center gap-[0.5vw]">
                  <span
                    className={`w-2 h-2 mr-2 transition-colors duration-300 ${
                      isHighlighted ? "bg-primary-blue" : "bg-black"
                    }`}
                  ></span>

                  <span
                    className={`text-44 transition-colors duration-300 ease-in ${
                      isHighlighted ? "text-primary-blue" : "text-black"
                    }`}
                  >
                    {item.label}
                  </span>
                </h3>
              </div>

              <p
                className={`text-24 leading-[1.2] transition-colors duration-300 mt-[0.6vw] ease-in ${
                  isHighlighted ? "text-primary-blue" : "text-black"
                }`}
              >
                {item.text}
              </p>
            </div>
          );
        })}

        {/* CENTER DIAGRAM */}
        <div className="relative mx-auto w-[42vw] h-[42vw] max-sm:w-[70vw] max-sm:h-[70vh]">
          {/* center text */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <h2 className="text-56 leading-[1.1]">
              How AgenticAI <br /> runtime works
            </h2>
          </div>

          <div className="w-full h-full relative">
            {/* ICONS */}
            {iconData.map((item, idx) => {
              const IconComp = item.icon;

              const isActive = activeItem === item.key;
              const isHovered = hovered === item.key;

              // hover OR active turns blue
              const iconColor = isHovered || isActive ? "#2563eb" : "#000";

              const pos = [
                "absolute top-22 left-15 max-sm:top-[25%] max-sm:left-[-10%]",
                "absolute top-22 right-15 max-sm:top-[25%] max-sm:right-[-10%]",
                "absolute bottom-22 left-15 max-sm:bottom-[25%] max-sm:left-[-10%]",
                "absolute bottom-22 right-15 max-sm:bottom-[25%] max-sm:right-[-10%]",
              ];

              return (
                <div
                  key={item.key + "-icon"}
                  className={`${pos[idx]} z-2 rounded-full border bg-white border-primary-blue p-[0.3vw] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in`}
                  onMouseEnter={() => {
                    setHovered(item.key);
                    // ✅ last hovered becomes active (persists after mouse leave)
                    handleActivate(item.key);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleActivate(item.key)} // keep click too
                >
                  <div
                    className={`border-primary-blue p-[1.5vw] rounded-full bg-card-bg transition-all duration-200 ease-in ${
                      isHovered || isActive
                        ? "text-primary-blue drop-shadow-2xl border-2"
                        : "text-[#111111] border"
                    }`}
                  >
                    <IconComp
                      className="w-[4vw] h-[4vw] transition-all duration-200 ease-in max-sm:w-[10vw] max-sm:h-[10vw]"
                      color={iconColor}
                    />
                  </div>
                </div>
              );
            })}

            {/* mid circle */}
            <Circle className="absolute inset-0 w-[35vw] h-auto m-auto z-0 max-sm:w-[90vw] max-sm:left-[-15%]" />
          </div>
        </div>

        {/* MOBILE CONTENT - Below diagram */}
        <div className="hidden max-sm:block max-sm:absolute max-sm:top-[88%] px-4">
          {currentActiveItem && (
            <div ref={contentRef} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-blue"></span>
                <h3 className="text-44 text-primary-blue">
                  {currentActiveItem.label}
                </h3>
              </div>
              <p className="text-24">{currentActiveItem.text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowAgenticWorks;
