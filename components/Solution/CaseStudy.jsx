import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import SecondaryButton from "../Buttons/SecondaryButton";
import Image from "next/image";

const CaseStudy = ({ caseStudyContent }) => {
  const {
    heading,
    subheading,
    company,
    description,
    button,
    imgSrc,
    imageContent,
    sectionId = "casestudy",
  } = caseStudyContent;

  const isPdf =
    button?.href?.toLowerCase().endsWith(".pdf") ||
    button?.type === "pdf";

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id={sectionId}
    >
      <div className="w-full h-full gap-y-[2vw] max-sm:gap-[6vw] flex flex-col items-center text-center">
        
        {/* Heading */}
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] leading-[1.2] max-sm:leading-[1.4] mx-auto">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Subheading */}
        <HeadingAnim>
          <h3 className="text-56 text-[#0A1B4B] max-sm:w-[80%] mx-auto max-sm:text-30">
            {subheading}
          </h3>
        </HeadingAnim>

        {/* Case Study Card */}
        <div className="w-[75%] h-[30vw] rounded-[1.2vw] overflow-hidden flex border border-black/20 mt-[4vw] fadeup max-sm:flex-col max-sm:w-full max-sm:rounded-[6vw] max-sm:h-[120vw] max-sm:mt-[10vw]">
          
          {/* Image Section */}
          <div className="w-[50%] max-sm:w-full bg-primary-blue h-full text-white text-56 flex justify-center items-center font-medium max-sm:h-[45%]">
            {/* {imageContent} */}
            <Image src={imgSrc} alt={'case study img'} width={400} height={400} className="w-full h-full object-cover"/>
          </div>

          {/* Content Section */}
          <div className="w-[50%] max-sm:w-full p-[2.5vw] flex flex-col gap-[1.5vw] justify-between text-left pb-[4vw] max-sm:p-[5vw] max-sm:gap-[4vw]">
            
            <h4 className="text-44 font-medium text-[#0A1B4B]">
              {company}
            </h4>

            <p className="text-24">
              {description}
            </p>

            {button?.present && (
              <div className="w-fit">
                <SecondaryButton
                  text={button.text}
                  href={button.href}
                  {...(isPdf && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
