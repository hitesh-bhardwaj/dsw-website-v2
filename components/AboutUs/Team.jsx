"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { FreeMode } from "swiper/modules";
import HeadingAnim from "../Animations/HeadingAnim";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";
import { LinkedIn } from "../Svg/Icons";

export default function Team({ heading, cardsData, teamId = "team" }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const updatePosition = () => {
      const containerWidth = track.clientWidth || 0;
      const thumbWidth = thumb.clientWidth || 0;
      const max = Math.max(containerWidth - thumbWidth, 0);
      const px = Math.round(progress * max);
      thumb.style.transform = `translateX(${px}px)`;
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [progress]);

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
    <section className="relative w-full h-fit space-y-[6vw] max-md:h-full flex flex-col pb-0 max-sm:pb-[28vw]">
      <div className="w-full flex h-full max-sm:px-[5vw] gap-[1vw] items-end justify-between max-sm:flex-col max-sm:items-start">
        <HeadingAnim>
          <h2 className="text-56 text-[#0A1B4B] w-[45%] max-md:w-full">{heading}</h2>
        </HeadingAnim>

        <div className="flex fadeup gap-6 mt-12 max-sm:mt-0 max-md:mt-[10vw] max-md:items-center max-md:justify-center max-md:absolute max-md:bottom-[6vw] max-sm:bottom-[8vw] max-md:right-[8%]">
          <PreviousButton onClick={handlePrev} isDisabled={activeIndex === 0} />
          <NextButton onClick={handleNext} isDisabled={isEnd} />
        </div>
      </div>

      {/* Swiper */}
      <div className="">
        <Swiper
          ref={swiperRef}
          slidesPerView={"auto"}
          modules={[FreeMode]}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            setIsEnd(swiper.isEnd);
          }}
          onInit={(swiper) => {
            setIsEnd(swiper.isEnd);
          }}
          onProgress={(swiper, progress) => setProgress(progress)}
          freeMode
          className="overflow-visible! max-md:pt-[5vw]! pl-[27%]!  max-md:pl-[5vw]! max-md:w-auto max-sm:mb-[2%] max-md:mb-[10%] max-md:pr-[10%]! "
          breakpoints={{
            0: {
              slidesPerView: "auto",
              spaceBetween: 30,
              slidesOffsetAfter: 0,
            },
            768: {
              slidesPerView: "auto",
              spaceBetween: 30,
              slidesOffsetAfter: 0,
            },
            1025: {
              slidesPerView: "auto",
              spaceBetween: 30,
              slidesOffsetAfter: 0,
            },
          }}
        >
          {cardsData.map((card, index) => (
            <SwiperSlide
              key={index}
              className={`!w-[20vw] fadeup max-md:!w-[50vw] max-sm:!w-[80vw]  experts-cards-${teamId}`}
            >
              <Link href={card.link} key={index} target="_blank" className="w-full flex-shrink-0">
                <div className="relative rounded-[1.5vw] max-sm:w-full max-sm:mx-auto overflow-hidden w-[95%] h-[22vw] max-md:mx-auto max-sm:h-[40vh] max-md:h-[38vh] max-md:w-auto max-sm:rounded-3xl! max-md:rounded-[4vw] border border-dashed border-primary-blue p-3">
                  <Image
                    src={card.src}
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover rounded-[1.5vw] max-sm:rounded-2xl! max-md:rounded-[4vw]"
                    alt={card.name}
                  />
                  <div className="absolute right-[4%] top-[4%] z-[5] rounded-full flex items-center justify-center bg-[#F16B0D] text-white h-[2.5vw] w-[2.5vw] p-1.5 max-md:h-[10vw] max-md:w-[10vw]">
                    <LinkedIn />
                  </div>
                </div>
                <div className="space-y-[.5vw] w-full mt-[1vw] max-md:mt-[5vw] max-sm:pl-[2vw] max-sm:space-y-[2.5vw] max-sm:mt-[5vw] max-md:pl-[1vw] text-center">
                  <p className="text-32 font-medium max-sm:text-[5.5vw]">{card.name}</p>
                  <p className="w-[75%] text-24 mx-auto">{card.role}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Progress Bar — right-aligned, 75% on desktop, 90% on mobile */}
        <div className="w-full mt-[5vw] max-sm:mt-[10vw] flex justify-end">
          <div
            ref={trackRef}
            className="w-[75%] max-md:w-[90%] max-sm:mx-auto h-[5px] bg-gray-300 rounded-full relative overflow-hidden"
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 h-full w-[20%] max-md:w-[20%] bg-primary-blue rounded-full"
              style={{
                transform: "translateX(0px)",
                transition: "transform 350ms linear",
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-end ">
          <div className={`workshop-scrollbar-${teamId}  w-[75%] cursor-grab max-md:w-full max-md:hidden`} />
        </div>
      </div>


   
    </section>
  );
}