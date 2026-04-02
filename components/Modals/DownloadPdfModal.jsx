"use client";

import { SplitText, gsap } from "@/lib/gsapCore";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "lenis/react";
import { useModal } from "../ModalProvider";

const DownloadPdfForm = dynamic(() => import("./DownloadPdfForm"), {
  ssr: false,
});

const DownloadPdfModal = () => {
  const lenis = useLenis();
  const { openPdfModal, setOpenPdfModal, setPayload } = useModal();
  const clearPayloadTimeoutRef = useRef(null);

  useEffect(() => {
    if (!openPdfModal) {
      lenis?.start();
      return;
    }

    lenis?.stop();

    const head = document.querySelector(".pdf-formhead");
    const para = document.querySelector(".pdf-formpara");

    if (!head || !para) return;

    const headSplit = new SplitText(head, { type: "lines", mask: "lines" });
    const paraSplit = new SplitText(para, { type: "lines", mask: "lines" });

    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

    tl.from(headSplit.lines, { yPercent: 100, stagger: 0.1, delay: 0.3 })
      .from(paraSplit.lines, { yPercent: 100, stagger: 0.1 }, "-=0.7")
      .from(
        ".pdf-formfade",
        { yPercent: 30, opacity: 0, duration: 0.7, stagger: 0.1 },
        "-=1",
      );

    return () => tl.kill();
  }, [openPdfModal, lenis]);

  useEffect(() => {
    if (!openPdfModal) {
      clearTimeout(clearPayloadTimeoutRef.current);
      clearPayloadTimeoutRef.current = setTimeout(() => {
        setPayload(null);
      }, 400);
    } else {
      clearTimeout(clearPayloadTimeoutRef.current);
    }

    return () => clearTimeout(clearPayloadTimeoutRef.current);
  }, [openPdfModal, setPayload]);

  const handleClose = () => {
    setOpenPdfModal(false);
  };

  return (
    <section
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-lg duration-500 ${
        openPdfModal ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Modal Card */}
      <div
        data-lenis-prevent
        className="relative w-[78%] h-[78vh] max-h-[90vh] overflow-y-auto rounded-[2vw] border border-[#d4d4d4] bg-white/30 p-[4vw] max-md:w-[92%] max-md:h-[78%] max-md:rounded-[4vw] max-md:p-[5vw] max-sm:h-[75%] max-sm:rounded-[6vw] max-sm:px-[5vw] max-sm:py-[10%]"
      >
        {/* Close Button */}

        <div className="h-full max-sm:h-fit w-full  flex justify-between max-md:flex-col max-sm:gap-[7vw] max-md:gap-[4vw]">
          <div className="w-[30%] h-full space-y-[1vw] max-md:w-full max-md:space-y-[2vw]">
            <h2 className="pdf-formhead text-76 leading-[1.2] text-[#0A1B4B]">
              Download PDF
            </h2>
            <p className="pdf-formpara text-24 text-[#333]">
              Fill out the form
            </p>
          </div>

          <div className="w-[55%] max-md:w-full">
            {openPdfModal ? <DownloadPdfForm /> : null}
          </div>
        </div>
      </div>

      <div className="pdf-formfade absolute right-[3%] top-[3%] z-[20] max-md:right-[2.5%] max-md:top-[2.5%] max-sm:right-[4%]">
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
      {/* Backdrop */}
      <div className="fixed inset-0 z-[-1]" onClick={handleClose} />
    </section>
  );
};

export default DownloadPdfModal;
