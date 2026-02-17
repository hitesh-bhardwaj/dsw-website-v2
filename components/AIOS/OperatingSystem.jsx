"use client";
import Image from "next/image";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: 1,
    text: "Models and Agents",
    imgSrc: "/assets/icons/aios/icon-1.svg",
    left: "-10%",
  },
  {
    id: 2,
    text: "Business Workflows",
    imgSrc: "/assets/icons/aios/icon-2.svg",
    left: 0,
  },
  {
    id: 3,
    text: "Data Platforms And Applications",
    imgSrc: "/assets/icons/aios/icon-3.svg",
    left: 0,
  },
  {
    id: 4,
    text: "Regulated Environments With Real Risk",
    imgSrc: "/assets/icons/aios/icon-4.svg",
    left: "-10%",
  },
];

const OperatingSystem = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#operatingSystem",
        start: "top top",
        // markers: true,
      },
    });

    tl.from(".os-content", {
      xPercent: 20,
      opacity: 0,
      ease: "power2.inOut",
      stagger: 0.1,
    }).from(
      ".run-across",
      {
        opacity: 0,
      },
      "<"
    );

    // Optional: mobile reveal (safe if elements exist)
    tl.from(
      ".mobile-step",
      {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        ease: "power2.out",
      },
      "<+=0.15"
    );
  });

  // mobile steps = "It Runs Across" + data items
  const mobileSteps = [
    { id: "runs-across", text: "It Runs Across" },
    ...data.map((item) => ({ id: item.id, text: item.text })),
  ];

  return (
    <section
      className="relative w-full h-fit py-[7%] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit pt-[15%] z-[10]"
      id="operatingSystem"
    >
      <div className="text-center w-4/6 mx-auto space-y-[2vw] max-sm:w-full max-sm:space-y-[7vw]">
        <HeadingAnim>
          <h2 className="text-76 text-center font-heading text-[#0A1B4B]">
            Why Enterprises Need an AI Operating System
          </h2>
        </HeadingAnim>

        <Copy>
          <p className="text-30 font-sans leading-[1.4] text-foreground mx-auto">
            AI no longer lives in one team, one model, or one tool.
          </p>
        </Copy>
      </div>

      {/* Desktop */}
      <div className="py-[5vw] w-[54%] mx-auto max-sm:hidden">
        <div className="flex justify-between items-center">
          <div className="size-[20vw] relative flex items-center justify-center run-across">
            <div className="size-[14vw] border border-primary-blue rounded-full flex items-center justify-center text-center">
              <p className="text-30 leading-[1.4]">It Runs Across</p>
            </div>

            {/* NOTE: fill should be boolean, not string */}
            <Image
              className="!left-1/4"
              src="/assets/icons/run-across-half.svg"
              alt="half circle image"
              fill
            //   className="object-contain !left-1/4"
            />
          </div>

          <div className="space-y-[1.8vw]">
            {data.map((item) => (
              <div
                key={item.id}
                style={{ transform: `translateX(${item.left})` }}
                className="p-2 border border-primary-blue rounded-full pr-[2.5vw] flex items-center justify-start gap-[2vw] os-content"
              >
                <Image
                  className="size-[4vw]"
                  src={item.imgSrc}
                  alt="icon"
                  width={80}
                  height={80}
                />
                <p className="text-24">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile - ✅ mapped */}
      <div className="w-full h-fit hidden max-sm:block space-y-[7vw] pt-[15vw] mobile-content">
        {mobileSteps.map((step, idx) => {
          const isLast = idx === mobileSteps.length - 1;

          return (
            <div
              key={step.id}
              className="w-full h-fit flex flex-col justify-center items-center gap-[7vw] mobile-step"
            >
              <p className={`text-30 w-[70%] text-center ${idx === 0 ? "font-medium" : ""}`}>
                {step.text}
              </p>

              {!isLast && (
                <div className="w-auto h-[15vw]">
                  <Image
                    src="/assets/icons/long-arrow.svg"
                    alt="arrow"
                    width={300}
                    height={800}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center w-4/5 mx-auto space-y-[2vw] max-sm:space-y-[10vw] max-sm:w-full max-sm:pt-[15vw]">
        <Copy>
          <p className="text-30 text-center font-sans leading-[1.4] tracking-[0.025vw] text-foreground">
            Without a system layer, AI becomes fragmented, difficult to govern, and dangerous to scale. Enterprises don’t just need more AI tools.
            <span className="text-primary-blue">
               They need a foundation to operate AI as part of the enterprise itself.
            </span>
          </p>
        </Copy>

        <Copy>
          <p className="text-30 font-sans leading-[1.4] tracking-[0.025vw] text-foreground">
            That foundation is the DSW Enterprise AI Operating System.
          </p>
        </Copy>
      </div>
    </section>
  );
};

export default OperatingSystem;
