"use client";
import Image from "next/image";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const AIProjects = () => {
  return (
    <section className="w-full py-[7%] px-[5vw] space-y-[7vw] max-sm:px-[7vw] max-sm:py-[15%] max-sm:space-y-[10vw]">
      {/* Header */}
      <div className="text-center space-y-[1vw] max-sm:space-y-[15vw]">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B]">
            From AI Projects to Enterprise Infrastructure
          </h2>
        </HeadingAnim>
        <Copy>
          <p className="text-30">With DSW, enterprises can:</p>
        </Copy>
      </div>

      {/* Cards Grid */}
      <div className="w-full grid grid-cols-4 gap-[1.2vw] max-sm:grid-cols-1 max-sm:gap-[5vw]">
        {CARDS.map((card, index) => (
          <div
            key={index}
            className="bg-card-bg border-b-4 border-primary-blue p-[1.2vw] flex flex-col gap-[4vw] fadeup max-sm:p-[5vw] max-sm:gap-[8vw] max-sm:h-[70vw] max-sm:justify-between max-sm:pb-[7vw]"
          >
            {/* Icon */}
            <div className="w-[6vw] h-[6vw] max-sm:w-[17vw] max-sm:h-[17vw]">
              <Image
                src={card.icon}
                alt={card.alt}
                width={104}
                height={104}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text */}
            <p className="text-30 leading-[1.35]">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Bottom Text */}
      <div className="text-center max-sm:pt-[5vw]">
        <HeadingAnim>
          <p className="text-44 font-heading max-w-[50vw] mx-auto leading-[1.4] max-sm:max-w-full max-sm:text-left">
            This is how AI becomes durable, governable, and enterprise ready.
          </p>
        </HeadingAnim>
      </div>
    </section>
  );
};

export default AIProjects;

const CARDS = [
  {
    icon: "/assets/icons/aios/cloud-platform.svg",
    alt: "Cloud platform icon",
    text: "Run AI entirely inside customer-controlled environments. (on-premises, private cloud, or hybrid)",
  },
  {
    icon: "/assets/icons/aios/ai-ownership.svg",
    alt: "AI ownership icon",
    text: "Retain full ownership of models, agents, workflows, and source code",
  },
  {
    icon: "/assets/icons/aios/no-vendor-lockin.svg",
    alt: "No vendor lock-in icon",
    text: "Integrate any AI ecosystem without vendor lock-in",
  },
  {
    icon: "/assets/icons/aios/production-infra.svg",
    alt: "Production infrastructure icon",
    text: "Treat AI use cases as production infrastructure - not short-term projects",
  },
];
