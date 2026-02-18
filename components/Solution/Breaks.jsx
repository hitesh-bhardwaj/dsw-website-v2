import React from "react";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";

function AboutCard({ challenge }) {
  return (
    <div className="relative fadeup">
      <div
        className="
          relative bg-white hover:border-primary-blue group hover:shadow-md hover:drop-shadow-md
          duration-300 ease-in-out
          w-[25.5vw] h-[18vw] p-[2vw]
          max-sm:p-[7vw] max-sm:w-full max-sm:pr-[12vw] max-sm:h-[55vw]
          border border-border-color flex flex-col
        "
      >
        <CornerDecorations />

        {/* Icon */}
        <div className="mb-auto w-[4.5vw] h-[4.5vw] max-sm:h-[12vw] max-sm:w-[12vw] text-foreground group-hover:text-primary-blue max-sm:text-primary-blue">
          {challenge.icon}
        </div>

        {/* Title */}
        <p className="text-24 mt-auto text-foreground">
          {challenge.title}
        </p>
      </div>
    </div>
  );
}

const Breaks = ({ breaksContent }) => {
  const { tagline, heading, challenges } = breaksContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id="breaks"
    >
      <div className="w-full h-full gap-y-[2vw] max-sm:gap-[5vw] flex flex-col items-center text-center">

        {/* Tagline */}
        <Copy>
          <p className="text-30">
            {tagline}
          </p>
        </Copy>

        {/* Heading */}
        <HeadingAnim>
          <h2 className="w-[70%] max-sm:w-full text-76 text-[#0A1B4B]">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Cards */}
        <div className="w-[60%] max-sm:w-full flex justify-between flex-wrap gap-y-[3vw] max-sm:gap-y-[6vw] text-left mt-[4vw]">
          {challenges?.map((challenge, index) => (
            <AboutCard key={index} challenge={challenge} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Breaks;
