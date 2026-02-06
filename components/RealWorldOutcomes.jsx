export default function RealWorldOutcomes() {
    const outcomes = [
        {
            number: "01",
            title: "Move AI/ML & Agentic AI use cases into production faster",
            description: "From months to weeks in regulated environments",
            position: "top-0 left-0"
        },
        {
            number: "02",
            title: "Eliminate unpredictable per-use-case AI costs",
            description: "single-subscription model replacing per-model and per-agent pricing",
            position: "top-0 right-0"
        },
        {
            number: "03",
            title: "Operate audit-ready AI systems by default",
            description: "continuous execution logs, traces, and approvals enforced at runtime",
            position: "top-[14.11vw] left-[23.18vw]"
        },
        {
            number: "04",
            title: "Reduce operational, regulatory, and execution risk",
            description: "runtime policy enforcement and reversible execution",
            position: "top-[14.11vw] right-[23.18vw]"
        },
        {
            number: "05",
            title: "Retain full ownership of AI systems and IP",
            description: "no outbound learning, no vendor lock-in",
            position: "top-[28.23vw] left-1/2 -translate-x-1/2"
        }
    ];

    return (
        <section className="relative w-full py-[10.42vw] px-[3.91vw]">
            {/* Heading */}
            <div className="text-center mb-[10.42vw]">
                <h2 className="text-[3.96vw] font-heading leading-none tracking-[0.079vw] text-[#111] mb-[2.08vw]">
                    Real-World Outcomes
                </h2>
                <p className="text-[1.56vw] font-sans leading-[2.29vw] tracking-[0.031vw] text-[#111]">
                    Enterprises use the DSW Enterprise AI Operating System to:
                </p>
            </div>

            {/* Outcomes Grid */}
            <div className="relative max-w-[93.75vw] mx-auto" style={{ height: '45vw' }}>
                {outcomes.map((outcome, index) => (
                    <div
                        key={index}
                        className={`absolute w-[22.92vw] h-[13.85vw] bg-white border-[0.078vw] border-[#0205fa] border-solid overflow-hidden ${outcome.position}`}
                    >
                        {/* Number Label */}
                        <p className="absolute left-[1.38vw] top-[1.59vw] text-[1.04vw] font-sans leading-[1.5] text-[#c7c7c7]">
                            {outcome.number} /
                        </p>

                        {/* Title */}
                        <p className="absolute left-[1.38vw] top-[4.19vw] text-[1.46vw] font-heading font-medium leading-[1.88vw] text-[#111] w-[20vw]">
                            {outcome.title}
                        </p>

                        {/* Description */}
                        <p className="absolute left-[1.38vw] top-[8.98vw] text-[1.25vw] font-sans  leading-[1.56vw] text-[#111] w-[20vw]">
                            {outcome.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
