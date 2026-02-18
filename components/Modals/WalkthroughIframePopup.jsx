"use client";
import React, { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { useModal } from "../ModalProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Define iframe URLs for different walkthrough targets
const IFRAME_URLS = {
  unify: "https://app.supademo.com/embed/cmaeh5l9l08ykpn0ltzfnrw6h?embed_v=2",
  agentic: "https://app.supademo.com/embed/cmaeh5l9l08ykpn0ltzfnrw6h?embed_v=2",
};

const WalkthroughIframePopup = () => {
  const lenis = useLenis();
  const { openWalkthroughIframe: isOpen, setOpenWalkthroughIframe: setIsOpen, walkthroughTarget } = useModal();
  const menuRef = useRef(null);

  // Get iframe URL based on target
  const iframeUrl = IFRAME_URLS[walkthroughTarget] || IFRAME_URLS.unify;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // GSAP animation for modal
  useGSAP(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <section
      id="walkthrough-iframe-popup"
      className="w-full h-full fixed inset-0 z-[999] flex justify-center items-center backdrop-blur-lg duration-500 pt-[2%] bg-black/30"
    >
      <div
        data-lenis-prevent
        ref={menuRef}
        className="relative w-[90%] h-[90%] overflow-hidden rounded-[2vw] border border-white/20 bg-black/90 max-sm:rounded-[6vw] max-md:w-[95%] max-md:h-[85%] max-md:rounded-[4vw]"
      >
        {/* Close Button */}
        <div className="absolute top-[1.5%] right-[1.5%] z-10 max-md:top-[1%] max-sm:right-[3%] max-md:right-[2%]">
          <div
            onClick={handleClose}
            className="h-auto group max-sm:w-[12vw] rounded-full p-[1.5vw] transition-all ease-out max-sm:p-[4vw] bg-gradient-to-br from-[#F16B0D] to-[#E61216] cursor-pointer max-md:p-[3vw]"
          >
            <div
              style={{
                transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
              }}
              className="rotate-45 group-hover:rotate-[225deg] duration-700"
            >
              <span className="w-[1.2vw] rounded-full h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[4vw] max-sm:h-[1.5px] rotate-90 max-md:w-[2.5vw]" />
              <span className="w-[1.2vw] rounded-full h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[4vw] max-sm:h-[1.5px] max-md:w-[2.5vw]" />
            </div>
          </div>
        </div>

        {/* Iframe */}
        <iframe
          src={iframeUrl}
          loading="lazy"
          title="Interactive Demo"
          allow="clipboard-write"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Background click closes modal */}
      <div
        className="w-screen h-screen fixed inset-0 z-[-1]"
        onClick={handleClose}
      />
    </section>
  );
};

export default WalkthroughIframePopup;
