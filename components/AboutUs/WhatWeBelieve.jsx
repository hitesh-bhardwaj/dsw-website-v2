"use client";

import CornerDecorations from "../CornerDecorations";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";
import SectionBreak from "../SectionBreak";
import { Governed } from "../Svg/AboutUs/Governed";
import { Auditable } from "../Svg/AboutUs/Auditable";
import { Reversible } from "../Svg/AboutUs/Reversible";
import { Deployable } from "../Svg/AboutUs/Deployable";
import { Owned } from "../Svg/AboutUs/Owned";
import { Arrow } from "../Svg/AboutUs/Arrow";
import { Vision } from "../Svg/AboutUs/Vision";
import { Mission } from "../Svg/AboutUs/Mission";

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
        <section className="relative w-full h-fit py-[7%] px-[5vw] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit">
            {/* Heading Section */}
            <div className="space-y-[5.5vw] h-fit max-sm:static overflow-hidden max-sm:space-y-[12vw] z-10">
                <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
                    <HeadingAnim>
                        <h2 className="text-76 font-heading text-[#0A1B4B] capitalize">
                            What we believe ( and why it matters )
                        </h2>
                    </HeadingAnim>
                    <Copy>
                        <p className="text-30 font-sans leading-[1.4] tracking-[0.025vw] text-foreground w-[55%] max-sm:w-full mx-auto">
                            In the AI era, the advantage won't come from who experiments the most. It will come from who can{" "}
                            <span className="font-medium">operate AI the best</span> - safely, continuously, and at scale.
                        </p>
                    </Copy>
                </div>
                <div className="pt-[2vw]">
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
                                    relative w-[15vw] h-[28vh] group
                                    px-[1.5vw] pt-[1.5vw] justify-between flex flex-col pb-[3vw] items-end
                                    max-sm:px-[5vw] max-sm:pb-[10vw] max-sm:h-[60vw] max-sm:w-full
                                    border border-solid hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg
                                    border-[#c2c2c2] duration-300 ease-in-out bg-white 
                                `}
                            >
                                <CornerDecorations />

                                {/* Icon */}
                                <div className="text-[#002AFF] w-[3vw] h-[3vw]">{item.icon}</div>

                                {/* Title */}
                                <div>
                                    <p className="text-24 leading-[1.2] text-left h-10">{item.title}</p>
                                </div>
                            </div>

                            {/* Arrow — only between cards, not after the last */}
                            {index < data.length - 1 && (
                                <div className="flex-shrink-0 w-[2.8vw] px-1 flex items-center justify-center text-[#002AFF] max-sm:hidden">
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
            <VisionMission />
        </section>
    );
}


const VisionMission = () => {
    return (
        <section className="w-full h-fit bg-white pt-[10%] max-sm:pt-16  md:px-16">
            <div className="relative  grid grid-cols-3 grid-rows-2">
                <div
                    className="
                        relative col-start-1 col-span-1 row-start-1
                        border border-[#c2c2c2] bg-white
                        px-[2vw] py-[2vw] group 
                        hover:border-primary-blue hover:shadow-lg hover:drop-shadow-lg
                        transition-all duration-300 ease-in-out
                        flex flex-col items-center justify-between
                    "
                >
                    <CornerDecorations />
                    <div className="flex items-center w-full justify-between">
                        <h3 className="text-56 text-[#0A1B4B]">Vision</h3>
                        <div className="w-14 h-14 shrink-0 text-primary-blue">
                            <Vision />
                        </div>
                    </div>
                    <p className="text-30 text-foreground ">
                        To make AI operable at scale -<br />for every enterprise.
                    </p>
                </div>

                {/* Mission Card — bottom right, spans 2 cols, row 2 */}
                <div
                    className="
                        relative col-start-2 col-span-2 row-start-2
                        border border-[#c2c2c2] bg-white
                        px-[2vw] py-[2vw] group
                        hover:border-primary-blue hover:shadow-lg
                        hover:drop-shadow-lg transition-all duration-300 ease-in-out
                         flex flex-col items-start justify-between 
                    "
                >
                    <CornerDecorations />
                    <div className="flex items-center w-full justify-between mb-15">
                        <h3 className="text-56 text-[#0A1B4B]">Mission</h3>
                        <div className="w-16 h-16 shrink-0 text-primary-blue">
                            <Mission />
                        </div>
                    </div>
                    <p className="text-30 text-foreground ">
                        To build the governed operating layer that enables enterprises to
                    </p>
                    <ul className="space-y-[0.5vw] text-30 text-foreground list-disc mt-[2vw] ml-[3vw]">
                        {[
                            "Build, integrate, deploy, govern, and operate AI in production",
                            "Unify models, agents, tools, and workflows under one runtime",
                            "Enforce governance as code during execution - not after",
                        ].map((item, i) => (
                            <li key={i}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

