"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function SectionBreak({ content, width, big }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sectionBreakSplit = SplitText.create(textRef.current, {
        type: "words chars",
        aria: false,
        tag: 'span',
        charsClass: 'split-chars'
      });
      const t = Array.from(textRef.current.querySelectorAll(".split-chars"));

      if (globalThis.innerWidth > 1024) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 0.25,
              // markers:true
            },
          })
          .to(t, {
            className: "split-chars show",
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.inOut"
          }, 0)
      }
      else {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 10%",
              end: "center 10%",
              scrub: 0.25,
            },
          })
          .to(t, {
            className: "split-chars show",
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.inOut"
          }, 0)
      }
    })
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full px-[5vw] overflow-hidden"
    >
      <div className={`split__wrapper h-full flex items-center justify-center relative text-center mx-auto max-sm:w-full max-md:w-[90%] ${width}`}>
        <h2
          ref={textRef}
          className={`max-sm:leading-[1.3]  leading-[1.4] text-break text-[#111111]  ${big ?"text-56":"text-44"}`}
        >
          {content}
        </h2>
      </div>
    </section>
  );
}
