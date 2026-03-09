"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import Diagram from "./Diagram";

export default function UnifiedRuntime() {
 useGSAP(() => {

  const width = globalThis.innerWidth;

  // Desktop (1025+)
  if (width >= 1025) {

    gsap.timeline({
      scrollTrigger: {
        trigger: "#unified-runtime",
        start: "10% 70%",
        end: "30% 70%",
        markers: false,
        onEnter: () => {
          gsap.fromTo(
            "#unified-runtime,#struggle",
            {
              backgroundColor: "#ffffff",
              color: "#111111",
            },
            {
              duration: 0.3,
              backgroundColor: "#02031c",
              color: "#ffffff",
            }
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            "#unified-runtime,#struggle",
            {
              backgroundColor: "#02031c",
              color: "#ffffff",
            },
            {
              duration: 0.3,
              backgroundColor: "#ffffff",
              color: "#111111",
            }
          );
        },
      },
    });

  }

  //  Tablet (>640 && <1025)
  else if (width > 640 && width < 1025) {

    gsap.timeline({
      scrollTrigger: {
        trigger: "#unified-runtime",
        start: "10% 55%",     //  tablet trigger 
        end: "bottom 45%",
        // markers: true,
        onEnter: () => {
          gsap.fromTo(
            "#unified-runtime,#struggle",
            {
              backgroundColor: "#ffffff",
              color: "#111111",
            },
            {
              duration: 0.3,
              backgroundColor: "#02031c",
              color: "#ffffff",
            }
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            "#unified-runtime,#struggle",
            {
              backgroundColor: "#02031c",
              color: "#ffffff",
            },
            {
              duration: 0.3,
              backgroundColor: "#ffffff",
              color: "#111111",
            }
          );
        },
      },
    });

  }

  //  Mobile (≤640)
  else {

    gsap.timeline({
      scrollTrigger: {
        trigger: "#unified-runtime",
        start: "10% 20%",
        end: "bottom 20%",
        markers: false,
        onEnter: () => {
          gsap.fromTo(
            "#unified-runtime,#struggle",
            {
              backgroundColor: "#ffffff",
              color: "#111111",
            },
            {
              duration: 0.3,
              backgroundColor: "#02031c",
              color: "#ffffff",
            }
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            "#unified-runtime,#struggle",
            {
              backgroundColor: "#02031c",
              color: "#ffffff",
            },
            {
              duration: 0.3,
              backgroundColor: "#ffffff",
              color: "#111111",
            }
          );
        },
      },
    });

  }

});
  return (
    <section
      className=" pt-[15%] max-sm:pt-[15%] max-md:pt-[8%] px-[5vw] space-y-[9vw] max-md:space-y-[12vw] relative max-sm:py-[15%] max-sm:px-[7vw] max-sm:pb-[30%]"
      id="unified-runtime"
    >
      <HeadingAnim>
        <h2 className="text-76  w-[60%] max-md:w-[90%] text-center mx-auto leading-[1.2] max-sm:leading-[1.4] max-sm:w-full">
          From Fragmented AI to One Governed Runtime
        </h2>
      </HeadingAnim>
      <div className="w-full flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[10vw]">
        <div className="w-[30%] max-md:w-[40%]  max-sm:w-full max-sm:text-center">
          <HeadingAnim>
            <h3 className="text-56 ">Build a Unified AI Ecosystem</h3>
          </HeadingAnim>
        </div>
        <div className="w-[40%] max-md:w-[55%] space-y-[1vw] text-24 max-sm:w-full  max-sm:text-center max-sm:space-y-[4vw]">
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
      <Diagram />
    </section>
  );
}
