import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const Runtime = ({ runtimeContent }) => {
  const { heading, description, items, extra } = runtimeContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id="runtime"
    >
      <div className="w-full h-full gap-y-[2vw] max-sm:gap-y-[6vw] flex flex-col items-center">

        {/* Heading */}
        <HeadingAnim>
          <h2 className="text-[#0A1B4B] text-76 text-center w-[80%] capitalize">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Description */}
        <Copy>
          <p className="text-center text-30 w-[60%] max-sm:w-full">
            {description}
          </p>
        </Copy>

        <div className="w-full px-[5vw] max-sm:px-0 space-y-[2vw] max-sm:space-y-[6vw]">

          {/* Static Label */}
          <p className="text-30 max-sm:w-fit max-sm:mx-auto ">AI Now:</p>

          {/* Cards */}
          <div className="w-full flex justify-between max-sm:flex-col flex-wrap gap-y-[2vw] max-sm:gap-y-[6vw]">
            {items?.map((item, index) => (
              <div
                key={index}
                className="w-[49%] h-[15vw] max-sm:w-full max-sm:h-[42vw] rounded-[1.2vw] max-sm:rounded-[3vw] border border-primary-blue p-[1.5vw] flex flex-col justify-between max-sm:p-[3.5vw]"
              >
                <div className="rounded-full size-[4vw] max-sm:size-[13vw] p-[2vw] border text-32 font-heading flex items-center justify-center">
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
            className="w-[60%] text-center text-30 fadeup"
            dangerouslySetInnerHTML={{ __html: extra }}
          />
        )}

      </div>
    </section>
  );
};

export default Runtime;
