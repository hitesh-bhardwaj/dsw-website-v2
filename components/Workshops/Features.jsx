import Image from "next/image";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";

const FeaturesCard = ({ icon, title, para }) => {
  return (
    <>
      <div className=" relative group  max-md:space-y-[10vw] max-md:w-full w-[49%] hover:shadow-lg hover:drop-shadow-lg transition-all duration-300 ease-in-out ">
        <CornerDecorations/>
        <div className=" py-[3vw] px-[3vw] max-sm:p-[5vw] max-sm:py-[6vw] space-y-[1.5vw] max-md:flex max-md:flex-col max-md:items-start max-sm:justify-start max-sm:space-y-[15vw]  fadeup  w-full border border-[#C2C2C2]">
          <div className="w-[4vw] h-[4vw] max-md:w-[15vw] max-sm:w-[12vw] max-sm:h-[12vw] max-md:h-[15vw] text-primary-blue">
            {icon}
          </div>
          <div className="space-y-[1vw] max-sm:space-y-[5vw]">
          <h4 className="text-32 text-[#111111] max-sm:font-medium max-md:w-[95%]  max-md:h-fit">
            {title}
          </h4>
          <p className="text-24 text-[#111111] h-30 w-[95%] max-md:w-[95%]  max-sm:leading-[1.4] max-md:h-auto">
            {para}
          </p>
          </div>
        </div>
      </div>
    </>
  );
};
const Features = ({ featuresData }) => {
  return (
    <section
      className="h-full max-md:relative  max-md:h-fit max-md:z-[20] w-screen px-[5vw] py-[10%]"
      id="features"
    >
      <div className="h-full w-full  space-y-[3vw] max-sm:space-y-[10vw] mx-auto">
        <HeadingAnim>
        <h2 className="text-76 text-[#0A1B4B] text-center  max-md:text-center">
          Who It’s For
        </h2>
        </HeadingAnim>

        <div className=" w-full flex  flex-wrap gap-y-[3vw] max-sm:gap-y-[6vw] justify-between">
          {featuresData.map((card, index) => (
            <FeaturesCard
              key={index}
              icon={card.icon}
              title={card.title}
              para={card.para}
              id={card.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
