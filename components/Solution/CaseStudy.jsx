import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import CaseStudyCard from "./CaseStudyCard";

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
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-md:px-[6vw] max-sm:py-[15%]"
      id={sectionId}
    >
      <div className="w-full h-full gap-y-[3vw] max-md:gap-[5vw] max-sm:gap-[6vw] flex flex-col items-center text-center">
        
        {/* Heading */}
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] leading-[1.2] max-sm:leading-[1.4] mx-auto capitalize leading-[1.2] w-[80%] capitalize">
            {heading}
          </h2>
        </HeadingAnim>

        {/* Subheading */}
        <HeadingAnim>
          <h3 className="text-56 text-[#0A1B4B] max-sm:w-[80%] mx-auto max-md:text-[3.5vw] max-sm:text-30">
            {subheading}
          </h3>
        </HeadingAnim>

        {/* Case Study Card */}
       <CaseStudyCard caseStudy={caseStudyContent}/>
      </div>
    </section>
  );
};

export default CaseStudy;
