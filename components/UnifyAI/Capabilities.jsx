import Copy from "@/components/Animations/Copy";
import HeadingAnim from "@/components/Animations/HeadingAnim";
import CornerDecorations from "../CornerDecorations";

export default function Capabilities() {
    return (
        <section className="relative w-full py-[7%] space-y-[8vw] max-sm:px-[7vw] px-[5vw]">
            {/* Heading */}
            <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
                <HeadingAnim>
                <h2 className="text-76 text-[#0A1B4B]">
                   Supercharge Your AI/ML Use Cases with DSW
UnifyAI’s Built-In Capabilities
                </h2>
                </HeadingAnim>
                <Copy>
                <p className="text-30 w-[70%] mx-auto">
                   UnifyAI kernel operates your AI/ML runtime with advanced tools that help you move faster, reduce manual work, and stay production-ready from the start
                </p>
                </Copy>
            </div>
<div className="w-full h-full">
            <CapabilitiesTable/>
            </div>
          
        </section>
    );
}


 function CapabilitiesTable() {
  const capabilities = [
    {
      capability: "In-built AI Studio",
      delivers: "Fast-track AI/ML model development with auto-ML, feature engineering, and monitoring."
    },
    {
      capability: "Prompt Hub",
      delivers: "Create, manage, and reuse high-quality prompts for consistent GenAI agent behavior."
    },
    {
      capability: "Data Ingestion Toolkit",
      delivers: "Automate data prep and extraction with minimal effort."
    },
    {
      capability: "Central Feature Store",
      delivers: "Store, standardize, and reuse features across models and teams."
    },
    {
      capability: "Knowledge Base Connector",
      delivers: "Seamless integration of external/internal knowledge sources for GenAI workflows."
    },
    {
      capability: "Guardrails & Controls",
      delivers: "Role-based access, safety checks, compliance workflows built in from day one."
    },
    {
      capability: "Auto Monitoring Engine",
      delivers: "Real-time model and agent monitoring, performance alerts, and drift detection."
    }
  ];

  return (
    <div className="w-[90%] mx-auto relative group">
        <CornerDecorations/>
      <table className="w-full border-collapse border border-[#D9D9D9]">
        <thead>
          <tr className="bg-white">
            <th className="border border-[#D9D9D9] px-6 py-6 text-left text-56 font-medium font-heading">
              Capability
            </th>
            <th className="border border-[#D9D9D9] px-6 py-6 text-left text-56 font-medium font-heading text-primary-blue">
              What it Delivers
            </th>
          </tr>
        </thead>
        <tbody>
          {capabilities.map((item, index) => (
            <tr key={index} className="bg-white">
              <td className="border border-[#D9D9D9] px-6 py-5 text-30">
                {item.capability}
              </td>
              <td className="border border-[#D9D9D9] px-6 py-5 text-24">
                {item.delivers}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
