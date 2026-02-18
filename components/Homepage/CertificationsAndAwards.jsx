import Image from "next/image";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const CertificationsAndAwards = ({ certificationsContent }) => {
  const { heading, subtext, footerText, sectionId = "certifications" } =
    certificationsContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id={sectionId}
    >
      <div className="w-full h-full gap-y-[2vw] flex flex-col items-center text-center">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] mx-auto w-[65%] max-sm:w-full">
            {heading}
          </h2>
        </HeadingAnim>

        <Copy>
          <p className="text-30">{subtext}</p>
        </Copy>

        {/* Certifications Row */}
        <div className="flex justify-between items-center w-[90%] my-[4vw] fadeup max-sm:flex-wrap max-sm:justify-center max-sm:w-full max-sm:gap-[5vw]">
          {certifications.map((logo, index) => {
            const isLast = index === certifications.length - 1;
            return (
              <div
                key={index}
                className={isLast ? `w-[25vw] h-[10vw] max-sm:h-[20vw] max-sm:w-[70vw]` : `size-[10vw] max-sm:size-[20vw]`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt ?? "compliance-logo"}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>
            );
          })}
        </div>

        {/* Awards Row */}
        <div className="flex justify-between items-start w-full my-[4vw] fadeup max-sm:flex-wrap max-sm:justify-center max-sm:gap-[5vw]">
          {awards.map((logo, index) => {
            const isLastTwo = index >= awards.length - 2;
            return (
              <div
                key={index}
                className={`flex flex-col items-start gap-y-[0.8vw] ${
                  isLastTwo ? "w-[14vw] max-sm:w-[30vw]" : "w-[10vw] max-sm:w-[25vw]"
                }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt ?? "compliance-logo"}
                  width={300}
                  height={300}
                  className={`object-contain ${
                    isLastTwo ? "w-full h-[13vw] max-sm:h-[28vw]" : "w-full h-[10vw] max-sm:h-[25vw]"
                  }`}
                />
                {isLastTwo && logo.caption && (
                  <p className="text-24 font-medium text-[#0A1B4B] leading-tight">
                    {logo.caption}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <Copy>
          <p className="text-30 w-[45%] max-sm:w-full max-sm:pt-[10vw]">{footerText}</p>
        </Copy>
      </div>
    </section>
  );
};

export default CertificationsAndAwards;


const certifications = [
  { src: "/assets/certifications/iso-42001.png", alt: "ISO 42001" },
  { src: "/assets/certifications/iso-27001.png", alt: "ISO 27001" },
  { src: "/assets/certifications/soc-2-compliant.png", alt: "SOC 2" },
  { src: "/assets/certifications/hippa-compliant.png", alt: "HIPAA" },
  { src: "/assets/certifications/gdpr-compliant.png", alt: "GDPR" },
  { src: "/assets/certifications/top-company.png", alt: "Top Company" }, // ← width increased to 15vw
];

const awards = [
  { src: "/assets/certifications/top-10-ai-startups.png", alt: "top 10 ai startup" },
  { src: "/assets/certifications/winner-of-pitchjam.png", alt: "winner of pitchjam" },
  { src: "/assets/certifications/challenger-pema-quadrant.png", alt: "challenger-pema-quadrant" },
  { src: "/assets/certifications/best-startup-application.png", alt: "best startup application" },
  { src: "/assets/certifications/top-ai-startup.png", alt: "top ai startup" },
  {
    src: "/assets/certifications/infosys-finacle.png",
    alt: "infosys-finacle",
    caption: "Infosys Finacle’s Open Source Services Partner FY25",       
  },
  {
    src: "/assets/certifications/insurtech.png",
    alt: "insurtech",
    caption: "InsurTech of the Year 2025",      
  },
];