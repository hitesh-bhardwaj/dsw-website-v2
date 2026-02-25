"use client";

import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const CARD_DATA = [
    {
        id: 1,
        title: "Teams could build pilots",
    },
    {
        id: 2,
        title: "Proofs of value worked",
    },
    {
        id: 3,
        title: "But production-scale AI became slow, fragmented, and hard to govern",
    },
];

function Card({ id, title}) {
    return (
        <div
            className="relative fadeup bg-card-bg px-[2vw] pt-[1.5vw] pb-[3.5vw]   w-[22.5vw] h-[22.5vw] overflow-hidden border-b-[0.4vw] border-primary-blue flex flex-col justify-between max-sm:w-full max-sm:h-[70vw] max-sm:border-b-[1.7vw] max-sm:justify-between max-sm:py-[7vw] max-sm:pb-[0.5vw] max-sm:px-[4vw] max-md:w-[48%] max-md:h-[30vw] max-md:p-[4vw]"
        >
            {/* Header */}
            <div className="flex justify-end items-end mb-[2vw] max-sm:pr-[3vw]">
                <p className="text-80 font-light! text-foreground leading-none max-sm:text-[15vw]">
                    {id}
                </p>
            </div>
            <div className="space-y-[3vw] flex flex-col items-start max-sm:items-end justify-start self-start max-sm:justify-end">
                <h3 className="text-30  h-20 ">
                    {title}
                </h3>
            </div>
        </div>
    );
}

const DSWArrival = () => {
    return (
        <div className="py-[7%] max-sm:px-[7vw] max-sm:py-[15%] bg-white space-y-[2vw] max-sm:space-y-[12vw] max-md:py-[10%] max-md:space-y-[4vw]">
            <HeadingAnim>
                <h2 className="text-56 mx-auto max-sm:text-[8vw] w-fit max-sm:text-center max-sm:w-full leading-[1.2] text-[#0A1B4B]">
                    How DSW Arrived Here
                </h2>
            </HeadingAnim>

            <Copy>
                <p className="text-30 w-[70%] max-sm:w-full text-center font-sans leading-[1.4] text-foreground mx-auto max-md:w-[90%]">DSW started with hands-on enterprise AI work - building models, deploying use cases, and
                    driving outcomes.
                    But across organizations, the same pattern kept repeating</p>
            </Copy>

            <div className="flex justify-center gap-[5vw]  max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:gap-[8vw] p-[4vw] max-sm:p-0 max-md:flex-wrap max-md:gap-[3vw] ">
                {CARD_DATA.map((card) => (
                    <Card key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
};

export default DSWArrival;
