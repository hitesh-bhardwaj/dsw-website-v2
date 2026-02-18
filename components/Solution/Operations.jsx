"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(SplitText);

const MobileAccordionContent = ({ tabContent, isActive }) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!innerRef.current) return;
    const measured = innerRef.current.scrollHeight;
    setHeight(isActive ? measured : 0);
  }, [isActive, tabContent]);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${height}px`,
        overflow: "hidden",
        transition: "height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        ref={innerRef}
        className="w-full text-30 pt-[3vw] h- pb-[2vw]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-8px)",
          transition:
            "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
        }}
      >
        <div className="w-full space-y-[4vw]">
          <p>{tabContent.intro}</p>
          <ul className="list-disc pl-[7vw] space-y-[2vw]">
            {tabContent.bullets?.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Operations = ({ operationsContent }) => {
  const sectionRef = useRef(null);
  const contentWrapRef = useRef(null);

  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ✅ fetch everything from props (same pattern as HeroNew)
  const data = useMemo(
    () => ({
      heading:
        operationsContent?.heading ??
        "Kernel-governed execution across underwriting, claims, and operations",
      tabs: operationsContent?.tabs ?? [],
      sectionId: operationsContent?.sectionId ?? "operations",
    }),
    [operationsContent]
  );

  const animateTo = (nextIndex) => {
    if (!contentWrapRef.current) return;
    if (isAnimating) return;
    if (nextIndex === active) return;

    setIsAnimating(true);

    const wrap = contentWrapRef.current;

    // Targets for SplitText (intro + each li)
    const introEl = wrap.querySelector("[data-intro]");
    const liEls = Array.from(wrap.querySelectorAll("li")); // ✅ li (not ul)

    if (!introEl) {
      setActive(nextIndex);
      setIsAnimating(false);
      return;
    }

    // OUT split
    const introSplit = new SplitText(introEl, { type: "lines" });
    const liSplits = liEls.map((li) => new SplitText(li, { type: "lines" }));

    const outLines = [
      ...introSplit.lines,
      ...liSplits.flatMap((s) => s.lines),
    ];

    const cleanupOut = () => {
      try {
        introSplit.revert();
        liSplits.forEach((s) => s.revert());
      } catch (_) {}
    };

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onInterrupt: () => {
        cleanupOut();
        gsap.set(wrap, { autoAlpha: 1 });
        setIsAnimating(false);
      },
    });

    // OUT
    tl.to(outLines, {
      autoAlpha: 0,
      y: -12,
      duration: 0.28,
      stagger: 0.04,
    });

    // hide wrapper so next content can't flash
    tl.set(wrap, { autoAlpha: 0 });
    tl.to({}, { duration: 0.12 });

    // Swap content
    tl.call(() => {
      cleanupOut();
      setActive(nextIndex);
    });

    // IN after paint (2 RAFs)
    tl.call(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const wrap2 = contentWrapRef.current;
          if (!wrap2) {
            setIsAnimating(false);
            return;
          }

          const introEl2 = wrap2.querySelector("[data-intro]");
          const liEls2 = Array.from(wrap2.querySelectorAll("li")); // ✅ li

          if (!introEl2) {
            gsap.set(wrap2, { autoAlpha: 1 });
            setIsAnimating(false);
            return;
          }

          const introSplit2 = new SplitText(introEl2, { type: "lines" });
          const liSplits2 = liEls2.map(
            (li) => new SplitText(li, { type: "lines" })
          );

          const inLines = [
            ...introSplit2.lines,
            ...liSplits2.flatMap((s) => s.lines),
          ];

          const cleanupIn = () => {
            try {
              introSplit2.revert();
              liSplits2.forEach((s) => s.revert());
            } catch (_) {}
          };

          gsap.set(wrap2, { autoAlpha: 1 });
          gsap.set(inLines, { autoAlpha: 0, y: 12 });

          gsap.to(inLines, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
            onComplete: () => {
              cleanupIn();
              setIsAnimating(false);
            },
            onInterrupt: () => {
              cleanupIn();
              setIsAnimating(false);
            },
          });
        });
      });
    });
  };

  const animateToMobile = (nextIndex) => {
    if (nextIndex === active) return;
    setActive(nextIndex);
  };

  // Guard if tabs are missing
  const current = data.tabs?.[active] ?? { intro: "", bullets: [] };

  return (
    <section
      ref={sectionRef}
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%] space-y-[5vw]"
      id={data.sectionId}
    >
      <div className="w-full h-full gap-y-[2vw] flex flex-col items-center text-center">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] mx-auto w-[85%]">
            {data.heading}
          </h2>
        </HeadingAnim>
      </div>

      <div className="w-full flex justify-between max-sm:flex-col max-sm:gap-0">
        {/* LEFT: tabs — desktop only */}
        <div className="w-[50%] max-sm:hidden space-y-[3vw] font-light">
          {data.tabs.map((tab, idx) => {
            const isActive = idx === active;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => animateTo(idx)}
                disabled={isAnimating}
                className={[
                  "w-full text-left p-[1vw] bg-[#EFF1FB] text-32 capitalize transition-colors cursor-pointer",
                  isActive
                    ? "border-l-[4px] border border-primary-blue text-primary-blue"
                    : "border border-transparent text-[#0A1B4B]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* MOBILE: accordion tabs with content below each */}
        <div className="hidden max-sm:flex max-sm:flex-col max-sm:gap-[3vw] w-full max-sm:pt-[7vw] font-light">
          {data.tabs.map((tab, idx) => {
            const isActive = idx === active;
            const tabContent = data.tabs[idx] ?? { intro: "", bullets: [] };

            return (
              <div key={idx} className="w-full">
                <button
                  type="button"
                  onClick={() => animateToMobile(idx)}
                  className={[
                    "w-full text-left p-[3vw] bg-[#EFF1FB] text-32 capitalize transition-colors cursor-pointer",
                    isActive
                      ? "border-l-[4px] border border-primary-blue text-primary-blue"
                      : "border border-transparent text-[#0A1B4B]",
                  ].join(" ")}
                >
                  {tab.label}
                </button>

                <MobileAccordionContent
                  tabContent={tabContent}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT: content — desktop only */}
        <div
          ref={contentWrapRef}
          className="w-[45%] max-sm:hidden relative text-30"
        >
          <div className="w-full space-y-[2vw]">
            <p data-intro>{current.intro}</p>

            <ul className="list-disc pl-[1.5vw] space-y-[1vw]">
              {current.bullets?.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Operations;