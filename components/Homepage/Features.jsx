"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const Features = () => {
  useGSAP(() => {
    if (globalThis.innerWidth > 1024) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#features",
          start: "28% top",
          end: "43% top",
          scrub: true,
          // markers:true
        },
        defaults: {
          ease: "none",
        },
      });
      tl.to(".feature-1", {
        translateY: "-26%",
      }).to(
        ".feature-2",
        {
          translateY: "-26%",
        },
        "<",
      );
    }
  });

  return (
    <section className="w-full  relative space-y-[5vw] z-[4]" id="features">
      <div className="w-fit h-[150vw] flex flex-col justify-between feature-card-container max-sm:h-[600vw] max-md:h-[340vw]">
        {FEATURES.map((feature, id) => (
          <div
            key={feature.id}
            className={`
      w-screen h-fit px-[5vw] py-[4vw] pb-[10vw] bg-[#ffffff] feature-card  max-sm:py-[10vw] max-md:py-[7vw] sticky ${id == 0 && " feature-1 top-0"} ${id == 2 && "top-[19%]"} ${id == 1 ? "max-sm:top-[15%]! max-md:top-[14%] feature-2 top-[20%]" : ""}
      ${feature.hasTopBorder ? "border-t border-black/30" : ""}
      ${feature.hasBottomBorder ? "border-b border-black/30" : ""}
      ${feature.extraPaddingBottom ? "pb-[10vw]" : ""}
    `}
          >
            <HeadingAnim>
              <h3 className="text-56">{feature.title}</h3>
            </HeadingAnim>

            <div className="w-full flex justify-between mt-[5.5vw] max-md:flex-col-reverse max-sm:mt-[15vw] max-md:mt-[10vw] max-md:gap-[7vw] max-sm:gap-[20vw]">
              {/* Left Content */}
              <div className="w-[45%] h-full flex flex-col gap-[3vw] text-30 max-md:w-full">
                {/* <Copy> */}
                <Copy>
                  <p>{feature.description}</p>
                </Copy>
                {/* </Copy> */}

                {feature.bullets && feature.bullets.length > 0 && (
                  <Copy>
                    <ul className="font-medium text-30 space-y-[0.5vw] list-disc pl-[1.5vw] max-sm:pl-[5vw]">
                      {feature.bullets.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Copy>
                )}
                <Copy>
                  <p className="">{feature.para}</p>
                </Copy>
              </div>

              {/* Right Image */}
              <div className="w-[37vw] rounded-[1vw] h-full max-sm:w-[85%] max-md:w-[70%] max-sm:rounded-[2.5vw] overflow-hidden fadeup">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                  priority={feature.id === 1}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

const FEATURES = [
  {
    id: 1,
    stickyTop: "0%",
    hasTopBorder: false,
    hasBottomBorder: false,
    title: "Create Your Own AI Native Infrastructure",
    description:
      "Deploy the Enterprise AI Operating System entirely within your environment on-prem, cloud, or hybrid.",
    para: "Enterprise-grade security, control, and data sovereignty remain fully in your hands.",
    image: "/assets/homepage/featuresDashboard1.png",
  },
  {
    id: 2,
    stickyTop: "20%",
    hasTopBorder: true,
    hasBottomBorder: false,
    title: "No Vendor Lock In",
    description: "Bring your models, LLMs, tools, and data.",
    bullets: [
      "Retain full ownership of source code, artifacts, and IP.",
      "No forced ecosystems.",
      "No outbound learning.",
      "No exit penalties.",
    ],
    para: "Your AI stack evolves on your terms.",
    image: "/assets/homepage/featuresDashboard2.png",
  },
  {
    id: 3,
    stickyTop: "20%",
    hasTopBorder: true,
    hasBottomBorder: true,
    extraPaddingBottom: true,
    title: "Break the Cost Per User Case Barrier",
    description:
      "Build, deploy, and operate unlimited AI and GenAI use cases without per-model, per-agent, or per-workflow pricing.",
    bullets: [
      "One subscription.",
      "Predictable spend.",
      "No compounding AI costs as usage scales.",
    ],
    image: "/assets/homepage/features-dashboard-3.png",
  },
];
