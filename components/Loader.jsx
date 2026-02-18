"use client";
import React, {  useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useLenis } from "lenis/react";

const Loader = () => {
  const [hidden, setIsHidden] = useState(false);
  const [mob, setMob] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const lenis = useLenis();

  /* --------------------------------------------------
     SCROLL LOCK — SINGLE SOURCE OF TRUTH
  -------------------------------------------------- */
  useEffect(() => {
    if (!lenis) return;

    const lenisRoot = document.querySelector("[data-lenis-root]");
    if (!lenisRoot) return;

    if (showLoader && !hidden) {
      lenis.stop();
      lenisRoot.style.overflow = "hidden";
      lenisRoot.style.height = "100vh";
    } else {
      lenis.start();
      lenisRoot.style.overflow = "";
      lenisRoot.style.height = "";
    }
  }, [lenis, showLoader, hidden]);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowLoader(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    const alreadyShown = sessionStorage.getItem("loaderShown");
    if (alreadyShown) {
      setShowLoader(false);
      return;
    }

    sessionStorage.setItem("loaderShown", "true");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const steps = 5;

      const isDesktop = globalThis.innerWidth > 1024;
      const xMultiplier = isDesktop
        ? 100
        : globalThis.innerWidth > 768
          ? 100
          : 60;

      for (let i = 1; i <= steps; i++) {
        tl.to(".sequence-container", {
          xPercent: i * xMultiplier,
          ease: "power3.inOut",
          duration: 1,
        }).to(
          ".number-container",
          {
            xPercent: i * 19.9,
            duration: 1,
            ease: "power3.inOut",
          },
          "<",
        );
      }

      tl.to("#loader", {
        opacity: 0,
        filter: "blur(20px)",
        onComplete: () => {
          setIsHidden(true);
        },
      });
    });

    return () => ctx.revert();
  }, [showLoader]);

  /* --------------------------------------------------
     GRADIENT ANIMATION
  -------------------------------------------------- */
  useEffect(() => {
    if (!showLoader) return;

    const ctx = gsap.context(() => {
      gsap.to(".loader-gradient", {
        yPercent: globalThis.innerWidth > 1024 ? -10 : -28,
        duration: 2,
        delay: 0.2,
        opacity: 1,
      });
    });

    return () => ctx.revert();
  }, [showLoader]);

  /* --------------------------------------------------
     MOBILE DETECTION
  -------------------------------------------------- */
  useEffect(() => {
    setMob(globalThis.innerWidth <= 1024);
  }, []);

  if (!showLoader) return null;

  return (
    <div
      id="loader"
      className={`w-screen h-screen fixed top-0 left-0 z-[9999] bg-background text-[17vw] overflow-hidden max-sm:text-[25vw] ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="w-fit h-fit flex sequence-container relative z-[2] font-head font-medium">
        <div className="flex w-[10vw] overflow-hidden max-sm:w-[14.5vw]">
          <div className="flex w-fit translate-x-[-79%] number-container gap-[0.2vw]">
            <span>9</span>
            <span>7</span>
            <span>5</span>
            <span>2</span>
            <span>0</span>
          </div>
        </div>

        <div className="flex w-[10vw] overflow-hidden max-sm:w-[14.5vw]">
          <div className="flex w-fit translate-x-[-79%] number-container gap-[0.2vw]">
            <span>9</span>
            <span>7</span>
            <span>9</span>
            <span>7</span>
            <span>0</span>
          </div>
        </div>
      </div>

      <div className="loader-gradient opacity-0 relative z-[1] h-screen translate-y-[10%]">
        {!mob ? (
          <div className="absolute top-[-17%] left-0 h-screen w-screen max-sm:hidden">
            
                <Image src={"/assets/homepage/bg-gradient.png"} alt="" className="w-full h-full" width={1920} height={1080}/>
          </div>
        ) : (
          <div className="w-screen h-screen absolute top-[27%] z-[10] left-0 hidden max-sm:block">
            <Image
              src="/assets/images/homepage/gradient-mob.png"
              alt="bg-gradient"
              fetchPriority="high"
              className="w-full h-auto object-cover"
              width={500}
              height={680}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
