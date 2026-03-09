"use client";

import React, { useRef, useState } from "react";
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
            className="relative fadeup bg-card-bg px-[2vw] max-md:px-[3vw] max-md:py-[4vw] pt-[1.5vw] pb-[3.5vw] w-[25.5vw] h-[29.5vw] max-md:h-[55vw] max-md:w-[42vw] overflow-hidden border-b-[0.4vw] border-primary-blue flex flex-col gap-[4vw] max-sm:w-full max-sm:h-[100vw] max-sm:border-b-[1.7vw] max-sm:justify-between max-sm:py-[7vw] max-sm:pb-[15vw] max-sm:px-[4vw]"
        >
            {/* Header */}
            <div className="flex justify-end items-end mb-[1.5vw] max-sm:pr-[3vw] max-md:pr-[2vw]">
               
                <p className="text-[5vw] max-md:text-[8vw] font-light! text-foreground leading-none max-sm:text-[15vw]">
                    {id}
                </p>
            </div>
           <div className="space-y-[3vw] flex flex-col items-start justify-start self-start">
    <h2 className="text-32 font-medium max-sm:text-[6vw] w-[80%]">
        {title}
    </h2>
    {/* Description */}
    <p className="text-24 m-0 max-sm:flex max-sm:items-end max-sm:min-h-[30%] text-foreground">
        {description}
    </p>
</div>
        </div>
    );
}

const EngagementModels = () => {
    return (
        <div className="py-[7%] max-sm:px-[7vw] max-sm:py-[15%] max-md:py-[10%] max-md:space-y-[10vw] max-md:px-[6vw] bg-white space-y-[2vw] max-sm:space-y-[15vw]">
            <HeadingAnim>
                <h2 className="text-76 mx-auto w-fit max-sm:text-center max-sm:w-[90%]  leading-[1.2] text-[#0A1B4B]">
                    Engagement Models
                </h2>
            </HeadingAnim>

            <div className="w-[90%] max-md:w-full mx-auto flex max-sm:flex-col max-md:flex-wrap max-sm:justify-center max-sm:items-center justify-between max-sm:gap-[8vw]  p-[4vw]  max-md:p-0 max-md:gap-[4vw]">
                {CARD_DATA.map((card) => (
                    <AgenticCard key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
};

export default EngagementModels;
