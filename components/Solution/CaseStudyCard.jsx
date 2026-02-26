"use client"
import React from 'react'
import SecondaryButton from '../Buttons/SecondaryButton'
import Image from 'next/image';
import { useModal } from '../ModalProvider';
import { downloadPdf } from "@/lib/downloadPdf";


const CaseStudyCard = ({caseStudy}) => {
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
    <>
    <div className='w-[75%] max-sm:w-full h-[30vw] rounded-[1.2vw] max-md:rounded-[3vw] max-md:h-[45vw] overflow-hidden flex border border-black/20 mt-[4vw] fadeup max-sm:flex-col max-md:w-[95%] max-sm:rounded-[6vw] max-sm:h-full max-sm:mt-[10vw]'>
    <div
                className="rounded-[1.2vw] max-md:rounded-[3vw] max-sm:rounded-[6vw] border border-black/20 overflow-hidden !flex"
              >
                <div className="flex h-full w-full max-sm:flex-col bg-white">
                  {/* Image Section */}
                  <div className="w-[50%] max-sm:w-full bg-primary-blue h-full text-white text-56 flex justify-center items-center font-medium max-sm:h-[45%]">
                    <Image
                      src={caseStudy.imgSrc}
                      alt={caseStudy.company}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="w-[50%] max-sm:w-full p-[2.5vw] max-md:p-[3vw] flex flex-col gap-[1.5vw] justify-between text-left pb-[4vw] max-sm:p-[5vw] max-sm:gap-[4vw]">
                    
                    <h4 className="text-44 font-medium text-[#0A1B4B]">
                      {caseStudy.company}
                    </h4>

                    <p className="text-24 leading-[1.2] max-md:leading-[1.3] max-sm:leading-[1.4]">
                      {caseStudy.description}
                    </p>

                    {caseStudy.button?.present && (
                      <div className="w-fit">
                        <div
                          onClick={(e) => handleCaseStudyDownload(e, caseStudy.button.href, caseStudy.company)}
                          style={{ cursor: "pointer" }}
                        >
                          <SecondaryButton
                            text={caseStudy.button.text}
                            href="#"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </div>
    </>
  )
}

export default CaseStudyCard