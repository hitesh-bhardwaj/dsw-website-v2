import Image from 'next/image';

export default function Testimonials() {
    return (
        <section className="relative w-full py-[5vw] px-[3.91vw] space-y-[8vw]">
            {/* Heading */}
            <div className="text-center  space-y-[2vw]">
                <h2 className="text-76 font-heading text-[#0A1B4B] leading-[1.2] font-extralight">
                    Trusted by Leaders<br />
                    in BFSI and Beyond
                </h2>
                <p className="text-30 max-w-[40vw] mx-auto">
                    Explore how we've helped businesses like yours achieve success with innovative technology solutions.
                </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-3 gap-[2vw] mx-auto">
                {/* Card 1: Canara HSBC Stat */}
                <div className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] p-[1.48vw] h-[17.71vw] flex items-end">
                    <p className="text-30 ">
                        Canara HSBC achieves <span className="text-[#ff5f00]">faster deployment</span> on persistency prediction and customer retention
                    </p>
                </div>

                {/* Card 2: Token Usage Chart */}
                <div className="bg-[#030a25] border-[0.078vw] border-[#0205fa] rounded-[1.3vw] overflow-hidden h-[17.71vw] relative group transition-all duration-500 ease-out">
                    <Image
                        src="/assets/homepage/testimonials/testimonial-1.png"
                        alt="Token Usage Over Time"
                        fill
                        className="object-cover h-full w-full scale-[1.1] group-hover:scale-[1.05] transition-all duration-500 ease-out"
                    />
                </div>

                {/* Card 3: Ritesh Rathod Testimonial */}
                <div className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] p-[1.48vw] h-[17.71vw] flex flex-col justify-between">
                    <p className="text-[1.25vw] font-sans  leading-[1.67vw] tracking-[0.025vw] text-[#111]">
                        With DSW's insurance-specific solutions on top of its robust AI platform, we've been able to move use cases into production quickly.
                    </p>
                    <div className="flex items-center gap-[1.04vw]">
                        <div className="relative w-[2.71vw] h-[2.71vw] rounded-full border border-[#14100e] overflow-hidden flex-shrink-0">
                            <Image
                                src="/profile-ritesh.png"
                                alt="Ritesh Rathod"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <p className="text-[1.25vw] font-sans font-medium text-[#14100e] leading-[1.5]">
                                Ritesh Rathod
                            </p>
                            <p className="text-[0.94vw] font-sans text-[#645f5d] leading-[1.5]">
                                Chief Strategy and Data Officer, Canara HSBC
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 4: Error Distribution Chart */}
                 <div className="bg-[#030a25] border-[0.078vw] border-[#0205fa] rounded-[1.3vw] overflow-hidden h-[17.71vw] relative group transition-all duration-500 ease-out">
                    <Image
                        src="/assets/homepage/testimonials/testimonial-2.png"
                        alt="Token Usage Over Time"
                        fill
                        className="object-cover h-full w-full scale-[1.1] group-hover:scale-[1.05] transition-all duration-500 ease-out"
                    />
                </div>

                {/* Card 5: Stefano Bonfa Testimonial */}
                <div className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] p-[1.48vw] h-[17.71vw] flex flex-col justify-between">
                    <p className="text-[1.25vw] font-sans  leading-[1.67vw] tracking-[0.025vw] text-[#111]">
                        DSW UnifyAI simplified our data-driven approach, enabling easy development of AI-powered use cases.
                    </p>
                    <div className="flex items-center gap-[1.04vw]">
                        <div className="relative w-[2.71vw] h-[2.71vw] rounded-full border border-[#14100e] overflow-hidden flex-shrink-0">
                            <Image
                                src="/profile-stefano.png"
                                alt="Stefano Bonfa"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <p className="text-[1.25vw] font-sans font-medium text-[#14100e] leading-[1.5]">
                                Stefano Bonfa
                            </p>
                            <p className="text-[0.94vw] font-sans text-[#645f5d] leading-[1.5]">
                                Director, OxSDE, Europe
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 6: Customers in Production */}
                <div className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] p-[1.48vw] h-[17.71vw] flex items-end">
                    <p className="text-30">
                        <span className="text-[#ff5f00]">Customers In Production</span> – Canara HSBC, Manipal Cigna, Mahindra, Castler, Wealthright, FSS
                    </p>
                </div>

                {/* Card 7: Ritesh Tiwari Testimonial */}
                <div className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] p-[1.48vw] h-[17.71vw] flex flex-col justify-between">
                    <p className="text-[1.25vw] font-sans  leading-[1.67vw] tracking-[0.025vw] text-[#111]">
                        With advanced capabilities of the platform's AgenticAI, Castler's escrow services became smarter, more efficient - enabling faster, secure, scalable solutions for our BFSI clients.
                    </p>
                    <div className="flex items-center gap-[1.04vw]">
                        <div className="relative w-[2.71vw] h-[2.71vw] rounded-full border border-[#14100e] overflow-hidden flex-shrink-0">
                            <Image
                                src="/profile-ritesh-t.png"
                                alt="Ritesh Tiwari"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <p className="text-[1.25vw] font-sans font-medium text-[#14100e] leading-[1.5]">
                                Ritesh Tiwari
                            </p>
                            <p className="text-[0.94vw] font-sans text-[#645f5d] leading-[1.5]">
                                Chief Product Officer, Castler
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 8: Manipal Cigna Stat */}
                <div className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] p-[1.48vw] h-[17.71vw] flex items-end">
                    <p className="text-30">
                        Manipal Health Cigna in production with <span className="text-[#ff5f00]">over 5 use cases</span> of AI/ML and GenAI
                    </p>
                </div>

                {/* Card 9: Latency Chart */}
                <div className="bg-[#030a25] border-[0.078vw] border-[#0205fa] rounded-[1.3vw] overflow-hidden h-[17.71vw] relative group transition-all duration-500 ease-out">
                    <Image
                        src="/assets/homepage/testimonials/testimonial-3.png"
                        alt="Token Usage Over Time"
                        fill
                        className="object-cover h-full w-full scale-[1.1] group-hover:scale-[1.05] transition-all duration-500 ease-out"
                    />
                </div>
            </div>
        </section>
    );
}
