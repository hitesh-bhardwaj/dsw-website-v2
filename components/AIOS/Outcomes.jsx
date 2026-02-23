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
        text: "On-premises environments",
        width: "w-full",
    },
    {
        id: "02",
        text: "Private data centers",
        width: "w-full",
    },
    {
        id: "03",
        text: "Private cloud",
        width: "w-full",
    },
    {
        id: "04",
        text: "Hybrid architectures",
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
                <div className=" text-center max-sm:w-full">
                <HeadingAnim>
                    <h2 className="text-76  text-[#0A1B4B] ">
                        Deployment, Sovereignty, and Control
                    </h2>
                </HeadingAnim>
                </div>
                <Copy>
                    <p className="w-[60%] max-md:w-[95%] text-center text-30 text-foreground">
                        Deploy the DSW Enterprise AI Operating System in:
                    </p>
                </Copy>

                <div className="w-[40%] flex flex-col gap-[3vw] max-md:w-full max-md:gap-[7vw] max-sm:gap-[10vw]">
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
                            <p className={`text-44 w-full font-light text-[#0A1B4B] `}>{text}</p>
                            {/* </Copy> */}
                        </div>
                    ))}
                </div>
                <Copy>
                    <p className="w-[60%] max-md:w-[95%] text-center text-30 text-foreground">
                        There is no mandatory SaaS dependency, no forced hyperscaler coupling, and no external data egress.
                    </p>
                </Copy>
            </div>
        </section>
    );
}
