import { AIAgent } from "../Svg/AIAgent";
import { Workflow } from "../Svg/Workflow";
import { SecurityDeployment } from "../Svg/SecurityAndDeployment";
import { AuditGovernance } from "../Svg/AuditGovernance";
import CornerDecorations from "../CornerDecorations";
import HeadingAnim from "../Animations/HeadingAnim";

function AboutCard({ challenge }) {
  return (
    <div className="relative fadeup">
      <div
        className={`
                    relative bg-white  hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out group 
                    w-[30vw] h-[16vw] p-[2vw] max-sm:p-[7vw] max-sm:w-full max-sm:pr-[12vw] max-sm:h-[55vw] border
                    border-border-color flex flex-col
                `}
      >
        <CornerDecorations />

        {/* Icon/Image */}
        <div className="mb-auto w-[5vw] h-[5vw] max-sm:h-[12vw] max-sm:w-[12vw]">
          <challenge.Icon className="w-full duration-300 ease-in-out h-full group-hover:text-primary-blue" />
        </div>

        {/* Text */}
        <p className="text-24 font-sans max-sm:leading-[1.2] font-light mt-auto">
          {challenge.title}
        </p>
      </div>
    </div>
  );
}

export default function AgenticAbout() {
  return (
    <section className="relative w-full py-[7%] max-sm:px-[7vw] max-sm:py-[15%] space-y-[8vw] max-sm:space-y-[24vw]">
      {/* <Copy>  */}
      <div className="mx-auto text-center w-[78%] max-sm:w-full space-y-[2.5vw] max-sm:space-y-[6vw]">
        <HeadingAnim>
          <p className="text-44 font-extralight max-sm:leading-normal leading-[1.4]">
            Built on the proven DSW Enterprise AI OS and UnifyAI Kernel, the
            AgenticAI runtime brings agent orchestration, audit-first
            governance, and human-in-the-loop controls for regulated
            enterprises.
          </p>
        </HeadingAnim>
        <HeadingAnim>
          <p className="text-44 font-extralight leading-[1.4] max-sm:leading-normal">
            Production-grade AgenticAI runtime is purpose-built for enterprises.
            It unifies data pipelines and agents into a single governed runtime,
            so regulated enterprises can deploy autonomous workflows with
            confidence.
          </p>
        </HeadingAnim>
      </div>
      {/* </Copy> */}

      <div className="flex flex-wrap justify-between my-auto mx-auto w-[75%] max-sm:w-full max-sm:mx-auto max-sm:flex-col  space-y-[6vw] max-sm:space-y-[10vw]">
        {challenges.map((challenge, index) => (
          <AboutCard key={index} challenge={challenge} />
        ))}
      </div>
    </section>
  );
}

const challenges = [
  {
    Icon: AIAgent,
    title: "AI-powered Agents in hours",
  },
  {
    Icon: Workflow,
    title: "Agentic AI Workflows in days",
  },
  {
    Icon: AuditGovernance,
    title: "Audit-first governance",
  },
  {
    Icon: SecurityDeployment,
    title: "Enterprise security & deployment flexibility",
  },
];
