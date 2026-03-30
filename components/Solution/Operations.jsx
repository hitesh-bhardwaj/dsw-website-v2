"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OperationsDesktop = ({
  tabs,
  active,
  displayedIndex,
  setDisplayedIndex,
  onTabClick,
  setIsAnimating,
}) => {
  const contentWrapRef = useRef(null);
  const animationRef = useRef(null);
  const queuedIndexRef = useRef(null);

  useEffect(() => {
    if (!contentWrapRef.current) return;
    if (!tabs?.length) return;

    const wrap = contentWrapRef.current;

    const runAnimation = (targetIndex) => {
      if (!wrap) return;
      if (targetIndex === displayedIndex) return;

      const introEl = wrap.querySelector("[data-intro]");
      const ulEl = wrap.querySelector("ul");

      if (!introEl) {
        setDisplayedIndex(targetIndex);
        return;
      }

      setIsAnimating(true);

      const outSplit = new SplitText(introEl, { type: "lines" });
      const outLines = [...outSplit.lines];

      const cleanupOut = () => {
        try {
          outSplit.revert();
        } catch (_) {}
      };

      gsap.killTweensOf(outLines);
      if (ulEl) gsap.killTweensOf(ulEl);
      gsap.killTweensOf(wrap);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onInterrupt: () => {
          cleanupOut();
          setIsAnimating(false);
          animationRef.current = null;
        },
      });

      animationRef.current = tl;

      tl.to(
        outLines,
        {
          autoAlpha: 0,
          y: -12,
          duration: 0.25,
          stagger: 0.04,
        },
        0
      );

      if (ulEl) {
        tl.to(
          ulEl,
          {
            autoAlpha: 0,
            duration: 0.22,
          },
          0
        );
      }

      tl.set(wrap, { autoAlpha: 0 });

      tl.call(() => {
        cleanupOut();
        setDisplayedIndex(targetIndex);
      });

      tl.call(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const wrap2 = contentWrapRef.current;
            if (!wrap2) {
              setIsAnimating(false);
              animationRef.current = null;
              return;
            }

            const introEl2 = wrap2.querySelector("[data-intro]");
            const ulEl2 = wrap2.querySelector("ul");

            if (!introEl2) {
              gsap.set(wrap2, { autoAlpha: 1 });
              setIsAnimating(false);
              animationRef.current = null;
              return;
            }

            const inSplit = new SplitText(introEl2, { type: "lines" });
            const inLines = [...inSplit.lines];

            const cleanupIn = () => {
              try {
                inSplit.revert();
              } catch (_) {}
            };

            gsap.set(wrap2, { autoAlpha: 1 });
            gsap.set(inLines, { autoAlpha: 0, y: 12 });
            if (ulEl2) gsap.set(ulEl2, { autoAlpha: 0 });

            const inTl = gsap.timeline({
              defaults: { ease: "power3.out" },
              onComplete: () => {
                cleanupIn();
                setIsAnimating(false);
                animationRef.current = null;

                if (
                  queuedIndexRef.current !== null &&
                  queuedIndexRef.current !== targetIndex
                ) {
                  const nextQueued = queuedIndexRef.current;
                  queuedIndexRef.current = null;
                  runAnimation(nextQueued);
                } else {
                  queuedIndexRef.current = null;
                }
              },
              onInterrupt: () => {
                cleanupIn();
                setIsAnimating(false);
                animationRef.current = null;
              },
            });

            animationRef.current = inTl;

            inTl.to(
              inLines,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.06,
              },
              0
            );

            if (ulEl2) {
              inTl.to(
                ulEl2,
                {
                  autoAlpha: 1,
                  duration: 0.4,
                },
                0.12
              );
            }
          });
        });
      });
    };

    if (animationRef.current) {
      queuedIndexRef.current = active;
      return;
    }

    if (active !== displayedIndex) {
      runAnimation(active);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [active, displayedIndex, setDisplayedIndex, setIsAnimating, tabs]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  const current = tabs?.[displayedIndex] ?? { intro: "", bullets: [] };

  return (
    <div className="w-full flex justify-between max-md:hidden sticky top-[15%]">
      <div className="w-[50%] space-y-[2vw] font-light">
        {tabs.map((tab, idx) => {
          const isActive = idx === active;

          return (
            <div
              key={idx}
              onClick={() => onTabClick(idx)}
              className={`transition-colors cursor-pointer border fadeup p-[1vw] bg-[#EFF1FB] ${
                isActive
                  ? "border-l-[4px] border-primary-blue text-primary-blue"
                  : "border border-transparent text-[#0A1B4B]"
              }`}
            >
              <button
                type="button"
                className="w-full text-left text-30 capitalize cursor-pointer"
              >
                {tab.label}
              </button>

              <p
                className={`${
                  isActive ? "opacity-0" : "opacity-100"
                } duration-300 font-medium text-22 mt-[1vw] cursor-pointer text-primary-blue w-full`}
              >
                Read More
              </p>
            </div>
          );
        })}
      </div>

      <div ref={contentWrapRef} className="w-[45%] relative text-30 fadeup">
        <div className="w-full space-y-[2vw]">
          <p data-intro>{current.intro}</p>

          <ul className="list-disc marker:text-sm pl-[1.5vw] space-y-[1vw]">
            {current.bullets?.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const OperationsMobile = ({
  tabs,
  activeMobile,
  displayedMobileIndex,
  setDisplayedMobileIndex,
  setIsMobileAnimating,
  onMobileTabClick,
}) => {
  const contentOuterRef = useRef(null);
  const animationRef = useRef(null);
  const queuedIndexRef = useRef(null);

  useEffect(() => {
    if (!tabs?.length) return;
    if (!contentOuterRef.current) return;

    const outer = contentOuterRef.current;

    const runAnimation = (targetIndex) => {
      if (targetIndex === displayedMobileIndex) return;

      setIsMobileAnimating(true);
      gsap.killTweensOf(outer);

      const currentHeight = outer.offsetHeight;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onInterrupt: () => {
          setIsMobileAnimating(false);
          animationRef.current = null;
        },
      });

      animationRef.current = tl;

      gsap.set(outer, {
        height: currentHeight,
        overflow: "hidden",
      });

      // close current content
      tl.to(outer, {
        height: 0,
        duration: 0.42,
        ease: "power2.inOut",
      });

      // swap content after close
      tl.call(() => {
        setDisplayedMobileIndex(targetIndex);
      });

      // open next content
      tl.call(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const outer2 = contentOuterRef.current;
            if (!outer2) {
              setIsMobileAnimating(false);
              animationRef.current = null;
              return;
            }

            gsap.set(outer2, {
              height: 0,
              overflow: "hidden",
            });

            const inner2 = outer2.firstElementChild;
            const nextHeight = inner2 ? inner2.scrollHeight : 0;

            const openTl = gsap.timeline({
              defaults: { ease: "power2.out" },
              onComplete: () => {
                gsap.set(outer2, {
                  height: "auto",
                  overflow: "visible",
                });

                setIsMobileAnimating(false);
                animationRef.current = null;

                if (
                  queuedIndexRef.current !== null &&
                  queuedIndexRef.current !== targetIndex
                ) {
                  const nextQueued = queuedIndexRef.current;
                  queuedIndexRef.current = null;
                  runAnimation(nextQueued);
                } else {
                  queuedIndexRef.current = null;
                }
              },
              onInterrupt: () => {
                setIsMobileAnimating(false);
                animationRef.current = null;
              },
            });

            animationRef.current = openTl;

            openTl.to(outer2, {
              height: nextHeight,
              duration: 0.52,
              ease: "power2.out",
            });
          });
        });
      });
    };

    if (animationRef.current) {
      queuedIndexRef.current = activeMobile;
      return;
    }

    if (activeMobile !== displayedMobileIndex) {
      runAnimation(activeMobile);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [
    activeMobile,
    displayedMobileIndex,
    setDisplayedMobileIndex,
    setIsMobileAnimating,
    tabs,
  ]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  const current = tabs?.[displayedMobileIndex] ?? { intro: "", bullets: [] };

  return (
    <div className="hidden max-md:flex max-md:flex-col max-md:pt-[7vw] sticky top-[10%]">
      <div className="w-full flex flex-col gap-[3vw] font-light">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeMobile;
          const isDisplayed = idx === displayedMobileIndex;

          return (
            <div key={idx} className="w-full">
              <button
                type="button"
                onClick={() => onMobileTabClick(idx)}
                className={[
                  "w-full text-left p-[3vw] bg-[#EFF1FB] text-32 capitalize transition-colors cursor-pointer",
                  isActive
                    ? "border-l-[4px] border border-primary-blue text-primary-blue"
                    : "border border-transparent text-[#0A1B4B]",
                ].join(" ")}
              >
                {tab.label}

                <p
                  className={`${
                    isActive ? "opacity-0" : "opacity-100"
                  } duration-300 font-medium max-sm:text-[3.5vw] max-md:text-[2.4vw] mt-[4vw] text-primary-blue w-full`}
                >
                  Read More
                </p>
              </button>

              {isDisplayed && (
                <div ref={contentOuterRef} className="w-full overflow-hidden">
                  <div className="w-full text-30 pt-[3vw] pb-[2vw]">
                    <div className="w-full space-y-[4vw]">
                      <p>{current.intro}</p>

                      <ul className="list-disc marker:text-sm pl-[7vw] space-y-[2vw]">
                        {current.bullets?.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Operations = ({ operationsContent }) => {
  const sectionRef = useRef(null);
  const scrollTriggerDesktopRef = useRef(null);
  const scrollTriggerMobileRef = useRef(null);

  const [active, setActive] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [, setIsAnimating] = useState(false);

  const [activeMobile, setActiveMobile] = useState(0);
  const [displayedMobileIndex, setDisplayedMobileIndex] = useState(0);
  const [, setIsMobileAnimating] = useState(false);

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

  useEffect(() => {
    if (!sectionRef.current) return;
    if (!data.tabs.length) return;

    const sectionEl = sectionRef.current;
    const totalSteps = Math.max(data.tabs.length - 1, 1);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      scrollTriggerDesktopRef.current?.kill();

      scrollTriggerDesktopRef.current = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: () => `+=${window.innerHeight * totalSteps}`,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.round(self.progress * totalSteps);
          setActive((prev) => (prev !== nextIndex ? nextIndex : prev));
        },
      });

      ScrollTrigger.refresh();
    });

    mm.add("(max-width: 767px)", () => {
      scrollTriggerMobileRef.current?.kill();

      scrollTriggerMobileRef.current = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: () => `+=${window.innerHeight * totalSteps}`,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.round(self.progress * totalSteps);
          setActiveMobile((prev) => (prev !== nextIndex ? nextIndex : prev));
        },
      });

      ScrollTrigger.refresh();
    });

    return () => {
      mm.revert();
      scrollTriggerDesktopRef.current?.kill();
      scrollTriggerDesktopRef.current = null;
      scrollTriggerMobileRef.current?.kill();
      scrollTriggerMobileRef.current = null;
    };
  }, [data.tabs.length]);

  const getTargetScrollY = (index) => {
    if (!sectionRef.current || !data.tabs.length) return 0;

    const sectionEl = sectionRef.current;
    const totalSteps = Math.max(data.tabs.length - 1, 1);
    const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY;
    const sectionScrollDistance = window.innerHeight * totalSteps;

    return sectionTop + sectionScrollDistance * (index / totalSteps);
  };

  const handleDesktopTabClick = (index) => {
    window.scrollTo({
      top: getTargetScrollY(index),
      behavior: "smooth",
    });
  };

  const handleMobileTabClick = (index) => {
    window.scrollTo({
      top: getTargetScrollY(index),
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id={data.sectionId}
      className="w-full px-[5vw] py-[7%] max-md:px-[6vw] max-md:py-[10%] max-sm:py-[15%] space-y-[5vw]"
      style={{
        minHeight: `${Math.max(data.tabs.length, 1) * 100}vh`,
      }}
    >
      <div className="w-full h-fit gap-y-[2vw] flex flex-col items-center text-center">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] leading-[1.2] max-md:leading-[1.3] max-sm:leading-[1.4] mx-auto w-[85%] max-md:w-full capitalize">
            {data.heading}
          </h2>
        </HeadingAnim>
      </div>

      <OperationsDesktop
        tabs={data.tabs}
        active={active}
        displayedIndex={displayedIndex}
        setDisplayedIndex={setDisplayedIndex}
        onTabClick={handleDesktopTabClick}
        setIsAnimating={setIsAnimating}
      />

      <OperationsMobile
        tabs={data.tabs}
        activeMobile={activeMobile}
        displayedMobileIndex={displayedMobileIndex}
        setDisplayedMobileIndex={setDisplayedMobileIndex}
        setIsMobileAnimating={setIsMobileAnimating}
        onMobileTabClick={handleMobileTabClick}
      />
    </section>
  );
};

export default Operations;