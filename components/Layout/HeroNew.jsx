"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import BreadCrumbs from "../BreadCrumbs";
import { usePathname } from "next/navigation";
import { useModal } from "../ModalProvider";
import dynamic from "next/dynamic";
import PrimaryButton from "../Testing/PrimaryButton";
import SecondaryButton from "../Testing/SecondaryButton";

const DynamicWaveGrid = dynamic(() => import("../Homepage/HeroBgWorker"), {
  ssr: false,
});

// ✅ Scroll hint (client-only)
const DynamicScrollHint = dynamic(() => import("./ScrollHint"), {
  ssr: false,
});

export default function HeroNew({ heroContent, variant, breadcrumbs }) {
  const showButtons = useMemo(
    () =>
      !!(
        heroContent?.primaryButton?.present ||
        heroContent?.secondaryButton?.present
      ),
    [heroContent],
  );

  const pathname = usePathname();
  const { openModal } = useModal();
  const [mob, setMob] = useState(false);

  // ✅ Defer heavy background until after first paint / idle
  const [bgReady, setBgReady] = useState(false);

  // ✅ Robust mob detection (no render loop)
  useEffect(() => {
    const update = () => setMob(window.innerWidth <= 1024);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ✅ Defer WebGL to protect LCP
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) setBgReady(true);
    };

    // Prefer idle if available
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(run, { timeout: 1200 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const t = setTimeout(run, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);
 
  // ✅ Intro timeline (scope to component to avoid global selectors leakage)
  const heroRootRef = useRef(null);

  return (
    <section
      ref={heroRootRef}
      className="relative max-sm:px-[7vw] w-full h-screen bg-white max-sm:w-screen max-sm:overflow-x-hidden z-10"
    >
      {/* ✅ Mobile image bg: keep it LCP-friendly */}
      {mob && (
        <div className="absolute inset-0 z-0 h-screen w-full">
          <Image
            src="/assets/homepage/hero-bg-mob.png"
            alt="mobile-hero-bg"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* ✅ Desktop bg: defer WebGL to reduce LCP impact */}

      {!mob && bgReady && (
        <div className="desktop-shader">
          <DynamicWaveGrid key={pathname} variant={variant} />
        </div>
      )}

      <div className="relative z-[999] flex flex-col items-center h-full pt-[12vw] max-md:pt-[37vw] max-sm:pt-[45vw] pointer-events-none">
        <div className="space-y-[1.2vw] max-sm:space-y-[3vw] max-md:space-y-[5vw] w-full mx-auto">
          {heroContent?.tagline && (
            <p className="text-30 hero-tagline text-center max-w-[60%] mx-auto text-[#333333] tracking-wide hero-text max-sm:max-w-[90%]">
              {heroContent?.tagline}
            </p>
          )}

          <h1
            className={`text-110 hero-heading text-[#0A1B4B] leading-[1.2] text-center mx-auto max-sm:w-full max-md:w-[85%] hero-head ${heroContent?.headingWidth || "w-[70%]"
              }`}
          >
            {heroContent?.heading}
          </h1>
        </div>

        <div className="herofadeup hero-buttons">
          {showButtons && (
            <div className="flex max-sm:flex-col items-center gap-[1vw] max-sm:gap-[4vw] max-md:gap-[2vw] mt-15 pointer-events-auto">
              {heroContent?.primaryButton?.present && (
                <PrimaryButton
                  onClick={(e) => {
                    if (heroContent?.primaryButton?.book) {
                      e.preventDefault();
                      openModal();
                    }
                  }}
                  text={heroContent?.primaryButton?.text}
                  href={heroContent?.primaryButton?.link}
                />
              )}

              {heroContent?.secondaryButton?.present && (
                <SecondaryButton
                  text={heroContent?.secondaryButton?.text}
                  href={heroContent?.secondaryButton?.link}
                />
              )}
            </div>
          )}
        </div>

        {heroContent?.para && (
          <div
            className={`py-[1.5vw] mt-[3vw] mx-auto text-center max-sm:w-full max-sm:mt-[7vw] ${heroContent?.paraWidth
              ? heroContent?.paraWidth
              : "w-[60%] max-md:w-[80%]"
              }`}
          >
            <p className="text-24 hero-content text-[#333333]">{heroContent?.para}​</p>
          </div>
        )}

        <div className="hero-content">
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

        {breadcrumbs && <BreadCrumbs />}
      </div>

      {/* ✅ Scroll hint extracted + dynamic */}
      <DynamicScrollHint />

      {/* ⚠️ Consider rendering this overlay only when needed */}
      <div className="w-screen h-[130vh] bg-white absolute inset-0 pointer-events-none hero-overlay z-[99]" />
    </section>
  );
}

