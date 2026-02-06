export default function RealWorldOutcomes() {
   

    return (
        <section className="relative w-full py-[10.42vw] space-y-[8vw]">
            {/* Heading */}
            <div className="text-center spce-y-[2vw]">
                <h2 className="text-76 text-[#0A1B4B] font-extralight">
                    Real-World Outcomes
                </h2>
                <p className="text-30">
                    Enterprises use the DSW Enterprise AI Operating System to:
                </p>
            </div>

            {/* Outcomes Grid */}
            <div className="relative w-full  h-fit grid grid-cols-4 gap-x-0 gap-y-1 px-[3vw]">
                {outcomes.map((outcome, index) => (
                    <div
                        key={index}
                        className={`relative w-[23vw] h-[14vw] bg-white border-[0.078vw] border-[#0205fa] border-solid overflow-hidden flex flex-col itesm-start justify-evenly px-[1vw] ${outcome.position}`}
                    >
                        {/* Number Label */}
                        <p className="text-[1.04vw] font-sans leading-[1.5] text-[#c7c7c7]">
                            {outcome.number} /
                        </p>

                        {/* Title */}
                        <p className="text-[1.46vw] font-heading font-medium leading-[1.88vw] text-[#111] w-[20vw]">
                            {outcome.title}
                        </p>

                        {/* Description */}
                        <p className="text-[1.25vw] font-sans font-light leading-[1.56vw] text-[#111] w-[20vw]">
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
            description: "single-subscription model replacing per-model and per-agent pricing",
            position: "col-start-3"
        },
        {
            number: "03",
            title: "Operate audit-ready AI systems by default",
            description: "continuous execution logs, traces, and approvals enforced at runtime",
            position: "col-start-2 row-start-2"
        },
        {
            number: "04",
            title: "Reduce operational, regulatory, and execution risk",
            description: "runtime policy enforcement and reversible execution",
            position: "col-start-4 row-start-2"
        },
        {
            number: "05",
            title: "Retain full ownership of AI systems and IP",
            description: "no outbound learning, no vendor lock-in",
            position: "col-start-3 row-start-3"
        }
    ];