"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import HeadingAnim from "../Animations/HeadingAnim";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";
import { LinkedIn } from "../Svg/Icons";

/**
 * Custom Swiper-like horizontal drag slider (NO Smoothy, NO Swiper)
 * - Drag only when pointer is down (no "hover drift")
 * - Momentum/inertia on release
 * - Buttons go prev/next by slide offsets
 * - Progress 0..1 for your existing scrollbar thumb logic
 * - Keeps your existing classes/structure essentially unchanged
 */

export default function Team({ heading, cardsData, teamId = "team" }) {
  const viewportRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  // ---- Drag state refs (no re-renders) ----
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const velocityRef = useRef(0);
  const rafMomentumRef = useRef(null);

  const DEADZONE = 6; // px
  const draggingRef = useRef(false);

  // ---- Slide offsets for prev/next + active index ----
  const slideOffsetsRef = useRef([]); // left offsets within scroll container

  const measureSlides = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slides = Array.from(viewport.querySelectorAll(`[data-slide="team-${teamId}"]`));
    const offsets = slides.map((el) => el.offsetLeft);
    slideOffsetsRef.current = offsets;
  }, [teamId]);

  useEffect(() => {
    measureSlides();
    window.addEventListener("resize", measureSlides, { passive: true });
    return () => window.removeEventListener("resize", measureSlides);
  }, [measureSlides, cardsData.length]);

  // ---- Progress + active index derived from scroll position ----
  const updateDerived = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScroll = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    const p = maxScroll === 0 ? 0 : viewport.scrollLeft / maxScroll;

    setProgress(p);

    const offsets = slideOffsetsRef.current;
    if (!offsets.length) {
      setActiveIndex(0);
      setIsEnd(p >= 0.999);
      return;
    }

    // active index = nearest slide offset to current scrollLeft
    const x = viewport.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < offsets.length; i++) {
      const d = Math.abs(offsets[i] - x);
      if (d < best) {
        best = d;
        nearest = i;
      }
    }

    setActiveIndex(nearest);
    setIsEnd(p >= 0.999 || nearest >= offsets.length - 1);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => updateDerived();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    // initial
    updateDerived();

    return () => viewport.removeEventListener("scroll", onScroll);
  }, [updateDerived]);

  // ---- Progress bar thumb positioning (UNCHANGED) ----
  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const updatePosition = () => {
      const containerWidth = track.clientWidth || 0;
      const thumbWidth = thumb.clientWidth || 0;
      const max = Math.max(containerWidth - thumbWidth, 0);
      const px = Math.round(progress * max);
      thumb.style.transform = `translateX(${px}px)`;
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [progress]);

  // ---- Momentum/inertia ----
  const stopMomentum = useCallback(() => {
    if (rafMomentumRef.current) cancelAnimationFrame(rafMomentumRef.current);
    rafMomentumRef.current = null;
  }, []);

  const startMomentum = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    stopMomentum();

    const friction = 0.92; // 0.88..0.95
    const minV = 0.05; // stop threshold (px/ms scaled)
    const maxScroll = () => Math.max(viewport.scrollWidth - viewport.clientWidth, 0);

    const step = () => {
      // velocityRef is px/ms; convert to px/frame (~16ms)
      const v = velocityRef.current;
      const dx = v * 16;

      if (Math.abs(v) < minV) {
        velocityRef.current = 0;
        rafMomentumRef.current = null;
        return;
      }

      const next = viewport.scrollLeft - dx;
      viewport.scrollLeft = Math.max(0, Math.min(maxScroll(), next));

      velocityRef.current *= friction;

      rafMomentumRef.current = requestAnimationFrame(step);
    };

    rafMomentumRef.current = requestAnimationFrame(step);
  }, [stopMomentum]);

  // ---- Pointer handlers (Swiper-like: only drag when pressed) ----
  const onPointerDown = (e) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // left mouse only
    if (e.pointerType === "mouse" && e.button !== 0) return;

    stopMomentum();

    isDownRef.current = true;
    draggingRef.current = false;

    startXRef.current = e.clientX;
    startScrollLeftRef.current = viewport.scrollLeft;

    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    velocityRef.current = 0;

    viewport.setPointerCapture?.(e.pointerId);

    // make drag feel right
    document.body.classList.add("dragging-no-select");
  };

  const onPointerMove = (e) => {
    const viewport = viewportRef.current;
    if (!viewport || !isDownRef.current) return;

    const dxFromStart = e.clientX - startXRef.current;
    const abs = Math.abs(dxFromStart);

    // deadzone to avoid click nudges
    if (!draggingRef.current && abs > DEADZONE) {
      draggingRef.current = true;
    }

    // only prevent default once we're actually dragging
    if (draggingRef.current) {
      e.preventDefault();

      // drag: move scrollLeft opposite to pointer movement (like Swiper)
      viewport.scrollLeft = startScrollLeftRef.current - dxFromStart;

      // velocity update
      const now = performance.now();
      const dt = Math.max(now - lastTRef.current, 1);
      const dx = e.clientX - lastXRef.current;

      // px/ms (negative means moving right -> content goes left)
      velocityRef.current = dx / dt;

      lastXRef.current = e.clientX;
      lastTRef.current = now;
    }
  };

  const onPointerUp = (e) => {
    const viewport = viewportRef.current;
    if (!viewport || !isDownRef.current) return;

    isDownRef.current = false;

    try {
      viewport.releasePointerCapture?.(e.pointerId);
    } catch (_) {}

    document.body.classList.remove("dragging-no-select");

    // if we dragged, apply momentum
    if (draggingRef.current) {
      // invert velocity because we set scrollLeft = start - dx
      // pointer moving right (dx positive) means scrollLeft decreases
      // our velocity is pointer-based; convert to scroll direction by inverting
      velocityRef.current = -velocityRef.current;
      startMomentum();
    }

    draggingRef.current = false;
  };

  // ---- Helpers: go to nearest slide index ----
  const scrollToIndex = useCallback(
    (idx) => {
      const viewport = viewportRef.current;
      const offsets = slideOffsetsRef.current;
      if (!viewport || !offsets.length) return;

      const maxIndex = offsets.length - 1;
      const clamped = Math.min(Math.max(idx, 0), maxIndex);
      const left = offsets[clamped];

      stopMomentum();
      viewport.scrollTo({ left, behavior: "smooth" });
    },
    [stopMomentum]
  );

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  // ---- Spacer: mimic Swiper's "spaceBetween:30" without changing your card DOM ----
  // We'll set gap on the inner track.
  const gapStyle = useMemo(() => ({ columnGap: "30px" }), []);

  return (
    <section className="relative w-full h-fit space-y-[6vw] max-md:h-full flex flex-col pb-0 max-sm:pb-[28vw] max-md:pb-[20vw] max-md:space-y-0 max-sm:space-y-[7vw]">
      <div className="w-full flex h-full max-sm:px-[5vw] gap-[1vw] items-end justify-between max-sm:flex-col max-sm:items-start">
        <HeadingAnim>
          <h2 className="text-56 text-[#0A1B4B] w-[45%] max-md:w-full">{heading}</h2>
        </HeadingAnim>

        {/* Buttons — UNCHANGED */}
        <div className="flex fadeup gap-6 mt-12 max-sm:mt-0 max-md:mt-[10vw] max-md:items-center max-md:justify-center max-md:absolute max-md:bottom-[4vw] max-md:right-0 max-sm:right-[5%]">
          <PreviousButton onClick={handlePrev} isDisabled={activeIndex === 0} />
          <NextButton onClick={handleNext} isDisabled={isEnd} />
        </div>
      </div>

      {/* Slider */}
      <div className="">
        {/* Swiper replacement: scroll container with pointer-drag */}
        <div
          ref={viewportRef}
          className="overflow-visible! max-md:pt-[5vw]! pl-[27%]!  max-md:pl-[5vw]! max-md:w-auto max-sm:mb-[2%] max-md:pr-[10%]!"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            // Scroll mechanics
            overflowX: "auto",
            overflowY: "visible",
            WebkitOverflowScrolling: "touch",
            // Important: avoid the browser interpreting horizontal drags as back/forward on touchpads
            touchAction: "pan-y",
            // Hide scrollbar (optional; keep your custom bar)
            scrollbarWidth: "none",
          }}
        >
          <div
            className="flex items-start"
            style={{
              ...gapStyle,
              // keep it "grab"
              cursor: isDownRef.current ? "grabbing" : "grab",
            }}
          >
            {cardsData.map((card, index) => (
              <div
                key={index}
                data-slide={`team-${teamId}`}
                className={`!w-[20vw] fadeup max-md:!w-[50vw] max-sm:!w-[80vw] experts-cards-${teamId} flex-shrink-0`}
              >
                <Link href={card.link} target="_blank" className="w-full flex-shrink-0">
                  <div className="relative rounded-[1.5vw] max-sm:w-full max-sm:mx-auto overflow-hidden w-[95%] h-[22vw] max-md:mx-auto max-sm:h-[40vh] max-md:h-[38vh] max-md:w-auto max-sm:rounded-3xl! max-md:rounded-[4vw] border border-dashed border-primary-blue p-3">
                    <Image
                      src={card.src}
                      width={1000}
                      height={1000}
                      className="h-full w-full object-cover rounded-[1.5vw] max-sm:rounded-2xl! max-md:rounded-[4vw]"
                      alt={card.name}
                    />
                    <div className="absolute right-[4%] top-[4%] z-[5] rounded-full flex items-center justify-center bg-[#F16B0D] text-white h-[2.5vw] w-[2.5vw] p-1.5 max-sm:h-[10vw] max-sm:w-[10vw] max-md:size-[6vw]">
                      <LinkedIn />
                    </div>
                  </div>

                  <div className="space-y-[.5vw] w-full mt-[1vw] max-md:mt-[5vw] max-sm:pl-[2vw] max-sm:space-y-[2.5vw] max-sm:mt-[5vw] max-md:pl-[1vw] text-center">
                    <p className="text-32 font-medium max-sm:text-[5.5vw]">{card.name}</p>
                    <p className="w-[75%] text-24 mx-auto">{card.role}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Progress Bar — UNCHANGED */}
        <div className="w-full mt-[5vw] max-sm:mt-[10vw] flex justify-end">
          <div
            ref={trackRef}
            className="w-[75%] max-md:w-[90%] max-sm:mx-auto h-[5px] bg-gray-300 rounded-full relative overflow-hidden"
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 h-full w-[20%] max-md:w-[20%] bg-primary-blue rounded-full"
              style={{
                transform: "translateX(0px)",
                transition: "transform 350ms linear",
              }}
            />
          </div>
        </div>

        <div className="w-full flex justify-end ">
          <div className={`workshop-scrollbar-${teamId}  w-[75%] cursor-grab max-md:w-full max-md:hidden`} />
        </div>
      </div>
    </section>
  );
}