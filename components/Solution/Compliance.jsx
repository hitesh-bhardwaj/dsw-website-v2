import Image from "next/image";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const Compliance = ({ complianceContent }) => {
  const { heading, subtext, logos = [], footerText, sectionId = "compliance" } =
    complianceContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id={sectionId}
    >
      <div className="w-full h-full gap-y-[2vw] flex flex-col items-center text-center">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] mx-auto w-[65%]">
            {heading}
          </h2>
        </HeadingAnim>

        <Copy>
          <p className="text-30">{subtext}</p>
        </Copy>

        <div className="flex justify-between w-[70%] my-[4vw] fadeup">
          {logos.map((logo, index) => (
            <div key={index} className="size-[10vw]">
              <Image
                src={logo.src}
                alt={logo.alt ?? "compliance-logo"}
                width={logo.width ?? 100}
                height={logo.height ?? 100}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>

        <Copy>
          <p className="text-30 w-[45%]">{footerText}</p>
        </Copy>
      </div>
    </section>
  );
};

export default Compliance;
