"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ScrollHint() {
  const idleTimerRef = useRef(null);

  const [isIdle, setIsIdle] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Detect footer visibility
  useEffect(() => {
    const checkFooter = () => {
      const footerCta = document.getElementById("footer-cta");
      const footer = document.getElementById("footer");
      const elements = [footerCta, footer].filter(Boolean);

      if (elements.length === 0) {
        setIsFooterVisible(false);
        return;
      }

      const vh = window.innerHeight;

      const anyVisible = elements.some((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < vh + 50 && rect.bottom > -50;
      });

      setIsFooterVisible(anyVisible);
    };

    checkFooter();

    let ticking = false;

    const throttledCheck = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkFooter();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledCheck, { passive: true });
    window.addEventListener("resize", checkFooter);

    const delayedCheck = setTimeout(checkFooter, 500);

    return () => {
      window.removeEventListener("scroll", throttledCheck);
      window.removeEventListener("resize", checkFooter);
      clearTimeout(delayedCheck);
    };
  }, []);

  // Idle scroll hint logic
  useEffect(() => {
    const hideHint = () => {
      setIsIdle(false);
    };

    const showHint = () => {
      if (isFooterVisible) return;
      setIsIdle(true);
    };

    const resetIdleTimer = () => {
      hideHint();

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      if (isFooterVisible) return;

      idleTimerRef.current = setTimeout(showHint, 7000);
    };

    resetIdleTimer();

    window.addEventListener("scroll", resetIdleTimer, { passive: true });

    return () => {
      window.removeEventListener("scroll", resetIdleTimer);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [isFooterVisible]);

  // If footer visible, hide hint
  useEffect(() => {
    if (isFooterVisible) {
      setIsIdle(false);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    }
  }, [isFooterVisible]);

  if (isFooterVisible) return null;

  return (
    <div
      className={`fixed bottom-10 right-10 max-sm:left-22 flex items-center gap-[1vw] max-sm:gap-[4vw] max-sm:w-full scrolling pointer-events-none transition-opacity duration-300 ease-out z-[1200] ${
        isIdle ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
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