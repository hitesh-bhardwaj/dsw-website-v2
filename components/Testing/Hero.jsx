"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import { useModal } from "../ModalProvider";
import dynamic from "next/dynamic";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const DynamicScrollHint = dynamic(() => import("../Layout/ScrollHintOptimized"), { ssr: false });
// Web Worker-based shader: Offloads rendering to worker thread
const DynamicWaveGrid = dynamic(() => import("../Homepage/HeroBgWorker"), {
  ssr: false,
  loading: () => null, // No loading state - just empty until ready
});

export default function Hero({ heroContent, variant = "default" }) {
  const showButtons = useMemo(
    () => !!(heroContent?.primaryButton?.present || heroContent?.secondaryButton?.present),
    [heroContent]
  );

  const { openModal } = useModal();
  const [mob, setMob] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);
  const heroRef = useRef(null);

  // Mobile detection
  useEffect(() => {
    const update = () => setMob(window.innerWidth <= 1024);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Progressive shader loading: Load worker-based shader after initial paint
  useEffect(() => {
    // Skip shader on mobile entirely (use static image for better battery life)
    if (mob) return;

    let cancelled = false;

    // Simple delay approach: Load shader after 1.5s to ensure LCP is captured
    const timer = setTimeout(() => {
      if (!cancelled) {
        setShaderReady(true);
      }
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mob]);

  return (
    <section
      ref={heroRef}
      className="relative max-sm:px-[7vw] w-full h-screen bg-white max-sm:w-screen max-sm:overflow-x-hidden z-10"
    >
      {/* Static background image (always visible, priority loaded) */}
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Image
          src="/assets/homepage/hero-bg-mob.png"
          alt="hero-bg"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Desktop shader - loaded AFTER metrics, overlays on top of static image */}
      {!mob && shaderReady && (
        <div className="absolute inset-0 z-1 h-screen w-full desktop-shader">
          <DynamicWaveGrid variant={variant} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-999 flex flex-col items-center h-full pt-[12vw] max-md:pt-[37vw] max-sm:pt-[45vw] pointer-events-none">
        <div className="space-y-[1.2vw] max-sm:space-y-[3vw] max-md:space-y-[5vw] w-full mx-auto">
          {heroContent?.tagline && (
            <p className="text-30 hero-tagline text-center max-w-[60%] mx-auto text-[#333333] tracking-wide max-sm:max-w-[90%]">
              {heroContent.tagline}
            </p>
          )}

          <h1
            className={`text-110 hero-heading text-[#0A1B4B] leading-[1.2] text-center mx-auto max-sm:w-full max-md:w-[85%] ${heroContent?.headingWidth || "w-[70%]"}`}
          >
            {heroContent?.heading}
          </h1>
        </div>

        {/* Buttons */}
        {showButtons && (
          <div className="hero-buttons flex max-sm:flex-col items-center gap-[1vw] max-sm:gap-[4vw] max-md:gap-[2vw] mt-15 pointer-events-auto">
            {heroContent?.primaryButton?.present && (
              <PrimaryButton
                onClick={(e) => {
                  if (heroContent?.primaryButton?.book) {
                    e.preventDefault();
                    openModal();
                  }
                }}
                text={heroContent.primaryButton.text}
                href={heroContent.primaryButton.link}
              />
            )}

            {heroContent?.secondaryButton?.present && (
              <SecondaryButton
                text={heroContent.secondaryButton.text}
                href={heroContent.secondaryButton.link}
              />
            )}
          </div>
        )}

        {/* Paragraph */}
        {heroContent?.para && (
          <div className={`py-[1.5vw] mt-[3vw] mx-auto text-center max-sm:w-full max-sm:mt-[7vw] ${heroContent?.paraWidth || "w-[60%] max-md:w-[80%]"}`}>
            <p className="text-24 hero-content text-[#333333]">{heroContent.para}</p>
          </div>
        )}

        {/* Images */}
        {heroContent?.images && (
          <div className="flex items-center justify-center gap-[4vw] max-sm:gap-[10vw] max-md:gap-[7vw] mt-15">
            <Image
              src="/assets/infosys-finacle/infosys-finacle.png"
              alt="infosys-finacle"
              className="w-[8vw] max-sm:w-[25vw] h-auto max-md:w-[18vw]"
              width={297}
              height={46}
              priority
            />
            <Image
              src="/dsw-logo.svg"
              alt="dsw"
              className="w-[13vw] mt-[2vw] max-sm:w-[42vw] max-sm:mt-[5vw] h-auto max-md:w-[18vw]"
              width={297}
              height={46}
              priority
            />
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <DynamicScrollHint />

      {/* White overlay */}
      <div className="w-screen h-screen bg-white absolute inset-0 pointer-events-none hero-overlay z-99" />
    </section>
  );
}
