import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";

const Features = ({ featuresContent }) => {
  const { heading, cards = [] } = featuresContent;

  return (
    <section className="w-full py-[7%] max-sm:py-[15%]" id="features">
      <div className="w-full space-y-[7vw] max-sm:space-y-[12vw]">
        <HeadingAnim>
          <h2 className="text-[#0A1B4B] text-76 text-center w-[85%] capitalize mx-auto">
            {heading}
          </h2>
        </HeadingAnim>

        <div className="w-screen overflow-hidden overflow-x-visible fadeup">
          <div className="w-fit max-sm:pb-6 flex gap-[2vw] max-sm:gap-[6vw] flex-nowrap overflow-x-scroll px-[5vw]">
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-[32vw] h-[40vw] max-sm:w-[83vw] max-sm:h-[125vw] border-primary-blue border-t-[5px] bg-[#EFF1FB] p-[2vw] flex flex-col gap-[3vw] max-sm:gap-[7vw] max-sm:py-[7vw] max-sm:px-[5vw]"
              >
                <h3 className="text-44 max-sm:leading-[1.4]">{card.title}</h3>

                <p className="text-30">{card.description}</p>

                <ul className="list-disc pl-[1vw] max-sm:pl-[5vw] max-sm:leading-[1.4] text-30 max-sm:space-y-[1.5vw] space-y-[0.5vw]">
                  {card.bullets?.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
