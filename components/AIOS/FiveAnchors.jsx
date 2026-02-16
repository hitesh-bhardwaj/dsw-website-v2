"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

const FiveAnchors = () => {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(() => {
    const ring = ringRef.current;
    const section = sectionRef.current;

    // Base continuous rotation animation
    const baseRotation = gsap.to(ring, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    // Speed up rotation on scroll
    gsap.to(baseRotation, {
      timeScale: 3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[7%] bg-background max-sm:py-[15%]"
    >
      {/* Heading */}
      <div className="text-center px-[5vw] mb-[5vw] max-sm:mb-[10vw]">
        <HeadingAnim>
          <h2 className="text-76 text-foreground leading-[1.1]">
            The Five Timeless Anchors of the Enterprise AI Operating System
          </h2>
        </HeadingAnim>
      </div>

      {/* Infographic Container */}
      <div className="relative w-full max-w-[45vw] mx-auto aspect-square max-sm:max-w-[90vw]">
        {/* Rotating Circle Ring */}
        <div
          ref={ringRef}
          className="absolute inset-[10%] z-0"
        >
          <Image
            src="/assets/icons/aios/anchors/circle-ring.png"
            alt="Circle ring"
            fill
            className="object-contain"
          />
        </div>

        {/* Static Icons positioned around the ring */}

        {/* Top - Continuous Adaption */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[0.8vw] z-10">
          <div className="w-[6vw] h-[6vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%] aspect-square">
              <Image
                src="/assets/icons/aios/anchors/continuous-adaption.svg"
                alt="Continuous Adaption"
                fill
                className="object-contain aspect-square"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize tracking-[0.02em]">
            Continuous Adaption
          </p>
        </div>

        {/* Right - Data Sovereignty */}
        <div className="absolute top-[35%] right-0 flex flex-col items-center gap-[0.8vw] z-10">
          <div className="w-[6vw] h-[6vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/data-sovereignty.svg"
                alt="Data Sovereignty"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize tracking-[0.02em]">
            Data Sovereignty
          </p>
        </div>

        {/* Bottom Right - Human Centric */}
        <div className="absolute bottom-[5%] right-[15%] flex flex-col items-center gap-[0.8vw] z-10">
          <div className="w-[6vw] h-[6vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/human-centric.svg"
                alt="Human Centric"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize tracking-[0.02em]">
            Human Centric
          </p>
        </div>

        {/* Bottom Left - Strategic Flexibility */}
        <div className="absolute bottom-[5%] left-[15%] flex flex-col items-center gap-[0.8vw] z-10">
          <div className="w-[6vw] h-[6vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/strategic-flexibility-1.svg"
                alt="Strategic Flexibility"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize tracking-[0.02em]">
            Strategic Flexibility
          </p>
        </div>

        {/* Left - Adaption Reality */}
        <div className="absolute top-[35%] left-0 flex flex-col items-center gap-[0.8vw] z-10">
          <div className="w-[6vw] h-[6vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/adaption-reality.svg"
                alt="Adaption Reality"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize tracking-[0.02em]">
            Adaption Reality
          </p>
        </div>
      </div>
    </section>
  );
};

export default FiveAnchors;
