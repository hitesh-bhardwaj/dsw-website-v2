"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import AIEcosystemMob from "./AIEcosystemMob";

gsap.registerPlugin(ScrollTrigger);

const AIEcosystem = ({ecosystemItems}) => {
  const sliderRef = useRef(null);
  const blueRingRef = useRef(null);
  const orangeRingRef = useRef(null);
  const fanRef = useRef(null);

  useGSAP(() => {
    if (globalThis.innerWidth < 1024) return;

    const slider = sliderRef.current;
    const blueRing = blueRingRef.current;
    const orangeRing = orangeRingRef.current;
    const fan = fanRef.current;
    const items = gsap.utils.toArray(".ecosystem-item");

    // Blue ring rotates clockwise on scroll
    gsap.to(blueRing, {
      rotation: 180,
      ease: "none",
      scrollTrigger: {
        trigger: slider,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Orange ring rotates counter-clockwise on scroll
    gsap.to(orangeRing, {
      rotation: -180,
      ease: "none",
      scrollTrigger: {
        trigger: slider,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Fan rotation timeline with pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slider,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        // pin: true,
        // anticipatePin: 1,
      },
    });

    // Phase 1: Rotate entire fan, first item fades, second becomes active
    tl.to(
      fan,
      {
        rotation: -30,
        duration: 1,
      },
      0,
    )
      .to(
        items[0],
        {
          opacity: 0.15,
          duration: 1,
        },
        0,
      )
      .to(
        items[1],
        {
          opacity: 1,
          duration: 1,
        },
        0,
      );

    // Phase 2: Rotate entire fan more, second fades, third becomes active
    tl.to(
      fan,
      {
        rotation: -60,
        duration: 1,
      },
      1,
    )
      .to(
        items[1],
        {
          opacity: 0.15,
          duration: 1,
        },
        1,
      )
      .to(
        items[2],
        {
          opacity: 1,
          duration: 1,
        },
        1,
      );
  });

  return (
    <>
      {/* Header Section - scrolls normally */}
      <section className="relative w-full py-[7%] bg-white max-sm:py-[15%] max-md:pt-[10%] max-md:pb-0 ">
        <div className="text-center space-y-[1.5vw] px-[5vw] max-sm:space-y-[5vw] max-md:space-y-[3vw]">
          <HeadingAnim>
            <h2 className="text-76 text-[#0A1B4B]">
              Built as an AI ecosystem, not a Platform
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-30 max-w-[80vw] mx-auto">
              At the core of the DSW Enterprise AI Operating System is UnifyAI,
              operating as a kernel that governs all AI and agentic execution
            </p>
          </Copy>
          <Copy>
            <p className="text-30 pt-[1vw]">
              Governance is not layered on later. It is enforced at runtime - by
              design.
            </p>
          </Copy>
        </div>
      </section>

      {/* Circular Slider Section - gets pinned */}
      <section
        ref={sliderRef}
        id="ai-ecosystem-slider"
        className="relative w-full h-[300vh] bg-white max-sm:h-auto max-sm:py-[10vw] pb-[7%] max-md:hidden"
      >
        <div className="w-screen h-screen sticky top-0">
          <div className="absolute left-[-20vw] top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-sm:hidden">
            {/* Blue/Outer Ring - rotates clockwise */}
            <div ref={blueRingRef} className="absolute inset-0">
              <Image
                src="/assets/homepage/dotted-circle.svg"
                alt="Outer ring"
                fill
                className="object-contain"
              />
            </div>

            {/* Orange/Inner Ring - rotates counter-clockwise */}
            <div ref={orangeRingRef} className="absolute inset-[15%]">
              <Image
                src="/assets/homepage/inner-circle.svg"
                alt="Inner ring"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Fan Container - centered on the rings */}
          <div
            ref={fanRef}
            className="absolute left-[-25vw] top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-sm:relative max-sm:left-0 max-sm:top-0 max-sm:translate-y-0 max-sm:w-full max-sm:h-auto max-sm:px-[5vw]"
            style={{ transformOrigin: "center center" }}
          >
            {/* Blades positioned at fixed angles, extending from rings edge */}
            {ecosystemItems.map((item, index) => {
              const angle = index * 30;
              const translateX = 35 + index * 3; // 35vw, 40vw, 45vw
              return (
                <div
                  key={index}
                  className="ecosystem-item absolute max-sm:relative max-sm:w-full max-sm:mb-[10vw]"
                  style={{
                    // Start from center, translate outward, then rotate
                    left: "50%",
                    top: "40%",
                    transform: `rotate(${angle}deg) translateX(${translateX}vw)`,
                    transformOrigin: "0 0",
                    opacity: index === 0 ? 1 : 0.15,
                    width: "45vw",
                  }}
                >
                  <div className="space-y-[1vw] max-sm:space-y-[4vw]">
                    <h3 className="text-44 font-heading font-medium tracking-[0.02em] text-[#0A1B4B]">
                      {item.title}
                    </h3>
                    <ul className="space-y-[0.3vw] list-disc pl-[1.5vw] text-24 leading-normal text-foreground max-sm:space-y-[2vw] max-sm:pl-[5vw]">
                      {item.points.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Rings Container */}
      </section>
      <AIEcosystemMob />
    </>
  );
};

export default AIEcosystem;


