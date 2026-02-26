"use client";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const AIEcosystemMob = ({ecosystemItems}) => {
  const sectionRef = useRef(null);
  const blueRingRef = useRef(null);
  const orangeRingRef = useRef(null);
  const contentWrapRef = useRef(null);

  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const SLIDES = useMemo(
    () => [
     {
    title: "Kernel-level governance",
    bullets: [
      "Policies execute as code",
      "Audit, traceability, and reversibility are native",
      "Controls cannot be bypassed or bolted on later",
    ],
  },
  {
    title: "Governed AI and agentic execution",
    bullets: [
      "Models and agents operate inside defined constraints",
      "Autonomy is controlled, not improvised",
      "Lifecycles are managed like system processes",
    ],
  },
  {
    title: "AI as enterprise infrastructure",
    bullets: [
      "Long-running, production-grade execution",
      "Independent of vendors, clouds, or tools",
      "Fully owned and operated by your enterprise",
    ],
  },
    ],
    []
  );

  // Infinite ring rotation
  useGSAP(
    () => {
      gsap.to(blueRingRef.current, {
        rotation: 180,
        ease: "none",
        repeat: -1,
        duration: 30,
      });

      gsap.to(orangeRingRef.current, {
        rotation: -180,
        ease: "none",
        repeat: -1,
        duration: 30,
      });
    },
    { scope: sectionRef }
  );

  const waitTwoRaf = (cb) => {
    requestAnimationFrame(() => requestAnimationFrame(cb));
  };

  const getTargets = (wrap) => {
    const titleEl = wrap.querySelector("[data-slide-title]");
    const ulEl = wrap.querySelector("[data-slide-ul]");
    return { titleEl, ulEl };
  };

  const animateTo = (nextIndex) => {
    const wrap = contentWrapRef.current;
    if (!wrap) return;
    if (isAnimating) return;
    if (nextIndex === active) return;

    setIsAnimating(true);

    // safety: kill anything running
    gsap.killTweensOf(wrap);
    gsap.killTweensOf(wrap.querySelectorAll("*"));

    const { titleEl, ulEl } = getTargets(wrap);

    // If targets missing, just swap
    if (!titleEl || !ulEl) {
      setActive(nextIndex);
      setIsAnimating(false);
      return;
    }

    // Split ONLY the title
    const titleSplit = new SplitText(titleEl, { type: "lines" });
    const titleLines = titleSplit.lines;

    const revertTitle = () => {
      try {
        titleSplit.revert();
      } catch (_) {}
    };

    // OUT timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onInterrupt: () => {
        revertTitle();
        gsap.set(wrap, { autoAlpha: 1 });
        setIsAnimating(false);
      },
    });

    // Ensure visible baseline before animating out
    gsap.set(titleLines, { autoAlpha: 1, y: 0 });
    gsap.set(ulEl, { autoAlpha: 1, y: 0 });

    // OUT: title lines + whole UL
    tl.to(titleLines, {
      autoAlpha: 0,
      y: -14,
      duration: 0.32,
      stagger: 0.05,
    })
      .to(
        ulEl,
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.25,
        },
        "<0.05"
      )
      // hard hide wrap so next content can never flash
      .set(wrap, { autoAlpha: 0 })
      .to({}, { duration: 0.12 })
      .call(() => {
        revertTitle();
        setActive(nextIndex);
      })
      // IN after paint
      .call(() => {
        waitTwoRaf(() => {
          const wrap2 = contentWrapRef.current;
          if (!wrap2) return setIsAnimating(false);

          const { titleEl: t2, ulEl: ul2 } = getTargets(wrap2);
          if (!t2 || !ul2) {
            gsap.set(wrap2, { autoAlpha: 1 });
            return setIsAnimating(false);
          }

          const inSplit = new SplitText(t2, { type: "lines" });
          const inLines = inSplit.lines;

          const cleanup = () => {
            try {
              inSplit.revert();
            } catch (_) {}
          };

          // show wrapper and prep
          gsap.set(wrap2, { autoAlpha: 1 });
          gsap.set(inLines, { autoAlpha: 0, y: 14 });
          gsap.set(ul2, { autoAlpha: 0, y: 12 });

          // IN: title lines + whole UL
          gsap.to(inLines, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          });

          gsap.to(ul2, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            delay: 0.1, // slight delay after title starts
            onComplete: () => {
              cleanup();
              setIsAnimating(false);
            },
            onInterrupt: () => {
              cleanup();
              setIsAnimating(false);
            },
          });
        });
      });
  };

  const onNext = () => animateTo((active + 1) % SLIDES.length);
  const onPrev = () => animateTo((active - 1 + SLIDES.length) % SLIDES.length);

  const current = SLIDES[active];

  return (
    <section
      ref={sectionRef}
      className="w-screen h-[70vh] hidden max-md:block relative overflow-hidden"
    >
      <div className="w-[150%] absolute h-full max-sm:bottom-[-42%] left-[-25%] max-md:bottom-[-47%]">
        <div ref={blueRingRef} className="absolute inset-0">
          <Image
            src="/assets/homepage/dotted-circle.svg"
            alt="Outer ring"
            fill
            className="object-contain"
          />
        </div>

        <div ref={orangeRingRef} className="absolute inset-[15%]">
          <Image
            src="/assets/homepage/inner-circle.svg"
            alt="Inner ring"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-fit h-fit flex flex-col gap-[5vw] absolute max-sm:top-[23%] max-md:top-[27%] left-1/2 -translate-x-1/2 items-center">
          <div className="text-40 text-primary-blue">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </div>

          <div className="w-full flex max-sm:gap-[7vw] max-md:gap-[4vw]">
            <button
              type="button"
              onClick={onPrev}
              disabled={isAnimating}
              className="max-sm:size-[15vw] rounded-full border max-sm:p-[4.5vw] disabled:opacity-40 max-md:size-[10vw] max-md:p-[3vw]"
              aria-label="Previous"
            >
              <Image
                src={"/assets/icons/arrow-left.svg"}
                alt="arrow-left"
                width={200}
                height={200}
                className="w-full h-full"
              />
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={isAnimating}
              className="max-sm:size-[15vw] rounded-full border max-sm:p-[4.5vw] disabled:opacity-40 max-md:size-[10vw] max-md:p-[3vw]"
              aria-label="Next"
            >
              <Image
                src={"/assets/icons/arrow-left.svg"}
                alt="arrow-right"
                width={200}
                height={200}
                className="w-full h-full rotate-180"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-fit absolute top-[15%] flex left-[7%]">
        <div ref={contentWrapRef} className="space-y-[4vw] w-screen">
          <h3 data-slide-title className="text-40 font-medium text-[#0A1B4B]">
            {current.title}
          </h3>

          <ul data-slide-ul className="pl-[4vw] list-disc max-md:text-24 max-sm:space-y-[2vw] max-md:space-y-[1vw]">
            {current.bullets.map((b, i) => (
              <li key={`${active}-${i}`}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AIEcosystemMob;
