"use client";
import Image from "next/image";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: 1,
    text: "Models and Agents",
    imgSrc: "/assets/icons/aios/icon-1.svg",
    left: "-10%",
  },
  {
    id: 2,
    text: "Business Workflows",
    imgSrc: "/assets/icons/aios/icon-2.svg",
    left: 0,
  },
  {
    id: 3,
    text: "Data Platforms and Applications",
    imgSrc: "/assets/icons/aios/icon-3.svg",
    left: 0,
  },
  {
    id: 4,
    text: "Regulated Environments with Real Risk",
    imgSrc: "/assets/icons/aios/icon-4.svg",
    left: "-10%",
  },
];

const OperatingSystem = () => {
 useGSAP(() => {
  const isMobile = window.innerWidth <= 1025;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#operatingSystem",
        start: isMobile ? "top top" : "top 20%",
        scrub: isMobile ? false : true,
        // markers: true,
      },
    });

    tl.fromTo(".os-half-circle", {
      opacity: 0,
    }, {
      opacity: 1,
      ease: "none",
      // duration: 0.35,
    })

    tl.from(".os-content", {
      xPercent: 20,
      opacity: 0,
      ease: "power2.out",
      stagger: 0.25,
      // duration: 0.5,
    })
    // .from(
    //   ".run-across",
    //   {
    //     opacity: 0,
    //     duration: 0.3,
    //   },
    //   "<"
    // );

    tl.from(
      ".mobile-step",
      {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        ease: "power2.out",
      },
      ""
    );
  });
  // mobile steps = "It Runs Across" + data items
  const mobileSteps = [
    { id: "runs-across", text: "It Runs Across" },
    ...data.map((item) => ({ id: item.id, text: item.text })),
  ];

  return (
    <section
      className="relative w-screen pt-[8%]  max-sm:pt-0  h-[260vh] max-md:h-full  "
    >
      <div id="operatingSystem" className="sticky  h-[135vh] flex flex-col justify-center max-md:h-fit top-0 w-full   max-sm:px-[7vw]   max-md:py-[0%]  max-sm:py-[15%] max-sm:h-fit max-md:pt-[1%] z-[10]">

     
      <div className="text-center  w-4/6 mx-auto space-y-[2vw] max-sm:w-full max-sm:space-y-[7vw]">
        <HeadingAnim>
          <h2 className="text-76 text-center font-heading text-[#0A1B4B] leading-[1.2]">
            Why Enterprises Need an AI Operating System
          </h2>
        </HeadingAnim>

        <Copy>
          <p className="text-30 font-sans leading-[1.4] text-foreground mx-auto">
            AI no longer lives in one team, one model, or one tool.
          </p>
        </Copy>
      </div>

      {/* Desktop */}
      <div className="py-[5vw] w-[54%] mx-auto max-md:hidden">
        <div className="flex justify-between items-center os-half-circle">
          <div className="size-[20vw] relative flex items-center justify-center run-across">
            <div className="size-[14vw] border border-primary-blue rounded-full flex items-center justify-center text-center">
              <p className="text-30 leading-[1.4]">It Runs Across</p>
            </div>

            {/* NOTE: fill should be boolean, not string */}
            <Image
              className="!left-1/4 "
              src="/assets/icons/run-across-half.svg"
              alt="half circle image"
              fill
            //   className="object-contain !left-1/4"
            />
          </div>

          <div className="space-y-[1.8vw]">
            {data.map((item) => (
              <div
                key={item.id}
                style={{ transform: `translateX(${item.left})` }}
                className="p-2 border border-primary-blue rounded-full pr-[2.5vw] flex items-center justify-start gap-[2vw] os-content"
              >
                <Image
                  className="size-[4vw]"
                  src={item.imgSrc}
                  alt="icon"
                  width={80}
                  height={80}
                />
                <p className="text-24">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile -  mapped */}
      <div className="w-full h-fit hidden max-md:block space-y-[7vw] max-sm:pt-[15vw] mobile-content max-md:pt-[7vw] max-md:space-y-[4vw]">
        {mobileSteps.map((step, idx) => {
          const isLast = idx === mobileSteps.length - 1;

          return (
            <div
              key={step.id}
              className="w-full h-fit flex flex-col justify-center items-center max-sm:gap-[7vw] mobile-step max-md:gap-[4vw]"
            >
              <p className={`text-30 w-[70%] text-center ${idx === 0 ? "font-medium" : ""}`}>
                {step.text}
              </p>

              {!isLast && (
                <div className="w-auto h-[15vw]">
                  <Image
                    src="/assets/icons/long-arrow.svg"
                    alt="arrow"
                    width={300}
                    height={800}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-[3.5vw] os-bottom-text w-4/5 mx-auto space-y-[2vw] max-sm:space-y-[10vw] max-sm:w-full  max-sm:pt-[15vw] max-md:pt-[7vw]">
        <Copy>
          <p className="text-30 text-center font-sans leading-[1.4] tracking-[0.025vw] text-foreground">
            Without a system layer, AI becomes fragmented, difficult to govern, and dangerous to scale. Enterprises don’t just need more AI tools.
            <span className="text-primary-blue">
               They need a foundation to operate AI as part of the enterprise itself.
            </span>
          </p>
        </Copy>

        <Copy>
          <p className="text-30 font-sans leading-[1.4] tracking-[0.025vw] text-foreground">
            That foundation is DSW UnifyAI OS- The Enterprise AI Operating System.
          </p>
        </Copy>
      </div>
       </div>
    </section>
  );
};

export default OperatingSystem;
