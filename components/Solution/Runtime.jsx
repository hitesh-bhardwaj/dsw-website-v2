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
      <div className="w-full h-full gap-y-[2vw] flex flex-col items-center">

        {/* Heading */}
        <HeadingAnim>
          <h2 className="text-[#0A1B4B] text-76 text-center w-[80%] capitalize">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Description */}
        <Copy>
          <p className="text-center text-30 w-[60%]">
            {description}
          </p>
        </Copy>

        <div className="w-full px-[5vw] space-y-[2vw]">

          {/* Static Label */}
          <p className="text-30">AI Now:</p>

          {/* Cards */}
          <div className="w-full flex justify-between flex-wrap gap-y-[2vw]">
            {items?.map((item, index) => (
              <div
                key={index}
                className="w-[49%] h-[15vw] rounded-[1.2vw] border border-primary-blue p-[1.5vw] flex flex-col justify-between"
              >
                <div className="rounded-full size-[4vw] p-[2vw] border text-32 font-heading flex items-center justify-center">
                  {item.number}
                </div>

                <p className="text-30 font-light w-[80%]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

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
