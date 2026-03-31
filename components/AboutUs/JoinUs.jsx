"use client";

import React, { useRef, useState } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import { RollOut } from "../Svg/InfosysFinacle/RolllOut";
import { ReducedCost } from "../Svg/InfosysFinacle/ReducedCost";
import { EnterpriseGrade } from "../Svg/InfosysFinacle/EnterpriseGrade";
import { SkilledTeam } from "../Svg/InfosysFinacle/SkilledTeam";
import CornerDecorations from "../CornerDecorations";
import PrimaryButton from "../Buttons/PrimaryButton";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";

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

function ValueCard({ deployment }) {
  return (
    <div className="relative fadeup max-md:w-[48%]">
      <div
        className="
          relative group w-[21.5vw] h-[14vw] px-[1vw] py-[2vw]
          flex flex-col justify-between
          border border-border-color bg-white
          hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg
          duration-300 ease-in-out
          max-md:w-full max-md:h-[30vw] max-md:p-[4vw]
        "
      >
        <CornerDecorations />
        <div className="w-[4vw] h-[4vw] text-primary-blue max-md:size-[7vw]">
          {deployment.icon}
        </div>
        <p className="text-24 h-8 leading-[1.2] text-foreground max-md:h-auto">
          {deployment.title}
        </p>
      </div>
    </div>
  );
}

function ValueCardMobile({ deployment }) {
  return (
    <div
      className="
        relative flex h-[50vw] w-[50vw] flex-shrink-0 flex-col justify-between
        border border-solid border-border-color bg-white
        px-[5vw] pb-[8vw] pt-[5vw]
        items-end max-sm:items-start
      "
    >
      <CornerDecorations />
      <div className="h-[12vw] w-[12vw] text-primary-blue">
        {deployment.icon}
      </div>
      <p className="text-24 w-full font-light leading-[1.2] text-foreground">
        {deployment.title}
      </p>
    </div>
  );
}

const JoinUs = () => {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <>
      <style>{styles}</style>

      <section className="relative h-fit w-full px-[5vw] pb-[3%] pt-[10%] max-md:overflow-hidden max-md:py-[10%] max-sm:h-fit max-sm:px-0 max-sm:py-[15%] max-sm:pb-[15%]">
        <div className="z-10 h-fit space-y-[5.5vw] max-sm:space-y-[12vw]">
          <div className="space-y-[2vw] text-center max-sm:px-[7vw] max-sm:space-y-[7vw] max-md:space-y-[4vw]">
            <HeadingAnim>
              <h2 className="text-76 font-heading capitalize text-[#0A1B4B]">
                Join us
              </h2>
            </HeadingAnim>

            <Copy>
              <p className="text-24 mx-auto w-[55%] font-sans leading-[1.4] text-foreground max-md:w-[80%] max-sm:w-full">
                We&apos;re building a category - defining foundation for enterprise AI
                - and we&apos;re looking for people who want to solve deep,
                meaningful problems.
              </p>
            </Copy>
          </div>

          {/* Image Slider */}
          <div className="fadeup relative w-full max-sm:px-[7vw]">
            <div className="mx-auto w-full max-w-[70%] max-md:max-w-[88%] max-sm:max-w-full">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveSlide(swiper.realIndex);
                }}
                effect="cards"
                loop={true}
                grabCursor
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                modules={[EffectCards, Navigation, Autoplay]}
                cardsEffect={{
                  slideShadows: true,
                  rotate: false,
                  perSlideOffset: 8,
                }}
                className="h-[37vw] w-full max-md:h-[58vw] max-sm:h-[60vw]"
              >
                {joinUsSlides.map((slide) => (
                  <SwiperSlide
                    key={slide.id}
                    className="overflow-hidden rounded-[2vw] border border-black/20 max-md:rounded-[3vw] max-sm:rounded-[4vw]"
                  >
                    <div className="h-full w-full bg-white">
                      <Image
                        src={slide.imgSrc}
                        alt={slide.alt}
                        width={1772}
                        height={756}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-[2vw] flex justify-center gap-[1vw] max-md:gap-[3vw] max-sm:mt-[6vw] max-sm:gap-[5vw]">
              <PreviousButton
                onClick={handlePrevClick}
                isDisabled={false}
              />
              <NextButton
                onClick={handleNextClick}
                isDisabled={false}
              />
            </div>
          </div>

          <div className="mx-auto">
            <Copy>
              <p className="text-30 text-center font-sans leading-[1.4] tracking-[0.025vw] text-foreground">
                If you&apos;re Excited by
              </p>
            </Copy>
          </div>

          {/* Desktop / Tablet cards */}
          <div className="flex justify-between max-sm:hidden max-md:flex-wrap max-md:gap-y-[3vw]">
            {values.map((deployment, index) => (
              <ValueCard key={index} deployment={deployment} />
            ))}
          </div>

          {/* Mobile cards */}
          <div className="mobile-scrollbar fadeup hidden w-full overflow-x-auto overflow-y-visible px-[7vw] pb-6 max-sm:block">
            <div className="flex w-max flex-nowrap items-center gap-[5vw]">
              {values.map((deployment, index) => (
                <ValueCardMobile key={index} deployment={deployment} />
              ))}
            </div>
          </div>

          <div className="mx-auto">
            <Copy>
              <p className="text-30 text-center font-sans leading-[1.4] text-foreground">
                …you&apos;ll feel at home at DSW.
              </p>
            </Copy>
          </div>

          <div className="fadeup mx-auto flex h-fit items-center justify-center">
            <PrimaryButton text={"View Open Roles"} href="#" />
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinUs;

const values = [
  {
    icon: <RollOut />,
    title: "Production-scale AI systems",
  },
  {
    icon: <ReducedCost />,
    title: "Governed runtimes",
  },
  {
    icon: <EnterpriseGrade />,
    title: "Enterprise integration complexity",
  },
  {
    icon: <SkilledTeam />,
    title: "Agentic + LLM operationalization",
  },
];

const joinUsSlides = [
  {
    id: 1,
    imgSrc: "/assets/about/team.png",
    alt: "Join us team image 1",
  },
  {
    id: 2,
    imgSrc: "/assets/about/join-us-img-2.jpg",
    alt: "Join us team image 2",
  },
  {
    id: 3,
    imgSrc: "/assets/about/join-us-img.jpg",
    alt: "Join us team image 3",
  },
];