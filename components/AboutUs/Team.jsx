"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { FreeMode, Scrollbar } from "swiper/modules";
import HeadingAnim from "../Animations/HeadingAnim";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";

export default function Team({ heading , cardsData, teamId = "team"}) {
  useGSAP(() => {
    gsap.from(`.experts-cards-${teamId}`, {
      yPercent: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: `.experts-cards-${teamId}`,
        start: "top 80%",
      },
    });
  });
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);



  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="relative w-full h-fit  space-y-[6vw] max-md:h-full overflow-hidden flex flex-col">
      <div className="w-full flex h-full gap-[1vw] items-end justify-between max-sm:flex-col max-sm:items-start">
        <HeadingAnim>
        <h2 className="text-56 text-[#0A1B4B] w-[45%] max-md:w-full">{heading}</h2>
        </HeadingAnim>

        <div className="flex fadeup gap-6 mt-12 max-sm:mt-0 max-md:mt-[10vw] max-md:items-center max-md:justify-center max-md:absolute max-md:bottom-0 max-sm:bottom-0  max-md:right-[8%] ">
          <PreviousButton onClick={handlePrev} isDisabled={activeIndex===0} />
          <NextButton onClick={handleNext} isDisabled={activeIndex === totalSlides} />
        </div>
      </div>
      {/* Swiper */}
      <div className="">
      <Swiper
        ref={swiperRef}
        slidesPerView={"auto"}
        modules={[ FreeMode, Scrollbar]}
        // spaceBetween={20}
         scrollbar={{
            el: `.workshop-scrollbar-${teamId}`,
            draggable: true,
            hide: false, // ✅ keep thumb visible
          }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onInit={(swiper) => setTotalSlides(swiper.slides.length)}
        freeMode
        className="!overflow-visible max-md:!pt-[5vw] !pl-[27%] max-md:!pl-0 max-md:w-full max-sm:mb-[5%] max-md:mb-[10%] max-sm:pr-[20%] "
        breakpoints={{
          0: {
            slidesPerView: 1.37,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 1.65,
            spaceBetween: 30,
          },
          1025: {
            slidesPerView: "auto",
            spaceBetween: 30,
          },
        }}
       
      >
        {cardsData.map((card, index) => (
          <SwiperSlide
            key={index}
            className={`!w-[20vw] max-md:!w-[50vw]  max-sm:!w-[60vw]  experts-cards-${teamId} `}
          >
            <Link href={card.link} key={index} target="_blank" className="w-full flex-shrink-0 ">
              <div className="relative rounded-[1.5vw] max-sm:w-full max-sm:mx-auto overflow-hidden w-[95%] h-[22vw] max-md:mx-auto max-sm:h-[32vh] max-md:h-[38vh] max-md:w-auto max-sm:rounded-[6vw] max-md:rounded-[3vw] border border-dashed border-primary-blue p-3">
                <Image
                  src={card.src}
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover rounded-[1.5vw]"
                  alt={card.name}
                />
                <div className="absolute right-[4%] top-[4%] z-[5] rounded-full flex items-center justify-center bg-[#F16B0D] h-[2.5vw] w-[2.5vw] max-md:h-[10vw] max-md:w-[10vw]">
                  <Image
                    src={"/assets/icons/social/linkedin.svg"}
                    height={15}
                    width={15}
                    alt="linkedin"
                    className="h-[1vw] w-auto max-md:h-[4vw]"
                  />
                </div>
              </div>
              <div className="space-y-[.5vw] w-full mt-[1vw] max- max-md:mt-[5vw]  max-sm:pl-[2vw] max-sm:space-y-[2.5vw] max-sm:mt-[5vw] max-md:pl-[1vw] text-center">
                <p className="text-32 font-medium max-sm:text-[5.5vw]">{card.name}</p>
                <p className="w-[75%] text-24 mx-auto">{card.role}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full space-y-3">
        <div className="w-full flex justify-end">
          <div className="w-[75%] max-md:w-full h-1 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full w-12 bg-primary-blue rounded-full transition-all duration-300"
              style={{
                marginLeft: totalSlides > 0 ? `${((activeIndex) / (totalSlides - 1)) * 100}%` : "0%"
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className={`workshop-scrollbar-${teamId} w-[75%] cursor-grab max-md:w-full max-md:hidden`} />
        </div>
      </div>


      </div>
      
    </section>
  );
}

