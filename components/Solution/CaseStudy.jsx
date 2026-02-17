import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import SecondaryButton from "../Buttons/SecondaryButton";

const CaseStudy = ({ caseStudyContent }) => {
  const {
    heading,
    subheading,
    company,
    description,
    button,
    imageContent,
  } = caseStudyContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id="casestudy"
    >
      <div className="w-full h-full gap-y-[2vw] flex flex-col items-center text-center">
        
        {/* Main Heading */}
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] mx-auto">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Sub Heading */}
        <HeadingAnim>
          <h3 className="text-56 text-[#0A1B4B] mx-auto">
            {subheading}
          </h3>
        </HeadingAnim>

        {/* Case Study Card */}
        <div className="w-[75%] h-[30vw] rounded-[1.2vw] overflow-hidden flex border border-black/20 mt-[4vw] fadeup">
          
          {/* Image / Visual Side */}
          <div className="w-[50%] bg-primary-blue h-full text-white text-56 flex justify-center items-center px-[5vw] font-medium">
            {imageContent}
          </div>

          {/* Content Side */}
          <div className="w-[50%] p-[2.5vw] flex flex-col gap-[1.5vw] justify-between text-left pb-[4vw]">
            
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
