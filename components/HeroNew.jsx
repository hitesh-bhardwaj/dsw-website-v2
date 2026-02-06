import Image from 'next/image';
import Link from 'next/link';

export default function HeroNew() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            {/* Grid Lines Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {/* Horizontal Lines */}
                <div className="absolute inset-0">
                    <Image
                        src="/grid-lines-h.svg"
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Vertical Lines - Simplified */}
                <div className="absolute inset-0 flex justify-between px-[6.3vw]">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-px h-full bg-gray-200" />
                    ))}
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[103.28vw] h-[34.19vw] pointer-events-none">
                <Image
                    src="/hero-gradient.svg"
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full pt-[6.25vw]">
                {/* Tagline */}
                <p className="text-[1.56vw] font-sans font-medium leading-[2.4vw] tracking-[0.031vw] text-[#333] text-center mb-[3.96vw]">
                    Governed. Explainable. Production-Ready AI at Scale.
                </p>

                {/* Main Heading */}
                <h1 className="text-[5.73vw] font-heading leading-[6.46vw] tracking-[0.115vw] text-[#111] text-center max-w-[55.05vw] mb-[8.33vw]">
                    The Enterprise AI Operating System
                </h1>

                {/* CTA Buttons */}
                <div className="flex items-center gap-[2.08vw] mb-[15.63vw]">
                    {/* Primary Button */}
                    <Link
                        href="#explore"
                        className="inline-flex items-center justify-center px-[1.56vw] py-[1.04vw] rounded-full text-[#e8e8e8] text-[1.15vw] font-heading font-medium tracking-[0.023vw] leading-normal transition-all hover:opacity-90"
                        style={{
                            backgroundImage: "linear-gradient(117.766deg, rgb(241, 107, 13) 7.1952%, rgb(230, 18, 22) 92.805%)"
                        }}
                    >
                        Explore the Platform
                    </Link>

                    {/* Secondary Button */}
                    <Link
                        href="#contact"
                        className="inline-flex items-center justify-center px-[1.56vw] py-[1.04vw] rounded-full text-[#111] text-[1.15vw] font-heading font-medium tracking-[0.023vw] leading-normal border-[0.057vw] border-[#111] border-solid transition-all hover:bg-gray-50"
                    >
                        Talk to our Team
                    </Link>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-[6.25vw] right-[19.27vw] flex items-center gap-[0.52vw]">
                    <p className="text-[0.94vw] font-sans tracking-[0.056vw] bg-gradient-to-r from-white via-[#aeaeae] to-[#454545] bg-clip-text text-transparent">
                        Keep Scrolling to Discover More
                    </p>
                    <div className="w-[0.63vw] h-[0.63vw] rotate-90">
                        <Image
                            src="/arrow-down.svg"
                            alt=""
                            width={12}
                            height={12}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
