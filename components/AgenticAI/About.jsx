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
                    w-[30vw] h-[16vw] p-[2vw] max-sm:p-[7vw] max-sm:w-full max-sm:pr-[12vw] max-sm:h-[55vw] border
                    border-border-color flex flex-col
                `}
      >
        <CornerDecorations />

        {/* Icon/Image */}
        <div className="mb-auto w-[5vw] h-[5vw] max-sm:h-[14vw] max-sm:w-[14vw] text-foreground group-hover:text-primary-blue">
          {challenge.icon}
        </div>

        {/* Text */}
        <p className="text-30 mt-auto max-sm:text-[5.5vw] text-foreground">
          {challenge.title}
        </p>
      </div>
    </div>
  );
}

export default function AgenticAbout() {
  return (
    <section className="relative w-full py-[7%] pt-[10%] max-sm:px-[7vw] max-sm:py-[20%] space-y-[8vw] max-sm:space-y-[24vw] z-2">
      {/* <Copy>  */}
      <div className="mx-auto text-center w-[78%] max-sm:w-full space-y-[2.5vw] max-sm:space-y-[6vw]">
        <SectionBreak content={" Built on the proven DSW Enterprise AI OS and UnifyAI Kernel, the AgenticAI runtime brings agent orchestration, audit-first governance, and human-in-the-loop controls for regulated enterprises."} />
        <SectionBreak content={" Production-grade AgenticAI runtime is purpose-built for enterprises. It unifies data pipelines and agents into a single governed runtime, so regulated enterprises can deploy autonomous workflows with confidence."} />
      </div>
      {/* </Copy> */}

      <div className="flex flex-wrap justify-between my-auto mx-auto w-[72%] max-sm:w-full max-sm:mx-auto max-sm:flex-col  space-y-[6vw] max-sm:space-y-[10vw]">
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
