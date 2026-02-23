"use client";
import React, { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import WalkthroughForm from "./WalkthroughForm";
import { useModal } from "../ModalProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const WalkthroughPopup = () => {
  const lenis = useLenis();
  const { openWalkThrough: modalOpen, setOpenWalkThrough: setModalOpen, payload, setPayload } = useModal();
  const clearPayloadTimeoutRef = useRef(null);
  const popupRef = useRef(null);

  // Animations + Lenis control
  useEffect(() => {
    if (!modalOpen) {
      lenis?.start();
      return;
    }
    lenis?.stop();
  }, [modalOpen, lenis]);

  // GSAP animation for popup
  useGSAP(() => {
    if (!popupRef.current) return;

    if (modalOpen) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [modalOpen]);

  // When modal closes => clear payload after delay
  useEffect(() => {
    if (!modalOpen) {
      clearTimeout(clearPayloadTimeoutRef.current);
      clearPayloadTimeoutRef.current = setTimeout(() => {
        setPayload(null);
      }, 400);
    } else {
      clearTimeout(clearPayloadTimeoutRef.current);
    }

    return () => clearTimeout(clearPayloadTimeoutRef.current);
  }, [modalOpen, setPayload]);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <section
      id="walkthrough-popup"
      className={`w-full h-full fixed inset-0 z-999 flex justify-center bg-black/10 backdrop-blur-lg items-center duration-500 ${modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Popup Card */}
      <div
        data-lenis-prevent
        ref={popupRef}
        className="relative w-[78%] h-auto max-h-[90vh] overflow-y-auto rounded-[2vw] border border-[#d4d4d4] bg-white/50 backdrop-blur-2xl max-sm:rounded-[6vw] max-md:w-[92%] max-md:rounded-[4vw]"
      >
        {/* Content */}
        <div className="relative z-10 flex justify-between p-[4vw]  max-md:flex-col max-md:p-[6vw] max-sm:p-[7vw] max-sm:gap-[8vw] max-md:gap-[5vw]">
          {/* Left Side - Heading */}
          <div className="w-[30%] space-y-[1vw] max-md:w-full max-md:space-y-[2vw] max-sm:space-y-[4vw]">
            <h2 className="text-76 text-[#0a1b4b] font-heading leading-[1.2] ">
              Get a Full Demo
            </h2>
            <p className="text-24 text-[#333] font-sans tracking-wide ">
              Fill out the form
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="w-[55%] max-md:w-full">
            {modalOpen ? <WalkthroughForm /> : null}
          </div>
        </div>

        {/* Close Button */}

      </div>

      {/* Background click closes modal */}
      <div
        className="w-screen h-screen fixed inset-0 z-[-1]"
        onClick={handleClose}
      />

      <div className="absolute top-[3%] right-[3%] z-20 max-md:top-[3vw] max-md:right-[3vw] max-sm:top-[4vw] max-sm:right-[4vw]">
         <div
          onClick={handleClose}
          className={` h-auto group  max-sm:w-[12vw] rounded-full   p-[2vw]  transition-all  ease-out max-sm:p-[6vw]  bg-primary cursor-pointer max-md:p-[4vw] `}
        >
          <div
            style={{
              transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
            }}
            className="rotate-45 group-hover:rotate-225 duration-700"
          >
            <span
              className={`w-[1.5vw] rounded-full h-[2px] bg-[#ffffff] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[5vw] max-sm:h-[1.5px] rotate-90 max-md:w-[3vw]`}
            ></span>

            <span
              className={`w-[1.5vw] rounded-full h-[2px] bg-[#ffffff] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[5vw] max-sm:h-[1.5px] max-md:w-[3vw]`}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalkthroughPopup;
