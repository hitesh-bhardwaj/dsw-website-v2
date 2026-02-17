"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const STEPS = [
  {
    title: "Enterprise & AI Applications",
    bullets: [
      "Business applications, workflows, and decision systems",
      "AI behaves as long-running production systems",
    ],
    layerSrc: "/assets/homepage/glass-layer-1.png",
    layerTop: "0%",
    z: 7,
  },
  {
    title: "AI Execution Subsystems (Kernel-Controlled)",
    bullets: [
      "ML Runtime - inference, scoring, monitoring",
      "Agentic Runtime - multi-agent orchestration",
      "No execution bypasses kernel policies",
    ],
    layerSrc: "/assets/homepage/glass-layer-2.png",
    layerTop: "13%",
    z: 6,
  },
  {
    title: "DSW Enterprise AI OS Kernel (UnifyAI Core)",
    bullets: [
      "Governance-as-Code (mandatory, non-bypassable)",
      "Policy enforcement, lineage, audit, reversibility",
      "AI lifecycle, versioning, execution contracts",
      "Defines allowed interactions with runtimes & fabric",
    ],
    layerSrc: "/assets/homepage/glass-layer-3.png",
    layerTop: "26%",
    z: 5,
  },
  {
    title: "AI Fabric (Kernel-Mediated Extension & Integration Layer)",
    bullets: [
      "External models, LLMs, OSS, ISV tools",
      "Accessed only via kernel-defined interfaces",
      "No direct execution without kernel mediation",
    ],
    layerSrc: "/assets/homepage/glass-layer-4.png",
    layerTop: "39%",
    z: 4,
  },
  
  {
    title: "Hardware / Cloud Infrastructure",
    bullets: ["Servers, storage, network, accelerators"],
    layerSrc: "/assets/homepage/glass-layer-5.png",
    layerTop: "52%",
    z: 2,
  },
];

export default function Diagram() {
  const sectionRef = useRef(null);

  const layerRefs = useRef([]);
  const blockRefs = useRef([]);
  const headingRefs = useRef([]);
  const listItemRefs = useRef([]); // 2D: [stepIndex][liIndex]
  const splitsRef = useRef([]);

  useGSAP(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

      // ✅ hot reload safety
      // ScrollTrigger.getAll().forEach((t) => t.kill());

      // ✅ revert old SplitText
      splitsRef.current.forEach((s) => {
        try {
          s?.revert?.();
        } catch (_) {}
      });
      splitsRef.current = [];

      // ✅ Split headings
      headingRefs.current.forEach((h, i) => {
        if (!h) return;

        const split = new SplitText(h, {
          type: "lines",
          linesClass: "split-line",
        });
        splitsRef.current[i] = split;

        gsap.set(split.lines, {
          yPercent: 110,
          autoAlpha: 0,
          display: "block",
          willChange: "transform,opacity",
        });
      });

      // ✅ Initial states (only first visible)
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: i === 0 ? 0 : 0, y: i === 0 ? 0 : 24 });
      });

      blockRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: i === 0 ? 0 : 0 });
      });

      listItemRefs.current.forEach((items, stepIdx) => {
        items?.forEach((li) => {
          if (!li) return;
          gsap.set(li, {
            autoAlpha: stepIdx === 0 ? 1 : 0,
            y: stepIdx === 0 ? 0 : 12,
          });
        });
      });

      const stepsCount = STEPS.length;
      const tl = gsap.timeline({ defaults: { ease: "none" } });

      // ✅ Controls the breathing room between old OUT and new IN
      const gap = 0.25;

      for (let i = 0; i < stepsCount; i++) {
        const t = i; // step start
        const exitTime = t;
        const enterTime = t + gap;

        // 1) Fade OUT previous content (after step 0)
        if (i > 0) {
          const prevBlock = blockRefs.current[i - 1];
          if (prevBlock) {
            tl.to(prevBlock, { autoAlpha: 0, duration: 0.25 }, exitTime);
          }

          const prevSplit = splitsRef.current[i - 1];
          if (prevSplit?.lines?.length) {
            tl.to(
              prevSplit.lines,
              { yPercent: -20, autoAlpha: 0, duration: 0.2, stagger: 0.008 },
              exitTime
            );
          }

          const prevLis = listItemRefs.current[i - 1] || [];
          if (prevLis.length) {
            tl.to(
              prevLis,
              { autoAlpha: 0, y: -8, duration: 0.2, stagger: 0.02 },
              exitTime
            );
          }
        }

        // 2) Fade IN current block (after the gap)
        const currentBlock = blockRefs.current[i];
        if (currentBlock) {
          tl.to(currentBlock, { autoAlpha: 1, duration: 0.25 }, enterTime);
        }

        // 3) Layer: ONLY fade/slide IN the new layer (never fade out older layers)
        const layer = layerRefs.current[i];
        if (layer) {
          tl.set(layer, { autoAlpha: 0, y: 24 }, enterTime);
          tl.to(
            layer,
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
            enterTime
          );
        }

        // 4) Heading SplitText IN
        const split = splitsRef.current[i];
        if (split?.lines?.length) {
          tl.set(split.lines, { yPercent: 110, autoAlpha: 0 }, enterTime);
          tl.to(
            split.lines,
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
            },
            enterTime + 0.05
          );
        }

        // 5) List IN
        const lis = listItemRefs.current[i] || [];
        if (lis.length) {
          tl.set(lis, { autoAlpha: 0, y: 12 }, enterTime);
          tl.to(
            lis,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: "power3.out",
            },
            enterTime + 0.12
          );
        }
      }

      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top 80%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        animation: tl,
      });    
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-fit">
      <div className="h-[500vh] max-sm:h-[520vh]">
        <div className="w-full flex justify-between max-sm:flex-col max-sm:gap-[0vw] h-screen sticky top-[7%] max-sm:overflow-hidden max-sm:top-[3%]">
          {/* LEFT */}
          <div className="w-[40%] max-sm:w-full pt-[10vw] relative">
            <div className="relative w-full min-h-[32vw] max-sm:min-h-[75vw]">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => (blockRefs.current[i] = el)}
                  className="absolute inset-0 flex flex-col gap-[2vw] max-sm:gap-[6vw]"
                >
                  <h3
                    ref={(el) => (headingRefs.current[i] = el)}
                    className="text-56 max-sm:w-[70%]"
                  >
                    {step.title}
                  </h3>

                  <div className="w-full h-[1px] bg-white my-[1vw]" />

                  <div className="flex items-center justify-between gap-2">
                    <ul className="space-y-[0.5vw] pl-[1.5vw] list-disc">
                      {step.bullets.map((b, liIdx) => (
                        <li
                          key={liIdx}
                          ref={(el) => {
                            if (!listItemRefs.current[i])
                              listItemRefs.current[i] = [];
                            listItemRefs.current[i][liIdx] = el;
                          }}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-[50%] h-[48vw] relative max-sm:w-[150%] max-sm:ml-[-25%] max-sm:h-[150vw] mr-[-4vw]">
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={(el) => (layerRefs.current[i] = el)}
                className="w-[45vw] h-auto absolute right-0 max-sm:w-full"
                style={{ top: step.layerTop, zIndex: step.z }}
              >
                <Image
                  src={step.layerSrc}
                  alt={`layer-${i + 1}`}
                  width={800}
                  height={800}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
