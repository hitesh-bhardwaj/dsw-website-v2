"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

export default function UseCases() {
  useGSAP(() => {
    gsap.fromTo(
      "#usecases,#coreEnterprise",
      {
        backgroundColor: "#ffffff",
        color: "#111111",
      },
      {
        backgroundColor: "#02031c",
        color: "#ffffff",
        scrollTrigger: {
          trigger: "#usecases",
          start: "top 70%",
          end: "20% 70%",
          scrub: true,
        },
      },
    );
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#usecases",
        start: "20% 90%",
        end: "102% bottom",
        // markers: true, 
        scrub: true,
      },
    });
    tl.from(".content-container",{
      height:"0vh",
      stagger:0.25,
      duration:0.4,
      ease:"power1.inOut"
    })
    .to(".use-case-container",{
      translateX:"-40%",
       ease:"power1.inOut",
      duration:1.2,
      delay:-1.2,
      ease:"power1.inOut"
    })
  });

  return (
    <section
      className="w-full bg-[#02031c] pt-[7%] px-[5vw] h-[400vh] text-white"
      id="usecases"
    >
      {/* Header */}

      <div className="w-[60%] flex flex-col gap-[2vw] text-center  mx-auto">
        <HeadingAnim>
        <h2 className="text-76">
          Unlimited Use Cases. One Operating Foundation.
        </h2>
        </HeadingAnim>
        <Copy>
        <h3 className="text-44">
          Your use cases. Your artifacts. Your control.
        </h3>
        </Copy>
        <Copy>
        <p className="text-30">
          From BFSI to telecom, retail, and healthcare, organizations build AI
          and Agentic AI use cases that evolve, scale, and remain under
          enterprise control.
        </p>
        </Copy>
      </div>

      {/* Use Case Cards */}
      <div className="w-screen h-screen  -mt-[45vh] sticky top-0  overflow-hidden ml-[-5vw] pl-[5vw] ">
        <div className="w-fit h-full flex gap-[3vw] items-end use-case-container">
        {USE_CASES.map((useCase) => (
          <div
            key={useCase.id}
            className="w-[28vw] h-fit flex flex-col relative use-case justify-between"
          >
            <div>
              <div className="text-76 pl-[3vw] font-light">{useCase.id}</div>
              <div className="w-full h-[10px] bg-primary-blue" />
            </div>

            <div className="w-full h-[65vh]  bg-white content-container">
              <div className="p-[3vw] space-y-[3vw] text-foreground">
                <h4 className="text-32 font-medium">{useCase.title}</h4>

                <ul className="list-disc pl-[1vw] space-y-[0.5vw] text-[1.15vw]">
                  {useCase.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  {
    id: 1,
    title: "Banking and FS for AI and agentic intelligence",
    items: [
      "KYC/AML intelligence & continuous monitoring",
      "Credit risk modelling & portfolio scoring",
      "Collections optimization & delinquency prediction",
      "Agentic copilots for relationship managers, ops, and compliance",
      "Enterprise GenAI knowledge systems for teams",
    ],
  },
  {
    id: 2,
    title: "Telecom, Media, and Network Intelligence",
    items: [
      "Churn prediction & subscriber intelligence",
      "Agentic customer support and escalation handling",
      "Network fault prediction & proactive remediation",
      "Revenue assurance & fraud detection",
      "GenAI knowledge copilots for operations teams",
    ],
  },
  {
    id: 3,
    title: "Retail, Healthcare, and Regulated Industries",
    items: [
      "Demand forecasting & inventory optimization",
      "Personalized recommendation systems",
      "Clinical decision support & triage intelligence",
      "Compliance-first GenAI workflows",
      "Enterprise knowledge systems for frontline teams",
    ],
  },
  {
    id: 4,
    title: "Telecom, Media, and Network Intelligence",
    items: [
      "Churn prediction & subscriber intelligence",
      "Agentic customer support and escalation handling",
      "Network fault prediction & proactive remediation",
      "Revenue assurance & fraud detection",
      "GenAI knowledge copilots for operations teams",
    ],
  },
  {
    id: 5,
    title: "Retail, Healthcare, and Regulated Industries",
    items: [
      "Demand forecasting & inventory optimization",
      "Personalized recommendation systems",
      "Clinical decision support & triage intelligence",
      "Compliance-first GenAI workflows",
      "Enterprise knowledge systems for frontline teams",
    ],
  },
];
