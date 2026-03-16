"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import Copy from "../Animations/Copy";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Journey() {
  const wholeSliderRef = useRef(null);

  useGSAP(() => {

     const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#journey",
          start: "2% top",
          end: "97% bottom",
          scrub: true,
          // markers: true,
        },
        defaults: {
          ease: "none",
        },
      });
    if (globalThis.innerWidth >= 642 && globalThis.innerWidth <= 1024) {
      
      tl.fromTo(
        wholeSliderRef.current,
        {
          xPercent: 0,
        },
        {
          xPercent: -82,
        }
      );
      gsap.to(".journey-line", {
        width: "85%",
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
     
      tl.fromTo(
        wholeSliderRef.current,
        {
          xPercent: 0,
        },
        {
          xPercent: -75,
        }
      );
      gsap.to(".journey-line", {
        width: "80%",
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
     
      tl.fromTo(
        wholeSliderRef.current,
        {
          xPercent: 0,
        },
        {
          xPercent: -75,
        }
      );
      gsap.to(".journey-line", {
        width: "98%",
        ease: "none",
        scrollTrigger: {
          trigger: "#journey",
          start: "top 60%",
          end: "97% bottom",
          scrub: true,
          // markers: true,
        },
      });
    }
  }, []);

  useGSAP(() => {
    const years = [
      "2021",
      "2022",
      "2023",
      "2023",
      "2024",
      "2025",
    ];

    // Set initial states for all years
    years.forEach((year) => {
      gsap.set(`.jl-${year}`, { scaleY: 0 });
      gsap.set(`.jd-${year}`, { scale: 0 });

      // Set initial state for split text animations
      gsap.set(`.title${year}Years`, { opacity: 1 });
      gsap.set(`.description${year}Years`, { opacity: 1 });
    });

    const titleSplits = {};
    const descriptionSplits = {};

    years.forEach((year) => {
      titleSplits[year] = new SplitText(`.title${year}Years`, {
        type: "chars, words, lines",
        mask: "lines",
      });

      descriptionSplits[year] = new SplitText(`.description${year}Years`, {
        type: "chars, words, lines",
        mask: "lines",
      });
    });

    // Create a function to generate timeline for each year
    const createYearTimeline = (
      year,
      startPos,
      endPos,
      markerOptions = true,
    ) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `#journey`,
          start: `${startPos}% 50%`,
          end: `${endPos}% 50%`,
          scrub: true,
          markers: markerOptions,
        },
      });

      timeline
        .to(`.jl-${year}`, {
          scaleY: 1,
          duration: 0.5,
        })
        .to(`.jd-${year}`, {
          scale: 1,
          duration: 0.5,
        })
        .fromTo(
          titleSplits[year].lines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8,
            duration: 1,
            stagger: 0.02,
            ease: "power2.out",
          }
        )
        .fromTo(
          descriptionSplits[year].lines,
          { y: 100 },
          {
            y: -0,
            // delay:-0.4,
            duration: 1,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<"
        );

      return timeline;
    };
    if (globalThis.innerWidth < 642) {
      createYearTimeline("2018", 20, 31);
      createYearTimeline("2019", 28, 38);
      createYearTimeline("2020", 37, 49);
      createYearTimeline("2021", 43, 55);
      createYearTimeline("2022", 52, 62);
      createYearTimeline("2023", 59, 73);
      createYearTimeline("2024", 68, 79);
      createYearTimeline("2025", 75, 86);
    }
    else if(globalThis.innerWidth >= 642 && globalThis.innerWidth <= 1024){
      createYearTimeline("2018", 16, 27);
      createYearTimeline("2019", 24, 36);
      createYearTimeline("2020", 32, 44);
      createYearTimeline("2021", 40, 52);
      createYearTimeline("2022", 48, 60);
      createYearTimeline("2023", 56, 68);
      createYearTimeline("2024", 64, 76);
      createYearTimeline("2025", 72, 84);
    }
    
    else {
      createYearTimeline("2021", 14, 31);
      createYearTimeline("2022", 21, 38);
      createYearTimeline("2023", 32, 49);
      createYearTimeline("2023", 38, 55);
      createYearTimeline("2024", 52, 69);
      createYearTimeline("2025", 56, 73);
    }
    // Create timelines for all years

    // Handle resize events to update animations
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

    const handleSkip = () => {
    const next = document.getElementById("tech-partners");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <section
      id="journey"
      className="h-[300vw] max-md:h-[500vh] max-sm:h-[400vh] w-full  relative  py-[7%]"
    >
      <div className="h-screen w-screen sticky top-0 pt-[15%] overflow-hidden background-radial max-md:pt-[5%] max-sm:pt-[15%]">
        <div
          ref={wholeSliderRef}
          className="h-[30vw] max-md:w-[700vw] px-[5vw] max-sm:h-[80vh] max-md:h-[70vh]  flex gap-[5vw] mr-[2vw] items-center max-md:items-start max-sm:w-[700vw] max-md:flex-col w-[300vw] max-sm:px-[7vw] max-md:gap-[2vw]"
        >
          <div className="h-[100%] max-sm:h-[50vw] max-sm:w-[70vw] max-md:h-[40vh] max-md:w-[12.2%]  journey-img w-[27vw] overflow-hidden rounded-[2vw] fadeup max-sm:rounded-[5vw] max-md:rounded-[3vw]">
            <Image
              src={"/assets/about/journey-img.png"}
              alt="journey"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-[100%] relative h-full max-md:h-fit ">
            {/* LINE */}
            <div className="w-full absolute left-0 top-[49%] tranlate-y-[-50%] flex items-center h-fit">
              <div className="h-[.8vw] max-sm:h-[2vw] max-sm:w-[2vw] w-[.8vw] rounded-full bg-primary-blue max-md:w-[1.5vw] max-md:h-[1.5vw]"></div>
              <div className="h-[1px] w-[0%] rounded-full bg-primary-blue journey-line "></div>
              <div className="h-[.8vw] max-sm:h-[2vw] max-sm:w-[2vw] w-[.8vw] rounded-full bg-primary-blue max-md:w-[1.5vw] max-md:h-[1.5vw]"></div>
            </div>

            <div className="h-1/2 flex items-center gap-[.5vw]  justify-start w-full ">
              <div className="w-[20%] max-sm:pt-[5vw] h-full pt-[2vw] max-sm:h-fit ">
                <h2 className="text-44 headings w-[65%] headingAnim">
                  Foundations Of DSW
                </h2>
              </div>

              <div className="w-full flex h-full gap-x-[15vw]">
                {/* TOP JOURNEY ITEMS */}
                {topJourneyData.map((item, index) => (
                  <div
                    key={`top-${index}`}
                    className={`w-[18%]  max-sm:flex max-sm:flex-col max-sm:justify-center journey-container px-[3vw] h-full relative max-sm:px-[7vw] max-md:px-[5vw] ${item.containerClass}`}
                  >
                    {/* STOPS */}
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full">
                      <div
                        className={`size-[1vw] translate-x-[-50%] relative  aspect-square rounded-full bg-primary-blue ${item.dotClass}`}
                      ></div>
                      <div
                        className={`h-[94%] w-[1px]  origin-bottom rounded-full bg-primary-blue ${item.lineClass}`}
                      ></div>
                    </div>
                    <div
                      className={`space-y-[2vw] pt-[0.5vw] max-sm:pb-[10vw] ${item.contentClass}`}
                    >
                      <p className={`text-30  ${item.titleClass}`}>
                        {item.year} – {item.title}
                      </p>
                      <p
                        className={`text-white-300 w-[90%] max-sm:w-[90%] max-md:w-[70%] ${item.descriptionClass}`}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[34%] pt-[2vw] max-sm:pt-[5vw] h-full max-md:pt-[5vw]">
                <Copy>
                  <p className="text-60 headings w-[100%] font-head">
                    2021-2025
                  </p>
                </Copy>
              </div>
              <div className="w-full flex h-full gap-x-[15vw]">
                {/* BOTTOM JOURNEY ITEMS */}
                {bottomJourneyData.map((item, index) => (
                  <div
                    key={`bottom-${index}`}
                    className={`w-[18%] max-md:w-[20%]  max-md:flex max-md:flex-col max-md:justify-center  journey-container px-[3vw] h-full relative max-sm:px-[7vw] max-md:px-[5vw] ${item.containerClass}`}
                  >
                    {/* STOPS */}
                    <div className="w-full absolute left-0 bottom-[-1%] h-full">
                      <div
                        className={`h-[94%] origin-top w-[1px] rounded-full bg-primary-blue max-sm:h-full ${item.lineClass}`}
                      ></div>
                      <div
                        className={`size-[1vw] translate-x-[-50%] relative w-auto aspect-square rounded-full  bg-primary-blue ${item.dotClass}`}
                      ></div>
                    </div>
                    <div
                      className={`space-y-[2vw] max-md:pt-[7vw] w-full h-full flex flex-col justify-end pb-[2vw] ${item.contentClass}`}
                    >
                      <h4 className={`text-30 ${item.titleClass}`}>
                        {item.year} – {item.title}
                      </h4>
                      <p
                        className={`text-white-300 w-[90%] max-sm:w-[90%] max-md:w-[70%] ${item.descriptionClass}`}
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
        <div className="absolute bottom-[7%] right-[3%]">
           <button
              className="round px-6 py-2 rounded-full flex items-center cursor-pointer gap-2 text-white font-light hover:scale-95 text-[1vw] max-sm:text-[4.2vw] max-md:text-[2.7vw] transition duration-500 ease-out"
              onClick={handleSkip}
            >
              Skip Timeline
              <div className="-rotate-90 text-white flex items-center justify-center gap-0 w-[0.8vw] h-full max-sm:w-[3vw] max-md:w-[1.8vw]">
                <svg
                  className="arrow primera next"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.50293 14.46L2.50293 7.45996L7.50293 0.459961H5.05293L0.0529289 7.45996L5.05293 14.46H7.50293Z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  className="arrow segunda next"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.50293 14.46L2.50293 7.45996L7.50293 0.459961H5.05293L0.0529289 7.45996L5.05293 14.46H7.50293Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>

        </div>
      </div>
    </section>
  );
}

const topJourneyData = [
     {
    year: "2021",
    title: "The Beginning",
    content:
      "DSW was founded with a mission to make AI accessible, practical, and impactful for enterprises across industries.",
    lineClass: "jl-2021",
    dotClass: "jd-2021",
    contentClass: "jc-2021",
    containerClass: "jcontainer-2021",
    titleClass: "title2021Years",
    descriptionClass: "description2021Years",
  },
  {
    year: "2023",
    title: "The Beginning",
    content:
      "DSW was founded with a mission to make AI accessible, practical, and impactful for enterprises across industries.",
    lineClass: "jl-2023",
    dotClass: "jd-2023",
    contentClass: "jc-2023",
    containerClass: "jcontainer-2023",
    titleClass: "title2023Years",
    descriptionClass: "description2023Years",
  },
 
  
  {
    year: "2024",
    title: "The Beginning",
    content:
      "DSW was founded with a mission to make AI accessible, practical, and impactful for enterprises across industries.",
    lineClass: "jl-2024",
    dotClass: "jd-2024",
    contentClass: "jc-2024",
    containerClass: "jcontainer-2024",
    titleClass: "title2024Years",
    descriptionClass: "description2024Years",
  },
];

const bottomJourneyData = [
  
 {
    year: "2022",
    title: "The Beginning",
    content:
      "DSW was founded with a mission to make AI accessible, practical, and impactful for enterprises across industries.",
    lineClass: "jl-2022",
    dotClass: "jd-2022",
    contentClass: "jc-2022",
    containerClass: "jcontainer-2022",
    titleClass: "title2022Years",
    descriptionClass: "description2022Years",
  },
  
  {
    year: "2025",
    title: "The Beginning",
    content:
      "DSW was founded with a mission to make AI accessible, practical, and impactful for enterprises across industries.",
    lineClass: "jl-2025",
    dotClass: "jd-2025",
    contentClass: "jc-2025",
    containerClass: "jcontainer-2025",
    titleClass: "title2025Years",
    descriptionClass: "description2025Years",
  },
];
