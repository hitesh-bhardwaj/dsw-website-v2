"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import gsap from "gsap";
import LinkButton from "../Buttons/LinkButton";
import Copy from "../Animations/Copy";

const listingData = [
  {
    date: "October 15, 2023",
    title: "Traditional AI vs AI as a System",
    subtitle: "Why Enterprises Are Moving Beyond Fragmented Tools",
    description:
      "Learn how enterprises can move from experimentation to full-scale deployment of AI/ML and GenAI—while meeting compliance and governance standards.",
    imgSrc: "/assets/whitepapers/from-pilot-to-production.png",
    link: "/from-pilot-to-production",
    btnText: "Get the Whitepaper",
    content: `
      <div class="space-y-[1vw] max-md:space-y-[3vw]">
        <h3 class="text-44 max-sm:text-[5.5vw]">
          Traditional AI vs AI as a System
        </h3>

        <p class="text-white-200/80 text-24 leading-[1.35] max-md:text-[3.5vw] max-sm:text-[5.5vw]">
          Why Enterprises Are Moving Beyond Fragmented Tools
        </p>
      </div>

      <div class="space-y-[1vw] max-sm:space-y-[4vw]">
        <p class="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
          What This Paper Covers:
        </p>

        <p class="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
          This whitepaper presents a side-by-side comparison of:
        </p>

        <ul class="list-disc pl-[2vw] space-y-[0.5vw] max-md:pl-[4vw] max-sm:pl-[6vw] max-sm:space-y-[2vw]">
          <li class="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
            Traditional AI approaches used across enterprises today
          </li>

          <li class="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
            A system-led approach enabled by an Enterprise AI Operating System
          </li>
        </ul>

        <p class="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
          It outlines how AI can be operated, governed, and scaled as a unified system instead of a fragmented stack.
        </p>

        <p class="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
          Learn how enterprises can move from experimentation to full-scale deployment of AI/ML and GenAI while meeting compliance, governance, and operational standards.
        </p>
      </div>
    `,
  },
  {
    date: "October 15, 2023",
    title: "Deploying GenAI Responsibly: A Strategy for Regulated Enterprises",
    description:
      "Explore GenAI architecture, risk mitigation techniques, and deployment best practices across industries like insurance and healthcare.",
    imgSrc: "/assets/whitepapers/deploying-genai.png",
    link: "#",
    btnText: "Get the Whitepaper",
  },
  {
    date: "October 15, 2023",
    title:
      "Security by Design: Building AI with SOC 2, ISO 27001, and GDPR in Mind",
    description:
      "Understand the technical and procedural safeguards needed to deploy AI solutions that are audit-ready and enterprise-secure.",
    imgSrc: "/assets/whitepapers/security-by-design.png",
    link: "#",
    btnText: "Get the Whitepaper",
  },
  {
    date: "October 15, 2023",
    title: "AI in Insurance: 2025 Outlook & Innovation Roadmap",
    description:
      "Future-proof your strategy with predictions, investment trends, and use cases transforming the insurance sector.",
    imgSrc: "/assets/whitepapers/ai-in-insurance.png",
    link: "#",
    btnText: "Get the Whitepaper",
  },
  {
    date: "October 15, 2023",
    title:
      "Security by Design: Building AI with SOC 2, ISO 27001, and GDPR in Mind",
    description:
      "Understand the technical and procedural safeguards needed to deploy AI solutions that are audit-ready and enterprise-secure.",
    imgSrc: "/assets/whitepapers/building-ai.png",
    link: "#",
    btnText: "Get the Whitepaper",
  },
];

const Listing = () => {
  useEffect(() => {
    if (globalThis.innerWidth > 0) {
      const ctx = gsap.context(() => {
        const content = document.querySelectorAll(".fadeupListing");

        content.forEach((content) => {
          gsap.from(content, {
            scrollTrigger: {
              trigger: content,
              start: "top 90%",
            },
            opacity: 0,
            y: 50,
            ease: "power3.out",
            duration: 2,
          });
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      className="relative z-[10] py-[7%] px-[5vw] max-md:mt-0"
      id="news-listing"
    >
      <div className="space-y-[7vw] max-sm:space-y-[20vw] max-md:space-y-[12vw]">
        <div className="w-full space-y-[1.5vw] max-sm:space-y-[7vw] max-md:space-y-[4vw]">
          <h2 className="text-80 headingAnim max-sm:w-full text-center">
            Featured Whitepapers
          </h2>

          <Copy>
            <p className="text-center">
              Watch demo walkthroughs, platform explainers, and customer
              success stories.
            </p>
          </Copy>
        </div>

        <div className="w-full space-y-[4vw] max-sm:space-y-[15vw] max-md:space-y-[10vw]">
          {listingData.map((data, id) => (
            <div
              key={id}
              className="w-full space-y-[4vw] fadeupListing max-sm:space-y-[10vw] max-md:space-y-[8vw]"
            >
              <div className="w-full h-fit flex gap-[2.5vw] max-md:flex-col max-sm:gap-[5vw] max-md:gap-[3vw]">
                <div className="w-[30vw] h-[20vw] rounded-[1.8vw] max-md:rounded-[3vw] overflow-hidden max-md:w-full max-sm:h-[25vh] max-sm:rounded-[4vw] max-md:h-[35vh]">
                  <Image
                    src={data.imgSrc}
                    alt={data.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={300}
                  />
                </div>

                <div className="w-[60%] flex flex-col gap-[1.5vw] max-md:w-full max-sm:gap-[7vw] max-md:gap-[3vw]">
                  {data.content ? (
                    <div
                      className="space-y-[1.5vw] max-sm:space-y-[5vw] max-md:space-y-[3vw]"
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                  ) : (
                    <>
                      <p className="max-sm:order-3 text-[1.05vw] max-md:text-[2.5vw] max-sm:text-[4vw] text-white-200">
                        {data.date}
                      </p>

                      <h3 className="text-44 text-white-200 max-sm:text-[5.5vw]">
                        {data.title}
                      </h3>

                      <p className="max-sm:order-1 max-md:text-[2.5vw] max-sm:text-[4.2vw]">
                        {data.description}
                      </p>
                    </>
                  )}

                  <LinkButton
                    href={data.link}
                    text={data.btnText}
                    className="order-4"
                  />
                </div>
              </div>

              <span className="w-full h-[1px] block bg-white/20 lineDraw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listing;