"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
gsap.registerPlugin(ScrollTrigger);


const POINTS = [
    {
        id: "01",
        text: "Consulting and aligning on open-source adoption strategies for global banks.",
        width: "w-full",
    },
    {
        id: "02",
        text: "Co-deploying, managing, and maintaining open-source stacks for Finacle implementations across regions.",
        width: "w-full",
    },
    {
        id: "03",
        text: "Running continuous workshops, enablement sessions, and certifications for Finacle and bank technology teams.",
        width: "w-full",
    },
    {
        id: "04",
        text: "Researching open-source evolution to embed the latest, stable, and most efficient frameworks into Finacle’s roadmap.",
        width: "w-full",
    },
    {
        id: "05",
        text: "Acting as an extended open-source competency arm for Finacle, amplifying its value proposition for global banking clients.",
        width: "w-full",
    },
];

export default function Outcomes() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth <= 768);

            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        gsap.set(".about-item", {
            scale: 0.7,
            transformOrigin: "center",
            y: 60,
            x: 25,
            opacity: 0.45,
        });

        document.querySelectorAll(".about-item").forEach((item, index) => {
            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: isMobile ? "20% 180%" : "10% bottom",
                    end: "bottom 40%",
                    scrub: true,
                    // markers:true,
                },
            });

            masterTl.to(
                item,
                {
                    scale: 1,
                    y: 0,
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                },
                "<-.8"
            );
        });
    }, []);


    return (
        <section className="w-screen h-full px-[5vw] py-[7%] max-sm:py-[15%] max-sm:px-[7vw]" id="finacle-outcomes">
            <div className="w-full flex flex-col items-center justify-center gap-y-[5vw] max-sm:gap-y-[15vw]">
                <div className="w-[70%] text-center max-sm:w-full">
                <HeadingAnim>
                    <h2 className="text-76  text-[#0A1B4B] ">
                        Delivering Finacle Success Through Open-Source Expertise
                    </h2>
                </HeadingAnim>
                </div>
                <Copy>
                    <p className="w-[60%] max-md:w-[95%] text-center text-30 text-[#111111]">
                        As a strategic open-source consulting partner to Infosys Finacle, DSW helps
                        global banks modernize, optimize, and scale Finacle deployments through
                        enterprise-grade open-source adoption.
                    </p>
                </Copy>

                <div className="w-[63%] flex flex-col gap-[3vw] max-md:w-full max-md:gap-[7vw] max-sm:gap-[10vw]">
                    {POINTS.map(({ id, text, width }) => (
                        <div
                            key={id}
                            className="w-full flex gap-[3.2vw] items-center about-item"
                        >
                            <div className="w-[15%] relative max-md:w-[30%]">
                                <div className="relative  w-[5vw] h-[5vw] border border-primary-blue rounded-full flex items-center justify-center max-sm:w-[18vw] max-sm:h-[18vw] max-md:w-[15vw] max-md:h-[15vw]">
                                    <p className="about-id text-primary-1  font-head relative z-[1] text-30">
                                        {id}
                                    </p>
                                </div>
                            </div>

                            {/* <Copy> */}
                            <p className={`text-30 w-full`}>{text}</p>
                            {/* </Copy> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
