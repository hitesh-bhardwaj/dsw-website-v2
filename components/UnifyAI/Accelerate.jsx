"use client";

import Copy from "@/components/Animations/Copy";
import HeadingAnim from "@/components/Animations/HeadingAnim";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Accelerate() {
    const sectionRef = useRef(null);
    const lineFillRef = useRef(null);
    const stepsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the vertical line fill from top to bottom
            gsap.fromTo(
                lineFillRef.current,
                {
                    height: "0%",
                },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                }
            );

            // Animate each step
            stepsRef.current.forEach((step, index) => {
                if (!step) return;

                const dotFill = step.querySelector(".step-dot-fill");
                const content = step.querySelector(".step-content");

                // Dot fill animation - starts empty, fills on scroll
                gsap.fromTo(
                    dotFill,
                    {
                        scale: 0,
                    },
                    {
                        scale: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: step,
                            start: "top 60%",
                            end: "top 40%",
                            scrub: 1,
                        },
                    }
                );

                // Content fade and slide in
                gsap.fromTo(
                    content,
                    {
                        opacity: 0.3,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: step,
                            start: "top 60%",
                            end: "top 40%",
                            scrub: 1,
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

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-[7%] space-y-[8vw] max-sm:px-[7vw] px-[5vw]"
        >
            {/* Heading */}
            <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
                <HeadingAnim>
                    <h2 className="text-76 text-[#0A1B4B]">
                        Accelerate AI/ML Into Production with Enterprise Confidence
                    </h2>
                </HeadingAnim>
                <Copy>
                    <p className="text-30 w-[70%] mx-auto max-sm:w-full">
                        The runtime gives you a complete, ready-to-run path to enterprise AI/ML.
                    </p>
                </Copy>
            </div>

            {/* Animated Steps */}
            <div className="relative max-w-2xl mx-auto py-16">
                {/* Vertical Line - Background (gray) and Fill (blue) */}
                <div className="absolute left-1/2 top-0 w-[3px] h-full -translate-x-1/2 bg-gray-300 rounded-full overflow-hidden">
                    {/* Blue Fill */}
                    <div
                        ref={lineFillRef}
                        className="absolute top-0 left-0 w-full bg-[#0A1B4B]"
                        style={{ height: "0%" }}
                    />
                </div>

                {/* Steps */}
                <div className="space-y-48 max-sm:space-y-32">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            ref={(el) => (stepsRef.current[index] = el)}
                            className="relative"
                        >
                            {/* Dot Container - Positioned on the line */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
                                {/* Outer Ring (always visible - empty dot) */}
                                <div className="w-5 h-5 rounded-full border-[3px] border-[#0A1B4B] bg-white shadow-md">
                                    {/* Inner Fill (animates on scroll) */}
                                    <div className="step-dot-fill absolute inset-0 m-[3px] rounded-full bg-[#0A1B4B]" />
                                </div>
                            </div>

                            {/* Content - Positioned to not overlap with line */}
                            <div className="step-content text-center max-w-lg mx-auto pt-8">
                                <h3 className="text-4xl font-bold text-[#0A1B4B] mb-3 max-sm:text-3xl">
                                    {step.title}
                                </h3>
                                <p className="text-xl text-gray-600 max-sm:text-lg">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}