"use client";
import { ScrollTrigger, gsap } from "@/lib/gsapCore";
import React, { useEffect, useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import { UnifiedFoundation } from "../Svg/Agentic/UnifiedFoundation";
import { AgentOrchestration } from "../Svg/Agentic/AgentOrchestration";
import { Governance } from "../Svg/Agentic/Governance";
import { Explainability } from "../Svg/Agentic/Explainability";
import { Security } from "../Svg/Agentic/Security";
import { Deployment } from "../Svg/Agentic/Deployment";


const cardsData = [
  {
    id: 1,
    icon: <UnifiedFoundation />,
    heading: "Unified foundation",
    text: "Single Governance Layer Across Data, models and Agents.",
  },
  {
    id: 2,
    icon: <AgentOrchestration />,
    heading: "Agent orchestration & collaboration",
    text: "Multi - agent planning, A2A coordination and reusable workflow patterns.",
  },
  {
    id: 3,
    icon: <Governance />,
    heading: "Audit - first governance",
    text: "Immutable audit trails, deterministic runtime controls and role - based guardrails.",
  },
  {
    id: 4,
    icon: <Explainability />,
    heading: "Explainability + human oversight",
    text: "Native human - in - the - loop workflows, explainability hooks and escalation controls.",
  },
  {
    id: 5,
    icon: <Security />,
    heading: "Security & agent identity",
    text: "RBAC, secrets management, network sandboxing and enterprise key management.",
  },
  {
    id: 6,
    icon: <Deployment />,
    heading: "Flexible deployment",
    text: "Cloud - agnostic, hybrid, on - prem or air - gapped deployments to meet data - residency and latency needs.",
  },
];

const getStep = () => {
  const w = window.innerWidth;
  if (w < 541)  return { cardH: 40, gap: 3 };
  if (w < 1025) return { cardH: 20, gap: 2 };
  return        { cardH: 10, gap: 1 };
};

const CoreCapabilities = () => {
  const sectionRef = useRef(null);
  const cardsRef   = useRef(null);

  useEffect(() => {
    if (!cardsRef.current || !sectionRef.current) return;

    const { cardH, gap } = getStep();
    const STEP = cardH + gap;

    const allCards = Array.from(cardsRef.current.querySelectorAll(".cap-cards"));
    const cards = allCards.sort(
      (a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index)
    );
    const totalCards = cards.length;

    cardsRef.current.style.height = `${(totalCards - 1) * STEP + cardH}vw`;

    gsap.set(cards[0], { opacity: 0 });
    gsap.set(cards.slice(1), { y: 0, opacity: 0 });

    gsap.to(cards[0], {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",   
        toggleActions: "play none none none", 
      },
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",  
        end: "bottom 50%",
        scrub: true,
        // markers: true,
      },
    });

    for (let i = 1; i < totalCards; i++) {
      tl.to(
        cards.slice(i),
        { y: `${i * STEP}vw`, opacity: 1, duration: 1.2 },
        (i - 1) * 1.2
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plat-cap-container"
      className="w-screen min-h-screen max-sm:min-h-[150vh]  pb-[5%] max-sm:px-[7vw] max-md:px-[6vw] max-md:py-[15%] max-sm:py-[20%] max-md:space-y-[3vw] space-y-[4vw] max-sm:space-y-[4vw]"
    >
      <HeadingAnim>
        <h2 className="text-center text-76 text-[#0A1B4B]">
          Core Capabilities
        </h2>
      </HeadingAnim>

      <div ref={cardsRef} className="relative w-full">
        {[...cardsData].reverse().map((card, reversedIndex) => {
          const realIndex = cardsData.length - 1 - reversedIndex;
          return (
            <div
              key={card.id}
              data-index={realIndex}
              className="cap-cards absolute left-1/2 -translate-x-1/2
                w-[58vw] max-md:w-[80vw] max-sm:w-full
                h-[10vw] max-md:h-[20vw] max-sm:h-[40vw]
                px-[3vw] max-sm:px-[5vw] pr-[7vw] max-sm:pr-[5vw]
                border border-primary-blue
                bg-card-bg backdrop-blur-sm
                rounded-[1vw] max-md:rounded-[3vw] max-sm:rounded-[5vw]
                flex items-center
                gap-[2.5vw] max-sm:gap-[5vw]
                group hover:bg-white transition-colors duration-300 ease-in-out"
              style={{ top: 0 }}
            >
              <div className="h-[5.5vw] w-[5.5vw] max-md:h-[9vw] max-md:w-[9vw] max-sm:h-[14vw] max-sm:w-[14vw] flex-shrink-0 text-primary-blue">
                {card.icon}
              </div>
              <div className="flex flex-col gap-[0.5vw] max-sm:gap-[2vw] w-full">
                <p className="text-32 max-sm:leading-[1.2] font-medium text-[#0A1B4B] font-heading leading-tight">
                  {card.heading}
                </p>
                <p className="text-24 max-sm:leading-[1.4] text-foreground">
                  {card.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoreCapabilities;