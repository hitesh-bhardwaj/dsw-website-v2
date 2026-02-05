import Image from 'next/image';

export default function Reliability() {
    return (
        <section className="py-24 bg-black relative border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Reliable AI as a <br /> Core Enterprise System
                    </h2>
                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                        Runtime governance isn't an afterthought—it's baked into the execution layer. Ensure performance, security, and compliance scale with your workload.
                    </p>

                    <ul className="space-y-4">
                        {['Real-time Compliance Checks', 'Zero-Latency Governance', 'Resource Optimization'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-white">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative h-[500px] w-full flex items-center justify-center">
                    <Image
                        src="/reliability.png"
                        alt="Reliability Diagram"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
