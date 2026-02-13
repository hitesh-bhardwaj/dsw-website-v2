"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CircleBg } from "../Svg/Lines/DottedCircle";
import { Insurance } from "@/components/Svg/Insurance";
import { Bank } from "../Svg/Bank";
import { Roadmap } from "../Svg/Roadmap";
import HeadingAnim from "../Animations/HeadingAnim";

const CARD_DATA = [
    {
        id: 1,
        title: "Managed Open Source Services",
        description:
            "End-to-end deployment, monitoring, patching, and optimization of Finacle open-source components.",
    },
    {
        id: 2,
        title: "Skill Enablement",
        description:
            "Ongoing workshops, certifications, and co-created enablement programs to strengthen Finacle and client teams.",
    },
    {
        id: 3,
        title: "Innovation Catalyst",
        description:
            "Continuous research and evaluation of emerging open-source technologies to enrich Finacle’s global roadmap and performance benchmarks.",
    },
];

function AgenticCard({ id, title, description }) {
    return (
        <div
            className="relative fadeup bg-card-bg px-[2vw] pt-[1.5vw] pb-[3.5vw] w-[27.5vw] h-[30.5vw] overflow-hidden border-b-[0.4vw] border-primary-blue flex flex-col justify-between max-sm:w-full max-sm:h-[100vw] max-sm:border-b-[1.7vw] max-sm:justify-between max-sm:py-[7vw] max-sm:pb-[15vw] max-sm:px-[4vw]"
        >
            {/* Header */}
            <div className="flex justify-end items-end mb-[2vw] max-sm:pr-[3vw]">
               
                <p className="text-80 font-light! text-[#111111] leading-none max-sm:text-[15vw]">
                    {id}
                </p>
            </div>
           <div className="space-y-[3vw] flex flex-col items-start justify-start self-start">
    <h2 className="text-32 font-medium max-sm:text-[6vw] w-1/2">
        {title}
    </h2>
    {/* Description */}
    <p className="text-24 m-0 max-sm:flex max-sm:items-end max-sm:min-h-[30%] text-[#111111]">
        {description}
    </p>
</div>
        </div>
    );
}

const EngagementModels = () => {
    return (
        <div className="py-[7%] max-sm:px-[7vw] max-sm:py-[15%] bg-white space-y-[2vw] max-sm:space-y-[15vw]">
            <HeadingAnim>
                <h2 className="text-76 mx-auto w-fit max-sm:text-center max-sm:w-[90%] leading-[1.2] text-[#0A1B4B]">
                    Engagement Models
                </h2>
            </HeadingAnim>

            <div className="flex max-sm:flex-col max-sm:justify-center max-sm:items-center justify-between max-sm:gap-[8vw] p-[4vw] max-sm:p-0">
                {CARD_DATA.map((card) => (
                    <AgenticCard key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
};

export default EngagementModels;
