"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";
import HeadingAnim from "../Animations/HeadingAnim";


export default function WorkshopFlow({ sessionsData, space }) {
  useGSAP(() => {
    gsap.from(".experts-cards", {
      yPercent: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".experts-cards",
        start: "top 80%",
      },
    });
  });
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <section className="relative w-full h-fit space-y-[3vw] px-[5vw] max-md:h-full overflow-hidden py-[7%] max-sm:py-[10%]">
     <div className="w-full flex flex-col h-full  gap-[1vw] max-md:flex-col max-md:items-start">
  <HeadingAnim>
    <h2 className="text-76 text-[#0A1B4B] whitespace-nowrap max-sm:whitespace-normal leading-[1.2] text-center max-md:mx-auto">
      Workshop Flow & Key Sessions
    </h2>
  </HeadingAnim>

  <div className="flex fadeup gap-6  max-md:hidden items-end justify-end">
    <PreviousButton onClick={handlePrev} isDisabled={activeIndex === 0} />
    <NextButton
      onClick={handleNext}
      isDisabled={sessionsData.length - 1 === activeIndex}
    />
  </div>
</div>
      <div className="h-fit flex flex-col  items-center justify-center  w-full max-sm:my-[15vw] max-md:mt-[7vw]">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, FreeMode, Scrollbar]}
          freeMode
          spaceBetween={35}
          scrollbar={{
            el: ".workshop-scrollbar",
            draggable: true,
            hide: false, // ✅ keep thumb visible
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full !overflow-visible"
            breakpoints={{
            640: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 1.3, spaceBetween: 40 },
            1025: { slidesPerView: 2.4, spaceBetween: 10 },
          }}
        >
          {sessionsData.map((card, index) => (
            <SwiperSlide key={index} className="experts-cards w-full h-full">
              <SwiperCard
                title={card.title}
                list={card.list}
                duration={card.duration}
                onHover={() => setActiveIndex(index)}
                isActive={activeIndex === index}
                space={space}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="workshop-scrollbar mt-10 w-full cursor-grab max-md:hidden" />

        <div className="max-md:flex fadeup gap-6 mt-12 hidden w-full justify-center">
          <PreviousButton onClick={handlePrev} isDisabled={activeIndex === 0} />
          <NextButton
            onClick={handleNext}
            isDisabled={sessionsData.length - 1 === activeIndex}
          />
        </div>
      </div>
    </section>
  );
}

const SwiperCard = ({ title, list, duration, onHover, isActive, space }) => {
  return (
    <>
      <div
        className="relative py-[3vw] !min-h-[60vh] h-full max-md:py-[8vw] max-md:px-[8vw] rounded-[1.5vw] overflow-hidden w-[36vw] px-[2.5vw] max-md:min-h-[60vh] max-sm:min-h-[70vh] max-md:h-fit max-md:w-full max-sm:w-[95%] max-sm:mx-auto max-md:rounded-[6vw] border border-[#0205FA] group cursor-grab hover:bg-[#EFF1FB] transition-all duration-300 ease-in-out "
        onMouseEnter={onHover}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r from-light-blue to-dark-blue transition-opacity ease-in-out duration-500 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute right-[5%] max-sm:top-[5%] max-sm:right-[5%] top-[5%] z-[5] rounded-full flex items-center justify-center h-[4.8vw] w-[4.8vw] max-sm:h-[15vw]  max-sm:w-[15vw] max-md:w-[12vw] max-md:h-[12vw] border border-[#111111]">
          <p className="text-foreground max-sm:text-[4.5vw] font-light max-sm:font-medium max-md:text-[3vw] text-[1.5vw]">
            {duration}
          </p>
        </div>
        <div className="h-full flex flex-col justify-between relative z-[10]">
          <div className=" max-w-[80%] max-sm:w-[70%] max-sm:leading-[1.4]">
            <h3 className="text-32 font-medium text-foreground">{title}</h3>
          </div>
          <div className="w-full  max-md:space-y-[3vw]  py-[1vw] max-sm:mt-[8vw] mt-[5vw]">
            <ul className={`list-disc marker:text-sm  pl-[2vw] max-sm:pl-[5vw] max-sm:space-y-[6vw] ${space}`}>
              {list.map((item, index) => (
                <li
                  key={index}
                  className="text-24 text-foreground "
                >
                  <span className=" max-md:w-full ">
                    {item.heading}{" "}
                  </span>{" "}
                  {item.para}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
