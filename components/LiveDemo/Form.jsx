"use client";

import React from "react";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import DemoForm from "../DemoForm";


const Form = () => {
  return (
    <section
      className="w-screen h-full overflow-hidden relative z-[10]  max-md:mt-0 px-[5vw] max-md:px-[6vw] max-sm:px-[7vw] max-sm:py-[15%] py-[7%]"
      id="contact-form"
    >
      <div className="h-full w-full flex items-start justify-between   max-sm:flex-col max-md:flex-col max-sm:gap-[8vw] max-md:gap-[10vw]  max-md:px-0">
        <div className="w-[52%] h-full  max-sm:w-full max-md:w-[100%] space-y-[1.5vw] max-md:space-y-[3vw] max-sm:space-y-[4.5vw] flex flex-col justify-between gap-[6.5vw]">
          <div className="h-[35%]  space-y-[1.5vw] max-md:space-y-[7vw] max-sm:space-y-[10vw]">
            <HeadingAnim>
              <h2 className="w-[85%] max-md:w-full text-76  font-head text-[#0A1B4B] leading-[1.2]">
               Get a Full Demo
              </h2>
            </HeadingAnim>

            <div className="w-[83%]  space-y-[2vw] max-md:text-left max-md:w-full max-md:space-y-[4vw]">
              <Copy>
                <p className="text-24 font-normal max-md:text-left">
                AI is moving faster than the infrastructure built to support it. Legacy systems can’t keep pace with the exabyte-scale, real-time demands of millions of AI agents. VAST AI OS changes that.
                </p>
              </Copy>
               <Copy>
                <p className="text-24 font-normal max-md:text-left">
                Built on our Disaggregated Shared Everything (DASE) architecture, it unifies storage, database, and AI compute into a single, AI-native platform - giving every GPU simultaneous access to all your data for limitless scale and speed.

                </p>
              </Copy>
               <Copy>
                <div className="text-24 font-normal max-md:text-left">
                Join our live demo, offered every Tuesday and Thursday, to:
                <ul className="pl-[2vw] py-[1vw] list-disc space-y-[0.5vw]">
                    <li>See how the VAST AI OS powers the Agentic Age of AI</li>
                    <li>Discover how DASE eliminates bottlenecks and complexity</li>
                    <li>Learn how to cut costs and accelerate AI projects</li>
                </ul>
                </div>
              </Copy>
              <Copy>
                <p className="text-24 font-normal max-md:text-left">Reserve your spot - this is a demo you don’t want to miss. <br/> Want a deep dive? <span className="text-primary-blue">Schedule a personalized demo.</span> </p>
              </Copy>
            </div>
          </div>
        </div>
        <div className="w-[50%] max-md:w-full mt-[11vw] fadeup  max-sm:w-full max-md:mt-0 relative">
          <DemoForm/>
        </div>
      </div>
    </section>
  );
};

export default Form;
