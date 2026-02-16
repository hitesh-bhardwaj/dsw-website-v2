"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Choose = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#choose",
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
      defaults: { ease: "power1.inOut" },
    });

    // STEP 1: content1 is primary, content2 is offscreen
    tl.from(".choose-content1", {
      scale: 0.8,
      opacity: 0.5,
      left: "100%",
    }).fromTo(
      ".choose-content2",
      {
        left: "150%",
        top: "100%",
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 0.8,
        top: "60%",
        opacity: 0.5,
        left: "100%",
      },
      "<",
    ).fromTo(
      ".choose-content3",
      {
        left: "200%",
        top: "100%",
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 0.5,
        top: "100%",
        opacity: 0.5,
        left: "150%",
      },
      "<",
    )

    // STEP 2: content2 becomes primary, content1 becomes secondary (left)
    tl.to(".choose-content1", {
      scale: 0.8,
      opacity: 0.5,
      left: "0%",
      top: "60%",
    }).fromTo(
      ".choose-content2",
      {
        scale: 0.8,
        opacity: 0.5,
        left: "100%",
      },
      {
        top: "50%",
        scale: 1,
        opacity: 1,
        left: "50%",
      },
      "<",
    )
    .fromTo(
      ".choose-content3",
      {
        scale: 0.5,
        top: "100%",
        opacity: 0.5,
        left: "150%",
      },
      {
        scale: 0.8,
        top: "60%",
        opacity: 0.5,
        left: "100%",
      },
      "<",
    );


    // STEP 4: content3 becomes primary, content2 becomes secondary (left)
    tl.to(".choose-content2", {
      scale: 0.8,
      opacity: 0.5,
      left: "0%",
      top: "60%",
    }).fromTo(
      ".choose-content3",
      {
        scale: 0.8,
        opacity: 0.5,
        left: "100%",
      },
      {
        top: "50%",
        scale: 1,
        opacity: 1,
        left: "50%",
      },
      "<",
    ).to(".choose-content1",{
        top: "100%",
        scale: 1,
        opacity: 0,
        left: "-75%",
    },"<")
  });

  return (
    <section className="w-full h-[300vh]" id="choose">
      <div className="w-full h-screen sticky top-0 flex items-center justify-center flex-nowrap">
        <h3 className="text-110 w-[50%] text-center absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 choose-content1">
          You choose the environment.
        </h3>

        <h3 className="text-110 w-[50%] text-center absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 choose-content2">
          You own the system.
        </h3>

        <h3 className="text-110 w-[50%] text-center absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 choose-content3">
          You control how AI runs.
        </h3>
      </div>
    </section>
  );
};

export default Choose;
