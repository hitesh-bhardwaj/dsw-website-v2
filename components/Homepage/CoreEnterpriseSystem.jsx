"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    title: "Runtime Governance, Enforced by the Kernel",
    desc: "Governance is enforced in real time as AI executes, ensuring policies, validations, and approvals cannot be bypassed.",
  },
  {
    title: "Audit Trails That Can’t Be Skipped",
    desc: "Every decision, tool call, and approval is recorded automatically for compliance and traceability.",
  },
  {
    title: "Policy Controls at Execution Time",
    desc: "Define guardrails once and enforce them everywhere, across agents, models, and workflows.",
  },
  {
    title: "Enterprise-Grade Access & Approvals",
    desc: "Role-based controls and approval flows ensure the right people authorize the right actions.",
  },
];

export default function CoreEnterpriseSystem() {
  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const pageIndexRef = useRef(null);

  useGSAP(
    () => {
      /* =========================
         Scroll intensity spin
      ========================= */
      gsap.set([outerRef.current, innerRef.current], {
        transformOrigin: "50% 50%",
        willChange: "transform",
      });

      const outerTL = gsap.to(outerRef.current, {
        rotation: "+=360",
        duration: 80,
        ease: "none",
        repeat: -1,
      });

      const innerTL = gsap.to(innerRef.current, {
        rotation: "-=360",
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      const BASE = 0.35;
      const MAX = 8;
      const SENS = 0.08;
      const DECAY = 0.88;

      outerTL.timeScale(BASE);
      innerTL.timeScale(BASE);

      let boost = 0;
      let lastY = window.scrollY;

      const tick = () => {
        boost *= DECAY;
        const t = BASE + boost;
        outerTL.timeScale(t);
        innerTL.timeScale(t);
      };

      gsap.ticker.add(tick);

      const onScroll = () => {
        const y = window.scrollY;
        const dy = Math.abs(y - lastY);
        lastY = y;
        boost = Math.min(boost + dy * SENS, MAX);
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      /* =========================
         Content loop (7s)
         - old moves up
         - new reveals from below
         - ONLY index animates
      ========================= */
      let i = 0;
      let splits = [];

      const revertSplits = () => {
        splits.forEach((s) => s?.revert?.());
        splits = [];
      };

      const setText = (index) => {
        titleRef.current.textContent = SLIDES[index].title;
        descRef.current.textContent = SLIDES[index].desc;
        pageIndexRef.current.textContent = index + 1;
      };

      const split = () => {
        const t = new SplitText(titleRef.current, { type: "lines", mask: "lines" });
        const d = new SplitText(descRef.current, { type: "lines", mask: "lines" });
        const p = new SplitText(pageIndexRef.current, { type: "chars", mask: "chars" });

        splits = [t, d, p];
        return { t, d, p };
      };

      const revealIn = () => {
        revertSplits();
        const { t, d, p } = split();

        gsap.set([t.lines, d.lines, p.chars], { yPercent: 100 });

        return gsap
          .timeline()
          .to(t.lines, {
            yPercent: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
          })
          .to(
            d.lines,
            {
              yPercent: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.06,
            },
            "-=0.55"
          )
          .to(
            p.chars,
            {
              yPercent: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.05,
            },
            "-=0.5"
          )
          .add(revertSplits);
      };

      const moveOut = () => {
        revertSplits();
        const { t, d, p } = split();

        return gsap
          .timeline()
          .to([t.lines, d.lines, p.chars], {
            yPercent: -100,
            duration: 0.55,
            ease: "power2.in",
            stagger: 0.04,
          })
          .add(revertSplits);
      };

      // init
      setText(i);
      gsap.delayedCall(0, revealIn);

      let loopCall;
      const loop = () => {
        loopCall = gsap.delayedCall(7, () => {
          gsap
            .timeline()
            .add(moveOut())
            .add(() => {
              i = (i + 1) % SLIDES.length;
              setText(i);
            })
            .add(gsap.delayedCall(0, revealIn));

          loop();
        });
      };
      loop();

      return () => {
        loopCall?.kill?.();
        revertSplits();
        window.removeEventListener("scroll", onScroll);
        gsap.ticker.remove(tick);
        outerTL.kill();
        innerTL.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="coreEnterprise"
      className="relative w-full bg-white h-[100vw] overflow-hidden flex pt-[25%] justify-center mt-[-10vw]"
    >
      {/* Outer circle */}
      <div ref={outerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74vw]">
        <Image src="/assets/homepage/dotted-circle.svg" alt="" width={1080} height={1080} />
      </div>

      {/* Inner circle */}
      <div ref={innerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw]">
        <Image src="/assets/homepage/dotted-circle.svg" alt="" width={1080} height={1080} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-[4vw]">
        <HeadingAnim>
        <h2 className="text-76 mb-[12vw]">Run AI as a Core Enterprise System</h2>
        </HeadingAnim>

        <h3 ref={titleRef} className="text-44 font-medium">
          {SLIDES[0].title}
        </h3>

        <p ref={descRef} className="text-30 px-[30vw] mx-auto">
          {SLIDES[0].desc}
        </p>

        {/* Pagination */}
        <p className="text-[1.67vw] text-[#1727FF]">
          <span ref={pageIndexRef} className="w-[2vw]">1</span> / {SLIDES.length}
        </p>
      </div>
    </section>
  );
}
