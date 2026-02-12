"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const Features = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:"#features",
        start:"21% top",
        end:"37% top",
        scrub:true,
        // markers:true
      },
      defaults:{
        ease:"none",
      }
    })
    tl.to(".feature-1",{
      yPercent:-35,
    })
    .to(".feature-2",{
      yPercent:-35
    },"<")
    
    // gsap.fromTo(
    //   ".feature-card",
    //   {
    //     backgroundColor: "#02031c",
    //     color: "#ffffff",
    //   },
    //   {
    //     backgroundColor: "#ffffff",
    //     color: "#111111",
    //     scrollTrigger: {
    //       trigger: "#features",
    //       start: "top 70%",
    //       end: "20% 70%",
    //       // markers:true,
    //       scrub: true,
    //     },
    //   },
    // );
    // gsap.to(".feature-card-container", {
    //   yPercent: -20,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: "#features",
    //     start: "49% 50%",
    //     end: "80% top",
    //     scrub: true,
    //     // markers:true,
    //   },
    // });
  });

  return (
    <section
      className="w-full  relative space-y-[5vw] z-[2]"
      id="features"
    >
      <div className="w-fit h-fit feature-card-container">
        {FEATURES.map((feature, id) => (
          <div
            key={feature.id}
            className={`
      w-full h-fit sticky px-[5vw] py-[6vw] bg-[#ffffff] feature-card max-sm:py-[10vw] ${id==0&&" feature-1 "} ${id == 1 ? "max-sm:top-[30%]! feature-2" : ""}
      ${feature.hasTopBorder ? "border-t border-black/30" : ""}
      ${feature.hasBottomBorder ? "border-b border-black/30" : ""}
      ${feature.extraPaddingBottom ? "pb-[10vw]" : ""}
    `}
            style={{ top: feature.stickyTop }}
          >
            <HeadingAnim>
              <h3 className="text-56">{feature.title}</h3>
            </HeadingAnim>

            <div className="w-full flex justify-between mt-[7vw] max-sm:flex-col-reverse max-sm:mt-[15vw] max-sm:gap-[20vw]">
              {/* Left Content */}
              <div className="w-[45%] h-full flex flex-col gap-[3vw] text-30 max-sm:w-full">
                {/* <Copy> */}
                <p>{feature.description}</p>
                {/* </Copy> */}

                {feature.bullets && feature.bullets.length > 0 && (
                  <ul className="font-medium text-30 space-y-[0.5vw]">
                    {feature.bullets.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                <p className="">{feature.para}</p>
              </div>

              {/* Right Image */}
              <div className="w-[20vw] rounded-[2vw] h-full max-sm:w-[75%] overflow-hidden">
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
    image: "/assets/homepage/features-img-1.png",
  },
  {
    id: 2,
    stickyTop: "25%",
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
    image: "/assets/homepage/features-img-1.png",
  },
  {
    id: 3,
    stickyTop: "20%",
    hasTopBorder: true,
    hasBottomBorder: true,
    extraPaddingBottom: true,
    title: "Break the Cost Per User Case barrier",
    description:
      "Build, deploy, and operate unlimited AI and GenAI use cases without per-model, per-agent, or per-workflow pricing.",
    bullets: [
      "One subscription.",
      "Predictable spend.",
      "No compounding AI costs as usage scales.",
    ],
    image: "/assets/homepage/features-img-1.png",
  },
];
