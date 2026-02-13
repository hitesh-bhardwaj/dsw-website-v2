"use client";

import Image from "next/image";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import Copy from "./Animations/Copy";
import HeadingAnim from "./Animations/HeadingAnim";
import { fadeUp } from "./Animations/gsapAnimations";
import WaveGradientCanvas from "./Homepage/HeroBg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function HeroNew({ heroContent }) {
  const showButtons =
    heroContent.primaryButton?.present || heroContent.secondaryButton?.present;

  const scrollHintRef = useRef(null);
  const idleTimerRef = useRef(null);

  const [isIdle, setIsIdle] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  fadeUp();

  // ✅ GSAP intro + fadeUp
  useGSAP(() => {
    const tl = gsap.timeline();
    gsap.set(".hero-overlay", { opacity: 0 });
    gsap.set(".hero-text,.hero-head", { opacity: 1 });

    tl.from(".herofadeup", {
      yPercent: 20,
      opacity: 0,
      delay: 1.2,
    }).from(
      "#header",
      {
        yPercent: -20,
        opacity: 0,
      },
      "<",
    );
  }, []);

  // ✅ Footer visibility watcher with improved detection
  useEffect(() => {
    const checkFooter = () => {
      const footerCta = document.getElementById("footer-cta");
      const footer = document.getElementById("footer");
      
      // Check both elements
      const elements = [footerCta, footer].filter(Boolean);
      
      if (elements.length === 0) {
        setIsFooterVisible(false);
        return;
      }

      const vh = window.innerHeight;
      
      // Check if ANY footer element is visible
      const anyVisible = elements.some(el => {
        const rect = el.getBoundingClientRect();
        // Consider visible if top edge is within viewport or close to it
        // Adding buffer for mobile (50px) to trigger earlier
        return rect.top < vh + 50 && rect.bottom > -50;
      });

      setIsFooterVisible(anyVisible);
    };

    // Check immediately on mount
    checkFooter();
    
    // Throttle for better mobile performance
    let ticking = false;
    const throttledCheck = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkFooter();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledCheck, { passive: true });
    window.addEventListener("resize", checkFooter);
    
    // Extra check after a short delay (for content that loads async)
    const delayedCheck = setTimeout(checkFooter, 500);

    return () => {
      window.removeEventListener("scroll", throttledCheck);
      window.removeEventListener("resize", checkFooter);
      clearTimeout(delayedCheck);
    };
  }, []);

  // ✅ Scroll hint behavior with improved mobile handling
  useEffect(() => {
    const hintEl = scrollHintRef.current;
    if (!hintEl) return;

    // Start hidden
    gsap.set(hintEl, { autoAlpha: 0 });

    const showHint = () => {
      // Double check footer visibility before showing
      if (isFooterVisible) return;
      setIsIdle(true);
      gsap.to(hintEl, { autoAlpha: 1, duration: 0.35, overwrite: "auto" });
    };

    const hideHint = () => {
      setIsIdle(false);
      gsap.to(hintEl, { autoAlpha: 0, duration: 0.15, overwrite: "auto" });
    };

    const resetIdleTimer = () => {
      // Active scrolling => hide immediately
      hideHint();

      // Clear existing timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      
      // Don't start timer if footer is visible
      if (isFooterVisible) return;

      // Restart 7s idle timer
      idleTimerRef.current = setTimeout(() => {
        showHint();
      }, 7000);
    };

    // Initialize: if no scroll happens, show after 7s (unless footer visible)
    resetIdleTimer();

    window.addEventListener("scroll", resetIdleTimer, { passive: true });

    return () => {
      window.removeEventListener("scroll", resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isFooterVisible]);

  // ✅ Force-hide when footer becomes visible
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

  return (
    <section className="relative max-sm:px-[7vw] w-full h-screen bg-white max-sm:w-screen max-sm:overflow-x-hidden">
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Image
          src="/assets/homepage/hero-bg-mob.png"
          height={1500}
          width={1500}
          alt="mobile-hero-bg"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none h-[120vh] max-sm:hidden">
        <div className="absolute inset-0 flex justify-between px-16">
          {[...Array(16)].map((_, i) => (
            <span key={i} className="w-px h-full bg-white/10" />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col justify-between py-16">
          {[...Array(11)].map((_, i) => (
            <span key={i} className="h-px w-full bg-white/10" />
          ))}
        </div>
      </div>

      <WaveGradientCanvas />

      <div className="relative z-10 flex flex-col items-center h-full pt-[12vw] max-sm:pt-[45vw]">
        <div className="space-y-[1.2vw] max-sm:space-y-[3vw] w-full">
          <Copy delay={1}>
            <p className="text-30 text-center text-[#333333] tracking-wide opacity-0 hero-text">
              {heroContent.tagline}
            </p>
          </Copy>

          <HeadingAnim delay={0.3}>
            <h1 className={`text-110 text-[#0A1B4B] leading-[1.2] text-center mx-auto max-sm:w-full opacity-0 hero-head ${heroContent.headingWidth || "w-[70%]"}`}>
              {heroContent.heading}
            </h1>
          </HeadingAnim>
        </div>

        <div className="herofadeup">
          {showButtons && (
            <div className="flex max-sm:flex-col items-center gap-[1vw] max-sm:gap-[4vw] mt-15">
              {heroContent.primaryButton?.present && (
                <PrimaryButton
                  text={heroContent.primaryButton.text}
                  href={heroContent.primaryButton.link}
                />
              )}

              {heroContent.secondaryButton?.present && (
                <SecondaryButton
                  text={heroContent.secondaryButton.text}
                  href={heroContent.secondaryButton.link}
                />
              )}
            </div>
          )}
        </div>

        <div className="herofadeup">
          {heroContent.images && (
            <div
            className="flex items-center justify-center gap-[4vw] max-sm:gap-[10vw] max-md:gap-[7vw] mt-15"
          >
            <Image
              src="/assets/infosys-finacle/infosys-finacle.png"
              alt="infosys-finacle"
              className="w-[8vw] max-sm:w-[25vw] h-auto max-md:w-[18vw]"
              width={297}
              height={46}
              priority
            />
            <Image
              src="/assets/infosys-finacle/dsw.png"
              alt="dsw"
              className="w-[8vw] max-sm:w-[25vw] h-auto max-md:w-[18vw]"
              width={297}
              height={46}
              priority
            />
          </div>
          )}
        </div>

        {/* Scroll Down Indicator - conditionally render to prevent any display issues */}
        {!isFooterVisible && (
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
        )}
      </div>

      <div className="w-screen h-screen bg-white absolute inset-0 pointer-events-none hero-overlay z-[9999]" />
    </section>
  );
}