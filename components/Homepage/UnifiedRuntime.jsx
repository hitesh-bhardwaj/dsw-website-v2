"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
gsap.registerPlugin(ScrollTrigger);

const layers = [
  { src: "/assets/homepage/unified-layer-1.png", top: "0%", z: 6 },
  { src: "/assets/homepage/unified-layer-2.png", top: "10%", z: 5 },
  { src: "/assets/homepage/unified-layer-3.png", top: "20%", z: 4 },
  { src: "/assets/homepage/unified-layer-4.png", top: "30%", z: 3 },
  { src: "/assets/homepage/unified-layer-5.png", top: "40%", z: 2 },
  { src: "/assets/homepage/unified-layer-6.png", top: "55%", z: 1 },
];

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
      <div className="w-full flex justify-between h-fit items-center max-sm:flex-col max-sm:gap-[15vw]">
        <div className="w-[30%] flex flex-col gap-[2vw] max-sm:w-full">
          <HeadingAnim>

          <h3 className="text-56 max-sm:w-[70%] ">Hardware / Cloud Infrastructure</h3>
          </HeadingAnim>
          <Copy>
          <div className="flex items-center  gap-2">
            <div className="w-1 h-1  bg-white rounded-full inline-block " />{" "}
            Servers, Storage, Network, Accelerators
          </div>
          </Copy>
        </div>
        <div className="w-[50%] h-[48vw] relative max-sm:w-full max-sm:h-[100vw]">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="w-[35vw] h-auto absolute right-0 fadeup max-sm:w-full"
              style={{
                top: layer.top,
                zIndex: layer.z,
              }}
            >
              <Image
                src={layer.src}
                alt="unified-layer"
                width={300}
                height={200}
                className="w-full h-full"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
