import React from "react";
import Copy from "../Animations/Copy";
import TeamForm from "./TeamForm";
import HeadingAnim from "../Animations/HeadingAnim";

const Empower= ({heading,para,width}) => {
  return (
    <section className="w-screen h-full overflow-hidden relative z-[10]">
      <div className="h-full w-full flex items-start justify-between px-[5vw] py-[7%] max-md:flex-col max-sm:flex-col max-sm:gap-[8vw] max-md:gap-[10vw] max-sm:px-[5.5vw] max-md:px-[4vw]">
        <div className="w-[52%] h-full   max-sm:w-full max-md:w-[100%] space-y-[1.5vw] max-md:space-y-[3vw] max-sm:space-y-[4.5vw] flex flex-col justify-between gap-[6.5vw]">
          <div className="space-y-[1.5vw] max-sm:space-y-[5vw] max-md:space-y-[2.5vw]">
            <HeadingAnim>
            <h2 className={` text-76 text-[#0A1B4B] max-sm:!text-[11.5vw] leading-[1.2] ${width}`}>
              {heading}
            </h2>
            </HeadingAnim>

            <div className="w-[65%] max-sm:w-[85%] max-md:w-[85%]">
              <Copy>
                <p className="text-30 text-[#11111]">
                 {para}
                </p>
              </Copy>
            </div>
          </div>
        </div>
        <div className="w-[47%] mt-[10vw] max-md:w-[100%] max-sm:w-full max-md:mt-0">
         <TeamForm/>
        </div>
      </div>
    </section>
  );
};

export default Empower;
