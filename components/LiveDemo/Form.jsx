"use client";

import React from "react";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import DemoForm from "../DemoForm";
import Image from "next/image";


const Form = () => {
  return (
    <section
      className="w-screen h-full relative z-[10]  max-md:mt-0 px-[5vw] max-md:px-[6vw] max-sm:px-[7vw] max-sm:py-[15%] py-[7%]"
      id="contact-form"
    >
      <div className="h-full w-full flex items-start justify-between   max-sm:flex-col max-md:flex-col max-sm:gap-[8vw] max-md:gap-[10vw]  max-md:px-0">
        <div className="w-[52%] h-full  max-sm:w-full max-md:w-[100%] space-y-[1.5vw] max-md:space-y-[3vw] max-sm:space-y-[4.5vw] flex flex-col justify-between gap-[6.5vw]">
          <div className="h-[35%]  space-y-[1.5vw] max-md:space-y-[7vw] max-sm:space-y-[10vw]">
          

            <div className="w-[83%]  space-y-[2vw] max-md:text-left max-md:w-full max-md:space-y-[4vw]">
              <div className="w-full h-[9vw] rounded-[0.5vw] overflow-hidden fadeup max-md:h-[22vw] max-sm:rounded-[2vw] ">
                <Image src={"/assets/email-signature-img.png"} alt="" className="w-full h-full object-cover" width={500} height={300}/>
              </div>
              <Copy>
                <p className=" text-30 mb-[2vw]">See the Enterprise AI Operating System in Action</p>
                <p className="text-24 font-normal max-md:text-left">
                AI is moving rapidly into production, yet most enterprises still operate through fragmented models, agents, tools, and vendors. What organizations need now is not another AI tool, but a system to operate AI securely and at scale.
                </p>
              </Copy>
               <Copy>
                <p className="text-24 font-normal max-md:text-left">
                <span className="font-medium">DSW UnifyAI OS – The Enterprise AI Operating System</span> enables enterprises to build, integrate, deploy, govern, and operate AI and Agentic AI within their own environment.
                </p>
              </Copy>
               <Copy>
                <p className="text-24 font-normal max-md:text-left">
                Join our live demo to see how enterprises move from fragmented AI initiatives to a governed system for operating AI in production.
                </p>
              </Copy>
               <Copy>
                <div className="text-24 font-normal max-md:text-left">
                Our live sessions walk through real enterprise AI workflows running on UnifyAI OS.
                 <br/>
                You will see:
                <ul className="pl-[2vw] py-[1vw] list-disc space-y-[0.5vw]">
                    <li>AI and Agentic AI lifecycle in action</li>
                    <li>Runtime governance and execution control</li>
                    <li>Enterprise AI deployment architecture</li>
                    <li>Real - world enterprise use cases</li>
                </ul>
                </div>
              </Copy>
              <Copy>
                <p className="text-24 font-normal max-md:text-left">Want a deeper look? <span className="text-primary-blue">Schedule a personalized demo.</span> </p>
              </Copy>
            </div>
          </div>
        </div>
        <div className="w-[50%] max-md:w-full space-y-[4vw] fadeup  max-sm:w-full max-md:mt-0 sticky top-[12%] h-fit">
            <HeadingAnim>
              <h2 className="w-[85%] max-md:w-full text-76  font-head text-[#0A1B4B] leading-[1.2]">
               Join a Live Demo
              </h2>
            </HeadingAnim>
          <DemoForm/>
        </div>
      </div>
    </section>
  );
};

export default Form;
