"use client";

import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    title: "DataOps",
    description:
      "Real-time ingestion, automated validation, lineage tracking, quality checks, and graph-native pipelines with explainability and proactive alerting.",
  },
  {
    title: "AgenticAI Studio",
    description:
      "A complete development environment with fine-tuning, lifecycle control, testing, monitoring, guardrails, and an Agent Dev Kit for production-ready agents along with fully customizable RAG pipelines (connectors, indexing, retrievers, rerankers, caching, evaluation, and deployment controls).",
  },
  {
    title: "AgenticAI Workflow Builder",
    description:
      "Orchestration tools that connect AI models, GenAI agents, and enterprise logic into multi-step workflows, enabling A2A collaboration and MCP style orchestration.",
  },
];

const CardItem = React.forwardRef(({ title, description }, ref) => {
  return (
    <div
      ref={ref}
      className="relative shadow-md rounded-[1.5vw] border border-primary-blue p-[2.5vw] w-[28vw] h-[37vw] flex flex-col justify-between"
    >
      <h2 className="text-56 font-light">{title}</h2>

      <p className="text-24 leading-[1.7]">{description}</p>
    </div>
  );
});

const AgenticCards = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(cardsRef.current, {
        yPercent: 120,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
          markers: false,
        },
      });
    }
  );


  return (
    <div ref={containerRef} className="w-full h-[150vh] relative">
      <div className="text-center mx-auto w-[80%] max-sm:w-[85%] ">
        <HeadingAnim>

        <p className=" font-normal leading-[1.2] max-sm:leading-[1.3] text-56! font-heading">
          Turn proofs of concept into auditable, production- grade automation
          with explainable agents, deterministic governance, and
          enterprise-grade security.
        </p>
        </HeadingAnim>
      </div>
      <div className="w-full overflow-hidden h-screen  sticky py-[3%] top-0  flex justify-center items-center gap-[2vw]">
        {cardsData.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
            ref={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgenticCards;