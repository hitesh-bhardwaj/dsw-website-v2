"use client";

import { gsap, useGSAP } from "@/lib/gsapCore";
import React, { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { useModal } from "../ModalProvider";
import PricingForm from "./PricingForm";

const PricingPopup = () => {
  const lenis = useLenis();
  const { openPricing, setOpenPricing, payload, setPayload } = useModal();

  const clearPayloadTimeoutRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (!openPricing) {
      lenis?.start();
      return;
    }

    lenis?.stop();
  }, [openPricing, lenis]);

  useGSAP(() => {
    if (!popupRef.current || !openPricing) return;

    gsap.fromTo(
      popupRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [openPricing]);

  useEffect(() => {
    if (!openPricing) {
      clearTimeout(clearPayloadTimeoutRef.current);
      clearPayloadTimeoutRef.current = setTimeout(() => {
        setPayload(null);
      }, 400);
    } else {
      clearTimeout(clearPayloadTimeoutRef.current);
    }

    return () => clearTimeout(clearPayloadTimeoutRef.current);
  }, [openPricing, setPayload]);

  const handleClose = () => {
    setOpenPricing(false);
  };

  return (
    <section
      id="pricing-popup"
      className={`fixed inset-0 z-[999] flex h-full w-full items-center justify-center bg-black/10 backdrop-blur-lg duration-500 ${
        openPricing ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        data-lenis-prevent
        ref={popupRef}
        className="relative h-auto max-h-[90vh] w-[78%] overflow-y-auto rounded-[2vw] border border-[#d4d4d4] bg-white/50 backdrop-blur-2xl max-md:w-[92%] max-md:rounded-[4vw] max-sm:h-[75%] max-sm:rounded-[6vw]"
      >
        <div className="relative z-10 flex justify-between p-[4vw] max-md:flex-col max-md:gap-[5vw] max-md:p-[6vw] max-sm:gap-[8vw] max-sm:p-[5vw] max-sm:py-[10vw]">
          <div className="w-[30%] space-y-[1vw] max-md:w-full max-md:space-y-[2vw] max-sm:space-y-[2vw]">
            <h2 className="text-76 font-heading leading-[1.2] text-[#0a1b4b]">
              See Pricing Details
            </h2>
            <p className="text-24 font-sans tracking-wide text-[#333] max-md:pl-[1vw]">
              Fill out the form
            </p>
          </div>

          <div className="w-[55%] max-md:w-full">
            {openPricing ? <PricingForm /> : null}
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 z-[-1] h-screen w-screen"
        onClick={handleClose}
      />

      <div className="absolute right-[3%] top-[3%] z-20 max-md:right-[3vw] max-md:top-[3vw] max-sm:right-[4vw] max-sm:top-[4vw]">
        <div
          onClick={handleClose}
          className="group h-auto cursor-pointer rounded-full bg-primary p-[2vw] transition-all ease-out max-md:p-[4vw] max-sm:w-[12vw] max-sm:p-[6vw]"
        >
          <div
            style={{
              transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
            }}
            className="rotate-45 duration-700 group-hover:rotate-225"
          >
            <span className="absolute left-1/2 top-1/2 h-[2px] w-[1.5vw] -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-[#ffffff] duration-300 transform-origin-center max-md:w-[3vw] max-sm:h-[1.5px] max-sm:w-[5vw]" />
            <span className="absolute left-1/2 top-1/2 h-[2px] w-[1.5vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffffff] duration-300 transform-origin-center max-md:w-[3vw] max-sm:h-[1.5px] max-sm:w-[5vw]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPopup;