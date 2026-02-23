"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Copy from "@/components/Animations/Copy";
import { Suspense, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WaveGridCanvas from "./Homepage/HeroBg";

const Notfound = () => {
  const ShaderRef = useRef();
  const [mob, setMob] = useState(false);
  useGSAP(() => {
    gsap.set(".not-found-para", {
      opacity: 1,
    });
    gsap.to(".num", {
      translateY: "-100%",
      stagger: { from: "random", amount: 1 },
      duration: 1.5,
      delay: 2,
      ease: "back.inOut",
      repeat: -1,
      repeatDelay: 3,
    });
    gsap.to(".not-found-head", {
      translateY: "0%",
      duration: 1,
      rotate: 0,
      delay: 0.5,
      ease: "power2.out",
    });
    gsap.fromTo(
      ShaderRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 3,
        delay: 0.5,
        ease: "power3.out",
      }
    );
    gsap.fromTo(
      ".mobile-shader",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 3,
        delay: 0.5,
        ease: "power3.out",
      }
    );
  });
  useEffect(() => {
    if (globalThis.innerWidth <= 1024) {
      setMob(true);
    } else {
      setMob(false);
    }
  }, [mob]);
  return (
    <section className="w-screen relative h-screen  max-sm:pb-0  overflow-hidden">
      <div
        className={`h-full w-full flex-col flex items-center justify-center z-[99] relative text-foreground text-center`}
      >
        <div className="w-fit h-[16vw] overflow-hidden max-sm:h-[32vw] max-md:h-[22vw]">
          <h1
            className={`text-[20vw] h-[16vw] flex flex-row  font-medium font-display w-fit  text-white-200 overflow-hidden not-found-head translate-y-[110%] rotate-[5deg] max-sm:text-[40vw] max-sm:h-[32vw] max-md:text-[27vw] max-md:h-[22vw]`}
          >
            <div className="flex flex-col num">
              <span className="leading-[0.8]">4</span>
              <span className="leading-[0.8]">4</span>
            </div>
            <div className="flex flex-col num">
              <span className="leading-[0.8]">0</span>
              <span className="leading-[0.8]">0</span>
            </div>
            <div className="flex flex-col num">
              <span className="leading-[0.8]">4</span>
              <span className="leading-[0.8]">4</span>
            </div>
          </h1>
        </div>
        <div
          className={`w-[60%] max-md:w-[80%] pt-[2vw] text-content-20 text-gray-2 max-sm:w-full max-md:pt-[5vw] max-sm:pt-[7vw]`}
        >
          <Copy delay={0.5 + 0.5}>
            <p className="leading-[1.5] text-white-300  max-sm:leading-[1.5] max-md:text-[3vw] max-sm:text-[4.2vw] opacity-0 not-found-para">
              Go back to{" "}
              <Link
                href="/"
                className="under-multi-parent w-fit pointer-events-auto pb-[1px]"
              >
                <span className="under-multi">Homepage!!!</span>
              </Link>
            </p>
          </Copy>
        </div>
      </div>
      {!mob ? (
        <div
          ref={ShaderRef}
          className="absolute top-0 left-0 h-screen w-screen max-sm:hidden "
        >
          <Suspense>
            <WaveGridCanvas key={"404"} variant={"default"}/>
          </Suspense>
        </div>
      ) : (
        <div className="absolute top-0 left-0 h-full w-screen hidden max-sm:block max-md:block mobile-shader">
          <Image
            src={"/assets/homepage/hero-bg-mob.png"}
            height={852}
            // fetchPriority="high"
            loading="lazy"
            width={393}
            alt="hero-bg"
            className="h-full w-full"
          />
        </div>
      )}
    </section>
  );
};

export default Notfound;
