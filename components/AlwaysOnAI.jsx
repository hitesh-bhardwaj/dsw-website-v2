import Image from 'next/image';

export default function AlwaysOnAI() {
    return (
        <section className="relative w-full bg-white py-[10.42vw] px-[3.91vw] overflow-hidden">
            {/* Background Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src="/bg-lines.svg"
                    alt=""
                    fill
                    className="object-cover opacity-30"
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Top Heading Section */}
                <div className="text-center mb-[10.42vw]">
                    <h2 className="text-[3.96vw] font-heading leading-normal tracking-[0.079vw] text-[#111] mb-[2.08vw]">
                        Always-On AI. Built as Infrastructure.
                    </h2>
                    <p className="text-[1.56vw] font-sans leading-[2.29vw] tracking-[0.031vw] text-[#111] max-w-[47.92vw] mx-auto">
                        AI only scales when enterprises can build it safely, trust it in daily workflows, and run it continuously
                    </p>
                </div>

                {/* Laptop Mockup */}
                <div className="relative w-[83.96vw] h-[40.78vw] mx-auto mb-[10.42vw]">
                    <Image
                        src="/laptop-dashboard.png"
                        alt="DSW UnifyAI Dashboard"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Bottom Text */}
                <div className="text-center">
                    <p className="text-[2.29vw] font-heading leading-[3.23vw] tracking-[0.046vw] text-[#111] max-w-[58.23vw] mx-auto">
                        The AI Operating System makes this possible by running as part of your core enterprise architecture.
                    </p>
                </div>
            </div>
        </section>
    );
}
