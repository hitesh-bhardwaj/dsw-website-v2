"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

gsap.registerPlugin(ScrollTrigger);

const ArchitecturalPrinciples = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    if (globalThis.innerWidth < 1024) return;

    const section = sectionRef.current;
    const progress = progressRef.current;
    const timeline = timelineRef.current;
    const cards = gsap.utils.toArray(".principle-card");

    // Progress bar animation tied to scroll
    gsap.to(progress, {
      top: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Highlight cards as progress reaches them
    cards.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 60%",
          end: "bottom 40%",
          toggleClass: "active",
        },
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[7%] bg-white max-sm:py-[15%]"
    >
      {/* Header */}
      <div className="text-center space-y-[1.5vw] px-[5vw] mb-[5vw] max-sm:space-y-[5vw] max-sm:mb-[10vw]">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B]">
            A Kernel-Centric Enterprise AI Architecture 
          </h2>
        </HeadingAnim>
        <Copy>
          <p className="text-30 w-[65%] mx-auto max-sm:w-full">
            The DSW Enterprise AI Operating System is designed to operationalize
            AI and agentic systems with long-running enterprise capabilities,
            not isolated applications.
          </p>
        </Copy>
        <Copy>
          <p className="text-30 w-[65%] mx-auto max-sm:w-full">
            Optimized for regulated and hybrid environments, governance and
            control are embedded at the system level — not added as compliance
            afterthoughts.
          </p>
        </Copy>
      </div>

      {/* Architectural Principles Subtitle */}
      <div className="text-center mb-[3vw] max-sm:mb-[8vw]">
        <HeadingAnim>
          <h3 className="text-56 text-[#0A1B4B] font-heading font-medium">
            Architectural Principles
          </h3>
        </HeadingAnim>
      </div>

      {/* Timeline Container */}
      <div
        ref={timelineRef}
        className="relative w-full max-w-[1200px] mx-auto px-[5vw] max-sm:px-[5vw]"
      >
        {/* Center Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-[#e0e0e0] rounded-full max-sm:hidden" />

        {/* Progress Indicator */}
        <div
          ref={progressRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[4px] h-[50px] bg-[#002AFF] rounded-full z-10 max-sm:hidden"
        />

        {/* Principle Cards */}
        <div className="relative space-y-[3vw] max-sm:space-y-[8vw]">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={index}
              className={`principle-card flex ${
                principle.side === "right"
                  ? "justify-end"
                  : "justify-start"
              } max-sm:justify-start`}
            >
              <div
                className={`w-[45%] p-[2vw] bg-white transition-all duration-700 max-sm:w-full max-sm:p-[5vw] ${
                  principle.side === "right"
                    ? "border-l-4 border-[#c1c1c1] ml-[5%] [.active>&]:border-[#0205FA]"
                    : "border-r-4 border-[#c1c1c1] mr-[5%] text-right [.active>&]:border-[#0205FA] max-sm:border-r-0 max-sm:border-l-4 max-sm:text-left max-sm:mr-0"
                }`}
              >
                <h4 className="text-32 font-heading font-medium text-[#0A1B4B] mb-[1vw] max-sm:mb-[3vw]">
                  {principle.title}
                </h4>
                <p className="text-24 leading-[1.6] text-foreground">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalPrinciples;

const PRINCIPLES = [
  {
    side: "right",
    title: "Kernel-centric governance",
    description:
      "Policy enforcement and auditability are implemented as non-bypassable kernel functions.",
  },
  {
    side: "left",
    title: "Separation of control and execution",
    description:
      "AI workloads execute in governed subsystems while policy, lineage, and lifecycle remain centralized.",
  },
  {
    side: "right",
    title: "Infrastructure independence",
    description:
      "The AI OS operates above existing operating systems and infrastructure without replacing them.",
  },
  {
    side: "left",
    title: "Enterprise custody and sovereignty",
    description:
      "All AI artifacts remain under enterprise ownership and control.",
  },
  {
    side: "right",
    title: "Controlled ecosystem integration",
    description:
      "External models, tools, and services integrate only through kernel-governed interfaces.",
  },
];
