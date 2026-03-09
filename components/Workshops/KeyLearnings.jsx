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
      <div className="flex flex-col justify-between items-center space-y-[5vw] max-md:flex-col max-sm:pt-[10vw]">
        <div className="w-full text-center">
          <HeadingAnim>
          <h3 className="text-76  max-sm:text-center max-sm:leading-[1.4]  font-heading max-sm:w-[60%] max-sm:mx-auto">
            Key Learning Objectives
          </h3>
          </HeadingAnim>
        </div>

        <div className="w-[50%] max-md:ml-0 pl-[3vw] max-md:w-full max-md:mt-[8vw]">
          <div className="space-y-[2vw] max-sm:space-y-[2vw] w-full">
            {capabilities.map((cap, index) => (
              <div key={index} className="relative max-md:pb-[8vw] pb-[1.5vw] max-sm:w-[90%] fadeup">
                <div className="relative">
                  <span className="absolute top-0 left-0 w-1 max-sm:w-0.5 bg-[#5662FF] h-full "/>
                   <p className="text-30 text-foreground  max-md:w-full pl-[2vw] max-sm:pl-[4vw]">
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
