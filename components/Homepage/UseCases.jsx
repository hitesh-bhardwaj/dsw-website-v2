"use client"

import { useGSAP } from "@gsap/react";

export default function UseCases() {
useGSAP(()=>{
    
})

  return (
    <section
      className="w-full bg-[#02031c] pt-[7%] px-[5vw] h-fit text-white"
      id="usecases"
    >
      {/* Header */}
      
      <div className="w-[60%] flex flex-col gap-[2vw] text-center mx-auto">
        <h2 className="text-76">
          Unlimited Use Cases. One Operating Foundation.
        </h2>
        <h3 className="text-44">
          Your use cases. Your artifacts. Your control.
        </h3>
        <p className="text-30">
          From BFSI to telecom, retail, and healthcare, organizations build AI
          and Agentic AI use cases that evolve, scale, and remain under
          enterprise control.
        </p>
      </div>

      {/* Use Case Cards */}
      <div className="w-full h-fit flex justify-between mt-[6vw]">
        {USE_CASES.map((useCase) => (
          <div
            key={useCase.id}
            className="w-[31%] h-[40vw] flex flex-col relative use-case"
          >
            {/* Index */}
            <div className="text-76 pl-[3vw] font-light">{useCase.id}</div>

            {/* Accent Bar */}
            <div className="w-full h-[10px] bg-primary-blue" />

            {/* Content */}
            <div className="w-full h-full bg-white p-[3vw] space-y-[3vw] text-foreground">
              <h4 className="text-32 font-medium">{useCase.title}</h4>

              <ul className="list-disc pl-[1vw] space-y-[0.5vw]">
                {useCase.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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
];
