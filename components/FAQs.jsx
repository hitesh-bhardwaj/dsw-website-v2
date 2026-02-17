"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import HeadingAnim from "./Animations/HeadingAnim";
gsap.registerPlugin(ScrollTrigger);

export default function Faqs({ allowMultiple = false, data }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  function toggleIndex(i) {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(i) ? [] : [i]));
    }
  }
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [openIndexes]);


  return (
    <section
      className=" w-full  relative  max-sm:min-h-screen max-md:min-h-screen dark z-[40]  !text-foreground px-[5vw] py-[7%]"
      id="faqs"
    >
      <div className="flex flex-col items-center gap-[5vw] max-sm:gap-[10vw] max-md:justify-center max-sm:items-start">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] text-center max-sm:w-full max-sm:text-left">
            Frequently Asked Questions
          </h2>
          </HeadingAnim>
        
        
        <div className="w-[90%]  max-md:w-full max-sm:space-y-[5vw]  max-md:py-[3vw] max-md:space-y-[3vw] relative z-[10]">
          {data.map((f, i) => (
            <AccordionItem
              key={i}
              question={f.question}
              answer={f.answer}
              isOpen={openIndexes.includes(i)}
              onToggle={() => toggleIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ question, answer, isOpen, onToggle }) {

  return (
    <div className="w-full group  overflow-hidden relative z-[10] faq-tab fadeupanim accordion-block group fadeup">
      <div className="w-full mr-auto relative">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#88888880] opacity-[0.5]"></div>
        <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#1727FF] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ${isOpen?"scale-x-100":"scale-x-0"}`}></div>

        <div className="inset-0 w-full relative">
          <div className="relative w-full h-full z-10 px-[3vw] max-sm:rounded-[2.5vw] content mix-blend-difference duration-300 max-sm:px-0">
            <button
              onClick={onToggle}
              aria-expanded={isOpen}
              className="cursor-pointer w-full h-full py-[2.5vw] flex items-center justify-between max-md:pb-[7vw]"
            >
              <h3 className="text-30  text-left leading-[1.2] max-sm:text-[4.5vw] max-sm:w-[70%] max-md:text-[3vw] max-md:w-[80%] max-sm:leading-[1.5]">
                {question}
              </h3>
              <div
                className={` h-auto relative duration-500 max-sm:w-[12vw] rounded-full border-[1.5px]  p-[2vw]  transition-all  ease-out max-sm:p-[6vw] max-md:p-[4vw] max-md:w-[10vw] max-md:h-[10vw] ${ isOpen ? " bg-[#0205FA] border-[#0205FA]" :" bg-white border-[#030815]"}  ${
                  !isOpen ? "group-hover:rotate-[180deg]" : "group-hover:rotate-[315deg] rotate-[45deg]"
                }`}
              >
                <span className={`w-[1.5vw] rounded-full h-[2px] bg-[#111111] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[5vw] max-md:w-[3vw] max-md:h-[1.5px] max-sm:h-[1.5px] ${
                    isOpen ? "rotate-90 bg-white" : "rotate-90"
                  }`}></span>

                <span
               
                  className={`w-[1.5vw] rounded-full h-[2px] bg-[#111111] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[5vw] max-md:w-[3vw] max-sm:h-[1.5px] ${
                    isOpen ? " bg-white" : "bg-[#111111]"
                  } `}
                ></span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0, y: 20 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  onAnimationComplete={() => {
                    ScrollTrigger.refresh();
                  }}
                  exit={{ height: 0, opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-[3.5vw] text-foreground text-24 w-[90%] max-sm:pb-[8vw] max-sm:w-[95%] max-sm:text-[3.5vw] space-y-[1vw]">
                    {answer.map((item,index)=>(
                       <p key={index} dangerouslySetInnerHTML={{__html:item}}/>
                    ))}
                    
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

