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
        <section className="w-full py-[7%]" id="feature-grid">
            <div className=" w-full flex flex-col justify-between items-center">
                <h2 className="text-56">
                    Why AI Struggles in Production
                </h2>

    
            </div>
        </section>
    );
}
