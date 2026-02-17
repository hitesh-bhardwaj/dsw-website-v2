"use client";
import { useGSAP } from "@gsap/react";
import CornerDecorations from "../CornerDecorations";
import gsap from "gsap";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import SectionBreak from "../SectionBreak";

export default function WhyAIStruggles() {
  const challenges = [
    {
      number: "1",
      title:
        "AI stacks are fragmented across tools, models, agents, and vendors",
      isHighlighted: true,
    },
    {
      number: "2",
      title: "Agentic workflows execute without runtime control",
      isHighlighted: false,
    },
    {
      number: "3",
      title: "Governance exists as static policy, not enforceable logic",
      isHighlighted: false,
    },
    {
      number: "4",
      title:
        "Auditability, ownership, and reversibility are added after deployment",
      isHighlighted: false,
    },
  ];

  useGSAP(() => {
    if (globalThis.innerWidth > 1024) {
      gsap.to(".struggle-card", {
        translateX: 0,
        stagger: 0.05,
        ease: "power2.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: "#struggle",
          start: "10% 60%",
          // markers:true
        },
      });
    }
  });

  return (
    <section
      className="relative w-full h-fit py-[7%] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit pt-[10%]"
      id="struggle"
    >
      {/* Heading Section */}
      <div className="space-y-[5.5vw] h-fit sticky top-[7%] max-sm:static overflow-hidden max-sm:space-y-[12vw] z-10">
        <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
          <HeadingAnim>
            <h2 className="text-76 font-heading text-[#0A1B4B]">
              Why AI Struggles in Production
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-24 font-sans leading-[1.4] tracking-[0.025vw] text-[#111] w-[40%] max-sm:w-full mx-auto">
              Modern enterprises don&apos;t struggle with building AI models. They
              struggle with operating AI reliably in production:
            </p>
          </Copy>
        </div>

        {/* Challenge Boxes */}
        <div className="flex justify-center gap-[2.34vw] max-sm:flex-col max-sm:gap-[7vw]">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className={`relative  struggle-card bg-white  max-sm:translate-x-0 ${index == 0 && "z-5"} ${index == 1 ? "-translate-x-[111%] z-4" : ""} ${index == 2 ? "-translate-x-[222%] z-3" : ""} ${index == 3 ? "-translate-x-[333.5%] z-2" : ""}`}
            >
              {/* Box Container */}
              <div
                className={`
                                relative w-[21vw] h-[50vh] group
                                px-[1.5vw] justify-between flex flex-col pb-[3vw] items-end max-sm:px-[5vw] max-sm:pb-[10vw] max-sm:h-[60vw]
                                border border-solid hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg border-[#c2c2c2] duration-300 ease-in-out
                                max-sm:w-full
                            `}
              >
                <CornerDecorations />

                {/* Number */}
                <div className="text-80 font-light max-sm:text-[15vw]">
                  {challenge.number}
                </div>

                {/* Content */}
                <div className="">
                  <p className="text-30 leading-[1.2]">{challenge.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[50%] mx-auto text-center max-sm:w-full">
          <SectionBreak
            content={
              "These gaps don't surface during pilots, but when AI becomes operational."
            }
            big={false}
          />
        </div>
      </div>
    </section>
  );
}
