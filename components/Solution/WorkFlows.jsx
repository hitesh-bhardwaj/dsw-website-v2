"use client"
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";
import Copy from "../Animations/Copy";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WorkFlows = ({ workflowsContent }) => {
  const { heading, items = [], para } = workflowsContent;
  useGSAP(()=>{
    const leftBoxes = document.querySelectorAll(".left-box");
    const rightBoxes = document.querySelectorAll(".right-box");

    leftBoxes.forEach((box) => {
      gsap.fromTo(
        box,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            end: "bottom 60%",
            scrub:true,
          },
        }
      );
    });

    rightBoxes.forEach((box) => {
      gsap.fromTo(
        box,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            end: "bottom 60%",
            scrub:true,
          },
        }
      );
    });
  })

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id="workflows"
    >
      <div className="w-full h-fit flex justify-between max-sm:flex-col max-sm:overflow-hidden max-sm:space-y-[12vw]">
        <div className="space-y-[2vw] w-[52%] max-sm:w-full sticky top-[10%] max-md:static h-fit">
          <HeadingAnim>
            <h2 className=" text-76 text-[#0A1B4B] leading-[1.2] max-sm:leading-[1.4] max-sm:text-center! max-sm:w-full capitalize">
              {heading}
            </h2>
          </HeadingAnim>
          {para && (
            <Copy>
              <p className="text-44 text-[#0A1B4B] font-light">{para}</p>
            </Copy>
          )}
        </div>

        <div className="w-[44.5%] flex flex-col max-sm:w-full max-sm:space-y-[5vw]">
          {items.map((item, index) => {
            const isEven = index % 2 === 1; // 2nd, 4th... align right
            return (
              <div
                key={index}
                className={`w-full flex ${isEven ? "justify-end right-box" : "justify-start left-box"}`}
              >
                <div className="relative w-[20vw] h-[14vw] border border-black/20 p-[1.5vw] flex flex-col justify-between text-30 fadeup max-sm:w-full max-sm:h-[50vw] max-sm:p-[5vw]">
                  <CornerDecorations />
                  <p className="text-primary-blue">
                    {item.number ?? String(index + 1).padStart(2, "0")}
                  </p>
                  <p>{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkFlows;
