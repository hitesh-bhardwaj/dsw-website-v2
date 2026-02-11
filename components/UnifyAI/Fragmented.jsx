"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Diagram from "@/components/Homepage/Diagram";
import Copy from "@/components/Animations/Copy";

gsap.registerPlugin(ScrollTrigger);

export default function Fragmented() {
 
  return (
    <section
      className="py-[7%] px-[5vw] bg-radial-night text-white space-y-[9vw] relative max-sm:py-[15%] max-sm:px-[7vw] max-sm:pb-[30%]"
      id="fragmented"
    >
      <Copy>
      <p className="text-40 max-sm:leading-normal  w-[75%] text-center mx-auto leading-[1.4] max-sm:w-full">
        Fragmented AI stacks, post-deployment governance, and limited runtime visibility keep enterprises stuck in pilots. The UnifyAI kernel solves this by enforcing governance and control in real time.
      </p>
      </Copy>
     <Diagram/>
      
    </section>
  );
}


