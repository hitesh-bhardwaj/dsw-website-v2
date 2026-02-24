"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Enterprise-grade by design",
        description: "We build for regulated environments, hybrid stacks, and real operational complexity.",
    },
    {
        title: "Governance is execution, not policy",
        description: "Governance must be enforceable logic - embedded in runtime.",
    },
    {
        title: "Ownership is non-negotiable",
        description: "Enterprises should have full custody of AI assets, artifacts, and IP.",
    },
    {
        title: "Build for scale, not demos",
        description: "If it can't survive production, it doesn't matter.",
    },
];

export default function WhatWeStandFor() {
    const sectionRef = useRef(null);

    // Desktop refs
    const svgLineRef = useRef(null);
    const dotRefs = useRef([]);
    dotRefs.current = [];
    const leftRefs = useRef([]);
    leftRefs.current = [];
    const rightRefs = useRef([]);
    rightRefs.current = [];

    // Mobile refs
    const mobileSvgLineRef = useRef(null);
    const mobileCircleRefs = useRef([]);
    mobileCircleRefs.current = [];
    const mobileTextRefs = useRef([]);
    mobileTextRefs.current = [];
    const mobileStepRefs = useRef([]);
    mobileStepRefs.current = [];

    const addToDotRefs = (el) => {
        if (el && !dotRefs.current.includes(el)) dotRefs.current.push(el);
    };
    const addToMobileCircleRefs = (el) => {
        if (el && !mobileCircleRefs.current.includes(el)) mobileCircleRefs.current.push(el);
    };
    const addToMobileTextRefs = (el) => {
        if (el && !mobileTextRefs.current.includes(el)) mobileTextRefs.current.push(el);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── DESKTOP ANIMATION ──────────────────────────────────────────
            const line = svgLineRef.current;
            if (line) {
                const lineLength = line.getTotalLength?.() || 600;

                gsap.set(line, {
                    strokeDasharray: lineLength,
                    strokeDashoffset: lineLength,
                });

                const masterTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "10% 65%",
                        end: "80% 65%",
                        scrub: 0.4,
                    },
                });

                masterTL.to(line, {
                    strokeDashoffset: 0,
                    ease: "none",
                    duration: 1,
                });

                dotRefs.current.forEach((dot, index) => {
                    if (!dot) return;
                    const progress = index / (steps.length - 1);
                    masterTL.to(
                        dot,
                        { fill: "#0205FA", stroke: "#0205FA", duration: 0.05 },
                        progress * 1
                    );
                });

                leftRefs.current.forEach((el) => {
                    if (!el) return;
                    gsap.fromTo(
                        el,
                        { opacity: 0.25, x: -12 },
                        {
                            opacity: 1,
                            x: 0,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 70%",
                                end: "top 48%",
                                scrub: 1,
                            },
                        }
                    );
                });

                rightRefs.current.forEach((el) => {
                    if (!el) return;
                    gsap.fromTo(
                        el,
                        { opacity: 0.25, x: 12 },
                        {
                            opacity: 1,
                            x: 0,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 70%",
                                end: "top 48%",
                                scrub: 1,
                            },
                        }
                    );
                });
            }

            // ── MOBILE ANIMATION ───────────────────────────────────────────
            const mobileLine = mobileSvgLineRef.current;
            if (mobileLine) {
                const mobileLineLength = mobileLine.getTotalLength?.() || 800;

                gsap.set(mobileLine, {
                    strokeDasharray: mobileLineLength,
                    strokeDashoffset: mobileLineLength,
                });

                const mobileMasterTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "10% 65%",
                        end: "85% 65%",
                        scrub: 0.4,
                    },
                });

                mobileMasterTL.to(mobileLine, {
                    strokeDashoffset: 0,
                    ease: "none",
                    duration: 1,
                });

                // Animate circles and their number text to blue
                mobileCircleRefs.current.forEach((circle, index) => {
                    if (!circle) return;
                    const progress = index / (steps.length - 1);
                    mobileMasterTL.to(
                        circle,
                        { stroke: "#0205FA", duration: 0.05 },
                        progress * 1
                    );
                });
                mobileTextRefs.current.forEach((text, index) => {
                    if (!text) return;
                    const progress = index / (steps.length - 1);
                    mobileMasterTL.to(
                        text,
                        { fill: "#0205FA", duration: 0.05 },
                        progress * 1
                    );
                });

                // Mobile step content fade-in
                mobileStepRefs.current.forEach((el) => {
                    if (!el) return;
                    gsap.fromTo(
                        el,
                        { opacity: 0.25, x: 10 },
                        {
                            opacity: 1,
                            x: 0,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 72%",
                                end: "top 50%",
                                scrub: 1,
                            },
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── Desktop constants
    const ROW_HEIGHT = 160;
    const TOP_PADDING = 20;
    const svgHeight = TOP_PADDING + (steps.length - 1) * ROW_HEIGHT + TOP_PADDING;

    // ── Mobile constants
    const MOBILE_ROW_HEIGHT = 190;
    const MOBILE_TOP_PAD = 30;
    const CIRCLE_R = 28; // radius of numbered circle
    const CX = CIRCLE_R + 2; // circle center x within SVG
    const mobileSvgWidth = CX + CIRCLE_R + 4;
    const mobileSvgHeight = MOBILE_TOP_PAD + (steps.length - 1) * MOBILE_ROW_HEIGHT + MOBILE_TOP_PAD;

    return (
        <section
            ref={sectionRef}
            className="relative w-full space-y-[7vw]  px-[5vw] max-sm:px-[6vw] max-sm:py-[20%]"
        >
            {/* Heading */}
            <div className="text-center max-sm:text-left max-sm:mb-[10vw]">
                <h2 className="text-76 max-sm:text-center max-sm:text-[9vw] text-[#0A1B4B]">
                    What we stand for
                </h2>
            </div>

            {/* ── DESKTOP LAYOUT (sm and above) ─────────────────────────────── */}
            <div className="hidden sm:block relative max-w-[80%] mx-auto">
                {/* SVG Line — absolutely centered */}
                <div
                    className="absolute left-[60%] -translate-x-1/2 top-0 pointer-events-none"
                    style={{ height: `${svgHeight}px`, width: "20px" }}
                >
                    <svg
                        width="20"
                        height={svgHeight}
                        className="overflow-visible"
                        style={{ display: "block" }}
                    >
                        <line
                            x1="10"
                            y1={TOP_PADDING}
                            x2="10"
                            y2={svgHeight - TOP_PADDING}
                            stroke="#D1D5DB"
                            strokeWidth="1.5"
                        />
                        <line
                            ref={svgLineRef}
                            x1="10"
                            y1={TOP_PADDING}
                            x2="10"
                            y2={svgHeight - TOP_PADDING}
                            stroke="#0205FA"
                            strokeWidth="1.5"
                        />
                        {steps.map((_, index) => {
                            const cy = TOP_PADDING + index * ROW_HEIGHT;
                            return (
                                <circle
                                    key={index}
                                    ref={addToDotRefs}
                                    cx="10"
                                    cy={cy}
                                    r="5"
                                    fill="#D1D5DB"
                                    stroke="#D1D5DB"
                                    strokeWidth="1.5"
                                />
                            );
                        })}
                    </svg>
                </div>

                {/* Step rows */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: `repeat(${steps.length}, ${ROW_HEIGHT}px)`,
                    }}
                >
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="grid"
                            style={{
                                gridTemplateColumns: "1fr 40px 1fr",
                                alignItems: "start",
                            }}
                        >
                            {/* Left: Title */}
                            <div
                                ref={(el) => (leftRefs.current[index] = el)}
                                className="pr-[8vw] flex items-start justify-start pt-1 w-[84%]"
                            >
                                <h3 className="text-32 text-[#0A1B4B] font-heading ">
                                    {step.title}
                                </h3>
                            </div>

                            <div />

                            {/* Right: Description */}
                            <div
                                ref={(el) => (rightRefs.current[index] = el)}
                                className="pl-[3vw] ml-[6vw] flex items-start pt-1 w-[85%]"
                            >
                                <p className="text-24 text-[#333333]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MOBILE LAYOUT (below sm) ───────────────────────────────────── */}
            <div className="block sm:hidden relative w-full">
                <div className="relative" style={{ height: `${mobileSvgHeight}px` }}>

                    {/* SVG: vertical line + numbered circles, pinned to left */}
                    <div
                        className="absolute top-0 left-0 pointer-events-none"
                        style={{ width: `${mobileSvgWidth}px`, height: `${mobileSvgHeight}px` }}
                    >
                        <svg
                            width={mobileSvgWidth}
                            height={mobileSvgHeight}
                            className="overflow-visible"
                            style={{ display: "block" }}
                        >
                            {/* Grey track */}
                            <line
                                x1={CX}
                                y1={MOBILE_TOP_PAD}
                                x2={CX}
                                y2={mobileSvgHeight - MOBILE_TOP_PAD}
                                stroke="#D1D5DB"
                                strokeWidth="1.5"
                            />
                            {/* Animated blue line */}
                            <line
                                ref={mobileSvgLineRef}
                                x1={CX}
                                y1={MOBILE_TOP_PAD}
                                x2={CX}
                                y2={mobileSvgHeight - MOBILE_TOP_PAD}
                                stroke="#0205FA"
                                strokeWidth="1.5"
                            />
                            {/* Numbered circles */}
                            {steps.map((_, index) => {
                                const cy = MOBILE_TOP_PAD + index * MOBILE_ROW_HEIGHT;
                                const label = String(index + 1).padStart(2, "0");
                                return (
                                    <g key={index}>
                                        {/* White background to mask the line behind circle */}
                                        <circle
                                            cx={CX}
                                            cy={cy}
                                            r={CIRCLE_R}
                                            fill="white"
                                        />
                                        {/* Outlined circle (stroke animates to blue) */}
                                        <circle
                                            ref={addToMobileCircleRefs}
                                            cx={CX}
                                            cy={cy}
                                            r={CIRCLE_R}
                                            fill="none"
                                            stroke="#D1D5DB"
                                            strokeWidth="1.5"
                                        />
                                        {/* Number label (fill animates to blue) */}
                                        <text
                                            ref={addToMobileTextRefs}
                                            x={CX}
                                            y={cy}
                                            dominantBaseline="central"
                                            textAnchor="middle"
                                            fontSize="13"
                                            fontWeight="400"
                                            fill="#D1D5DB"
                                            style={{ fontFamily: "inherit" }}
                                        >
                                            {label}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Step content — absolutely positioned to the right of the circles */}
                    {steps.map((step, index) => {
                        // vertically center content block with the circle
                        const circleTop = MOBILE_TOP_PAD + index * MOBILE_ROW_HEIGHT;
                        return (
                            <div
                                key={index}
                                ref={(el) => (mobileStepRefs.current[index] = el)}
                                className="absolute text-20 "
                                style={{
                                    top: `${circleTop - CIRCLE_R}px`,
                                    left: `${mobileSvgWidth + 16}px`,
                                    right: "0px",
                                }}
                            >
                                <h3 className="text-[4.8vw]  text-[#0A1B4B]  mb-[2vw] font-medium">
                                    {step.title}
                                </h3>
                                <p className="text-[4.4vw] leading-[1.4] text-[#333333] ">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}