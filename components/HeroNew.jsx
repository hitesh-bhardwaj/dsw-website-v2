"use client";
import Image from "next/image";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import Copy from "./Animations/Copy";
import HeadingAnim from "./Animations/HeadingAnim";
import { fadeUp } from "./Animations/gsapAnimations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import BreadCrumbs from "./BreadCrumbs";
import { usePathname } from "next/navigation";
import { useModal } from "./ModalProvider";
import dynamic from "next/dynamic";

const DynamicWaveGrid = dynamic(() => import("./Homepage/HeroBg"), {
  ssr: false,
});

export default function HeroNew({ heroContent, variant, breadcrumbs }) {
  const showButtons =
    heroContent.primaryButton?.present || heroContent.secondaryButton?.present;

  const scrollHintRef = useRef(null);
  const idleTimerRef = useRef(null);
  const {  openModal } = useModal();


  const [isIdle, setIsIdle] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // ✅ one source of truth for delaying hero intro
  const [baseDelay, setBaseDelay] = useState(0);

  fadeUp();

  // ✅ read loader state once (client only)
  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const loaderShown = sessionStorage.getItem("loaderShown");

  //   // If loader hasn't been shown yet, it will run now -> delay hero.
  //   // Tune this to your loader timeline length.
  //   const delay = loaderShown ? 0 : 5.4;

  //   setBaseDelay(delay);
  // }, []);

  // ✅ GSAP intro + fadeUp (delayed if loader is running)
  useGSAP(
    () => {
      // if(!baseDelay) return
      const tl = gsap.timeline();
        const loaderShown = sessionStorage.getItem("loaderShown");

      gsap.set(".hero-overlay", { opacity: 0 });
      gsap.set(".hero-text,.hero-head", { opacity: 1 });

      tl.from(".herofadeup", {
        yPercent: 20,
        opacity: 0,
        delay: 1.2
      }).from(
        "#header",
        {
          yPercent: -20,
          opacity: 0,
        },
        "<"
      );
    }
  );

  // ✅ Footer visibility watcher (unchanged)
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

  // ✅ Scroll hint behavior (unchanged)
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

   const pathname = usePathname();

  return (
    <section className="relative max-sm:px-[7vw] w-full h-screen bg-white max-sm:w-screen max-sm:overflow-x-hidden z-10">
      <div className="absolute inset-0 z-0 h-screen w-full hidden max-md:block">
        <Image
          src="/assets/homepage/hero-bg-mob.png"
          height={1500}
          width={1500}
          alt="mobile-hero-bg"
          className="h-full w-full max-sm:object-cover max-md:object-fill"
        />
      </div>

      <DynamicWaveGrid key={pathname} variant={variant}/>

      <div className="relative z-10 flex flex-col items-center h-full pt-[12vw] max-md:pt-[37vw] max-sm:pt-[45vw] pointer-events-none">
        <div className="space-y-[1.2vw] max-sm:space-y-[3vw] max-md:space-y-[5vw] w-full mx-auto">
          {/*  delay Copy by loader delay too */}
          <Copy delay={baseDelay + 1}>
            <p className="text-30 text-center max-w-[60%] mx-auto text-[#333333] tracking-wide opacity-0 hero-text max-sm:max-w-[90%]">
              {heroContent.tagline}
            </p>
          </Copy>

          <HeadingAnim delay={baseDelay + 0.3}>
            <h1
              className={`text-110 text-[#0A1B4B] leading-[1.2] text-center mx-auto max-sm:w-full max-md:w-[85%] opacity-0 hero-head ${
                heroContent.headingWidth || "w-[70%]"
              }`}
            >
              {heroContent.heading}
            </h1>
          </HeadingAnim>
        </div>

        <div className="herofadeup">
          {showButtons && (
            <div className="flex max-sm:flex-col items-center gap-[1vw] max-sm:gap-[4vw] max-md:gap-[2vw] mt-15 pointer-events-auto">
              {heroContent.primaryButton?.present && (
                <PrimaryButton
                onClick={(e) => {
                if (heroContent.primaryButton.book) {
                  e.preventDefault();
                  openModal()
                }
              }}
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

        {heroContent.para && (
          <div
            className={`py-[1.5vw] mt-[3vw] mx-auto text-center max-sm:w-full max-sm:mt-[7vw] ${
              heroContent.paraWidth ? heroContent.paraWidth : "w-[60%]"
            }`}
          >
            <Copy delay={baseDelay + 1}>
              <p className="text-24 text-[#333333]">{heroContent.para}​</p>
            </Copy>
          </div>
        )}
         <div className="herofadeup">
          {heroContent.images && (
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
