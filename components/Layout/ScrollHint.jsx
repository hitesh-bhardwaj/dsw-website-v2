"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ScrollHint({ isFooterVisible }) {
  const scrollHintRef = useRef(null);
  const idleTimerRef = useRef(null);
  const [isIdle, setIsIdle] = useState(false);

  // ✅ Scroll hint behavior (same logic, isolated)
  useEffect(() => {
    const hintEl = scrollHintRef.current;
    if (!hintEl) return;

    gsap.set(hintEl, { autoAlpha: 0 });

    const showHint = () => {
      if (isFooterVisible) return;
      setIsIdle(true);
      gsap.to(hintEl, { autoAlpha: 1, duration: 0.35, overwrite: "auto" });
    };

    const hideHint = () => {
      setIsIdle(false);
      gsap.to(hintEl, { autoAlpha: 0, duration: 0.15, overwrite: "auto" });
    };

    const resetIdleTimer = () => {
      hideHint();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (isFooterVisible) return;

      idleTimerRef.current = setTimeout(() => {
        showHint();
      }, 7000);
    };

    resetIdleTimer();
    window.addEventListener("scroll", resetIdleTimer, { passive: true });

    return () => {
      window.removeEventListener("scroll", resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isFooterVisible]);

  // ✅ Footer override (same behavior)
  useEffect(() => {
    const hintEl = scrollHintRef.current;
    if (!hintEl) return;

    if (isFooterVisible) {
      setIsIdle(false);
      gsap.to(hintEl, { autoAlpha: 0, duration: 0.15, overwrite: "auto" });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    }
  }, [isFooterVisible]);

  // If footer visible, don’t even render (avoids layout/paint work)
  if (isFooterVisible) return null;

  return (
    <div
      ref={scrollHintRef}
      className="fixed bottom-10 right-10 max-sm:left-22 flex items-center gap-[1vw] max-sm:gap-[4vw] max-sm:w-full scrolling pointer-events-none"
      aria-hidden={!isIdle}
    >
      <div>
        <div className="flex flex-col gap-[0.5vw] w-fit h-[1vw] arrow-container max-sm:h-[3.5vw] overflow-hidden translate-y-[15%] max-sm:translate-y-[25%] max-md:translate-y-[20%] max-md:h-[2.5vw]">
          <div className="w-fit h-fit space-y-[0.5vw] keepScrolling-arrow max-sm:space-y-[1.5vw] max-md:space-y-[1vw]">
            <Image
              src="/arrow-downward.svg"
              width={20}
              height={20}
              className="size-[0.8vw] opacity-80 relative z-10 max-sm:h-[3vw] max-sm:w-[3vw] max-md:w-[2vw] max-md:h-[2vw] invert"
              alt="arrow-down"
            />
            <Image
              src="/arrow-downward.svg"
              width={20}
              height={20}
              className="size-[0.8vw] opacity-80 relative z-10 max-sm:h-[3vw] max-sm:w-[3vw] max-md:w-[2vw] max-md:h-[2vw] invert"
              alt="arrow-down"
            />
          </div>
        </div>
      </div>

      <p className="text-20 font-sans shimmer tracking-[0.056vw]">
        Keep Scrolling to Discover More
      </p>
    </div>
  );
}
