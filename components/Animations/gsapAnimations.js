/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import gsap from "gsap";
import { SplitInLine } from "../splitTextUtils";
import { useEffect } from "react";

export function headingAnim() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingAnim = document.querySelectorAll(".headingAnim");
      headingAnim.forEach((headingAnim) => {
        SplitInLine(headingAnim);
        const headingWord = headingAnim.querySelectorAll(".line-internal");
        gsap.set(headingWord, {
          maskPosition: "100% 100%",
        });

        gsap.fromTo(
          headingWord,
          {
            maskPosition: "100% 100%",
          },
          {
            maskPosition: "0% 100%",
            stagger: 0.2,
            duration: 5.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingWord,
              start: "top 90%",
              lazy: true,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);
}

export function fadeUp() {
  // const router = useRouter();
  useEffect(() => {
      const ctx = gsap.context(() => {
        const content = document.querySelectorAll(".fadeup");
        content.forEach((content) => {
          gsap.set(content, { opacity: 0, y: 50 });
          gsap.to(content, {
            scrollTrigger: {
              trigger: content,
              start: "top 90%",
              // markers:true
            },
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 2,
          });
        });
      });
      return () => ctx.revert();
  }, []);
}

export function lineAnim() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lineDraws = document.querySelectorAll(".lineDraw");
      lineDraws.forEach((lineDraw) => {
        gsap.from(lineDraw, {
          scrollTrigger: {
            trigger: lineDraw,
            start: "top 80%",
          },
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          yPercent: 100,
          stagger: 0.07,
          ease: "power3.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);
}
