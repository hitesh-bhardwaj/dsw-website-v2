"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeadingAnim from "./Animations/HeadingAnim";
import Copy from "./Animations/Copy";
import { useGSAP } from "@gsap/react";
import SectionBreak from "./SectionBreak";

gsap.registerPlugin(ScrollTrigger);


export default function AlwaysOnAI({content,imgWidth}) {
  const sectionRef = useRef(null);
  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:"#alwaysOnAi",
        start:"top 70%",
        end:"95% 70%",
        scrub:true,
        // markers:true

      }
    })
    tl.to(".upper-slinky",{
      rotateX:-80,
      top:"-40%"
    })
    .to(".mid-slinky",{
      rotateX:0,
      top:"0%"
    },"<")
    .to(".lower-slinky",{
      rotateX:0,
      top:"55%"
    },"<")
  })

  return (
    <section
      ref={sectionRef}
      id="alwaysOnAi"
      style={{perspective:"1500px"}}
      className="relative w-full bg-white py-[20%] px-[5vw] overflow-hidden max-sm:px-[7vw] z-[22]"
    >
      {/* Background Line Effect */}
       {/* before // top-[-60] 0deg */}
      {/* after // top-[-40] 60deg */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rings-perspective top-[-60%] w-[120%] left-[-10%] upper-slinky rotate-x-[10deg] ">
        <svg
          width="1920"
          height="639"
          className="w-full"
          viewBox="0 0 1920 639"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-15 638.257C258.004 533.347 1024.08 386.474 1904.35 638.257M-15 503.472C233.891 320.656 970.099 60.8523 1923.81 484.167M-15 325.597C280.848 80.2714 1082.8 -263.184 1923.81 325.597"
            stroke="#0205FA"
            strokeOpacity="0.2"
          />
        </svg>
      </div>

      {/* before // top-[-20] -180deg */}
      {/* after // top-[-10] 0deg */}

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rings-perspective top-[-20%] w-[120%] left-[-10%] rotate-x-[-180deg] mid-slinky">
        <svg
          width="1918"
          height="214"
          viewBox="0 0 1918 214"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-8.6543 130.803C350.792 192.473 1239.15 278.812 1917.04 130.803M-8.6543 0.499023C354.74 24.0548 1248.63 57.033 1917.04 0.499023"
            stroke="#0205FA"
            strokeOpacity="0.2"
          />
        </svg>
      </div>
      {/* before // top-[10] -60deg */}
      {/* after // top-[35] 0deg */}

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rings-perspective top-[10%] w-[120%] left-[-10%] lower-slinky rotate-x-[100deg]">
        <svg
          width="1920"
          height="639"
          viewBox="0 0 1920 639"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-3.1543 0.480469C269.85 105.39 1035.93 252.263 1916.19 0.480469M-3.1543 135.266C245.736 318.082 981.945 577.885 1935.65 154.57M-3.1543 313.141C292.694 558.466 1094.64 901.921 1935.65 313.141"
            stroke="#0205FA"
            strokeOpacity="0.2"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center space-y-[2vw] max-sm:space-y-[10vw] ">
          <HeadingAnim>
            <h2 className="text-76 text-[#0A1B4B] font-heading leading-[1.2] ">
             {content.heading}
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-30 font-sans w-[50%] mx-auto max-sm:w-full">
              {content.para}
            </p>
          </Copy>
        </div>

        <div className={`relative h-auto mx-auto fadeup my-[5vw] max-sm:my-[15vw] max-sm:w-[110%] max-sm:ml-[-5%]  ${imgWidth?imgWidth:"w-[70vw]"}`}>
          <Image
            src="/assets/homepage/laptop-dashboard-quality.png"
            alt="DSW UnifyAI Dashboard"
            width={800}
            height={700}
            className="object-contain h-full w-full"
            priority
          />
        </div>

        <div className="text-center w-[73%] mx-auto ">
          
           <SectionBreak
                      content={
                        content.tagline
                      }
                      big={false}
                    />
        </div>
      </div>
    </section>
  );
}
