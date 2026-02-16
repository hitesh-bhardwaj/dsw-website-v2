"use client"
import { useGSAP } from "@gsap/react";
import Copy from "./Animations/Copy";
import HeadingAnim from "./Animations/HeadingAnim";
import gsap from "gsap";

export default function RealWorldOutcomes() {
   useGSAP(()=>{
    gsap.from(".outcomes-block",{
        opacity:0,
        scale:0.98,
        stagger:0.5,
        ease:"power2.out",
        scrollTrigger:{
            trigger:"#realworld-outcomes",
            start:"top 10%",
            end:"bottom bottom",
            // markers:true,
            scrub:true
        }
    })
   })

    return (
        <section className="relative w-full h-[240vh] py-[7%] space-y-[8vw] max-sm:px-[7vw]" id="realworld-outcomes">
            {/* Heading */}
            <div className="text-center space-y-[1vw] max-sm:space-y-[7vw]">
                <HeadingAnim>
                <h2 className="text-76 text-[#0A1B4B]">
                    Real-World Outcomes
                </h2>
                </HeadingAnim>
                <Copy>
                <p className="text-30">
                    Enterprises use the DSW Enterprise AI Operating System to:
                </p>
                </Copy>
            </div>

            {/* Outcomes Grid */}
            <div className="relative w-full  h-fit grid grid-cols-4 gap-x-0 gap-y-1 px-[3vw] max-sm:flex max-sm:flex-col max-sm:px-0 max-sm:gap-[7vw] sticky top-[14%] ">
                {outcomes.map((outcome, index) => (
                    <div
                        key={index}
                        className={`relative w-[23.3.5vw] h-[15.5vw] bg-white border-[0.078vw] border-primary-blue border-solid overflow-hidden flex flex-col item-start justify-evenly px-[1.5vw] py-[1.5vw] max-sm:h-fit max-sm:p-[5vw] max-sm:gap-[7vw] outcomes-block ${outcome.position}`}
                    >
                        {/* Number Label */}
                        <p className="text-[1.04vw] font-sans leading-[1.2] text-[#c7c7c7] max-sm:text-[5vw]">
                            {outcome.number} /
                        </p>

                        {/* Title */}
                        <p className=" text-32  font-heading font-medium leading-[1.2] w-full">
                            {outcome.title}
                        </p>

                        {/* Description */}
                        <p className="text-24 font-sans font-light leading-[1.2] w-full max-sm:font-normal">
                            {outcome.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

 const outcomes = [
        {
            number: "01",
            title: "Move AI/ML & Agentic AI use cases into production faster",
            description: "From months to weeks in regulated environments",
            position: "col-start-1"
        },
        {
            number: "02",
            title: "Eliminate unpredictable per-use-case AI costs",
            description: "Single-subscription model replacing per-model and per-agent pricing",
            position: "col-start-3"
        },
        {
            number: "03",
            title: "Operate audit-ready AI systems by default",
            description: "Continuous execution logs, traces, and approvals enforced at runtime",
            position: "col-start-2 row-start-2"
        },
        {
            number: "04",
            title: "Reduce operational, regulatory, and execution risk",
            description: "Runtime policy enforcement and reversible execution",
            position: "col-start-4 row-start-2"
        },
        {
            number: "05",
            title: "Retain full ownership of AI systems and IP",
            description: "No outbound learning, no vendor lock-in",
            position: "col-start-3 row-start-3"
        }
    ];