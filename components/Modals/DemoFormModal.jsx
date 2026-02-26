"use client";
import React, { useEffect, useRef } from "react";
import DemoForm from "../DemoForm";
import { useLenis } from "lenis/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useModal } from "../ModalProvider";

const DemoFormModal = () => {
  const lenis = useLenis();
  const { openDemoForm, setOpenDemoForm, payload, setPayload } = useModal();
  const clearPayloadTimeoutRef = useRef(null);

  // Animations + Lenis control
  useEffect(() => {
    if (!openDemoForm) {
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
  }, [openDemoForm, lenis]);

  // When modal closes => clear payload after 1s
  useEffect(() => {
    if (!openDemoForm) {
      // schedule clear
      clearTimeout(clearPayloadTimeoutRef.current);
      clearPayloadTimeoutRef.current = setTimeout(() => {
        setPayload(null);
      }, 400);
    }
    return () => {
      clearTimeout(clearPayloadTimeoutRef.current);
    };
  }, [openDemoForm, setPayload]);

  if (!openDemoForm) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-2xl bg-white rounded-lg p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setOpenDemoForm(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl z-10"
          aria-label="Close modal"
        >
          ×
        </button>
        <DemoForm />
      </div>
    </div>
  );
};

export default DemoFormModal;
