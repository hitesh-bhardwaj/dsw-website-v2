"use client";
import React, { useEffect, useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import SectionBreak from "../SectionBreak";
import { Governed } from "../Svg/AboutUs/Governed";
import { Auditable } from "../Svg/AboutUs/Auditable";
import { Reversible } from "../Svg/AboutUs/Reversible";
import { Deployable } from "../Svg/AboutUs/Deployable";
import { Owned } from "../Svg/AboutUs/Owned";
import { Arrow } from "../Svg/AboutUs/Arrow";
import { Vision } from "../Svg/AboutUs/Vision";
import { Mission } from "../Svg/AboutUs/Mission";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  { icon: <Governed />, title: "Governed while it runs", isHighlighted: true },
  { icon: <Auditable />, title: "Auditable by design", isHighlighted: false },
  {
    icon: <Reversible />,
    title: "Reversible when needed",
    isHighlighted: false,
  },
  {
    icon: <Deployable />,
    title: "Deployable inside their environment",
    isHighlighted: false,
  },
  {
    icon: <Owned />,
    title: "Owned end-to-end by the enterprise",
    isHighlighted: false,
  },
];

export default function WhatWeBelieve() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isDesktop = window.innerWidth > 1024;
    const ctx = gsap.context(() => {
      if (isDesktop) {
        // Set initial state explicitly before animating
        gsap.set(".struggle-card", {
          x: (i) => {
            const offsets = [0, "-118.7%", "-237.4%", "-356%", "-474.7%"];
            return offsets[i] ?? 0;
          },
        });
        gsap.set(".struggle-arrow", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "25% 70%",
            once: true,
            // markers:true
          },
        });

        tl.to(".struggle-card", {
          x: 0,
          stagger: 0.15,
          ease: "power2.inOut",
          duration: 1,
        });

        tl.to(
          ".struggle-arrow",
          {
            opacity: 1,
            stagger: 0.3,
            ease: "power2.out",
            duration: 0.8,
            delay: 0.8,
          },
          "<",
        ); // overlap slightly with cards landing
      } else {
        gsap.set(".struggle-card", { opacity: 0 });

        gsap.to(".struggle-card", {
          opacity: 1,
          stagger: 0.1,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 30%",
            once: true,
          },
        });
      }
    }, section);
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-fit py-[7%] px-[5vw] max-sm:px-0 max-sm:py-[15%] max-sm:h-fit max-md:py-[10%]"
      id="struggle"
    >
      {/* Heading Section */}
      <div className="space-y-[5.5vw] h-fit max-sm:static overflow-hidden max-sm:overflow-visible max-sm:space-y-[12vw] max-md:space-y-[7vw] z-10">
        <div className="text-center space-y-[2vw] max-sm:space-y-[7vw] max-sm:px-[7vw] max-md:space-y-[4vw]">
          <HeadingAnim>
            <h2 className="text-76 font-heading text-[#0A1B4B] capitalize">
              What we believe ( and why it matters )
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-30 font-sans leading-[1.4] tracking-[0.025vw] text-foreground w-[55%] max-sm:w-full mx-auto max-md:w-[80%]">
              In the AI era, the advantage won't come from who experiments the
              most. It will come from who can{" "}
              <span className="font-medium">operate AI the best</span> - safely,
              continuously, and at scale.
            </p>
          </Copy>
        </div>

        <div className="pt-[2vw] max-sm:px-[7vw] max-md:pt-0">
          <Copy>
            <p className="text-30 text-center font-sans leading-[1.4] tracking-[0.025vw] text-foreground mx-auto">
              As LLMs and agentic workflows spread across regulated business
              processes, enterprises need AI that is:
            </p>
          </Copy>
        </div>

        {/* Challenge Boxes — Desktop */}
        <div className="flex items-center justify-center gap-0 max-md:hidden">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className={`struggle-card flex items-center
                  ${index === 0 ? "z-[6]" : ""}
                  ${index === 1 ? "z-[5]" : ""}
                  ${index === 2 ? "z-[4]" : ""}
                  ${index === 3 ? "z-[3]" : ""}
                  ${index === 4 ? "z-[2]" : ""}
                `}
                // NO inline translateX here — GSAP sets it via gsap.set()
              >
                <div className="relative w-[15vw] h-[28vh] group px-[1.5vw] pt-[1.5vw] justify-between flex flex-col pb-[3vw] items-end border border-solid hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg border-[#c2c2c2] duration-300 ease-in-out bg-white">
                  <CornerDecorationsChallenge />
                  <div className="text-[#002AFF] w-[3vw] h-[3vw]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-24 leading-[1.2] text-left h-10">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>

              {index < data.length - 1 && (
                <div className="struggle-arrow opacity-0 flex-shrink-0 w-[2.8vw] px-1 flex items-center justify-center text-[#002AFF]">
                  <Arrow />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Challenge Boxes — Mobile Slider */}
        <div className="hidden max-md:block w-full overflow-x-auto mobile-scrollbar overflow-y-visible pb-6">
          <div className="flex gap-[2.5vw] flex-nowrap w-max items-center max-sm:px-[7vw]">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div className="struggle-card relative flex-shrink-0 max-sm:w-[75vw] max-sm:h-[50vw] h-[60vw] max-sm:p-[5vw] justify-between flex flex-col max-sm:pb-[8vw] items-end border border-solid border-[#c2c2c2] bg-white max-md:h-[30vw] max-md:w-[40vw] max-md:p-[4vw]">
                  <CornerDecorationsChallenge />
                  <div className="text-[#002AFF] size-[8vw] max-sm:size-[13vw]">
                    {item.icon}
                  </div>
                  <div className="w-full">
                    <p className="text-24 leading-[1.3] text-start">
                      {item.title}
                    </p>
                  </div>
                </div>
                {index < data.length - 1 && (
                  <div className="flex-shrink-0 max-sm:w-[10vw] flex items-center justify-center text-primary-blue max-md:w-[6vw]">
                    <Arrow />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="w-[50%] mx-auto text-center max-sm:w-full max-sm:px-[7vw]">
          <SectionBreak
            content={"That belief is the foundation of DSW."}
            big={false}
          />
        </div>
      </div>

      <VisionMission />
    </section>
  );
}

const VisionMission = () => {
  const line = `
    w-[5px] h-[1px]
    duration-300 ease-in-out
  `;
  return (
    <section className="w-full h-fit bg-white pt-[10%] max-sm:pt-28 md:px-16 max-sm:px-[7vw] max-md:py-[10%] max-sm:py-0">
      <div className="relative grid grid-cols-3 grid-rows-2 max-sm:gap-[8vw] max-md:grid-cols-1 max-md:grid-rows-none max-md:flex max-md:flex-col max-md:gap-[4vw]">
        <div className="relative col-start-1 col-span-1 row-start-1 border border-[#c2c2c2] bg-white max-sm:gap-y-[15vw] px-[2vw] py-[2vw] max-sm:px-[5vw] max-sm:py-[7vw] hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center justify-between max-sm:items-start max-sm:gap-[6vw] max-md:p-[4vw] max-md:items-start max-md:gap-[7vw] max-md:pb-[10vw]">

         <div className="absolute -top-[0.25%] -left-[0.07%] w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out max-sm:-top-[0.35%] max-sm:-left-[0.35%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2.2px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.45%] -right-[0.8%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out max-md:-right-[0.5%] max-sm:-right-[0.8%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.35%] -left-[0.8%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out max-md:-left-[0.5%] max-sm:-left-[0.8%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute -bottom-[0.3%] -right-[0.25%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out max-md:-right-[0.1%] max-sm:-right-[0.25%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>
          <div className="flex items-center w-full justify-between">
            <h3 className="text-56 text-[#0A1B4B] max-sm:text-[8vw]!">
              Vision
            </h3>
            <div className="w-16 h-16 shrink-0 text-primary-blue">
              <Vision />
            </div>
          </div>
          <p className="text-30 max-sm:leading-[1.4] text-foreground">
            To make AI operable at scale - <br />
            for every enterprise.
          </p>
        </div>

        <div className="relative col-start-2 max-sm:pt-[4vw] col-span-2 row-start-2 border border-[#c2c2c2] bg-white px-[2vw] py-[2vw] max-sm:px-[5vw] max-sm:py-[7vw] hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg transition-all duration-300 ease-in-out flex flex-col items-start justify-between max-sm:gap-[9vw] max-md:p-[4vw] max-md:items-start  max-md:gap-[7vw] max-md:pb-[10vw]">


          <div className="absolute -top-[0.25%] -left-[0.07%] w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out ">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2.2px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.45%] -right-[0.35%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out max-sm:-right-[0.80%] max-sm:top-[0.30%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.35%] -left-[0.35%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out max-sm:-left-[0.8%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute -bottom-[0.3%] -right-[0.15%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>
          <div className="flex items-center w-full justify-between mb-15 max-sm:mb-0">
            <h3 className="text-56 text-[#0A1B4B] max-sm:text-[8vw]!">
              Mission
            </h3>
            <div className="w-16 h-16 shrink-0 text-primary-blue">
              <Mission />
            </div>
          </div>
          <p className="text-30 text-foreground">
            To build the governed operating layer that enables enterprises to
          </p>
          <ul className="space-y-[0.5vw] max-sm:space-y-[3vw] text-30 text-foreground list-disc marker:text-sm mt-[2vw] max-sm:mt-0 ml-[3vw] max-sm:ml-[5vw]">
            {[
              "Build, integrate, deploy, govern, and operate AI in production",
              "Unify models, agents, tools, and workflows under one runtime",
              "Enforce governance as code during execution - not after",
            ].map((item, i) => (
              <li key={i} className="max-sm:leading-[1.4]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};



function CornerDecorationsChallenge({
  hoverColor = "#0205fa",
  baseColor = "black",
}) {
  const line = `
    w-[5px] h-[1px]
    duration-300 ease-in-out
  `;

  return (
    <>
      {/* Top Left */}
      <div className="absolute -top-[0.5%] -left-[0.25%] w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out max-md:-left-[0.2%] max-sm:-left-[0.25%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2.2px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.55%] -right-[1.5%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out max-md:-right-[1%] ">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.5%] -left-[1.3%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out max-md:-left-[0.9%] max-sm:-left-[1%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute -bottom-[0.5%] -right-[0.25%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>
    </>
  );
}


