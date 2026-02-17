"use client";
import HeadingAnim from "../Animations/HeadingAnim";
import Image from "next/image";

const SystemStructure = () => {
  const runtimeBoxes = [
    {
      id: 1,
      title: "ML Runtime",
      icon: "/assets/icons/aios/ml-runtime.svg",
      items: [
        "Batch and real-time inference",
        "Model versioning and controlled rollout",
        "Performance monitoring and drift detection",
      ],
    },
    {
      id: 2,
      title: "Agentic Runtime",
      icon: "/assets/icons/aios/agentic-runtime.svg",
      items: [
        "Multi-agent orchestration",
        "Policy-aware autonomy",
        "Human-in-the-loop controls",
        "Agent lifecycle management",
      ],
    },
    {
      id: 3,
      title: "AI Fabric",
      icon: "/assets/icons/aios/ai-fabric.svg",
      items: [
        "Foundation models and LLMs",
        "Open-source frameworks",
        "Partner tools and services",
        "Enterprise APIs and data systems",
      ],
    },
  ];

  const kernelItems = [
    {
      column: 1,
      text: "The authoritative control plane for all AI execution, responsible for:",
    },
    {
      column: 2,
      items: [
        "Governance as code",
        "Runtime policy enforcement",
        "Lifecycle and lineage management",
      ],
    },
    {
      column: 3,
      items: [
        "Auditability, traceability and reversibility",
        "Execution contracts for integrations",
      ],
    },
  ];

  return (
    <section className="relative w-full py-[7%] bg-background max-sm:py-[15%]">
      {/* Heading */}
      <div className="text-center px-[5vw] mb-[5vw] max-sm:mb-[10vw]">
        <HeadingAnim>
          <h2 className="text-76 text-foreground leading-[1.1]">
            How the System is Structured
          </h2>
        </HeadingAnim>
      </div>

      {/* OS Diagram Container */}
      <div className="px-[5vw]">
        <div className="relative w-full bg-[#eff1fb] border border-primary-blue rounded-[1.5vw] overflow-hidden">
          {/* Header Bar */}
          <div className="bg-background border-b border-primary-blue py-[1.5vw] rounded-t-[1.5vw]">
            <p className="text-24 text-primary-blue font-medium text-center font-heading tracking-[0.02em]">
              DSW Enterprise AI Operating System
            </p>
          </div>

          {/* Content */}
          <div className="p-[2vw] space-y-[1.5vw] max-sm:p-[4vw] max-sm:space-y-[4vw]">
            {/* Three Runtime Boxes */}
            <div className="grid grid-cols-3 gap-[1.5vw] max-sm:grid-cols-1 max-sm:gap-[4vw]">
              {runtimeBoxes.map((box) => (
                <div
                  key={box.id}
                  className="bg-background rounded-[0.6vw] p-[1.5vw] max-sm:p-[5vw] max-sm:rounded-[2vw] flex flex-col justify-between hover:border-primary-blue border border-white/0 transition-all duration-500 ease-in-out hover:drop-shadow-md hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-[1.5vw] max-sm:mb-[4vw]">
                    <h3 className="text-24 text-foreground font-medium font-heading tracking-[0.02em]">
                      {box.title}
                    </h3>
                    <div className="relative w-[4.5vw] h-[4.5vw] max-sm:w-[12vw] max-sm:h-[12vw]">
                      <Image
                        src={box.icon}
                        alt={box.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <ul className="space-y-[0.5vw] max-sm:space-y-[2vw]">
                    {box.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-22 text-[#111] leading-none tracking-[0.02em] flex items-start gap-[0.5vw]"
                      >
                        <span className="text-primary-blue">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* AI OS Kernel */}
            <div className="bg-background rounded-[0.6vw] p-[1.5vw] max-sm:p-[5vw] max-sm:rounded-[2vw] hover:border-primary-blue border border-white/0 transition-all duration-500 ease-in-out hover:drop-shadow-md hover:shadow-md">
              <div className="flex items-start justify-between mb-[1.5vw] max-sm:mb-[4vw]">
                <h3 className="text-24 text-foreground font-heading font-medium tracking-[0.02em]">
                  AI OS Kernel (UnifyAI Core)
                </h3>
                <div className="relative w-[4.5vw] h-[4.5vw] max-sm:w-[12vw] max-sm:h-[12vw]">
                  <Image
                    src="/assets/icons/aios/ai-os-kernel.svg"
                    alt="AI OS Kernel"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[2vw] max-sm:grid-cols-1 max-sm:gap-[4vw]">
                {/* Column 1 - Description */}
                <p className="text-22 text-[#111] leading-1.2 tracking-[0.02em]">
                  The authoritative control plane for all AI execution, responsible for:
                </p>
                {/* Column 2 - Items */}
                <ul className="space-y-[0.5vw] max-sm:space-y-[2vw]">
                  {kernelItems[1].items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-22 text-[#111] leading-none tracking-[0.02em] flex items-start gap-[0.5vw]"
                    >
                      <span className="text-primary-blue">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Column 3 - Items */}
                <ul className="space-y-[0.5vw] max-sm:space-y-[2vw]">
                  {kernelItems[2].items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-22 text-[#111] leading-none tracking-[0.02em] flex items-start gap-[0.5vw]"
                    >
                      <span className="text-primary-blue">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Base Infrastructure Layer */}
            <div
              className="rounded-[0.6vw] p-[1.5vw] text-center max-sm:p-[5vw] max-sm:rounded-[2vw]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(23, 39, 255, 0.2) 9.13%, rgba(0, 0, 0, 0) 45.67%, rgba(23, 39, 255, 0.2) 89.42%), linear-gradient(90deg, #111 0%, #111 100%)",
              }}
            >
              <h3 className="text-24 text-white font-medium font-heading tracking-[0.02em] mb-[1vw] max-sm:mb-[3vw]">
                Base Infrastructure Layer
              </h3>
              <p className="text-22 text-white leading-normal tracking-[0.02em]">
                Linux, Windows, Unix, or container runtimes manage compute, memory, and networking.
                <br className="max-sm:hidden" />
                <span className="max-sm:inline"> </span>
                DSW operates above this layer without modifying it.
              </p>
            </div>
          </div>

          {/* Footer Text */}
          <div className="pb-[1.5vw] max-sm:pb-[5vw]">
            <p className="text-22 text-[#111] text-center tracking-[0.02em]">
              Operates above existing infrastructure without modification
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemStructure;
