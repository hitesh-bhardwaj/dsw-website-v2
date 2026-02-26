"use client"
import React from "react";
import CaseStudyCard from "./CaseStudyCard";
import { useModal } from "../ModalProvider";
import { downloadPdf } from "@/lib/downloadPdf";
import { caseStudies } from "@/data/caseStudiesData";

const CaseStudyListing = () => {
  const { openWith, formSubmitted } = useModal();

  const handleCaseStudyDownload = async (e, pdfUrl, companyName) => {
    e.preventDefault();
    
    // If form already submitted, download directly
    if (formSubmitted) {
      try {
        await downloadPdf(pdfUrl, `${companyName}-case-study.pdf`);
      } catch (err) {
        console.error("Download failed:", err);
      }
    } else {
      // Otherwise, open form modal with PDF payload
      openWith({ pdfUrl, fileName: `${companyName}-case-study.pdf` });
    }
  };

  return (
    <section className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-md:px-[6vw] max-sm:py-[15%]" id="casestudies-listing">
      <div className="w-full h-full gap-y-[3vw] max-md:gap-[5vw] max-sm:gap-[6vw] flex flex-col items-center text-center">

        {/* List Layout */}
        <div className="w-full  max-md:max-w-full mt-[4vw] mt-[10vw] fadeup">
          <div className="flex flex-col gap-[1vw] items-center max-md:gap-[3vw] max-sm:gap-[6vw]">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard 
                key={caseStudy.id} 
                caseStudy={caseStudy} 
                onDownload={handleCaseStudyDownload}
                layout="list"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyListing;
