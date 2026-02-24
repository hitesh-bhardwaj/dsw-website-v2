"use client";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";

const GovernanceBuiltIn = () => {
  const cards = [
    {
      id: 1,
      title: "Audit is native",
      description:
        "Every AI action and agent decision is recorded automatically.",
    },
    {
      id: 2,
      title: "Reversibility is native",
      description:
        "Models, workflows, and decisions can be rolled back, overridden, or replayed.",
    },
    {
      id: 3,
      title: "Traceability is native",
      description:
        "Any outcome can be traced end-to-end - from data to decision.",
    },
  ];

  const Card = ({ card }) => (
    <div className="w-[23vw] max-sm:w-full fadeup max-md:w-[47%]">
      <div
        className="
          relative h-[15vw] group 
          px-[1.5vw] py-[2vw] flex flex-col justify-end
          border border-solid border-[#c1c1c1]
          bg-background
          hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg
          duration-300 ease-in-out
          max-sm:h-[50vw] max-sm:px-[5vw] max-sm:py-[6vw]
          max-md:h-[30vw] max-md:p-[4vw]
          max-md:justify-start max-md:gap-[3.5vw]
        "
      >
        <CornerDecorations />

        <h3 className="text-32 text-[#0A1B4B] font-medium font-heading mb-[1vw] max-sm:mb-[3vw]">
          {card.title}
        </h3>

        <p className="text-24 text-foreground leading-[1.4]">
          {card.description}
        </p>
      </div>
    </div>
  );

  return (
    <section className="relative w-full py-[7%] bg-background max-sm:py-[15%] max-sm:px-[5vw] max-md:py-[10%]">
      {/* Heading */}
      <div className="text-center px-[5vw] mb-[7vw] max-sm:mb-[10vw]">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] leading-[1.2] max-md:w-[70%] max-sm:w-full mx-auto">
            Governance Built In, Not Bolted On
          </h2>
        </HeadingAnim>
      </div>

      {/* Cards Container */}
      <div className="px-[10vw] max-sm:px-0">
        {/* Top Row - First 2 cards */}
        <div
          className="flex justify-between gap-[2vw] mb-[2vw] 
                        max-sm:flex-col max-sm:gap-[5vw] max-sm:mb-[5vw] 
                        max-md:flex-wrap max-md:justify-center max-md:gap-[3vw] max-md:mb-[3vw]"
        >
          {cards.slice(0, 2).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>

        {/* Bottom Row - Last card centered */}
        <div className="flex justify-center">
          {cards.slice(2).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center px-[5vw] mt-[5vw] max-sm:mt-[10vw]">
        <Copy>
          <p className="text-30 text-foreground">
            These capabilities are part of the operating system itself - not
            plugins, dashboards, or reporting layers.
          </p>
        </Copy>
      </div>
    </section>
  );
};

export default GovernanceBuiltIn;
