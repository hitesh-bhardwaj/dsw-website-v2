"use client";
import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";

const capabilities = [
  {
    text: "Develop hands-on AI expertise by actively building and deploying use cases.",
  },
  {
    text: "Learn practical approaches to AI adoption at scale, from experimentation to deployment.",
  },
  {
    text: "Gain exposure to AI/ML and GenAI frameworks used in leading enterprises.",
  },
  {
    text: "Understand the AI/ML lifecycle and the transition to production-ready solutions.",
  },
];

const KeyLearnings = () => {
  return (
    <section className="h-full px-[5vw] py-[7%]">
      <div className="flex flex-col justify-between items-center space-y-[5vw] max-md:flex-col pt-[4vw] max-md:pt-[10vw]">
        <div className="w-full text-center">
          <HeadingAnim>
          <h3 className="text-76  max-md:text-left  font-head">
            Key Learning Objectives
          </h3>
          </HeadingAnim>
        </div>

        <div className="w-[40%] max-md:w-full max-md:mt-[10vw]">
          <div className="space-y-[2vw] max-md:space-y-[8vw] w-full">
            {capabilities.map((cap, index) => (
              <div key={index} className="relative max-md:pb-[8vw] pb-[1.5vw] fadeup">
                <div className="relative">
                  <span className="absolute top-0 left-0 w-1 bg-[#5662FF] h-full "/>
                   <p className="text-30 text-foreground  max-md:w-full pl-[2vw]">
                      {cap.text}
                    </p>
                    
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyLearnings;
