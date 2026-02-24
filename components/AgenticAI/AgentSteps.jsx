"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CircleBg } from "../Svg/Lines/DottedCircle";
import { Insurance } from "@/components/Svg/Insurance";
import { Bank } from "../Svg/Bank";
import { Roadmap } from "../Svg/Roadmap";
import HeadingAnim from "../Animations/HeadingAnim";

const CARD_DATA = [
  {
    id: 1,
    title: "Insurance",
    Icon: Insurance,
    description:
      "Purpose-built for insurers: claims orchestration, fraud triage, underwriting augmentation and customer engagement automation.",
  },
  {
    id: 2,
    title: "Banks",
    Icon: Bank,
    description:
      "For banks & financial institutions: lending decision support, compliance automation, fraud monitoring and risk remediation.",
  },
  {
    id: 3,
    title: "Roadmap",
    Icon: Roadmap,
    description:
      "Next: telecom, healthcare and other regulated industries where auditability and governance are critical.",
  },
];

function AgenticCard({ id, title, Icon, description }) {
  const [isHovered, setIsHovered] = useState(false);
  const circleRef = useRef(null);

  useGSAP(
    () => {
      if (!circleRef.current) return;

      if (isHovered) {
        gsap.to(circleRef.current, {
          rotation: -90,
          duration: 7,
          ease: "linear",
          repeat: -1,
        });
      } else {
        gsap.killTweensOf(circleRef.current);
        gsap.set(circleRef.current, { rotation: 0 });
      }
    },
    { dependencies: [isHovered] }
  );

  return (
    <div
      className="relative fadeup bg-card-bg px-[2vw] pt-[1.5vw] pb-[3.5vw] w-[28.5vw] h-[36.5vw] max-md:w-[45%] max-md:h-[55vw] overflow-hidden border-t-[0.4vw] border-primary-blue flex flex-col max-sm:w-full max-sm:h-[100vw] max-sm:border-t-[1.7vw] max-sm:justify-between max-sm:py-[7vw] max-sm:pb-[15vw] max-sm:px-[4vw] max-md:px-[3vw] max-md:py-[3vw]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-[2vw] max-sm:mb-[2vw] max-md:mb-[4vw] max-sm:pr-[3vw]">
        <h2 className="text-32 max-md:text-[4vw] font-medium max-sm:text-[6vw]">
          {title}
        </h2>
        <p className="text-80 font-light! text-primary-blue leading-none max-sm:text-[15vw]">
          {id}
        </p>
      </div>

      {/* Icon + Rotating Circle */}
      <div className="w-full h-auto flex mb-[12vw] max-md:mb-[10vw] max-sm:mb-[12vw] justify-center items-center">
        <div
          ref={circleRef}
          className="w-[38vw] max-sm:w-[110vw] max-md:w-[52vw] max-sm:top-38 max-md:top-38 z-10 h-auto absolute top-40"
        >
          <CircleBg className="h-full w-full origin-center" />
        </div>

        <div className="w-[6vw] h-[6vw] max-md:w-[10vw] max-md:h-[10vw] max-md:p-[1vw] rounded-full bg-white flex justify-center items-center z-10 max-sm:w-[20vw] max-sm:h-[20vw] max-sm:p-[3vw]">
          <Icon className="h-full w-full p-[1vw]" />
        </div>
      </div>

      {/* Description */}
      <p className="text-24 m-0 max-sm:flex max-sm:items-end max-sm:min-h-[30%] max-md:min-h-[28%] text-foreground">
        {description}
      </p>
    </div>
  );
}

const AgenticSteps = () => {
  return (
    <div className="py-[5%] max-sm:px-[7vw] max-sm:py-[15%] max-md:px-[6vw] bg-white space-y-[2vw] max-md:space-y-[10vw] max-sm:space-y-[15vw]">
      <HeadingAnim>
        <h2 className="text-76 mx-auto w-fit max-md:text-center max-sm:w-[90%] leading-[1.2] text-[#0A1B4B]">
          BFSI use cases & vertical accelerators
        </h2>
      </HeadingAnim>

      <div className="flex max-sm:flex-col max-md:flex-wrap max-md:gap-[8vw] max-sm:justify-center max-sm:items-center justify-between max-sm:gap-[8vw] p-[4vw]  max-md:p-0">
        {CARD_DATA.map((card) => (
          <AgenticCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default AgenticSteps;
