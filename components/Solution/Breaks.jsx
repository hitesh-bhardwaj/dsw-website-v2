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
          duration-300 ease-in-out max-md:h-[28vw]
          w-[25.5vw] h-[18vw] p-[2vw] max-md:p-[3vw] max-md:w-[42vw]
          max-sm:p-[7vw] max-sm:w-full max-sm:pr-[8vw] max-sm:h-[58vw]
          border border-border-color flex flex-col
        "
      >
        <CornerDecorations />

        {/* Icon */}
        <div className="mb-auto w-[4.5vw] h-[4.5vw] max-md:w-[7vw] max-md:h-[7vw] max-sm:h-[14vw] max-sm:w-[14vw] text-foreground group-hover:text-primary-blue max-sm:text-primary-blue">
          {challenge.icon}
        </div>

        {/* Title */}
        <p className="text-24 mt-auto text-foreground max-sm:text-30">
          {challenge.title}
        </p>
      </div>
    </div>
  );
}

const Breaks = ({ breaksContent }) => {
  const { tagline, heading, challenges,extra } = breaksContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-md:py-[10%] max-sm:py-[15%]"
      id="breaks"
    >
      <div className="w-full h-full gap-y-[2vw] max-md:gap-[6vw] max-sm:gap-[9vw] flex flex-col items-center text-center">

        {/* Tagline */}
        <Copy>
          <p className="text-30 w-[70%] max-md:w-full">
            {tagline}
          </p>
        </Copy>

        {/* Heading */}
        <HeadingAnim>
          <h2 className="w-[70%] max-md:w-[85%] leading-[1.2] max-sm:leading-[1.4] max-sm:w-full text-76 text-[#0A1B4B] capitalize">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Cards */}
        <div className="w-[60%] max-md:w-full flex justify-between flex-wrap gap-y-[3vw] max-md:gap-y-[5vw] max-sm:gap-y-[6vw] text-left mt-[4vw]">
          {challenges?.map((challenge, index) => (
            <AboutCard key={index} challenge={challenge} />
          ))}
        </div>
         {extra && (
          <div
            className="w-[60%] text-center text-30 fadeup mt-[3vw] max-sm:w-full"
            dangerouslySetInnerHTML={{ __html: extra }}
          />
        )}

      </div>
    </section>
  );
};

export default Breaks;
