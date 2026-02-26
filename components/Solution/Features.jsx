"use client";

import React from "react";
import { useRef, useEffect, useState } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import SmoothySlider, { Slide } from "../ui/SmoothySlider";

const Features = ({ featuresContent }) => {
  const { heading, cards = [] } = featuresContent;

  const sliderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressAnimRef = useRef(0);

  useEffect(() => {
    let raf;

    const update = () => {
      if (sliderRef.current && sliderRef.current.getProgress) {
        const targetProgress = sliderRef.current.getProgress() * 100;

        progressAnimRef.current +=
          (targetProgress - progressAnimRef.current) * 0.1;
        setProgress(progressAnimRef.current);
      }
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="w-full py-[7%] max-md:py-[10%] max-sm:py-[15%]" id="features">
      <div className="w-full space-y-[7vw] max-sm:space-y-[17vw] max-md:space-y-[10vw]">
        <HeadingAnim>
          <h2 className="text-[#0A1B4B] leading-[1.2] max-sm:leading-[1.4] text-76 text-center w-[85%] capitalize mx-auto">
            {heading}
          </h2>
        </HeadingAnim>

        <div className="w-screen overflow-hidden fadeup">
          <SmoothySlider
            ref={sliderRef}
            className="py-4 cursor-grab active:cursor-grabbing w-screen pr-0 pl-0"
            config={{
              snap: false,
              infinite: false,
              wheel: false,
              setOffset: ({ wrapperWidth, vertical, wrapperHeight }) => {
                const w = vertical ? wrapperHeight : wrapperWidth;
                return w - w * 0.19;
              },
              slidesOffsetBefore: "0vw",
              slidesOffsetAfter: "0vw",
            }}
          >
            {cards.map((card, index) => (
              <Slide
                key={index}
                className={`w-fit px-[1vw] cursor-grab active:cursor-grabbing select-none max-sm:px-3 ${index === 0 ? "ml-[5vw]  max-sm:ml-[5vw] " : ""} ${index === cards.length - 1 ? "mr-[1vw]" : ""}`}
              >
                <div className="w-[32vw] h-[40vw] max-sm:w-[83vw] max-md:h-[70vw] max-md:w-[55vw] max-sm:h-[125vw] border-primary-blue border-t-[5px] max-md:px-[3.5vw] max-md:py-[4vw] bg-[#EFF1FB] p-[2vw] flex flex-col gap-[3vw] cursor-grab active:cursor-grabbinggap-[4vw] max-sm:gap-[7vw] max-sm:py-[7vw] max-sm:px-[5vw]">
                  <h3 className="text-44 max-sm:leading-[1.4] max-md:min-h-[28%] max-sm:h-fit leading-[1.2] ">{card.title}</h3>

                  <p className="text-30">{card.description}</p>

                  <ul className="list-disc marker:text-sm pl-[1vw] max-md:pl-[3vw] max-sm:pl-[5vw] max-sm:leading-[1.4] text-30 max-sm:space-y-[1.5vw] max-md:space-y-[1vw] space-y-[0.5vw]">
                    {card.bullets?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Slide>
            ))}
          </SmoothySlider>

          {/* Progress Bar */}
          <div className="w-[95%] px-[5vw] mt-8 mx-auto ">
            <div className="relative w-full h-[8px] bg-[#E5E5E5] rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-primary-blue rounded-full"
                style={{
                  width: `${100 / cards.length}%`,
                  transform: `translateX(${progress * (cards.length - 1)}%)`,
                  transition: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;