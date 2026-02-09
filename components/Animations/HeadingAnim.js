"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeadingReveal({
 
  className = "",
  children,
  duration = 5.5,
  stagger = 0.2,
  once = false,
}) {
  const el = useRef(null);

  useGSAP(
    () => {
      if (!el.current) return;

      const splitInner = new SplitText(el.current, {
        type: "lines",
        linesClass: "line-inner",
      });

      gsap.set(splitInner.lines, {
        WebkitMaskImage: "linear-gradient(#000 0 0)",
        maskImage: "linear-gradient(#000 0 0)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "200% 100%",
        maskSize: "200% 100%",
        WebkitMaskPosition: "100% 100%",
        maskPosition: "100% 100%",
      });

      gsap.to(splitInner.lines, {
        WebkitMaskPosition: "0% 100%",
        maskPosition: "0% 100%",
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el.current,
          start: "top 90%",
          once,
        },
      });

      return () => {
        splitInner.revert();
      };
    },
    { scope: el }
  );

  return (
    <div ref={el} className={`headingAnim ${className}`}>
      {children}
    </div>
  );
}
