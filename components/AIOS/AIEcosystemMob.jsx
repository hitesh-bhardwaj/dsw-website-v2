"use client";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const AIEcosystemMob = () => {
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
        title: "Policy & access control",
        bullets: [
          "Identity, roles, and scoped permissions",
          "Runtime policy gating for actions and tools",
          "Tenant boundaries enforced by design",
        ],
      },
      {
        title: "Observability & audit trail",
        bullets: [
          "Every action is logged and explainable",
          "End-to-end lineage across decisions",
          "Safe rollback patterns for workflows",
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

  const getTargets = (wrap) => {
    const titleEl = wrap.querySelector("[data-slide-title]");
    const liEls = Array.from(wrap.querySelectorAll("ul")); // ✅ li, not ul
    return { titleEl, liEls };
  };

  const splitTargets = (titleEl, liEls) => {
    const titleSplit = new SplitText(titleEl, { type: "lines" });
    const bulletSplits = liEls.map((li) => new SplitText(li, { type: "lines" }));

    const lines = [
      ...titleSplit.lines,
      ...bulletSplits.flatMap((s) => s.lines),
    ];

    const revert = () => {
      try {
        titleSplit.revert();
        bulletSplits.forEach((s) => s.revert());
      } catch (_) {}
    };

    return { lines, revert };
  };

  const waitTwoRaf = (cb) => {
    requestAnimationFrame(() => requestAnimationFrame(cb));
  };

  const animateTo = (nextIndex) => {
    const wrap = contentWrapRef.current;
    if (!wrap) return;
    if (isAnimating) return;
    if (nextIndex === active) return;

    setIsAnimating(true);

    const { titleEl, liEls } = getTargets(wrap);
    if (!titleEl || !liEls.length) {
      setActive(nextIndex);
      setIsAnimating(false);
      return;
    }

    // Kill anything running on wrap (extra safety)
    gsap.killTweensOf(wrap);

    // Split current text and animate OUT
    const out = splitTargets(titleEl, liEls);

    // ✅ ensure lines are visible before animating out (prevents half states)
    gsap.set(out.lines, { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onInterrupt: () => {
        out.revert();
        gsap.set(wrap, { autoAlpha: 1 });
        setIsAnimating(false);
      },
    });

    tl.to(out.lines, {
      autoAlpha: 0,
      y: -14,
      duration: 0.35,
      stagger: 0.04,
    });

    // ✅ HARD HIDE WRAP so swapped React content can NEVER flash
    tl.set(wrap, { autoAlpha: 0 });

    // small buffer (feel free to adjust)
    tl.to({}, { duration: 0.12 });

    tl.call(() => {
      // cleanup old split wrappers BEFORE React swap
      out.revert();
      setActive(nextIndex);
    });

    // Wait for React paint, then animate IN
    tl.call(() => {
      waitTwoRaf(() => {
        const wrap2 = contentWrapRef.current;
        if (!wrap2) {
          setIsAnimating(false);
          return;
        }

        const { titleEl: titleEl2, liEls: liEls2 } = getTargets(wrap2);
        if (!titleEl2 || !liEls2.length) {
          gsap.set(wrap2, { autoAlpha: 1 });
          setIsAnimating(false);
          return;
        }

        const inn = splitTargets(titleEl2, liEls2);

        // keep wrapper hidden until we prep the lines
        gsap.set(wrap2, { autoAlpha: 1 });
        gsap.set(inn.lines, { autoAlpha: 0, y: 14 });

        gsap.to(inn.lines, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          onComplete: () => {
            inn.revert();
            setIsAnimating(false);
          },
          onInterrupt: () => {
            inn.revert();
            setIsAnimating(false);
          },
        });
      });
    });
  };

  const onNext = () => animateTo((active + 1) % SLIDES.length);
  const onPrev = () =>
    animateTo((active - 1 + SLIDES.length) % SLIDES.length);

  const current = SLIDES[active];

  return (
    <section
      ref={sectionRef}
      className="w-screen h-[70vh] hidden max-sm:block relative overflow-hidden"
    >
      <div className="w-[150%] absolute h-full bottom-[-42%] left-[-25%]">
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

        <div className="w-fit h-fit flex flex-col gap-[5vw] absolute top-[23%] left-1/2 -translate-x-1/2 items-center">
          <div className="text-40 text-primary-blue">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </div>

          <div className="w-full flex gap-[7vw]">
            <button
              type="button"
              onClick={onPrev}
              disabled={isAnimating}
              className="size-[15vw] rounded-full border p-[4.5vw] disabled:opacity-40"
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
              className="size-[15vw] rounded-full border p-[4.5vw] disabled:opacity-40"
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
      <div className="w-fit absolute top-[15%] flex left-[12%]">
        <div ref={contentWrapRef} className="space-y-[4vw] w-screen">
          <h3 data-slide-title className="text-40 font-medium text-[#0A1B4B]">
            {current.title}
          </h3>

          <ul className="pl-[4vw] list-disc">
            {current.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AIEcosystemMob;
