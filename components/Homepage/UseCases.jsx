export default function UseCases() {
    const cases = [
        {
            sector: "Insurance",
            title: "Automated Claims Processing",
            description: "Detect fraud early and triage underwriting with explainable AI models running in real-time."
        },
        {
            sector: "Finance",
            title: "Algorithmic Trading & Risk",
            description: "Execute high-frequency strategies with millisecond latency and guaranteed compliance checks."
        },
        {
            sector: "Healthcare",
            title: "Diagnostic Imaging Analysis",
            description: "Deploy computer vision models securely to clinical environments with full audit trails."
        },
        {
            sector: "Retail",
            title: "Dynamic Supply Chain",
            description: "Optimize inventory and logistics with predictive models that adapt to changing market conditions."
        }
    ];

    return (
        <section className="py-24 bg-zinc-900/30">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center tracking-tight">
                    Unlimited Use Cases
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((c, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-[var(--accent)]/30 transition-colors group">
                            <div className="text-sm font-bold text-[var(--accent)] mb-3 uppercase tracking-wider">
                                {c.sector}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {c.title}
                            </h3>
                            <p className="text-gray-400">
                                {c.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
