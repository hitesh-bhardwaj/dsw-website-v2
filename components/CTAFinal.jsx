import Link from 'next/link';

export default function CTAFinal() {
    return (
        <section className="relative w-full bg-gradient-to-b from-[#fcfcfc] to-[#eff1fb] py-[10.42vw] px-[3.91vw]">
            {/* White Card Container */}
            <div className="relative max-w-[92.19vw] mx-auto bg-white rounded-[1.25vw] p-[6.25vw] overflow-hidden">
                {/* Heading */}
                <h2 className="text-[3.96vw] font-heading leading-normal text-[#1d1d1d] text-center mb-[3.65vw]">
                    Own How AI Runs in Your Enterprise
                </h2>

                {/* Description */}
                <p className="text-[1.56vw] font-sans leading-[2.29vw] tracking-[0.031vw] text-[#111] text-center max-w-[60.52vw] mx-auto mb-[5.21vw]">
                    DSW is the enterprise AI operating system layer that sits on top of your existing OS and infrastructure – putting enterprises in control of how AI is built, governed, and operated at scale.
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center justify-center gap-[2.08vw]">
                    {/* Primary Button - Explore Platform */}
                    <Link
                        href="#explore"
                        className="inline-flex items-center justify-center px-[1.56vw] py-[1.04vw] rounded-full text-[#e8e8e8] text-[1.15vw] font-heading font-medium tracking-[0.023vw] leading-normal transition-all hover:opacity-90"
                        style={{
                            backgroundImage: "linear-gradient(117.766deg, rgb(241, 107, 13) 7.1952%, rgb(230, 18, 22) 92.805%)"
                        }}
                    >
                        Explore the Platform
                    </Link>

                    {/* Secondary Button - Talk to Team */}
                    <Link
                        href="#contact"
                        className="inline-flex items-center justify-center px-[1.56vw] py-[1.04vw] rounded-full text-[#111] text-[1.15vw] font-heading font-medium tracking-[0.023vw] leading-normal border-[0.057vw] border-[#111] border-solid transition-all hover:bg-gray-50"
                    >
                        Talk to our Team
                    </Link>
                </div>
            </div>
        </section>
    );
}
