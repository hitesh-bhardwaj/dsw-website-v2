"use client";

import CornerDecorations from "../CornerDecorations";
import gsap from "gsap";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import SectionBreak from "../SectionBreak";
import { Governed } from "../Svg/AboutUs/Governed";
import { Auditable } from "../Svg/AboutUs/Auditable";
import { Reversible } from "../Svg/AboutUs/Reversible";
import { Deployable } from "../Svg/AboutUs/Deployable";
import { Owned } from "../Svg/AboutUs/Owned";
import Image from "next/image";
import { Arrow } from "../Svg/AboutUs/Arrow";

export default function WhatWeBelieve() {
    const data = [
        {
            icon: <Governed />,
            title: "Governed while it runs",
            isHighlighted: true,
        }, 
        {
            icon: <Auditable />,
            title: "Auditable by design",
            isHighlighted: false,
        },
        {
            icon: <Reversible />,
            title: "Reversible when needed",
            isHighlighted: false,
        },
        {
            icon: <Deployable />,
            title: "Deployable inside their environment",
            isHighlighted: false,
        },
        {
            icon: <Owned />,
            title: "Owned end-to-end by the enterprise",
            isHighlighted: false,
        },
    ];

    return (
        <section className="relative w-full h-fit py-[7%] px-[5vw] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit pt-[10%]">
            {/* Heading Section */}
            <div className="space-y-[5.5vw] h-fit sticky top-[7%] max-sm:static overflow-hidden max-sm:space-y-[12vw] z-10">
                <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
                    <HeadingAnim>
                        <h2 className="text-76 font-heading text-[#0A1B4B] capitalize">
                            What we believe ( and why it matters )
                        </h2>
                    </HeadingAnim>
                    <Copy>
                        <p className="text-24 font-sans leading-[1.4] tracking-[0.025vw] text-foreground w-[50%] max-sm:w-full mx-auto">
                            In the AI era, the advantage won't come from who experiments the most. It will come from who can{" "}
                            <span className="font-medium">operate AI the best</span> - safely, continuously, and at scale.
                        </p>
                    </Copy>
                </div>
                <div className="pt-[5vw]">
                    <Copy>
                        <p className="text-30 text-center font-sans leading-[1.4] tracking-[0.025vw] text-foreground mx-auto">
                            As LLMs and agentic workflows spread across regulated business processes, enterprises need AI that is:
                        </p>
                    </Copy>
                </div>

                {/* Challenge Boxes */}
                <div className="flex items-center justify-center gap-0 max-sm:flex-col max-sm:gap-[7vw]">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center max-sm:flex-col max-sm:w-full">
                            {/* Card */}
                            <div
                                className={`
                                    relative w-[15vw] h-[30vh] group
                                    px-[1.5vw] pt-[1.5vw] justify-between flex flex-col pb-[3vw] items-end
                                    max-sm:px-[5vw] max-sm:pb-[10vw] max-sm:h-[60vw] max-sm:w-full
                                    border border-solid hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg
                                    border-[#c2c2c2] duration-300 ease-in-out bg-white
                                `}
                            >
                                <CornerDecorations />

                                {/* Icon */}
                                <div className="text-[#002AFF]">{item.icon}</div>

                                {/* Title */}
                                <div>
                                    <p className="text-24 leading-[1.2] text-start">{item.title}</p>
                                </div>
                            </div>

                            {/* Arrow — only between cards, not after the last */}
                            {index < data.length - 1 && (
                                <div className="flex-shrink-0 w-[3vw] flex items-center justify-center text-[#002AFF] max-sm:hidden">
                                    <Arrow />
                                </div>
                            )}

                            {/* Arrow for mobile — shown below each card except the last */}
                            {index < data.length - 1 && (
                                <div className="hidden max-sm:flex items-center justify-center text-[#002AFF] py-[3vw] rotate-90">
                                    <Arrow />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-[50%] mx-auto text-center max-sm:w-full">
                    <SectionBreak content={"That belief is the foundation of DSW."} big={false} />
                </div>
            </div>
        </section>
    );
}