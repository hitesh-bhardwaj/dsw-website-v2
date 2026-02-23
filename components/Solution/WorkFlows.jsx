import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";
import Copy from "../Animations/Copy";

const WorkFlows = ({ workflowsContent }) => {
  const { heading, items = [], para } = workflowsContent;

  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id="workflows"
    >
      <div className="w-full flex justify-between max-sm:flex-col">
        <div className="space-y-[2vw] w-[52%] max-sm:w-full">
          <HeadingAnim>
            <h2 className=" text-76 text-[#0A1B4B] leading-[1.2] max-sm:leading-[1.4] max-sm:text-center! max-sm:w-full">{heading}</h2>
          </HeadingAnim>
          {para && (
            <Copy>
              <p className="text-44">{para}</p>
            </Copy>
          )}
        </div>

        <div className="w-[44.5%] flex flex-col max-sm:hidden">
          {items.map((item, index) => {
            const isEven = index % 2 === 1; // 2nd, 4th... align right
            return (
              <div
                key={index}
                className={`w-full flex ${isEven ? "justify-end" : "justify-start"}`}
              >
                <div className="relative w-[20vw] h-[14vw] border border-black/20 p-[1.5vw] flex flex-col justify-between text-30 fadeup">
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
        

       <div className="hidden max-sm:flex max-sm:pt-[12vw] max-sm:flex-col max-sm:w-full max-sm:gap-[5vw]">
  {items.map((item, index) => (
    <div
      key={index}
      className="relative w-full max-sm:h-[42vw] max-sm:py-[7vw] border border-black/20 p-4 flex flex-col justify-between text-30 fadeup"
    >
      <CornerDecorations />
      <p className="text-primary-blue">
        {item.number ?? String(index + 1).padStart(2, "0")}
      </p>
      <p>{item.title}</p>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default WorkFlows;
