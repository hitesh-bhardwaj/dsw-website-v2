import Image from "next/image";
import CornerDecorations from "../CornerDecorations";

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

  return (
    <section className="relative w-full py-[7%] space-y-[7vw] " id="struggle">
      {/* Heading Section */}
      <div className="text-center space-y-[2vw]">
        <h2 className="text-[3vw] font-medium font-heading text-[#0A1B4B]">
          Why AI Struggles in Production
        </h2>
        <p className="text-[1.25vw] font-sans leading-[1.6] tracking-[0.025vw] text-[#111] max-w-[40.99vw] mx-auto">
          Modern enterprises don't struggle with building AI models. They
          struggle with operating AI reliably in production:
        </p>
      </div>

      {/* Challenge Boxes */}
      <div className="flex justify-center gap-[2.34vw] mb-[5.21vw]">
        {challenges.map((challenge, index) => (
          <div key={index} className="relative">
            {/* Box Container */}
            <div
              className={`
                                relative w-[21vw] h-[28vw] group
                                border border-solid hover:border-[#0205fa] hover:shadow-lg hover:drop-shadow-lg border-[#c2c2c2] duration-300 ease-in-out
                                
                            `}
            >
              <CornerDecorations />

              {/* Number */}
              <div
                className={`
                                absolute top-0 right-[1.04vw]
                                text-[5vw] font-sans  leading-none
                               opacity-50 group-hover:opacity-100 duration-300 ease-in-out
                            `}
              >
                {challenge.number}
              </div>

              {/* Content */}
              <div className="absolute bottom-[2.08vw] left-[2.08vw] right-[2.08vw]">
                <p className="text-[1.56vw] font-sans leading-[2.08vw] text-[#111]">
                  {challenge.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Text */}
      <div className="text-center">
        <p className="text-[2.4vw] w-[50%]  mx-auto font-light">
          These gaps don't surface during pilots, but when AI becomes
          operational.
        </p>
      </div>
    </section>
  );
}
