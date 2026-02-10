"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const Features = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".feature-card",
      {
        backgroundColor: "#02031c",
        color: "#ffffff",
      },
      {
        backgroundColor: "#ffffff",
        color: "#111111",
        scrollTrigger: {
          trigger: "#features",
          start: "top 70%",
          end: "20% 70%",
          // markers:true,
          scrub: true,
        },
      },
    );
    gsap.to(".feature-card-container",{
      yPercent:-20,
      ease:"none",
      scrollTrigger:{
        trigger:"#features",
        start:"49% 50%",
        end:"80% top",
        scrub:true,
        // markers:true,
      }
    });
  });

  return (
    <section className="w-full h-fit relative space-y-[5vw] " id="features">
      <div className="w-fit h-fit feature-card-container">
      {FEATURES.map((feature) => (
        <div
          key={feature.id}
          className={`
      w-full h-fit sticky px-[5vw] py-[3vw] bg-[#02031c] feature-card
      ${feature.hasTopBorder ? "border-t border-black/30" : ""}
      ${feature.hasBottomBorder ? "border-b border-black/30" : ""}
      ${feature.extraPaddingBottom ? "pb-[10vw]" : ""}
    `}
          style={{ top: feature.stickyTop }}
        >
          <HeadingAnim>
          <h3 className="text-56">{feature.title}</h3>
          </HeadingAnim>

          <div className="w-full flex justify-between mt-[7vw]">
            {/* Left Content */}
            <div className="w-[45%] h-full flex flex-col gap-[5vw] text-30">
              {/* <Copy> */}
              <p>{feature.description}</p>
              {/* </Copy> */}

              <ul className="font-medium text-30 space-y-[0.5vw]">
                {feature.bullets.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="w-[20vw] rounded-[2vw] h-full">
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
      "Build, deploy, and operate unlimited AI and GenAI use cases without per-model, per-agent, or per-workflow pricing.",
    bullets: [
      "One subscription.",
      "Predictable spend.",
      "No compounding AI costs as usage scales.",
    ],
    image: "/assets/homepage/features-img-1.png",
  },
  {
    id: 2,
    stickyTop: "15%",
    hasTopBorder: true,
    hasBottomBorder: false,
    title: "No Vendor Lock In",
    description:
      "Run open-source and proprietary models side by side with full control over cost and performance.",
    bullets: [
      "Any model, any cloud.",
      "No vendor lock-in.",
      "Full infra visibility.",
    ],
    image: "/assets/homepage/features-img-1.png",
  },
  {
    id: 3,
    stickyTop: "30%",
    hasTopBorder: true,
    hasBottomBorder: true,
    extraPaddingBottom: true,
    title: "Break the Cost Per User Case barrier",
    description:
      "Scale inference and training workloads without runaway costs or complex billing structures.",
    bullets: [
      "Flat pricing.",
      "Scale confidently.",
      "Built for production AI.",
    ],
    image: "/assets/homepage/features-img-1.png",
  },
];
