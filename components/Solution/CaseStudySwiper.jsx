"use client"
import React, { useRef, useState } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import SecondaryButton from "../Buttons/SecondaryButton";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";
import { useModal } from "../ModalProvider";
import { downloadPdf } from "@/lib/downloadPdf";

const styles = `
  .swiper-slide-shadow {
    background: rgba(0, 0, 0, 0.05) !important;
  }
  .swiper-slide-shadow-left {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)) !important;
  }
  .swiper-slide-shadow-right {
    background: linear-gradient(to left, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)) !important;
  }
  .swiper-slide-shadow-top {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)) !important;
  }
  .swiper-slide-shadow-bottom {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)) !important;
  }
`;

const CaseStudySwiper = () => {
  const swiperRef = useRef(null);
  const { openWith, formSubmitted } = useModal();
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

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
      <style>{styles}</style>
      <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-md:px-[6vw] max-sm:py-[15%]"
      id="casestudy"
    >
      <div className="w-full h-full gap-y-[3vw] max-md:gap-[5vw] max-sm:gap-[6vw] flex flex-col items-center text-center">
        
        
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] leading-[1.2] max-sm:leading-[1.4] mx-auto capitalize w-[80%]">
            Case Studies
          </h2>
        </HeadingAnim>

        
        <HeadingAnim>
          <h3 className="text-56 text-[#0A1B4B] max-sm:w-[80%] mx-auto max-md:text-[3.5vw] max-sm:text-30">
            Real deployment. Measurable operational impact.
          </h3>
        </HeadingAnim>

        
        <div className="w-full max-w-[75%] max-md:max-w-[95%] max-sm:max-w-full mt-[4vw] max-sm:mt-[10vw] fadeup relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex);
            }}
            effect="cards"
            loop={true}
            grabCursor
             autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
            modules={[EffectCards, Navigation, Autoplay]}
            cardsEffect={{
              slideShadows: true,
              rotate: false,
              perSlideOffset: 8,
            }}
            className="w-full h-[30vw] max-md:h-[60vw] max-sm:h-[160vw]"
          >
            {caseStudies.map((caseStudy) => (
              <SwiperSlide
                key={caseStudy.id}
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
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
        <div className="flex gap-[1vw] justify-center mt-[1vw] max-sm:mt-[6vw]">
            <PreviousButton onClick={handlePrevClick} isDisabled={activeSlide === 0} />
            <NextButton onClick={handleNextClick} isDisabled={activeSlide === caseStudies.length - 1} />
        </div>
      </div>
    </section>
    </>
  );
};

export default CaseStudySwiper;


 const caseStudies = [
    {
      id: 1,
      company: "Persistency",
      description:
        "India’s leading Life Insurer, serving millions across urban and rural markets through a wide distribution network.",
      imgSrc: "/assets/case-studies/insurance/persistency.png",
      button: {
        present: true,
        text: "Download Case Study",
        href: "/assets/case-studies/persistency.pdf",
        type: "pdf",
      },
    },
    {
      id: 2,
      company: "Predicting fraud",
      description:
        "The Leading Life Insurance company of India offering a broad portfolio of protection, savings, and investment products across urban and rural markets.",
      imgSrc: "/assets/case-studies/insurance/predicting-fraud.png",
      button: {
        present: true,
        text: "Download Case Study",
        href: "/assets/case-studies/predicting-fraud.pdf",
        type: "pdf",
      },
    },
    {
      id: 3,
      company: "Customer Unification",
      description:
        "A leading Health Insurance company that serves millions of policyholders with a strong focus on healthcare integrity,operational scale, and patient-first principles",
      imgSrc: "/assets/case-studies/insurance/customer-data.png",
      button: {
        present: true,
        text: "Download Case Study",
        href: "/assets/case-studies/customer-unification.pdf",
        type: "pdf",
      },
    },
    {
      id: 4,
      company: "Sales Performance Dashboard",
      description:
        "India’s leading Life Insurance company is a leading insurer in India, serving diverse markets across the country with a wide range of insurance solutions.",
      imgSrc: "/assets/case-studies/insurance/mahindra.png",
      button: {
        present: true,
        text: "Download Case Study",
        href: "/assets/case-studies/sales-performance-dashboard.pdf",
        type: "pdf",
      },
    },
    {
      id: 5,
      company: "Email Automation",
      description:
        "India’s leading Health Insurance Company is committed to clinical excellence, patient centricity, and ethical practices.",
      imgSrc: "/assets/case-studies/insurance/email-automation.png",
      button: {
        present: true,
        text: "Download Case Study",
        href: "/assets/case-studies/email-automation.pdf",
        type: "pdf",
      },
    },
    {
      id: 6,
      company: "PIVC",
      description:
        "This Insurance company is a top-tier life insurer in India, serving millions across urban and rural markets.",
      imgSrc: "/assets/case-studies/insurance/pivc.png",
      button: {
        present: true,
        text: "Download Case Study",
        href: "/assets/case-studies/pivc.pdf",
        type: "pdf",
      },
    },
    {
      id: 7,
      company: "Customer Data Enrichment",
      description:
        "A leading life insurer in India, offering a broad portfolio of protection, savings, and investment products across urban and rural markets.",
      imgSrc: "/assets/case-studies/insurance/data-enrichment.png",
      button: {
        present: true,
        text: "Download Case Study",
        href: "/assets/case-studies/customer-data-enrichment.pdf",
        type: "pdf",
      },
    },
  ];