import Image from 'next/image';

export default function WhyAIStruggles() {
    const challenges = [
        {
            number: "1",
            title: "AI stacks are fragmented across tools, models, agents, and vendors",
            isHighlighted: true,
        },
        {
            number: "2",
            title: "Agentic workflows execute without runtime control",
            isHighlighted: false,
        },
        {
            number: "3",
            title: "Governance exists as static policy, not enforceable logic",
            isHighlighted: false,
        },
        {
            number: "4",
            title: "Auditability, ownership, and reversibility are added after deployment",
            isHighlighted: false,
        }
    ];

    return (
        <section className="relative w-full py-[10.42vw] px-[3.91vw] bg-gradient-to-b from-[#4F6FFF] to-[#8B9FFF] rounded-tl-[1.56vw] rounded-tr-[1.56vw]">
            {/* Heading Section */}
            <div className="text-center mb-[5.21vw]">
                <h2 className="text-[2.92vw] font-heading font-medium leading-none tracking-[0.058vw] text-[#111] mb-[2.08vw]">
                    Why AI Struggles in Production
                </h2>
                <p className="text-[1.25vw] font-sans leading-[2.08vw] tracking-[0.025vw] text-[#111] max-w-[40.99vw] mx-auto">
                    Modern enterprises don't struggle with building AI models. They struggle with operating AI reliably in production:
                </p>
            </div>

            {/* Challenge Boxes */}
            <div className="flex justify-center gap-[2.34vw] mb-[5.21vw]">
                {challenges.map((challenge, index) => (
                    <div
                        key={index}
                        className="relative"
                    >
                        {/* Box Container */}
                        <div
                            className={`
                                relative bg-white rounded-[0.52vw]
                                w-[21.35vw] h-[27.14vw] p-[2.08vw]
                                border-[0.053vw] border-solid
                                ${challenge.isHighlighted ? 'border-[#0205fa] shadow-[0_1.04vw_1.98vw_rgba(0,0,0,0.06)]' : 'border-[#c2c2c2]'}
                            `}
                        >
                            {/* Corner Decorations */}
                            <div className="absolute top-0 right-0 w-[0.28vw] h-[0.28vw]">
                                <Image
                                    src={challenge.isHighlighted ? "/corner-tr-blue.svg" : "/corner-tr-gray.svg"}
                                    alt=""
                                    width={5}
                                    height={5}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="absolute top-0 left-0 w-[0.28vw] h-[0.28vw]">
                                <Image
                                    src={challenge.isHighlighted ? "/corner-tl-gray.svg" : "/corner-tl-gray2.svg"}
                                    alt=""
                                    width={5}
                                    height={5}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 w-[0.28vw] h-[0.28vw]">
                                <Image
                                    src={challenge.isHighlighted ? "/corner-tl-blue.svg" : "/corner-br-gray.svg"}
                                    alt=""
                                    width={5}
                                    height={5}
                                    className="w-full h-full rotate-180"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-[0.28vw] h-[0.28vw]">
                                <Image
                                    src={challenge.isHighlighted ? "/corner-bl-blue.svg" : "/corner-bl-gray.svg"}
                                    alt=""
                                    width={5}
                                    height={5}
                                    className="w-full h-full"
                                />
                            </div>

                            {/* Number */}
                            <div className={`
                                absolute top-0 right-[1.04vw]
                                text-[5vw] font-sans font-extralight leading-none
                                ${challenge.isHighlighted ? 'text-[#111]' : 'text-[#c7c7c7]'}
                            `}>
                                {challenge.number}
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-[2.08vw] left-[2.08vw] right-[2.08vw]">
                                <p className="text-[1.56vw] font-sans leading-[2.08vw] text-[#111]">
                                    {challenge.title}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Text */}
            <div className="text-center">
                <p className="text-[2.29vw] font-heading leading-[3.23vw] tracking-[0.046vw] text-[#111] max-w-[40.99vw] mx-auto">
                    These gaps don't surface during pilots, but when AI becomes operational.
                </p>
            </div>
        </section>
    );
}
