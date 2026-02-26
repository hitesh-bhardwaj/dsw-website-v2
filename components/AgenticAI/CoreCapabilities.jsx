"use client";
import React, { useState, useEffect } from "react";
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
    icon: <UnifiedFoundation/>,
    heading: "Unified foundation",
    text: "Single Governance Layer Across Data, models and Agents.",
    zIndex: "z-[10]",
  },
  {
    id: 2,
    icon: <AgentOrchestration/>,
    heading: "Agent orchestration & collaboration",
    text: "Multi-agent planning, A2A coordination and reusable workflow patterns.",
    zIndex: "z-[9]",
  },
  {
    id: 3,
    icon: <Governance/>,
    heading: "Audit-first governance",
    text: "Immutable audit trails, deterministic runtime controls and role-based guardrails.",
    zIndex: "z-[8]",
  },
  {
    id: 4,
    icon: <Explainability/>,
    heading: "Explainability + human oversight",
    text: "Native human-in-the-loop workflows, explainability hooks and escalation controls.",
    zIndex: "z-[7]",
  },
  {
    id: 5,
    icon: <Security/>,
    heading: "Security & agent identity",
    text: "RBAC, secrets management, network sandboxing and enterprise key management.",
    zIndex: "z-[6]",
  },
  {
    id: 6,
    icon: <Deployment/>,
    heading: "Flexible deployment",
    text: "Cloud-agnostic, hybrid, on-prem or air-gapped deployments to meet data-residency and latency needs.",
    zIndex: "z-[5]",
  },
];

const CapabilityCard = ({ card, isActive, onClick, index, activeIndex }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getZIndex = () => {
    if (!isDesktop) return 1; // no stacking logic on mobile

    if (isActive) return 50;

    const distance = Math.abs(index - activeIndex);
    return 40 - distance;
  };

  const getTransform = () => {
    if (!isDesktop) return "none"; // 🚀 disable animation on mobile

    const peekGap = 7.5;
    const revealGap = 4;

    if (index < activeIndex) {
      return `translateY(${index * peekGap}vw)`;
    }

    if (index === activeIndex) {
      return `translateY(${(activeIndex * peekGap) + revealGap}vw)`;
    }

    return `translateY(${(index * peekGap) + (2 * revealGap)}vw)`;
  };

  return (
    <div
      onMouseEnter={isDesktop ? onClick : undefined} // only trigger on desktop
      onClick={!isDesktop ? onClick : undefined}     // click works on mobile
      style={{
        transform: getTransform(),
        zIndex: getZIndex(),
      }}
      className={`
  max-sm:w-full w-[58vw] px-[3vw] max-md:w-[80vw] border-primary-blue pr-[7vw]  
  max-sm:h-[40vw] max-md:h-[20vw] h-[10vw] border 
  relative md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2
  max-sm:rounded-[5vw] rounded-[1vw] max-sm:px-[5vw] max-md:mb-[3.5vw] max-md:rounded-[3vw] max-sm:mb-[5vw]
  flex justify-center max-md:justify-between 
  max-md:px-[5vw] max-md:gap-[5vw] gap-[2.5vw]   max-sm:gap-[5vw] items-center 
  backdrop-blur-sm cap-cards cursor-pointer transition-all duration-500 ease-in-out
  ${isActive ? 'bg-white' : 'bg-card-bg hover:brightness-110'}
`}

    >
      <div className="h-[5.5vw] max-sm:w-[20%] max-md:w-[18%] w-[5.5vw] max-md:h-auto text-primary-blue">
        {card.icon}
      </div>

      <div className="flex flex-col gap-[0.5vw] max-sm:gap-[2vw] w-full">
        <p className="text-32 max-sm:leading-[1.2] font-medium text-[#0A1B4B] font-heading">
          {card.heading}
        </p>
        <p className="text-24 max-sm:leading-[1.4] max-md:w-full text-foreground">
          {card.text}
        </p>
      </div>
    </div>
  );
};


const CoreCapabilities = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section
      id="plat-cap-container"
      className="w-screen h-fit  pb-[5%] max-sm:px-[7vw] max-md:px-[6vw] max-md:py-[15%] max-sm:py-[20%] max-md:space-y-[3vw] space-y-[4vw] max-sm:space-y-[4vw]"
    >
      <HeadingAnim>

      <h2 className="text-center text-76 text-[#0A1B4B] ">
        Core Capabilities
      </h2>
      </HeadingAnim>

      <div
        className="flex fadeup justify-center items-center min-h-screen  h-fit  flex-col w-full pt-[2vw]  relative"
      >
        {cardsData.map((card, index) => (
          <CapabilityCard
            key={card.id}
            card={card}
            index={index}
            isActive={activeCard === index}
            activeIndex={activeCard}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default CoreCapabilities;