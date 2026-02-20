"use client";
import React, { useEffect, useRef } from "react";
import DemoForm from "./DemoForm";
import { useLenis } from "lenis/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useModal } from "./ModalProvider";

const PopupModal = ({ modalOpen, setModalOpen }) => {
  const lenis = useLenis();
  const { payload, setPayload } = useModal();
  const clearPayloadTimeoutRef = useRef(null);

  // Animations + Lenis control
  useEffect(() => {
    if (!modalOpen) {
      lenis?.start();
      return;
    }

    lenis?.stop();

    const formHead = document.querySelector(".formhead");
    const formPara = document.querySelector(".formpara");
    if (!formHead || !formPara) return;

    const headEl = new SplitText(formHead, { type: "lines", mask: "lines" });
    const paraEl = new SplitText(formPara, { type: "lines", mask: "lines" });

    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
    tl.from(headEl.lines, { yPercent: 100, stagger: 0.1, delay: 0.3 })
      .from(paraEl.lines, { yPercent: 100, stagger: 0.1 }, "-=0.7")
      .from(
        ".formfade",
        { yPercent: 30, opacity: 0, duration: 0.7, stagger: 0.1 },
        "-=1"
      );

    return () => tl.kill();
  }, [modalOpen, lenis]);

  // When modal closes => clear payload after 1s
  useEffect(() => {
    if (!modalOpen) {
      // schedule clear
      clearTimeout(clearPayloadTimeoutRef.current);
      clearPayloadTimeoutRef.current = setTimeout(() => {
        setPayload(null);
      }, 400);
    } else {
      // modal reopened -> cancel pending clear
      clearTimeout(clearPayloadTimeoutRef.current);
    }

    return () => clearTimeout(clearPayloadTimeoutRef.current);
  }, [modalOpen, setPayload]);

  const handleClose = () => {
    setModalOpen(false);
    // don't clear payload here; the effect above will handle it after 1s
  };

  return (
    <section
      id="popup"
      className={`w-full h-full fixed inset-0 z-[999] flex justify-center items-center backdrop-blur-lg duration-500 pt-[2%] bg-black/10 ${
        modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div data-lenis-prevent className="relative  w-[78%] h-[80%] overflow-y-auto pr-2 rounded-[2vw] border border-[#d4d4d4] bg-white/30 max-sm:rounded-[6vw] max-md:w-[90%]  max-md:h-[80%] max-sm:h-[80%] max-sm:px-[5vw] max-sm:py-[10%] p-[4vw] pt-[4vw] max-md:pt-[6vw] max-md:rounded-[4vw]">
      
      <div className="h-full max-sm:h-fit w-full overflow-y-auto! pr-2 flex justify-between max-md:flex-col max-sm:gap-[7vw] max-md:gap-[4vw]">
        <div className="w-[30%] h-full space-y-[1vw] max-md:w-full max-md:space-y-[2vw]">
          {payload ? (
            <h2 className="text-90 formhead">Download Pdf</h2>
          ) : (
            <h2 className="text-76 text-[#0A1B4B] formhead leading-[1.2]">Get a Full Demo</h2>
          )}
          <p className="text-[#333333] text-24 formpara max-md:pl-[1vw]">
            Fill out the form
          </p>
        </div>

        <div className="w-[60%] h-full max-md:w-full">
          {modalOpen ? <DemoForm /> : null}
        </div>
      </div>
      </div>
      <div className="formfade absolute top-[3%] right-[3%] max-md:top-[2.5%] max-sm:right-[4%] max-md:right-[2.5%] opacity-100">
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

      {/* Background click closes modal */}
      <div
        className="w-screen h-screen fixed inset-0 z-[-1]"
        onClick={handleClose}
      />
    </section>
  );
};

export default PopupModal;
