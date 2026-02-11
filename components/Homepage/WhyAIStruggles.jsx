"use client";
import { useGSAP } from "@gsap/react";
import CornerDecorations from "../CornerDecorations";
import gsap from "gsap";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

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
    if(globalThis.innerWidth>1024){
      gsap.from(".struggle-card", {
        yPercent: 150,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#struggle",
          start: "top 50%",
          end: "bottom bottom",
          scrub: true,
          // markers:true
        },
      });
    }
  });

  return (
    <section className="relative w-full h-[240vh] py-[7%] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit pt-[10%]" id="struggle">
      {/* Heading Section */}
      <div className=" space-y-[5.5vw] h-fit sticky top-[7%] max-sm:static overflow-hidden max-sm:space-y-[12vw] z-[10]">
        <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
          <HeadingAnim>
            <h2 className="text-76 font-heading text-[#0A1B4B]">
              Why AI Struggles in Production
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-24 font-sans leading-[1.6] tracking-[0.025vw] text-[#111] w-[40%] max-sm:w-full mx-auto">
              Modern enterprises don't struggle with building AI models. They
              struggle with operating AI reliably in production:
            </p>
          </Copy>
        </div>

        {/* Challenge Boxes */}
        <div className="flex justify-center gap-[2.34vw] max-sm:flex-col max-sm:gap-[7vw]">
          {challenges.map((challenge, index) => (
            <div key={index} className="relative  struggle-card">
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
                <div
                  className="text-80 font-light max-sm:text-[15vw]"
                >
                  {challenge.number}
                </div>

                {/* Content */}
                <div className="">
                  <p className="text-30 leading-[1.3]">{challenge.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center pt-[3vw] max-sm:pt-0">
          <Copy>
            <p className="text-44 w-[40%] max-sm:w-full  mx-auto font-light">
              These gaps don't surface during pilots, but when AI becomes
              operational.
            </p>
          </Copy>
        </div>
      </div>
    </section>
  );
}
