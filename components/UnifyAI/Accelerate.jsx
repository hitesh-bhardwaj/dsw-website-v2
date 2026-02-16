"use client";

import Copy from "@/components/Animations/Copy";
import HeadingAnim from "@/components/Animations/HeadingAnim";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Accelerate() {
    const sectionRef = useRef(null);
    const lineRefs = useRef([]);
    lineRefs.current = [];
    const dotRefs = useRef([]);
    dotRefs.current = [];
    const stepsRef = useRef([]);

    const addToLineRefs = (el) => {
        if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
    };

    const addToDotRefs = (el) => {
        if (el && !dotRefs.current.includes(el)) dotRefs.current.push(el);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create a master timeline
            const masterTL = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "10% 70%",
                    end: "90% 70%",
                    scrub: 0.4,
                    // markers: true
                },
            });

            // Animate each line segment and its corresponding dot
            lineRefs.current.forEach((line, index) => {
                if (!line) return;

                const lineLength = line.getTotalLength?.() || 150;
                const correspondingDot = dotRefs.current[index];
                
                gsap.set(line, {
                    strokeDasharray: lineLength,
                    strokeDashoffset: lineLength,
                });

                if (index === 0) {
                    // First line: fill dot at beginning
                    masterTL.to(correspondingDot, {
                        fill: "#0205FA",
                        duration: 0.1,
                    });
                }

                // Animate line fill
                masterTL.to(line, {
                    strokeDashoffset: 0,
                    ease: "none",
                });

                // Animate dot moving down the line
                if (correspondingDot) {
                    masterTL.fromTo(correspondingDot, {
                        attr: { cy: 0 }
                    }, {
                        attr: { cy: lineLength },
                        ease: "none",
                    }, "<");

                    if (index > 0) {
                        masterTL.to(correspondingDot, {
                            fill: "#0205FA",
                            duration: 0.1,
                        }, "<0.1");
                    }
                }
            });

            // Animate content
            stepsRef.current.forEach((step, index) => {
                if (!step) return;

                const content = step.querySelector(".step-content");

                gsap.fromTo(
                    content,
                    {
                        opacity: 0.3,
                    }, 
                    {
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: step,
                            start: "top 65%",
                            end: "top 45%",
                            scrub: 1,
                            // markers: true
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        {
            title: "Connect",
            description: "Integrate data pipelines, APIs, and enterprise systems",
        },
        {
            title: "Configure",
            description: "Build or select from pre-designed model / agent blueprints",
        },
        {
            title: "Deploy",
            description: "Launch with production-grade infrastructure, fast",
        },
        {
            title: "Govern",
            description: "Monitor usage, ensure compliance, and scale on demand",
        },
    ];

    const lineHeight = 150; 

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-[7%] space-y-[4vw] max-sm:space-y-[10vw] max-sm:px-[7vw] px-[5vw]"
        >
            <div className="text-center max-sm:space-y-[7vw]">
                <HeadingAnim>
                    <h2 className="text-56 text-[#0A1B4B] max-sm:text-[8.5vw]">
                        Accelerate AI/ML Into Production with Enterprise Confidence
                    </h2>
                </HeadingAnim>
            </div>

            {/* Animated Steps with SVG Lines */}
            <div className="relative w-full mx-auto">
                 <p className="text-30 max-sm:text-[4vw] max-sm:w-[90%] max-sm:mx-auto  mb-8  text-center text-[#333333]">
                        The runtime gives you a complete, ready-to-run path to enterprise AI/ML.
                    </p>
                {/* Top connecting line from paragraph */}
                <div className="flex justify-center mb-8">
                    <svg width="20" height={lineHeight} className="overflow-visible">
                        <line
                            x1="10"
                            y1="0"
                            x2="10"
                            y2={lineHeight}
                            stroke="#D1D5DB"
                            strokeWidth="1"
                        />
                        <line
                            x1="10"
                            y1="0"
                            x2="10"
                            y2={lineHeight}
                            stroke="#0205FA"
                            strokeWidth="1"
                            ref={addToLineRefs}
                        />
                        {/* Dot that moves along the line */}
                        <circle
                            cx="10"
                            cy="0"
                            r="6"
                            fill="#f8f8f8"
                            stroke="#0205FA"
                            strokeWidth="1"
                            ref={addToDotRefs}
                        />
                    </svg>
                </div>

                {steps.map((step, index) => (
                    <div key={index}>
                        {/* Content */}
                        <div
                            ref={(el) => (stepsRef.current[index] = el)}
                            className="text-center mb-5"
                        >
                            <div className="step-content space-y-[1vw]">
                                <h3 className="text-32 text-[#0A1B4B] font-heading max-sm:text-[6vw]">
                                    {step.title}
                                </h3>
                                <p className="text-24 max-sm:w-[90%] max-sm:mx-auto max-sm:opacity-80 text-[#333333]">
                                    {step.description}
                                </p>
                            </div>
                        </div>

                        {/* Connecting line to next step (not after last step) */}
                        {index < steps.length - 1 && (
                            <div className="flex justify-center mb-8">
                                <svg width="20" height={lineHeight} className="overflow-visible">
                                    <line
                                        x1="10"
                                        y1="0"
                                        x2="10"
                                        y2={lineHeight}
                                        stroke="#D1D5DB"
                                        strokeWidth="1"
                                    />
                                    <line
                                        x1="10"
                                        y1="0"
                                        x2="10"
                                        y2={lineHeight}
                                        stroke="#0205FA"
                                        strokeWidth="1"
                                        ref={addToLineRefs}
                                    />
                                    {/* Dot that moves along the line */}
                                    <circle
                                        cx="10"
                                        cy="0"
                                        r="6"
                                        fill="#f8f8f8"
                                        stroke="#0205FA"
                                        strokeWidth="1"
                                        ref={addToDotRefs}
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}