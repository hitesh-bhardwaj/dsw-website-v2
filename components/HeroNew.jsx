"use client";

import Image from "next/image";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import Copy from "./Animations/Copy";
import HeadingAnim from "./Animations/HeadingAnim";
import { fadeUp } from "./Animations/gsapAnimations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import BreadCrumbs from "./BreadCrumbs";
import { usePathname } from "next/navigation";
import { useModal } from "./ModalProvider";
import dynamic from "next/dynamic";
// ✅ WebGL / heavy bg (client-only)
const DynamicWaveGrid = dynamic(() => import("./Homepage/HeroBg"), {
  ssr: false,
});

// ✅ Scroll hint (client-only)
const DynamicScrollHint = dynamic(() => import("./Layout/ScrollHint"), {
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

  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [mob, setMob] = useState(false);

  // ✅ Defer heavy background until after first paint / idle
  const [bgReady, setBgReady] = useState(false);

  // ✅ GSAP init (run once)
  fadeUp();

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
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        gsap.set(".hero-overlay", { opacity: 0 });
        gsap.set("#hero-bg", { opacity: 0 });
        tl.from("#hero-bg",{
          opacity:0,
          duration:1,
        })
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
      }, heroRootRef);

      return () => ctx.revert();
    },
    { scope: heroRootRef },
  );

  // ✅ Footer visibility watcher (unchanged, but kept efficient)
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
        window.requestAnimationFrame(() => {
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

      <div className="relative z-10 flex flex-col items-center h-full pt-[12vw] max-md:pt-[37vw] max-sm:pt-[45vw] pointer-events-none">
        <div className="space-y-[1.2vw] max-sm:space-y-[3vw] max-md:space-y-[5vw] w-full mx-auto">
          <Copy delay={1}>
            <p className="text-30 text-center max-w-[60%] mx-auto text-[#333333] tracking-wide hero-text max-sm:max-w-[90%]">
              {heroContent?.tagline}
            </p>
          </Copy>

          <HeadingAnim delay={0.3}>
            <h1
              className={`text-110 text-[#0A1B4B] leading-[1.2] text-center mx-auto max-sm:w-full max-md:w-[85%] hero-head ${
                heroContent?.headingWidth || "w-[70%]"
              }`}
            >
              {heroContent?.heading}
            </h1>
          </HeadingAnim>
        </div>

        <div className="herofadeup">
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
            className={`py-[1.5vw] mt-[3vw] mx-auto text-center max-sm:w-full max-sm:mt-[7vw] ${
              heroContent?.paraWidth
                ? heroContent?.paraWidth
                : "w-[60%] max-md:w-[80%]"
            }`}
          >
            <Copy delay={1}>
              <p className="text-24 text-[#333333]">{heroContent?.para}​</p>
            </Copy>
          </div>
        )}

        <div className="herofadeup">
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
      <DynamicScrollHint isFooterVisible={isFooterVisible} />

      {/* ⚠️ Consider rendering this overlay only when needed */}
      <div className="w-screen h-screen bg-white absolute inset-0 pointer-events-none hero-overlay z-[9999]" />
    </section>
  );
}
