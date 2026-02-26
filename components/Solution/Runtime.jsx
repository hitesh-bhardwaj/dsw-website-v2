import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const Runtime = ({ runtimeContent }) => {
  const { heading, description, items, extra } = runtimeContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] pt-[10%] max-md:px-[6vw] max-md:py-[10%] max-sm:px-[7vw] max-sm:py-[15%]"
      id="runtime"
    >
      <div className="w-full h-full gap-y-[2vw] max-sm:gap-y-[6vw] max-md:gap-y-[5vw] flex flex-col items-center">

        {/* Heading */}
        <HeadingAnim>
          <h2 className="text-[#0A1B4B] text-76 leading-[1.2]  max-sm:leading-[1.3] text-center w-[80%] max-md:w-[90%] max-sm:w-full capitalize">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Description */}
        <Copy>
          <p className="text-center text-30 w-[60%] max-md:w-full">
            {description}
          </p>
        </Copy>

        <div className="w-full px-[5vw] max-md:px-0 space-y-[2vw] max-md:space-y-[6vw] ">

          {/* Static Label */}
          <p className="text-30 max-md:w-fit max-md:mx-auto ">AI Now:</p>

          {/* Cards */}
          <div className="w-full flex justify-between max-sm:flex-col flex-wrap gap-y-[2vw] max-md:gap-y-[6vw] max-sm:gap-y-[6vw]">
            {items?.map((item, index) => (
              <div
                key={index}
                className="w-[49%] max-md:w-[47%] h-[15vw] max-md:h-[28vw] max-sm:w-full max-sm:h-[42vw] rounded-[1.2vw] max-sm:rounded-[3vw] max-md:rounded-[2vw] border border-primary-blue p-[1.5vw] flex flex-col justify-between max-sm:p-[3.5vw] max-md:p-[2.5vw] fadeup"
              >
                <div className="rounded-full size-[4vw] max-md:size-[6.5vw] max-sm:size-[15vw] p-[2vw] max-md:p-[3vw] max-sm:p-[3vw] border text-32 font-heading flex items-center justify-center">
                  {item.number}
                </div>

                <p className="text-30 font-light w-[80%] max-sm:leading-[1.4] max-sm:w-[90%]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="hidden max-sm:block text-30 text-center max-sm:pt-[5vw]">
          <p>
              It is not about building Insurance AI. It is about running it as a system across the enterprise.
          </p>
        </div> */}

        {/* Extra HTML Content */}
        {extra && (
          <div
            className="w-[60%] text-center text-30 fadeup max-sm:w-full"
            dangerouslySetInnerHTML={{ __html: extra }}
          />
        )}

      </div>
    </section>
  );
};

export default Runtime;
