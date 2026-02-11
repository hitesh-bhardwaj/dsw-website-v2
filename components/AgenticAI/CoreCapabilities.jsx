"use client";
import React, { useState, useEffect } from "react";
import { UnifiedFoundation } from "../Svg/UnifiedFoundation";
import { Governance } from "../Svg/Governance";
import { HumanOversight } from "../Svg/HumanOversight";
import { Security } from "../Svg/Security";
import { Deployment } from "../Svg/Deployment";
import { Orchestration } from "../Svg/Orchestration";
import HeadingAnim from "../Animations/HeadingAnim";

const cardsData = [
  {
    id: 1,
    icon: UnifiedFoundation,
    heading: "Unified foundation",
    text: "Single Governance Layer Across Data, models and Agents.",
    zIndex: "z-[10]",
  },
  {
    id: 2,
    icon: Orchestration,
    heading: "Agent orchestration & collaboration",
    text: "multi-agent planning, A2A coordination and reusable workflow patterns.",
    zIndex: "z-[9]",
  },
  {
    id: 3,
    icon: Governance,
    heading: "Audit-first governance",
    text: "immutable audit trails, deterministic runtime controls and role-based guardrails.",
    zIndex: "z-[8]",
  },
  {
    id: 4,
    icon: HumanOversight,
    heading: "Explainability + human oversight",
    text: "native human-in-the-loop workflows, explainability hooks and escalation controls.",
    zIndex: "z-[7]",
  },
  {
    id: 5,
    icon: Security,
    heading: "Security & agent identity",
    text: "RBAC, secrets management, network sandboxing and enterprise key management.",
    zIndex: "z-[6]",
  },
  {
    id: 6,
    icon: Deployment,
    heading: "Flexible deployment",
    text: "cloud-agnostic, hybrid, on-prem or air-gapped deployments to meet data-residency and latency needs.",
    zIndex: "z-[5]",
  },
];

const CapabilityCard = ({ card, isActive, onClick, index, activeIndex }) => {
  const IconComponent = card.icon;
  
  // Calculate z-index based on distance from active card
  const getZIndex = () => {
    if (isActive) {
      return 50; // Active card always on top
    }
    
    // Calculate distance from active card
    const distance = Math.abs(index - activeIndex);
    
    // Closer cards have higher z-index
    return 40 - distance;
  };
  
  // Calculate position - ensuring all cards are always visible
  const getTransform = () => {
  const peekGap = 7.5;   // stacked spacing
  const revealGap = 4;   // extra margin around active (increase this)

  if (index < activeIndex) {
    // shift upward slightly to create gap above active card
    return `translateY(${(index * peekGap)}vw)`;
  }

  if (index === activeIndex) {
    // active card pushed down a bit to create space above
    return `translateY(${(activeIndex * peekGap) + revealGap}vw)`;
  }

  // cards after active pushed further down
  return `translateY(${(index * peekGap) + (2 * revealGap)}vw)`;
};

    const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 768);
  };

  handleResize(); // initial
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);



const getMobileTransform = () => {
  const peekGap = 32;
  const revealGap = 13;

  if (index < activeIndex) {
    return `translateY(${(index * peekGap)}vw)`;
  }

  if (index === activeIndex) {
    return `translateY(${(activeIndex * peekGap) + revealGap}vw)`;
  }

  return `translateY(${(index * peekGap) + (2 * revealGap)}vw)`;
};


  return (
    <div
      onClick={onClick}
      style={{
        transform: isDesktop ? getTransform() : getMobileTransform(),

        zIndex: getZIndex(),
      }}
      className={`
        w-[52vw] px-[3vw] border-primary-blue  
        h-[10vw] max-sm:w-full max-sm:h-[40vw] border absolute top-0 left-1/2 -translate-x-1/2
        rounded-[1vw] max-sm:rounded-[5vw] max-sm:px-[2vw] flex justify-center max-md:justify-between 
        max-md:px-[2vw] max-md:gap-[5vw] gap-[2.5vw] max-sm:gap-[5vw] items-center 
        backdrop-blur-sm cap-cards cursor-pointer transition-all duration-500 ease-in-out
        ${isActive ? 'bg-white' : 'bg-card-bg hover:brightness-110'}
      `}
    >
      <div className="h-[4.5vw] max-sm:w-[20%]  w-[4.5vw] max-sm:h-auto">
        <IconComponent className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-[0.5vw] max-sm:gap-[2vw] w-full ">
        <p className="text-32 max-sm:leading-[1.2] font-medium">{card.heading}</p>
        <p className="text-24 max-sm:leading-[1.4] max-md:w-full">
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
      className="w-screen h-fit  pb-[5%] max-sm:px-[7vw] max-sm:py-[15%]"
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