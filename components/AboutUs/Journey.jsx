"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import Copy from "../Animations/Copy";
import { useGSAP } from "@gsap/react";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger, SplitText);

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const topJourneyData = [
  {
    id: "2021-april",
    year: "2021",
    month: "April",
    content:
      "UnifyAI Ideation",
  },
  {
    id: "2023-january",
    year: "2023",
    month: "January",
    content:
      "1st Customer Application",
  },
  {
    id: "2024-february",
    year: "2024",
    month: "February",
    content:
      "InsurAInce Launch with 300+ GenAI Agents",
  },
  {
    id: "2026-march",
    year: "2026",
    month: "March",
    content:
      "DSW UnifyAI OS - The Enterprise Operating System",
  },
];

const bottomJourneyData = [
  {
    id: "2022-february",
    year: "2022",
    month: "February",
    content:
      "UnifyAI MVP Launch",
  },
  {
    id: "2023-november",
    year: "2023",
    month: "November",
    content:
      "UnifyAI GenAI Launch",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    content:
      "UnifyAI 2.0",
  },
];

const allJourneyItems = [...topJourneyData, ...bottomJourneyData].sort(
  (a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    return monthOrder[a.month] - monthOrder[b.month];
  },
);

export default function Journey() {
  const wholeSliderRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#journey",
        start: "2% top",
        end: "92% bottom",
        scrub: true,
        // markers: true,
      },
      defaults: {
        ease: "none",
      },
    });

    if (globalThis.innerWidth >= 642 && globalThis.innerWidth <= 1024) {
      tl.fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: -60 });

      gsap.to(".journey-line", {
        width: "75%",
        ease: "none",
        scrollTrigger: {
          trigger: "#journey",
          start: "top 50%",
          end: "90% bottom",
          scrub: true,
          // markers: true,
        },
      });
    } else if (globalThis.innerWidth < 642) {
      tl.fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: -57 });

      gsap.to(".journey-line", {
        width: "65%",
        ease: "none",
        scrollTrigger: {
          trigger: "#journey",
          start: "top 30%",
          end: "90% bottom",
          scrub: true,
          // markers: true,
        },
      });
    } else {
      tl.fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: -65 });

      gsap.to(".journey-line", {
        width: "98%",
        ease: "none",
        scrollTrigger: {
          trigger: "#journey",
          start: "top 60%",
          end: "92% bottom",
          scrub: true,
          // markers: true,
        },
      });
    }
  }, []);

  useGSAP(() => {
    const items = allJourneyItems;

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: "bottom bottom",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
    });

    const titleSplits = {};
    const descriptionSplits = {};

    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });

      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });
    });

    const createItemTimeline = (
      item,
      startPos,
      endPos,
      markerOptions = false,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];

      const isTop = topJourneyData.some((topItem) => topItem.id === item.id);

      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#journey",
          start: `${startPos}% 50%`,
          end: `${endPos}% 50%`,
          scrub: true,
          // markers: true,
        },
      });

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: 0.5,
        })
        .to(
          dotSelector,
          {
            scale: 1,
            duration: 0.5,
          },
          "<",
        )
        .fromTo(
          titleLines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8,
            duration: 1,
            stagger: 0.02,
            ease: "power2.out",
          },
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          {
            y: 0,
            duration: 1,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        );

      return timeline;
    };

    const positions =
      globalThis.innerWidth < 642
        ? [
            [22, 32],
            [28, 38],
            [36, 46],
            [45, 55],
            [52, 62],
            [60, 70],
            [69, 79],
          ]
        : globalThis.innerWidth >= 642 && globalThis.innerWidth <= 1024
          ? [
              [16, 27],
              [24, 36],
              [35, 47],
              [45, 57],
              [55, 67],
              [62, 74],
              [70, 82],
            ]
          : [
              [6, 26],
              [16, 36],
              [26, 46],
              [35, 55],
              [45, 65],
              [55, 75],
              [65, 85],
            ];

    items.forEach((item, index) => {
      const [startPos, endPos] = positions[index];
      createItemTimeline(item, startPos, endPos, false);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  });


  return (
    <section
      id="journey"
      className="h-[200vw] max-md:h-[400vh] max-sm:h-[400vh] w-full relative py-[7%]"
    >
      <div className="h-screen w-screen sticky top-[10%] pt-[5%] overflow-hidden ">
        <div
          ref={wholeSliderRef}
          className="h-[30vw] max-md:w-[400vw] px-[5vw] max-sm:h-[80vh] max-md:h-[70vh] flex gap-[5vw] mr-[2vw] items-center max-md:items-start max-sm:w-[800vw] max-md:flex-col w-[240vw] max-sm:px-[7vw] max-md:gap-[2vw]"
        >
          <div className="h-full max-sm:h-[50vw] max-sm:w-[70vw] max-md:h-[40vw] max-md:w-[12.2%] journey-img w-[27vw] overflow-hidden rounded-[2vw] fadeup max-sm:rounded-[5vw] max-md:rounded-[3vw]">
            <Image
              src={"/assets/about/journey-img.png"}
              alt="journey"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-[100%] relative h-full max-md:h-[50%]">
            <div className="w-full absolute left-0 top-[49%] tranlate-y-[-50%] flex items-center h-fit">
              <div className="h-[.8vw] max-sm:h-[2vw] max-sm:w-[2vw] w-[.8vw] rounded-full bg-primary-blue max-md:w-[1.5vw] max-md:h-[1.5vw]"></div>
              <div className="h-[1px] w-[0%] rounded-full bg-primary-blue journey-line"></div>
              <div className="h-[.8vw] max-sm:h-[2vw] max-sm:w-[2vw] w-[.8vw] rounded-full bg-primary-blue max-md:w-[1.5vw] max-md:h-[1.5vw]"></div>
            </div>

            <div className="h-1/2 flex items-center gap-[.5vw] justify-start w-full">
              <div className="w-[20%] max-sm:pt-[5vw] h-full pt-[2vw] max-sm:h-fit">
                <HeadingAnim>
                <h2 className="text-56 headings w-[65%] max-sm:text-[8.5vw] max-md:text-[7vw] max-md:w-[75%]">
                  Foundations Of DSW
                </h2>
                </HeadingAnim>
              </div>

              <div className="w-full flex h-full gap-x-[15vw] max-sm:gap-x-[40vw]">
                {topJourneyData.map((item, index) => (
                  <div
                    key={`top-${index}`}
                    className="w-[30vw] max-sm:w-[70vw] max-md:w-[50vw] max-sm:flex max-sm:flex-col  journey-container px-[3vw] h-full relative max-sm:px-[7vw] max-md:px-[5vw]"
                  >
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full">
                      <div
                        className={`size-[1vw] max-sm:size-[2.5vw] max-md:size-[2vw] translate-x-[-50%] relative aspect-square rounded-full bg-primary-blue jd-${item.id}`}
                      ></div>
                      <div
                        className={`h-[94%] w-[1px] origin-bottom rounded-full bg-primary-blue jl-${item.id}`}
                      ></div>
                    </div>

                    <div className="space-y-[1vw] mt-[-1vw]  max-sm:mt-[-2vw] max-md:mt-[-1.5vw]">
                      <h4 className={`text-44 title-${item.id} font-sans! max-md:text-[5vw] max-sm:text-44`}>{item.year} {item.month}</h4>
                      <p
                        className={`text-30 w-[90%] max-sm:w-[90%] max-md:w-[70%] description-${item.id}`}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[34%] pt-[2vw] max-sm:pt-[5vw] max-sm:w-[30%] h-full max-md:pt-[5vw]">
                <Copy>
                  <p className="text-24 font-head">
                    2021-2025
                  </p>
                </Copy>
              </div>

              <div className="w-full flex h-full gap-x-[20vw] ml-[7vw] max-sm:gap-x-[40vw] max-md:ml-0 max-sm:ml-[7vw]">
                {bottomJourneyData.map((item, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="w-[25vw] max-sm:w-[70vw] max-md:w-[50vw] max-md:w-[20%] max-md:flex max-md:flex-col max-md:justify-center journey-container px-[3vw] h-full relative max-sm:px-[7vw] max-md:px-[5vw]"
                  >
                    <div className="w-full absolute left-0 bottom-[-1%] h-full">
                      <div
                        className={`h-[94%] origin-top w-[1px] rounded-full bg-primary-blue max-sm:h-full jl-${item.id}`}
                      ></div>
                      <div
                        className={`size-[1vw] max-sm:size-[2.5vw] max-md:size-[2vw] translate-x-[-50%] relative w-auto aspect-square rounded-full bg-primary-blue jd-${item.id}`}
                      ></div>
                    </div>

                    <div className="space-y-[1vw]  w-full h-full flex flex-col justify-end">
                      <h4 className={`text-44 title-${item.id} font-sans! max-md:text-[5vw] max-sm:text-44`}>
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`text-30 w-[90%] max-sm:w-[90%] max-md:w-[70%] description-${item.id}`}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
}
