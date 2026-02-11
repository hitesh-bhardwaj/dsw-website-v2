"use client";

import React from "react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import HeadingAnim from "../Animations/HeadingAnim";

import SmoothySlider, {Slide} from "../ui/SmoothySlider";
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
      className="relative shadow-md drop-shadow-md rounded-[1.5vw] border border-primary-blue p-[2vw] w-[28vw] h-[37vw]  flex flex-col justify-between max-sm:w-[83vw] max-sm:h-[110vw] max-sm:rounded-[3vw] max-sm:py-[8vw] max-sm:px-[5vw]"
    >
      <h2 className="text-56 ">{title}</h2>

      <p className="text-24  leading-[1.7] max-sm:leading-normal max-sm:font-light">{description}</p>
    </div>
  );
});

const AgenticCards = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressAnimRef = useRef(0);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      yPercent: 150,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "110% bottom",
        scrub: true,
        markers: false,
      },
    });
  });

  useEffect(() => {
    let raf;

    const update = () => {
      if (sliderRef.current && sliderRef.current.getProgress) {
        const targetProgress = sliderRef.current.getProgress() * 100;

        // Smooth interpolation
        progressAnimRef.current +=
          (targetProgress - progressAnimRef.current) * 0.1;
        setProgress(progressAnimRef.current);
      }
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[200vh]  max-sm:h-auto max-sm:w-screen max-sm:overflow-x-hidden relative"
    >
      <div className="text-center mx-auto w-[80%] max-sm:w-full ">
        <HeadingAnim>
          <p className=" font-normal max-sm:px-[7vw] leading-[1.2] max-sm:pb-[5vw] max-sm:leading-[1.2] text-56! font-heading">
            Turn proofs of concept into auditable, production- grade automation
            with explainable agents, deterministic governance, and
            enterprise-grade security.
          </p>
        </HeadingAnim>
      </div>

      {/* Desktop View */}
      <div className="w-full max-sm:px-[7vw] max-sm:py-[15%] overflow-hidden h-screen sticky  top-0 flex justify-center items-center gap-[2vw] max-sm:hidden">
        {cardsData.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
            ref={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>

      {/* Mobile View with SmoothySlider */}
      <div className="hidden max-sm:block mt-[10vw] w-fit">
        <SmoothySlider
          ref={sliderRef}
          className="py-4 cursor-grab active:cursor-grabbing w-screen pr-0 pl-0"
          config={{
            snap: false,
            infinite: false,
            setOffset: ({ wrapperWidth, vertical, wrapperHeight }) => {
              const w = vertical ? wrapperHeight : wrapperWidth;
              return w - w * 0.19;
            },
            slidesOffsetBefore: "0vw",
            slidesOffsetAfter: "0vw",
          }}
        >
          {cardsData.map((card, index) => (
            <Slide
              key={index}
              className={`w-fit px-3 ${index === 0 ? "ml-[5vw]" : ""} ${index === cardsData.length - 1 ? "mr-[1vw]" : ""}`}
            >
              <CardItem title={card.title} description={card.description} />
            </Slide>
          ))}
        </SmoothySlider>

        {/* Progress Bar */}
        <div className="w-[95%] px-[5vw] mt-8 mx-auto">
          <div className="relative w-full h-[8px] bg-[#E5E5E5] rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              style={{
                width: `${100 / cardsData.length}%`,
                transform: `translateX(${progress * (cardsData.length - 1)}%)`,
                transition: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenticCards;