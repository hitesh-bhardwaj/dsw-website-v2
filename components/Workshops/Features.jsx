import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";

const FeaturesCard = ({ icon, title, para }) => {
  return (
    <>
      <div className="relative group max-md:space-y-[10vw] h-fit max-sm:w-full w-[49%] hover:shadow-lg hover:drop-shadow-lg transition-all duration-300 ease-in-out max-md:w-full ">
        <CornerDecorations/>
        <div className=" py-[3vw] px-[3vw] max-sm:p-[6vw] max-sm:py-[7vw] h-full max-sm:h-[100vw] max-md:h-[48vw] space-y-[5vw] max-md:flex max-md:flex-col max-md:items-start max-sm:justify-between max-sm:space-y-[6vw] max-md:pb-[7vw] w-full border border-[#C2C2C2] group-hover:border-[#0205fa]">
          <div className="w-[4vw] h-[4vw] max-md:size-[10vw] max-sm:w-[15vw] max-sm:h-[15vw]  text-primary-blue">
            {icon}
          </div>
          <div className="space-y-[1vw] max-sm:space-y-[5vw] max-md:space-y-[3vw]">
          <h4 className="text-32 text-foreground max-md:font-medium max-md:w-[95%]  max-md:h-fit max-md:text-[3.5vw] max-sm:text-32">
            {title}
          </h4>
          <p className="text-24 text-foreground h-30 w-[95%] max-md:w-full  max-sm:leading-[1.4] max-md:h-auto">
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
      className="h-full max-md:relative  max-md:h-fit max-md:z-[20] w-screen px-[5vw] max-sm:px-[7vw] py-[10%] max-sm:py-[17%]"
      id="features"
    >
      <div className="h-full w-full  space-y-[4vw] max-sm:space-y-[10vw] mx-auto max-md:space-y-[7vw]">
        <HeadingAnim>
        <h2 className="text-76 text-[#0A1B4B] text-center  max-md:text-center">
          Who It’s For
        </h2>
        </HeadingAnim>

        <div className=" w-full flex  flex-wrap gap-y-[3vw] max-md:gap-y-[5vw] max-sm:gap-y-[6vw] justify-between  fadeup">
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


function CornerDecorations() {
  const line = `
    w-[5px] h-[1px]
    duration-300 ease-in-out
  `;

  return (
    <>
      {/* Top Left */}
      <div className="absolute -top-[0.1%] left-[0%] w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black rotate-90 group-hover:bg-[#0205fa] absolute top-[2.2px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.6%] -right-[0.35%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out max-sm:-right-[0.4] max-sm:top-[0.5%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.6%] -left-[0.4%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out max-sm:bottom-[-9.5%] max-md:bottom-[-9.8vw]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute -bottom-[0.1%] right-[0.05%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out max-sm:bottom-[-10%] max-md:bottom-[-10vw]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>
    </>
  );
}