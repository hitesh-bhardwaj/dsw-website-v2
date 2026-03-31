"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { fadeUp } from "../Animations/gsapAnimations";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


// ✅ Scroll hint (client-only)
const DynamicScrollHint = dynamic(() => import("../Layout/ScrollHint"), {
  ssr: false,
});

export default function Hero() {
    fadeUp();

  const [isFooterVisible, setIsFooterVisible] = useState(false);
    const heroRootRef = useRef(null);
 
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

  useGSAP(()=>{
     gsap.from(".herofadeup", {
          yPercent: 10,
          opacity: 0,
          delay: 0.5,
        })
  })

  return (
    <section
      ref={heroRootRef}
      className="relative max-sm:px-[7vw] w-full h-fit py-[7%] bg-white max-sm:w-screen max-sm:overflow-x-hidden z-10 max-md:h-[70vh] "
    >
      <div className="relative z-[999] flex flex-col items-center h-full pt-[10vw] max-md:pt-[37vw] max-sm:pt-[40vw] pointer-events-none gap-[3vw]">
        <div className="space-y-[1.2vw] max-sm:space-y-[3vw] max-md:space-y-[5vw] w-full mx-auto">
          <h1
            className={`text-76 hero-heading text-[#0A1B4B] max-md:text-110 leading-[1.2] text-center mx-auto max-sm:w-full max-md:w-[85%] hero-head capitalize
              }`}
          >
            Inside the AI OS Powering the Agentic Age
          </h1>
        </div>


        {/* <div className="herofadeup">
          
            <div className="h-[38vw] w-[90vw] rounded-[1.5vw] overflow-hidden max-md:h-[60vw]">
              <Image
                src="/assets/live-demo/hero-image.png"
                alt="infosys-finacle"
                width={1770}
                height={788}
                className="h-full w-full object-cover!"
                
                priority
              />
            </div>
        </div> */}
      </div>

      {/* ✅ Scroll hint extracted + dynamic */}
      <DynamicScrollHint isFooterVisible={isFooterVisible} />

      {/* ⚠️ Consider rendering this overlay only when needed */}
      <div className="w-screen h-[110vh] bg-white absolute inset-0 pointer-events-none hero-overlay z-[99]" />
    </section>
  );
}
