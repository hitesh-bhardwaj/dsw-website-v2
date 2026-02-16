"use client";
import HeadingAnim from "../Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";

const GovernanceBuiltIn = () => {
  const cards = [
    {
      id: 1,
      title: "Audit is native",
      description:
        "Every AI action and agent decision is recorded automatically.",
      isHighlighted: true,
    },
    {
      id: 2,
      title: "Reversibility is native",
      description:
        "Models, workflows, and decisions can be rolled back, overridden, or replayed.",
      isHighlighted: false,
    },
    {
      id: 3,
      title: "Traceability is native",
      description:
        "Any outcome can be traced end-to-end — from data to decision.",
      isHighlighted: false,
    },
  ];

  return (
    <section className="relative w-full py-[7%] bg-background max-sm:py-[15%] max-sm:px-[5vw]">
      {/* Heading */}
      <div className="text-center px-[5vw] mb-[5vw] max-sm:mb-[10vw]">
        <HeadingAnim>
          <h2 className="text-76 text-foreground leading-[1.1]">
            Governance Built In, Not Bolted On
          </h2>
        </HeadingAnim>
      </div>

      {/* Cards Container */}
      <div className="px-[10vw] max-sm:px-0">
        {/* Top Row - 2 cards */}
        <div className="flex justify-between gap-[2vw] mb-[2vw] max-sm:flex-col max-sm:gap-[5vw] max-sm:mb-[5vw]">
          {/* Card 1 - Audit is native (highlighted) */}
          <div className="w-[23vw] max-sm:w-full">
            <div
              className={`
                relative h-[15vw] group
                px-[1.5vw] py-[2vw] flex flex-col justify-end
                border border-solid border-[#c1c1c1]
                bg-background
                hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out
                max-sm:h-[50vw] max-sm:px-[5vw] max-sm:py-[6vw]
              `}
            >
              <CornerDecorations />
              <h3 className="text-32 text-foreground font-heading mb-[1vw] max-sm:mb-[3vw]">
                {cards[0].title}
              </h3>
              <p className="text-24 text-[#111] leading-[1.4]">
                {cards[0].description}
              </p>
            </div>
          </div>

          {/* Card 2 - Reversibility is native */}
          <div className="w-[23vw] max-sm:w-full">
            <div
              className={`
                relative h-[15vw] group
                px-[1.5vw] py-[2vw] flex flex-col justify-end
                border border-solid border-[#c1c1c1]
                bg-background
                hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out
                max-sm:h-[50vw] max-sm:px-[5vw] max-sm:py-[6vw]
              `}
            >
              <CornerDecorations />
              <h3 className="text-32 text-foreground font-heading mb-[1vw] max-sm:mb-[3vw]">
                {cards[1].title}
              </h3>
              <p className="text-24 text-[#111] leading-[1.4]">
                {cards[1].description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - 1 centered card */}
        <div className="flex justify-center">
          <div className="w-[23vw] max-sm:w-full">
            <div
              className={`
                relative h-[15vw] group
                px-[1.5vw] py-[2vw] flex flex-col justify-end
                border border-solid border-[#c1c1c1]
                bg-background
                hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out
                max-sm:h-[50vw] max-sm:px-[5vw] max-sm:py-[6vw]
              `}
            >
              <CornerDecorations />
              <h3 className="text-32 text-foreground font-heading mb-[1vw] max-sm:mb-[3vw]">
                {cards[2].title}
              </h3>
              <p className="text-24 text-[#111] leading-[1.4]">
                {cards[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center px-[5vw] mt-[5vw] max-sm:mt-[10vw]">
        <p className="text-30 text-[#111] tracking-[0.01em]">
          These capabilities are part of the operating system itself — not plugins, dashboards, or reporting layers.
        </p>
      </div>
    </section>
  );
};

export default GovernanceBuiltIn;
