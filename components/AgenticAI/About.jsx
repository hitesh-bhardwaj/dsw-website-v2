import CornerDecorations from "../CornerDecorations";
import SectionBreak from "../SectionBreak";
import { AIAgent } from "../Svg/Agentic/AIAgent";
import { AuditGovernance } from "../Svg/Agentic/AuditGovernance";
import { EnterpriseSecurity } from "../Svg/Agentic/EnterpriseSecurity";
import { Workflow } from "../Svg/Agentic/Workflow";

function AboutCard({ challenge }) {
  return (
    <div className="relative fadeup">
      <div
        className={`
                    relative bg-white  hover:border-primary-blue group hover:shadow-md hover:drop-shadow-md duration-300 ease-in-out group 
                    w-[30vw] h-[16vw] max-md:w-[42vw] max-md:h-[25vw] p-[2vw] max-md:p-[3vw] max-sm:p-[7vw] max-sm:w-full max-sm:pr-[12vw] max-sm:h-[55vw] border
                    border-border-color flex flex-col
                `}
      >
        <CornerDecorations />

        {/* Icon/Image */}
        <div className="mb-auto w-[5vw] h-[5vw] max-sm:h-[14vw] max-sm:w-[14vw] max-md:h-[8vw] max-md:w-[8vw] text-foreground group-hover:text-primary-blue">
          {challenge.icon}
        </div>

        {/* Text */}
        <p className="text-30 mt-auto max-sm:text-[5.5vw] leading-[1.2] max-md:leading-[1.3] max-sm:leading-[1.4] text-foreground">
          {challenge.title}
        </p>
      </div>
    </div>
  );
}

export default function AgenticAbout() {
  return (
    <section className="relative w-full py-[7%] pt-[10%] max-sm:px-[7vw] max-md:px-[6vw] max-sm:py-[20%] space-y-[8vw] max-sm:space-y-[24vw] max-md:space-y-[12vw] z-2">
      {/* <Copy>  */}
      <div className="mx-auto text-center w-[70%] max-md:w-full max-sm:w-full space-y-[2.5vw] max-sm:space-y-[6vw] max-md:space-y-[5vw]">
        <h2 className=" text-center text-76 text-[#0A1B4B] leading-[1.2] max-sm:leading-[1.4] max-md:leading-[1.3]">
          Built on proven DSW Enterprise AI OS and UnifyAI Kernel
        </h2>
      <p className="text-24">The AgenticAI runtime brings agent orchestration, audit-first governance, and human-in-the-loop controls for regulated enterprises. Production-grade AgenticAI runtime is purpose-built for enterprises. It unifies data pipelines and agents into a single governed runtime, so regulated enterprises can deploy autonomous workflows with confidence.</p>
      </div>
      {/* </Copy> */}

      <div className="flex flex-wrap justify-between my-auto mx-auto w-[72%] max-md:w-full max-sm:w-full max-sm:mx-auto max-sm:flex-col  space-y-[6vw] max-sm:space-y-[10vw]">
        {challenges.map((challenge, index) => (
          <AboutCard key={index} challenge={challenge} />
        ))}
      </div>
    </section>
  );
}

const challenges = [
  {
    icon: <AIAgent/>,
    title: "AI-powered Agents in hours",
  },
  {
    icon: <Workflow/>,
    title: "Agentic AI Workflows in days",
  },
  {
    icon: <AuditGovernance/>,
    title: "Audit-first governance",
  },
  {
    icon: <EnterpriseSecurity/>,
    title: "Enterprise security & deployment flexibility",
  },
];
