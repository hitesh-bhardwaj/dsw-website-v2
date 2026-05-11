"use client";
import Image from "next/image";
import React from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LinkButton from "./Buttons/LinkButton";

const WaveGridCanvas = dynamic(() => import("./Homepage/HeroBg"), {
  ssr: false,
  loading: () => <div className="absolute top-0 left-0 h-screen w-screen" />
});

const Notfound = () => {
  const ShaderRef = useRef();
  const [mob, setMob] = useState(false);
  useGSAP(() => {
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
        className={`h-full w-full flex-col flex items-center justify-center z-[101] relative text-foreground text-center pointer-events-none`}
      >
        <div className="w-fit h-[16vw] overflow-hidden max-sm:h-[32vw] max-md:h-[22vw] ">
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
            <p className="leading-[1.4] text-24! text-white-300  max-md:text-[3vw] max-sm:text-[4.2vw] hero-content pointer-events-auto">
              Go back to{" "}
              <LinkButton href={"/"} text={"Homepage!!"}/>
            </p>
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
            fetchPriority="high"
            width={393}
            alt="hero-bg"
            className="h-full w-full"
          />
        </div>
      )}
      <div className="w-screen h-screen bg-white absolute inset-0 pointer-events-none hero-overlay z-[99]" />

    </section>
  );
};

export default Notfound;
