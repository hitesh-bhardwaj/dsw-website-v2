"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Diagram from "@/components/Homepage/Diagram";
import Copy from "@/components/Animations/Copy";

gsap.registerPlugin(ScrollTrigger);

export default function Fragmented() {
 
  return (
    <section
      className="dark py-[7%] px-[5vw] bg-radial-night text-white space-y-[9vw] relative max-sm:py-[15%] max-sm:px-[7vw] max-sm:pb-[30%] max-sm:space-y-[18vw]"
      id="fragmented"
    >
      <Copy>
      <p className="text-40 max-sm:leading-normal  w-[75%] text-center mx-auto leading-[1.4] max-sm:w-full">
       An AI/ML runtime that seamlessly unifies data, models, workflows, and intelligent
agents into a single execution layer that is purpose-built to operationalize AI at scale
and consistently drive measurable business outcomes.
      </p>
      </Copy>
     <Diagram/>
      
    </section>
  );
}


