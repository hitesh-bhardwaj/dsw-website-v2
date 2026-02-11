"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import Diagram from "./Diagram";
gsap.registerPlugin(ScrollTrigger);



export default function UnifiedRuntime() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#unified-runtime",
        start: "top 70%",
        end: "30% 70%",
        scrub: true,
        // markers:true,
      },
    });
    tl.fromTo(
      "#unified-runtime,#struggle",
      {
        backgroundColor: "#ffffff",
        color:"#111111"
      },
      {
        backgroundColor: "#02031c",
        color:"#ffffff"
      },
    );

    const bl = gsap.timeline({
      scrollTrigger: {
        trigger: "#unified-runtime",
        start: "bottom 70%",
        end: "bottom 30%",
        scrub: true,
        // markers: true,
      },
    });
    bl.to("#unified-runtime", {
      backgroundColor: "#ffffff",
    });
  });
  return (
    <section
      className="py-[7%] px-[5vw] text-white space-y-[9vw] relative max-sm:py-[15%] max-sm:px-[7vw] max-sm:pb-[30%]"
      id="unified-runtime"
    >
      <HeadingAnim>
      <h2 className="text-76  w-[60%] text-center mx-auto leading-[1.4] max-sm:w-full">
        From Fragmented AI to One Governed Runtime
      </h2>
      </HeadingAnim>
      <div className="w-full flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[10vw]">
        <div className="w-[30%] max-sm:w-full max-sm:text-center">
          <HeadingAnim>
          <h3 className="text-56 ">Build a Unified AI Ecosystem</h3>
          </HeadingAnim>
        </div>
        <div className="w-[40%] space-y-[1vw] text-24 max-sm:w-full  max-sm:text-center max-sm:space-y-[4vw]">
          <Copy>
          <p>
            Unify models, agents, tools, and workflows under a single governed
            runtime designed for production-ready AI.
          </p>
          </Copy>
          <Copy>
          <p>
            Replace fragmented platforms with one operational foundation that
            enforces control, governance, and accountability as AI runs.
          </p>
          </Copy>
        </div>
      </div>
     <Diagram/>
      
    </section>
  );
}


