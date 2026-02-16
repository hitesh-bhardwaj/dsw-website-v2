"use client";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ClientsBlur() {
  const container = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      // const ctx = gsap.context(() => {
      const grid = gridRef.current;
      const gridItems = grid.querySelectorAll(".grid__item");

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container.current,
          start: "top 20%",
          end: "bottom center",
          scrub: true,
          // markers:true,
        },
      });
      if(globalThis.innerWidth>1024){
     
      gsap.set(gridItems, {
        transformOrigin: "0% 0%",
        opacity: 0,
        x: () => gsap.utils.random(-150, 150),
        y: () => gsap.utils.random(-150, 150),
        filter: "blur(5px)",
        z: () => gsap.utils.random(-2000, -2000),
      });
        gridItems.forEach((item, index) =>
          timeline
            .to(item, {
              z: 0,
              opacity: 1,
              filter: "blur(0px) invert(0)",
              duration: 4,
              delay: index * -0.4,
            })
            .to(
              item,
              {
                filter: "blur(5px)",
                opacity: 0,
                z: 2000,
                duration: 3.5,
              },
              ">"
            )
        );
      }
      else{
         gsap.set(gridItems, {
        transformOrigin: "0% 0%",
        opacity: 0,
        x: () => gsap.utils.random(0, 0),
        y: () => gsap.utils.random(-450, 450),
        filter: "blur(5px)",
        z: () => gsap.utils.random(-1000, -1000),
      });
        gridItems.forEach((item, index) =>
          timeline
            .to(item, {
              z: 0,

              opacity: 1,
              filter: "blur(0px) invert(0)",
              duration: 4,
              delay: index * -0.4,
            })
            .to(
              item,
              {
                filter: "blur(5px)",
                opacity: 0,
                z: 600,
                duration: 3.5,
              },
              ">"
            )
        );
      }
    },
    { scope: container.current }
  );

  return (
    <>
      <section
        ref={container}
        id="clientblur"
        className="relative w-screen h-[300vh] text-center z-[1] mt-[-30vh] max-sm:mt-[-20vh]"
      >
        <div className="sticky w-full top-0 h-screen flex items-center justify-center">
          <HeadingAnim>
          <h3 className="text-76 w-[55%] text-[#0A1B4B] max-sm:w-[90%]">
            Trusted by Enterprises Operating AI at Scale
          </h3>
          </HeadingAnim>
        </div>
        <div className="left-0 sticky mt-[-100vh] top-0 z-20 h-screen w-screen overflow-hidden flex items-center justify-center">
          <div
            ref={gridRef}
            className="grid grid-cols-5 gap-[1vw] perspective-[5000px]"
          >
            {logos.map((item, index) => (
              <div key={index} className="grid__item">
                <Image
                  className="w-[14vw] h-auto max-sm:w-[100vw] max-sm:scale-[3] "
                  src={item}
                  alt={item}
                  width={200}
                  height={100}
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const logos = [
  "/assets/clients/bon-prix-color.png",
  "/assets/clients/canara-hsbc-color.png",
  "/assets/clients/ciek-color.png",
  "/assets/clients/craft-silicon-color.png",
  "/assets/clients/earc-color.png",
  "/assets/clients/edelweiss-tokio-life.png",
  "/assets/clients/edge-verve-color.png",
  "/assets/clients/iifl-capital-color.png",
  "/assets/clients/kelmac-group-color.png",
  "/assets/clients/manipal-cigna-color.png",
  "/assets/clients/oxsde-color.png",
  "/assets/clients/sodexo-color.png",

];
