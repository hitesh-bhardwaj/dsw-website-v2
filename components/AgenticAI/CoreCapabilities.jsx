"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { UnifiedFoundation } from "../Svg/UnifiedFoundation";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 1,
    icon: "UnifiedFoundationIcon",
    heading: "Unified foundation",
    text: "iSingle Governance Layer Across Data, models and Agents.",
    zIndex: "z-[10]",
  },
  {
    id: 2,
    icon: "UnifiedFoundationIcon",
    heading: "Agent orchestration & collaboration",
    text: "multi-agent planning, A2A coordination and reusable workflow patterns.",
    zIndex: "z-[9]",
  },
  {
    id: 3,
    icon: "UnifiedFoundationIcon",
    heading: "Audit-first governance",
    text: "immutable audit trails, deterministic runtime controls and role-based guardrails.",
    zIndex: "z-[8]",
  },
  {
    id: 4,
    icon: "UnifiedFoundationIcon",
    heading: "Explainability + human oversight:",
    text: "native human-in-the-loop workflows, explainability hooks and escalation controls.",
    zIndex: "z-[7]",
  },
  {
    id: 5,
    icon: "UnifiedFoundationIcon",
    heading: "Security & agent identity",
    text: "RBAC, secrets management, network sandboxing and enterprise key management.",
    zIndex: "z-[6]",
  },
  {
    id: 6,
    icon: "UnifiedFoundationIcon",
    heading: "Flexible deployment",
    text: "cloud-agnostic, hybrid, on-prem or air-gapped deployments to meet data-residency and latency needs.",
    zIndex: "z-[5]",
  },
];

const CapabilityCard = ({ card }) => {
  return (
    <div className="w-[50vw] px-[3vw] border-primary-blue max-md:pl-[4vw] max-md:py-[4vw] h-[10vw] max-md:h-[20vw] max-md:w-[90vw] border  relative rounded-[2vw] max-md:rounded-3xl flex justify-center max-md:justify-between max-md:px-[2vw] max-md:gap-[5vw] gap-[2.5vw] max-sm:gap-[4vw] items-center backdrop-blur-sm  cap-cards">
      <div className="h-[4.5vw] max-md:h-[10vw] max-md:w-auto max-sm:h-[7vw]">
        <UnifiedFoundation className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-[0.5vw] w-full ">
        <p className="text-32 font-medium">{card.heading}</p>
         <p className="text-24  max-md:text-[2.5vw] max-md:w-[100%]">
          {card.text}
        </p>
      </div>
    </div>
  );
};

const CoreCapabilities = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!cardsRef.current || !sectionRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".cap-cards");
    const totalCards = cards.length;

    gsap.set(cards, {
      yPercent: (i) => -100 * (i + 1),
      scale: (i) => 1 - (i + 1) * 0.05,
      opacity: 0,
      zIndex: (i) => totalCards - i,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "20% bottom",
        end: "bottom 75%",
        scrub: true,
      },
    });

    tl.fromTo(
      ".card-1",
      { opacity: 0, zIndex: totalCards + 2 },
      { opacity: 1, duration: 1, zIndex: totalCards + 2 },
      0
    );

    cards.forEach((card, i) => {
      const timePosition = i * 0.5 + 1;

      tl.to(
        card,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
        },
        timePosition
      );

      for (let j = i + 1; j < totalCards; j++) {
        tl.to(
          cards[j],
          {
            yPercent: -100 * (j - i),
            scale: 1 - (j - i) * 0.05,
            duration: 0.5,
          },
          timePosition
        );
      }
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="plat-cap-container"
      ref={sectionRef}
      className="w-screen h-fit  py-[10%]"
    >
      <h2 className=" text-center text-76">
        Core Capabilities
      </h2>

      <div
        className="flex justify-center items-center flex-col w-full max-md:gap-[4vw] gap-[1vw] pt-[2vw] max-sm:hidden"
        ref={cardsRef}
      >
        <div className="w-[50vw] px-[3vw] border-primary-blue max-md:pl-[4vw] max-md:py-[4vw] h-[10vw] max-md:h-[20vw] max-md:w-[90vw] border card-1 z-12  rounded-[2vw] max-md:rounded-3xl flex justify-center max-md:justify-between max-md:px-[2vw] max-md:gap-[5vw] gap-[2.5vw] max-sm:gap-[4vw] items-center  cap-top-card ">
          <div className="h-[4.5vw] max-md:h-[9vw] max-md:w-auto max-sm:h-[7vw]">
            <UnifiedFoundation className="h-full w-full" />
          </div>
          <div className="flex flex-col justify-center max-md:w-full gap-[0.5vw] w-full ">
            <p className="text-32 font-medium">{cardsData[0].heading}</p>
            <p className="text-24  max-md:text-[2.5vw] max-md:w-[100%]">
              {cardsData[0].text}
            </p>
          </div>
        </div>

        {cardsData.slice(1).map((card) => (
          <CapabilityCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default CoreCapabilities;