import Link from 'next/link';

export default function CTAPricing() {
    return (
        <section className="relative w-full bg-white py-[15.63vw] px-[3.91vw] overflow-hidden">
            {/* Decorative Lines Background - Simplified */}
            <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1920 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Left curved lines */}
                    <path d="M0 400 Q480 200, 860 400" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M0 450 Q480 600, 860 400" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Right curved lines */}
                    <path d="M1920 400 Q1440 200, 1060 400" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M1920 450 Q1440 600, 1060 400" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Top lines */}
                    <path d="M960 100 Q720 250, 480 200" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M960 100 Q1200 250, 1440 200" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Bottom lines */}
                    <path d="M960 700 Q720 550, 480 600" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M960 700 Q1200 550, 1440 600" stroke="#0205fa" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
                {/* Heading */}
                <h2 className="text-[4.31vw] font-heading leading-normal tracking-[0.086vw] text-[#1d1d1d] mb-[8.33vw]">
                    One Subscription,<br />
                    <span className="font-medium">Unlimited Scale.</span>
                </h2>

                {/* CTA Button */}
                <Link
                    href="#pricing"
                    className="inline-flex items-center justify-center px-[1.56vw] py-[1.04vw] rounded-full text-[#e8e8e8] text-[1.15vw] font-heading font-medium tracking-[0.023vw] leading-normal transition-all hover:opacity-90"
                    style={{
                        backgroundImage: "linear-gradient(116.447deg, rgb(241, 107, 13) 7.1952%, rgb(230, 18, 22) 92.805%)"
                    }}
                >
                    Discuss Pricing
                </Link>
            </div>
        </section>
    );
}
