import Image from 'next/image';
import { AIAgent } from '../Svg/AIAgent';
import { Workflow } from '../Svg/Workflow';
import { SecurityDeployment } from '../Svg/SecurityAndDeployment';
import { AuditGovernance } from '../Svg/AuditGovernance';



function AboutCard({ challenge }) {
    return (
        <div className="relative">
            <div
                className={`
                    relative bg-white group 
                    w-[30vw] h-[16vw] p-[2vw] border
                    border-border-color flex flex-col
                `}
            >
                {/* Corner Decorations */}
                <div className="absolute top-0 group-hover:top-[-0.5vw] group-hover:right-[-0.5vw] right-0 w-[0.3vw] h-[0.3vw]">
                    <Image
                        src="/Icons/CardsBorder/top-right.svg"
                        alt=""
                        width={5}
                        height={5}
                        className="w-full h-full"
                    />
                </div>
                <div className="absolute top-0 left-0 group-hover:top-[-0.5vw] group-hover:left-[-0.5vw] w-[0.3vw] h-[0.3vw] ">
                    <Image
                        src="/Icons/CardsBorder/top-left.svg"
                        alt=""
                        width={5}
                        height={5}
                        className="w-full h-full"
                    />
                </div>
                <div className="absolute bottom-0 right-0 group-hover:bottom-[-0.5vw] group-hover:right-[-0.5vw] w-[0.3vw] h-[0.3vw]">
                    <Image
                        src="/Icons/CardsBorder/bottom-right.svg"
                        alt=""
                        width={5}
                        height={5}
                        className="w-full h-full"
                    />
                </div>
                <div className="absolute bottom-0 left-0 group-hover:bottom-[-0.5vw] group-hover:left-[-0.5vw] w-[0.3vw] h-[0.3vw]">
                    <Image
                        src="/Icons/CardsBorder/bottom-left.svg"
                        alt=""
                        width={5}
                        height={5}
                        className="w-full h-full"
                    />
                </div>

                {/* Icon/Image */}
                <div className="mb-auto w-[5vw] h-[5vw]">
                    <challenge.Icon className="w-full h-full" />
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
        <section className="relative w-full py-[10.42vw] px-[3.91vw] space-y-[8vw]">
   
            <div className="mx-auto text-center w-[80%] space-y-[2.5vw]">
               
                <p className="text-44 font-extralight ">
                    Built on the proven DSW Enterprise AI OS and UnifyAI Kernel, the AgenticAI runtime brings agent orchestration, audit-first governance, and human-in-the-loop controls for regulated enterprises.  
                </p>
                <p className="text-44 font-extralight ">
                    Production-grade AgenticAI runtime is purpose-built for enterprises. It unifies data pipelines and agents into a single governed runtime, so regulated enterprises can deploy autonomous workflows with confidence. 
                </p>
            </div>

         
            <div className="flex flex-wrap justify-between  mx-auto w-[75%]  space-y-[6vw]">
                {challenges.map((challenge, index) => (
                    <AboutCard key={index} challenge={challenge} />
                ))}
            </div>

             <div className="text-center mx-auto w-[80%]">
                <p className=" font-normal leading-[1.25] text-56 font-heading">
                   Turn proofs of concept into auditable, production-grade
 automation with explainable
agents, deterministic governance, 
and enterprise-grade security.
                </p>
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

