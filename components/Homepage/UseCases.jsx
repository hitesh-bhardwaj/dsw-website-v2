"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

export default function UseCases() {
  useGSAP(() => {
    const cl = gsap.timeline({
      scrollTrigger: {
        trigger: "#usecases",
        start: "top 90%",
        end: "20% 90%",
        // markers: true,
        onEnter: () => {
          gsap.fromTo(
            "#usecases,#coreEnterprise",
            {
              backgroundColor: "#ffffff",
              color: "#111111",
            },
            {
              backgroundColor: "#02031c",
              color: "#ffffff",
            },
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            "#usecases,#coreEnterprise",
            {
              backgroundColor: "#02031c",
              color: "#ffffff",
            },
            {
              backgroundColor: "#ffffff",
              color: "#111111",
            },
          );
        },
      },
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#usecases",
        start: "20% 90%",
        end: "102% bottom",
        // markers: true,
        scrub: true,
      },
    });
    if (globalThis.innerWidth > 1024) {
      gsap.set(".content-container",{
        height: "0vw",
      })
      tl.to(".content-container", {
        height: "37vw",
        stagger: 0.25,
        duration: 0.4,
        ease: "power1.out",
      }).to(".use-case-container", {
        translateX: "-50%",
        ease: "power1.inOut",
        duration: 1.2,
        delay: -1.2,
        ease: "power1.inOut",
      });
    }
    
  });

  return (
    <section
      className="dark w-full pt-[7%] px-[5vw] h-[400vh]  text-white max-sm:px-[7vw] max-md:px-[6vw]  max-md:overflow-hidden max-md:h-fit max-sm:py-[25%] max-md:py-[12%] relative z-[20] mt-[-100vh]"
      id="usecases"
    >
      {/* Header */}

      <div className="w-[60%] flex flex-col gap-[2vw] text-center  mx-auto max-md:w-full max-sm:gap-[7vw] max-md:gap-[3.5vw] relative z-[10]">
        <HeadingAnim>
          <h2 className="text-76 leading-[1.2] max-sm:leading-[1.4] max-md:leading-[1.3]">
            Unlimited Use Cases.<br/> One Operating Foundation.
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
      <div className="w-screen h-screen sticky top-0 mt-[-50vh]  overflow-hidden ml-[-5vw] pl-[5vw] max-md:h-fit max-md:sm-[15vw] max-md:static max-md:mt-[10vw] max-md:overflow-x-scroll mobile-scrollbar max-md:pr-[7vw] z-[15] ">
        <div className="w-fit h-full flex gap-[3vw] items-end use-case-container ">
          {USE_CASES.map((useCase) => (
            <div
              key={useCase.id}
              className="w-[28vw] h-fit flex flex-col relative use-case justify-between max-sm:w-[80vw] max-md:w-[55vw]"
            >
              <div>
                <div className="text-76 pl-[3vw] font-light">{useCase.id}</div>
                <div className="w-full h-[10px] bg-primary-blue" />
              </div>

              <div className="w-full h-[37vw]  bg-white content-container max-sm:h-[100vw] max-md:h-[65vw]">
                <div className="p-[3vw] space-y-[3vw] text-foreground max-md:p-[7vw]">
                  <h4 className="text-32 font-medium max-md:font-normal text-[#0A1B4B]">
                    {useCase.title}
                  </h4>

                  <ul className="list-disc text-24 pl-[1vw] space-y-[0.5vw] max-md:pl-[3vw] max-sm:pl-[5vw] text-foreground">
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
    title: "Insurance-specific for AI, GenAI, agentic workflows",
    items: [
      "Early claim fraud detection",
      "Claims decisioning & straight-through processing",
      "Underwriting triage & risk scoring",
      "Customer service copilots (policy queries, documentation, endorsements)",
      "Agentic workflows for FNOL, claims routing, policy servicing",
    ],
  },
  {
    id: 3,
    title: "Telecom for network, customer, and field-ops intelligence",
    items: [
      "Predictive maintenance",
      "NOC automation with agentic workflows",
      "Churn prediction & customer retention",
      "Field engineer copilots",
    ],
  },
  {
    id: 4,
    title:
      "Retail & E-commerce for personalization, forecasting, and operational AI",
    items: [
      "Demand forecasting",
      "Dynamic pricing",
      "Recommendation systems",
      "GenAI customer support copilots",
    ],
  },
  {
    id: 5,
    title: "Healthcare for clinical and operational decision intelligences",
    items: [
      "Clinical summarization",
      "Claims & coding optimization",
      "Operational efficiency modelling",
      "GenAI medical knowledge assistants",
    ],
  },
  {
    id: 6,
    title:
      "Manufacturing & Industrial for predictive, preventive, and production intelligence",
    items: [
      "Predictive maintenance",
      "Process optimization",
      "Energy/throughput modelling",
      "GenAI copilots for SOPs and troubleshooting",
    ],
  },
];
