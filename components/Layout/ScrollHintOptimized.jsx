"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Optimized ScrollHint - Removed GSAP dependency, uses pure CSS animations
 *
 * Behavior:
 * - Shows after 7s of no scroll activity
 * - Hides on scroll
 * - Hides when footer is visible
 * - Shimmer and arrow animations via CSS only
 */
export default function ScrollHintOptimized() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const idleTimerRef = useRef(null);

  // Combined footer visibility + idle timer logic
  useEffect(() => {
    // Footer visibility check (optimized with IntersectionObserver)
    const footerCta = document.getElementById("footer-cta");
    const footer = document.getElementById("footer");
    const targets = [footerCta, footer].filter(Boolean);

    let observer;
    if (targets.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some((entry) => entry.isIntersecting);
          setIsFooterVisible(anyVisible);

          // If footer visible, hide immediately and cancel timer
          if (anyVisible) {
            setShouldShow(false);
            if (idleTimerRef.current) {
              clearTimeout(idleTimerRef.current);
              idleTimerRef.current = null;
            }
          }
        },
        { rootMargin: "50px" }
      );

      targets.forEach((target) => observer.observe(target));
    }

    // Idle timer on scroll
    const resetIdleTimer = () => {
      setShouldShow(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      // Don't start timer if footer is visible
      if (isFooterVisible) return;

      idleTimerRef.current = setTimeout(() => {
        if (!isFooterVisible) {
          setShouldShow(true);
        }
      }, 7000);
    };

    // Initial timer
    resetIdleTimer();

    // Scroll listener
    window.addEventListener("scroll", resetIdleTimer, { passive: true });

    return () => {
      window.removeEventListener("scroll", resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (observer) observer.disconnect();
    };
  }, [isFooterVisible]);

  // Don't render if footer is visible (optimization)
  if (isFooterVisible) return null;

  return (
    <div
      className={`scroll-hint ${shouldShow ? "scroll-hint--visible" : ""}`}
      aria-hidden={!shouldShow}
    >
      {/* Arrow animation container */}
      <div className="scroll-hint__arrow-wrapper">
        <div className="scroll-hint__arrow-track">
          <Image
            src="/arrow-downward.svg"
            width={20}
            height={20}
            className="scroll-hint__arrow"
            alt="arrow-down"
          />
          <Image
            src="/arrow-downward.svg"
            width={20}
            height={20}
            className="scroll-hint__arrow"
            alt="arrow-down"
          />
        </div>
      </div>

      {/* Shimmer text */}
      <p className="scroll-hint__text shimmer tracking-[0.056vw]">
        Keep Scrolling to Discover More
      </p>
    </div>
  );
}
