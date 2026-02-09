import { AIAgent } from '../Svg/AIAgent';
import { Workflow } from '../Svg/Workflow';
import { SecurityDeployment } from '../Svg/SecurityAndDeployment';
import { AuditGovernance } from '../Svg/AuditGovernance';
import CornerDecorations from '../CornerDecorations';

function AboutCard({ challenge }) {
    return (
        <div className="relative">

            <div
                className={`
                    relative bg-white hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out group 
                    w-[30vw] h-[16vw] p-[2vw] border
                    border-border-color flex flex-col
                `}
            >
                 <CornerDecorations />
               

                {/* Icon/Image */}
                <div className="mb-auto w-[5vw] h-[5vw]">
                    <challenge.Icon className="w-full duration-300 ease-in-out h-full group-hover:text-primary-blue" />
                </div>

                {/* Text */}
                <p className="text-[1.3vw] font-sans font-light mt-auto">
                    {challenge.title}
                </p>
            </div>
        </div>
    );
}

// Updated challenges data


export default function AgenticAbout() {
 
    return (
        <section className="relative w-full py-[10%] space-y-[8vw]">
   
            <div className="mx-auto text-center w-[85%] space-y-[2.5vw]">
               
                <p className="text-44 font-extralight ">
                    Built on the proven DSW Enterprise AI OS and UnifyAI Kernel, the AgenticAI runtime brings agent orchestration, audit-first governance, and human-in-the-loop controls for regulated enterprises.  
                </p>
                <p className="text-44 font-extralight ">
                    Production-grade AgenticAI runtime is purpose-built for enterprises. It unifies data pipelines and agents into a single governed runtime, so regulated enterprises can deploy autonomous workflows with confidence. 
                </p>
            </div>

         
            <div className="flex flex-wrap justify-between my-auto mx-auto w-[75%]  space-y-[6vw]">
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
    }
];

