import Image from "next/image";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";

const FeaturesCard = ({ icon, title, para }) => {
  return (
    <>
      <div className=" relative group  max-md:space-y-[10vw] max-md:w-full w-[49%] hover:shadow-lg hover:drop-shadow-lg transition-all duration-300 ease-in-out ">
        <CornerDecorations/>
        <div className=" py-[3vw] px-[3vw] space-y-[1.5vw] space-y-[4vw] max-md:flex max-md:flex-col max-md:items-center max-md:space-y-[2.5vw] max-md:mt-[7vw] fadeup  w-full border border-[#C2C2C2]">
          <div className="w-[4vw] h-[4vw] max-md:w-[15vw] max-md:h-[15vw] text-[#2837FF]">
            {icon}
          </div>
          <div className="space-y-[1vw]">
          <h4 className="text-32 text-[#111111] max-md:text-[5.5vw] max-sm:text-[7vw] max-md:w-[95%] max-md:text-center max-md:h-fit">
            {title}
          </h4>
          <p className="text-24 text-[#111111] h-30 w-[95%] max-md:w-[95%] max-md:text-center max-md:h-auto">
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
      <div className="h-full w-full  space-y-[3vw] mx-auto">
        <HeadingAnim>
        <h2 className="text-76 text-[#0A1B4B] text-center  max-md:text-center">
          Who It’s For
        </h2>
        </HeadingAnim>

        <div className=" w-full flex  flex-wrap gap-y-[3vw] justify-between">
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
