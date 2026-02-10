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
  });

  return (
    <section className="relative w-full h-[240vh] py-[7%] " id="struggle">
      {/* Heading Section */}
      <div className=" space-y-[5.5vw] h-fit sticky top-[7%]">
        <div className="text-center space-y-[2vw]">
          <HeadingAnim>
            <h2 className="text-76 font-heading text-[#0A1B4B]">
              Why AI Struggles in Production
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-24 font-sans leading-[1.6] tracking-[0.025vw] text-[#111] max-w-[40.99vw] mx-auto">
              Modern enterprises don't struggle with building AI models. They
              struggle with operating AI reliably in production:
            </p>
          </Copy>
        </div>

        {/* Challenge Boxes */}
        <div className="flex justify-center gap-[2.34vw]">
          {challenges.map((challenge, index) => (
            <div key={index} className="relative  struggle-card">
              {/* Box Container */}
              <div
                className={`
                                relative w-[21vw] h-[50vh] group
                                border border-solid hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg border-[#c2c2c2] duration-300 ease-in-out
                                
                            `}
              >
                <CornerDecorations />

                {/* Number */}
                <div
                  className="text-80 right-[5%] absolute font-light"
                >
                  {challenge.number}
                </div>

                {/* Content */}
                <div className="absolute bottom-[2.08vw] left-[2.08vw] right-[2.08vw]">
                  <p className="text-30 leading-[1.3]">{challenge.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center pt-[3vw]">
          <Copy>
            <p className="text-[2.4vw] w-[50%]  mx-auto font-light">
              These gaps don't surface during pilots, but when AI becomes
              operational.
            </p>
          </Copy>
        </div>
      </div>
    </section>
  );
}
