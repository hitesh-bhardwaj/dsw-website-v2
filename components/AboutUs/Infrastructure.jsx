"use client"
import { useEffect, useRef } from "react";
import { CircleBg } from "../Svg/Lines/DottedCircle";
import { Arrow } from "../Svg/AboutUs/Arrow";
import HeadingAnim from "../Animations/HeadingAnim";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Copy from "../Animations/Copy";

gsap.registerPlugin(ScrollTrigger);

const R     = 15; // vw  — circle radius
const LINE  = 3;  // vw  — connector line length
const BOX_W = 18; // vw
const BOX_H = 9;  // vw

export default function Infrastructure() {
  const sectionRef = useRef(null); // the tall scroll-space wrapper
  const diagramRef = useRef(null); // the element that gets pinned

  const circleWrapRef       = useRef(null);
  const circleCenterTextRef = useRef(null);

  const topLineRef    = useRef(null);
  const topBoxRef     = useRef(null);
  const rightLineRef  = useRef(null);
  const rightBoxRef   = useRef(null);
  const bottomLineRef = useRef(null);
  const bottomBoxRef  = useRef(null);
  const leftLineRef   = useRef(null);
  const leftBoxRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── initial states ──────────────────────────────────────
      gsap.set(circleWrapRef.current,       { opacity: 0, scale: 0.9 });
      gsap.set(circleCenterTextRef.current, { opacity: 0 });

      gsap.set(topLineRef.current,    { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(bottomLineRef.current, { scaleY: 0, transformOrigin: "top center"    });
      gsap.set(rightLineRef.current,  { scaleX: 0, transformOrigin: "left center"   });
      gsap.set(leftLineRef.current,   { scaleX: 0, transformOrigin: "right center"  });

      gsap.set(
        [topBoxRef.current, rightBoxRef.current, bottomBoxRef.current, leftBoxRef.current],
        { opacity: 0, scale: 0.85 }
      );

      // ── pinned timeline ─────────────────────────────────────
      // sectionRef is the tall spacer; diagramRef is what gets pinned
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,   // scroll space
          start:   "top 70%",
          end:     "+=300%",
          scrub:   true,
          // markers: true,
          // pin:     diagramRef.current,   // only the diagram pins
          // anticipatePin: 1,
        },
      });

      // 1. Circle
      tl.to(circleWrapRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.inOut" });
      tl.to(circleCenterTextRef.current, { opacity: 1, duration: 0.3 }, "-=0.1");

      // 2. Top line → box
      tl.to(topLineRef.current,  { scaleY: 1, duration: 0.35, ease: "power2.inOut" }, "+=0.15");
      tl.to(topBoxRef.current,   { opacity: 1, scale: 1, duration: 0.3, ease: "power2.inOut" });

      // 3. Right line → box
      tl.to(rightLineRef.current, { scaleX: 1, duration: 0.35, ease: "power2.inOut" }, "+=0.15");
      tl.to(rightBoxRef.current,  { opacity: 1, scale: 1, duration: 0.3, ease: "power2.inOut" });

      // 4. Bottom line → box
      tl.to(bottomLineRef.current, { scaleY: 1, duration: 0.35, ease: "power2.inOut" }, "+=0.15");
      tl.to(bottomBoxRef.current,  { opacity: 1, scale: 1, duration: 0.3, ease: "power2.inOut" });

      // 5. Left line → box
      tl.to(leftLineRef.current, { scaleX: 1, duration: 0.35, ease: "power2.inOut" }, "+=0.15");
      tl.to(leftBoxRef.current,  { opacity: 1, scale: 1, duration: 0.3, ease: "power2.inOut" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ── Desktop ───────────────────────────────────────────── */}
      <div className="max-md:hidden h-fit pb-[7%]">

        {/* HEADING — normal flow, scrolls in before the pin */}
        <HeadingAnim>
          <div className="w-full flex justify-center px-4 py-[4vw]">
            <h2 className="text-44 w-fit text-center">
              The issue wasn't talent or intent.{" "}
              <span className="font-medium">It was an infrastructure.</span>
            </h2>
          </div>
        </HeadingAnim>

        {/* SCROLL SPACE — sectionRef — this is what triggers + holds the pin */}
        <div className="w-full h-[200vw]">
        <div ref={sectionRef} className="sticky top-0">

          {/* DIAGRAM — diagramRef — this element gets pinned to the viewport */}
          <div
            ref={diagramRef}
            className="relative w-full h-screen "
          >
            {/* CENTER CIRCLE */}
            <div
              ref={circleWrapRef}
              className=" z-10 flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[22vw]"
              
            >
              <CircleBg className={"outer-circle"}/>
              <div
                ref={circleCenterTextRef}
                className="absolute inset-0 flex items-center justify-center
                           text-center text-30 w-[85%] mx-auto z-50 text-black leading-snug"
              >
                Enterprises were trying<br />to run production AI using
              </div>
            </div>

            {/* TOP LINE */}
            <div
              ref={topLineRef}
              className="absolute z-0 bg-primary-blue"
              style={{
                width:  "1.5px",
                height: `${LINE}vw`,
                left:   "calc(50% - 0.75px)",
                top:    `calc(57.2% - ${R}vw - ${LINE}vw)`,
              }}
            />
            {/* TOP BOX */}
            <div
              ref={topBoxRef}
              className="absolute z-20"
              style={{
                width:  `${BOX_W}vw`,
                height: `${BOX_H}vw`,
                left:   `calc(50% - ${BOX_W / 2}vw)`,
                top:    `calc(57.2% - ${R}vw - ${LINE}vw - ${BOX_H}vw)`,
              }}
            >
              <div className="w-full h-full bg-white border border-primary-blue
                              text-30 flex items-center justify-center
                              rounded-[1vw] leading-[1.2] text-black text-center px-[2vw]">
                Disconnected tools and vendors
              </div>
            </div>

            {/* BOTTOM LINE */}
            <div
              ref={bottomLineRef}
              className="absolute z-0 bg-primary-blue"
              style={{
                width:  "1.5px",
                height: `${LINE}vw`,
                left:   "calc(50% - 0.75px)",
                top:    `calc(43% + ${R}vw)`,
              }}
            />
            {/* BOTTOM BOX */}
            <div
              ref={bottomBoxRef}
              className="absolute z-20"
              style={{
                width:  `${BOX_W}vw`,
                height: `${BOX_H}vw`,
                left:   `calc(50% - ${BOX_W / 2}vw)`,
                top:    `calc(43% + ${R}vw + ${LINE}vw)`,
              }}
            >
              <div className="w-full h-full bg-white border border-primary-blue
                              text-30 flex items-center justify-center
                              rounded-[1vw] leading-[1.2] text-black text-center px-[2vw]">
                Post-deployment controls
              </div>
            </div>

            {/* RIGHT LINE */}
            <div
              ref={rightLineRef}
              className="absolute z-0 bg-primary-blue"
              style={{
                height: "1.5px",
                width:  `${LINE}vw`,
                top:    "calc(50% - 0.75px)",
                left:   `calc(46% + ${R}vw)`,
              }}
            />
            {/* RIGHT BOX */}
            <div
              ref={rightBoxRef}
              className="absolute z-20"
              style={{
                width:  `${BOX_W}vw`,
                height: `${BOX_H}vw`,
                top:    `calc(50% - ${BOX_H / 2}vw)`,
                left:   `calc(46% + ${R}vw + ${LINE}vw)`,
              }}
            >
              <div className="w-full h-full bg-white border border-primary-blue
                              text-30 flex items-center justify-center
                              rounded-[1vw] leading-[1.2] text-black text-center px-[2vw]">
                Governance as documentation
              </div>
            </div>

            {/* LEFT LINE */}
            <div
              ref={leftLineRef}
              className="absolute z-0 bg-primary-blue"
              style={{
                height: "1.5px",
                width:  `${LINE}vw`,
                top:    "calc(50% - 0.75px)",
                left:   `calc(54% - ${R}vw - ${LINE}vw)`,
              }}
            />
            {/* LEFT BOX */}
            <div
              ref={leftBoxRef}
              className="absolute z-20"
              style={{
                width:  `${BOX_W}vw`,
                height: `${BOX_H}vw`,
                top:    `calc(50% - ${BOX_H / 2}vw)`,
                left:   `calc(54% - ${R}vw - ${LINE}vw - ${BOX_W}vw)`,
              }}
            >
              <div className="w-full h-full bg-white border border-primary-blue
                              text-30 flex items-center justify-center
                              rounded-[1vw] leading-[1.2] text-black text-center px-[2vw]">
                Brittle integrations that couldn't scale
              </div>
            </div>
          </div>
          {/* end diagramRef */}

        </div>

        </div>
        {/* end sectionRef */}

        {/* PARAGRAPH — normal flow, scrolls in after pin releases */}
        <div className="pt-[7vw] px-[10%] ">
          <Copy>
          <p className="text-30  mx-auto text-center">
            Over time, it became clear to us that AI had crossed the threshold from "software project" to enterprise system.
            That's when the journey shifted. We stopped thinking like a platform team.
            We started thinking like operating system builders. And that is how DSW evolved into the <span className="font-medium"> Enterprise AI Operating System. </span> 
          </p>
          </Copy>
        </div>

      </div>
      {/* end desktop */}

      {/* ── Mobile ─────────────────────────────────────────────── */}
      <div className="hidden max-md:flex max-md:flex-col max-sm:items-center
                      max-sm:w-full max-sm:px-[7vw] max-sm:py-10 max-md:py-[10%]">
        <HeadingAnim>
          <h2 className="text-44 font-normal text-center leading-[1.3] mb-10">
            The issue wasn't talent or intent.{" "}
            <span className="font-medium">It was an infrastructure.</span>
          </h2>
        </HeadingAnim>

        <div className="flex flex-col items-center w-full">
          {[
            "Enterprises were trying to run production AI using:",
            "Disconnected tools and vendors",
            "Governance as documentation",
            "Post-deployment controls",
            "Brittle integrations that couldn't scale",
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div className="bg-white fadeup rounded-[3vw] px-5 py-4 w-[80vw]
                              text-center text-30 leading-[1.4] text-black">
                {item}
              </div>
              {i < 4 && (
                <div className="rotate-90 max-sm:my-[6vw] fadeup max-md:my-[3vw]">
                  <Arrow className="" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-30 w-[90%] mx-auto text-center fadeup mt-10 max-sm:w-full">
          Over time, it became clear to us that AI had crossed the threshold from "software project" to enterprise system.
          That's when the journey shifted. We stopped thinking like a platform team.
          We started thinking like operating system builders. And that is how DSW evolved into the Enterprise AI Operating System.
        </p>
      </div>
    </div>
  );
}