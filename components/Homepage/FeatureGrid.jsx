export default function FeatureGrid() {
    const features = [
        {
            id: "01",
            title: "Lack of Governance",
            description: "Security and compliance risks often go unchecked in experimental notebooks, leading to blocked deployments."
        },
        {
            id: "02",
            title: "Model Fragility",
            description: "Models degrade in production due to unstructured monitoring, concept drift, and unmanaged data pipelines."
        },
        {
            id: "03",
            title: "Siloed Infrastructure",
            description: "Fragmented tools and disconnected data sources create massive friction in the ML lifecycle."
        },
        {
            id: "04",
            title: "Slow Deployment",
            description: "Inefficient manual handover processes between consensus teams slow down time-to-market significantly."
        }
    ];

    return (
        <section className="py-24 bg-black relative border-b border-white/5">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center tracking-tight">
                    Why AI Struggles in Production
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f) => (
                        <div key={f.id} className="group p-8 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="text-5xl font-bold text-white/10 mb-6 group-hover:text-(--accent) transition-colors font-mono">
                                {f.id}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                {f.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
