import Copy from "@/components/Animations/Copy";
import HeadingAnim from "@/components/Animations/HeadingAnim";
export default function Capabilities() {
    return (
        <section className="relative w-full py-[7%] space-y-[8vw] max-sm:space-y-[12vw] max-sm:py-[25%] max-md:py-[10%] overflow-hidden ">
       
            <div className="text-center space-y-[2vw] max-sm:px-[7vw] px-[5vw] max-sm:space-y-[7vw] max-md:space-y-[4vw]">
                <HeadingAnim>
                <h2 className="text-56 text-[#0A1B4B] w-[60%] text-center mx-auto max-sm:w-full max-md:w-[80%] max-sm:text-[8.5vw]">
                   Supercharge Your AI/ML Use Cases with DSW UnifyAI’s Built-In Capabilities
                </h2>
                </HeadingAnim>
                <Copy>
                <p className="text-30 w-[70%] max-sm:w-full max-sm:leading-normal mx-auto max-md:w-[80%] text-[#333333]">
                   UnifyAI kernel operates your AI/ML runtime with advanced tools that help you move faster, reduce manual work, and stay production-ready from the start.
                </p>
                </Copy>
            </div>
<div className="w-full h-full fadeup">
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
      capability: "Auto Monitoring Engine",
      delivers: "Real-time model and agent monitoring, performance alerts, and drift detection."
    },
    {
      capability: "Guardrails & Controls",
      delivers: "Role-based access, safety checks, compliance workflows built in from day one."
    },
    
  ];

  return (
    <div className="w-[90%] max-sm:overflow-y-hidden max-sm:w-screen max-sm:overflow-x-hidden mx-auto  relative  max-md:w-full">
       
        <div className="max-sm:w-full max-sm:overflow-x-scroll mobile-scrollbar max-sm:pb-[8vw] max-sm:overflow-y-hidden max-sm:px-[5vw] max-sm:mx-0 relative">
<CornerDecorations/>
        
         <div className="w-[90%] max-sm:w-[290%] mx-auto max-sm:overflow-y-hidden overflow-x-auto mobile-scrollbar overflow-y-visible">
       
      
      <table className="border-collapse w-full h-full border border-[#D9D9D9]">
       
        <thead>
          <tr className="bg-white">
            <th className="border border-[#D9D9D9] text-foreground max-sm:text-[5vw]! px-6 py-6 text-left text-56! font-medium font-heading">
              Capability
            </th>
            <th className="border border-[#D9D9D9] max-sm:text-[5vw]! px-6 py-6 text-left text-56! font-medium font-heading text-primary-blue">
              What it Delivers
            </th>
          </tr>
        </thead>
        <tbody>
          {capabilities.map((item, index) => (
            <tr key={index} className="bg-white">
              <td className="border border-[#D9D9D9] max-sm:pl-[8vw] px-6 py-5 text-30 text-foreground">
                {item.capability}
              </td>
              <td className="border border-[#D9D9D9] px-6 py-5 text-24 text-[#333333]">
                {item.delivers}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         </div>
      </div>
    </div>
  );
}


 function CornerDecorations({
  hoverColor = "#0205fa",
  baseColor = "black",
}) {
  const line = `
    w-[5px] h-[1px]
    duration-300 ease-in-out
  `;

  return (
    <>
      {/* Top Left */}
      <div className="absolute top-[0%] left-[5%] w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2.2px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.4%] right-[4.85%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out max-sm:right-[-166.5%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.4%] left-[4.85%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out max-sm:bottom-[6%] max-sm:left-[4.5%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-[0%] right-[5.05%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out max-sm:right-[-166%] max-sm:bottom-[5.65%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>
    </>
  );
}
