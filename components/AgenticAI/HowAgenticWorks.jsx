"use client"
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
    key: 'connect',
    icon: Connect,
    label: 'Connect',
    text: 'Ingest enterprise data through managed connectors and DataOps pipelines.',
    textClass: 'absolute left-25 top-2 max-w-[25vw] space-y-[0.6vw]'
  },
  {
    key: 'build',
    icon: Build,
    label: 'Build',
    text: 'Author and test agents in AgenticAI Studio (fine-tune, simulate, validate).',
    textClass: 'absolute right-20 top-2 max-w-[25vw] space-y-[0.6vw]'
  },
  {
    key: 'operate',
    icon: Operate,
    label: 'Operate',
    text: 'Enforce runtime policies, monitor telemetry, and maintain immutable audit trails and reports.',
    textClass: 'absolute left-25 bottom-25 max-w-[25vw] space-y-[0.6vw]'
  },
  {
    key: 'orchestrate',
    icon: Orchestrate,
    label: 'Orchestration',
    text: 'Compose agents, models and enterprise logic into auditable workflows using Workflow Builder.',
    textClass: 'absolute right-20 bottom-25 space-y-[0.6vw] max-w-[25vw]'
  },
];

const HowAgenticWorks = () => {
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
    const outerRef = useRef(null);
    const innerRef = useRef(null);


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
        loopCall?.kill?.();
        revertSplits();
        window.removeEventListener("scroll", onScroll);
        gsap.ticker.remove(tick);
        outerTL.kill();
        innerTL.kill();
      };
    },
    { scope: sectionRef }
  );
  return (
    <section className="pb-[10%] py-[4%]">
      <div className="relative w-full py-[10%]">
         <div ref={outerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-auto">
                <Image src="/assets/homepage/dotted-circle.svg" alt="" width={1080} height={1080} />
              </div>
        
              {/* Inner circle */}
              <div ref={innerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-auto">
                <Image src="/assets/homepage/dotted-circle.svg" alt="" width={1080} height={1080} />
              </div>
        
        {/* <CircleBg className="absolute inset-0 w-[60vw] h-auto m-auto" />
        <CircleBg className="absolute inset-0 w-[45vw] h-auto m-auto"  /> */}

        {/* TEXTS */}
        {iconData.map((item, idx) => (
          <div
            key={item.key + '-text'}
            className={item.textClass}
          >
            <div className="flex">
              <h3 className="flex items-center gap-[0.5vw]">
                <span className={`w-2.5 h-2.5 rounded-full mr-2 transition-colors duration-300 ${hovered === item.key ? 'bg-primary-blue' : 'bg-black'}`}></span>
                <span className={`text-[2.2vw] font-medium transition-colors duration-300 ease-in ${hovered === item.key ? 'text-primary-blue' : 'text-black'}`}>{item.label}</span>
              </h3>
            </div>
            <p
              className={`text-[1.2vw] transition-colors duration-300 mt-[0.6vw] ease-in ${hovered === item.key ? 'text-primary-blue' : 'text-black'}`}
            >
              {item.text}
            </p>
          </div>
        ))}

        {/* CENTER DIAGRAM */}
        <div className="relative mx-auto w-[42vw] h-[42vw]">
          {/* center text */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <h2 className="text-[3.2vw] f leading-[1.1]">
              How AgenticAI <br /> runtime works
            </h2>
          </div>
          <div className="w-full h-full relative">
            {/* ICONS */}
            {iconData.map((item, idx) => {
              const IconComp = item.icon;
              const iconColor = hovered === item.key ? '#2563eb' : '#000';
              const pos = [
                'absolute top-22 left-15',
                'absolute top-22 right-15',
                'absolute bottom-22 left-15',
                'absolute bottom-22 right-15',
              ];
              return (
                <div
                  key={item.key + '-icon'}
                  className={`${pos[idx]} z-2 rounded-full border bg-white border-primary-blue p-[0.3vw] flex items-center justify-center cursor-pointer  transition-all duration-200 ease-in`}
                  onMouseEnter={() => setHovered(item.key)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className={` border-primary-blue p-[1.5vw] rounded-full bg-card-bg transition-all duration-200 ease-in ${hovered === item.key ? 'text-primary-blue drop-shadow-2xl border-2 ' : 'text-[#111111] border'} `}>
                    <IconComp className="w-[4vw] h-[4vw] transition-all duration-200 ease-in" color={iconColor} />
                  </div>
                </div>
              );
            })}
            {/* mid circle */}
            <Circle className="absolute inset-0 w-[35vw] h-auto m-auto z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowAgenticWorks;
