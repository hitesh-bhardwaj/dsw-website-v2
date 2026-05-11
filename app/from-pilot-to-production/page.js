"use client";

import Copy from "@/components/Animations/Copy";
import HeadingAnim from "@/components/Animations/HeadingAnim";
import Layout from "@/components/Layout/Layout";
import DemoForm from "@/components/Modals/DemoForm";
import Image from "next/image";
import React from "react";
// import DemoForm from "@/components/Forms/DemoForm";

const Page = () => {
  return (
    <Layout>
      <WhitePaper />
    </Layout>
  );
};

export default Page;

function WhitePaper() {
  const whitepaper = {
    title: "Traditional AI vs AI as a System",
    subtitle: "Why Enterprises Are Moving Beyond Fragmented Tools",
    image: "/assets/whitepapers/from-pilot-to-production.png",
    pdfUrl:
      "/assets/whitepapers/comparative-view-of-scattered-ai-vs-system-led-ai-execution.pdf",
    fileName: "comparative-view-of-scattered-ai-vs-system-led-ai-execution.pdf",
  };

  return (
    <section className="w-full fadeupListing px-[5vw] py-[10%] max-md:pt-[20%]">
      <div className="w-full h-fit flex justify-between max-md:flex-col max-sm:gap-[10vw] max-md:gap-[7vw]">
        <div className="w-[30vw] h-[20vw] rounded-[1.8vw] max-md:rounded-[3vw] overflow-hidden max-md:w-full max-sm:h-[25vh] max-sm:rounded-[4vw] max-md:h-[35vh] sticky top-[15%] max-md:static fadeup">
          <Image
            src={whitepaper.image}
            alt={whitepaper.title}
            className="w-full h-full object-cover"
            width={400}
            height={300}
            priority
          />
        </div>

        <div className="w-[60%] flex flex-col gap-[1.5vw] max-md:w-full max-sm:gap-[7vw] max-md:gap-[3vw]">
          <div className="space-y-[1.5vw] max-sm:space-y-[3vw]">
            <HeadingAnim>
            <h1 className="text-56 text-white-200 max-sm:text-[9vw] leading-10 max-sm:leading-[1.1]">
              {whitepaper.title}
            </h1>
            </HeadingAnim>
            <Copy>
            <p className="text-white-200/80 text-30 leading-[1.35] max-md:text-[3.5vw] max-sm:text-[5.5vw]">
              {whitepaper.subtitle}
            </p>

            </Copy>

          </div>
        
          <div className="space-y-[1vw] max-sm:space-y-[4vw] fadeup">
            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              What This Paper Covers:
            </p>

            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              This whitepaper presents a side-by-side comparison of:
            </p>

            <ul className="list-disc pl-[2vw] space-y-[0.5vw] max-md:pl-[4vw] max-sm:pl-[6vw] max-sm:space-y-[2vw]">
              <li className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
                Traditional AI approaches used across enterprises today
              </li>

              <li className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
                A system-led approach enabled by an Enterprise AI Operating
                System
              </li>
            </ul>

            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              It outlines how AI can be operated, governed, and scaled as a
              unified system instead of a fragmented stack.
            </p>
          </div>
          <div className="space-y-[1vw] max-sm:space-y-[4vw] fadeup">
            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              The Shift: AI as a System
            </p>

            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              Enterprise AI is at an inflection point.
            </p>
            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              Over the last decade, organizations have invested in models,
              pipelines, and AI-led applications across functions. While these
              efforts have delivered incremental value, most deployments remain
              fragmented across tools, teams, and environments.
            </p>
            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              What exists today is not a unified AI capability, but a collection
              of disconnected systems that are difficult to scale, govern, and
              operate reliably.
            </p>

            <ul className="list-disc pl-[2vw] space-y-[0.5vw] max-md:pl-[4vw] max-sm:pl-[6vw] max-sm:space-y-[2vw]">
              This whitepaper examines that shift.
              <li className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
                From AI as a collection of projects, tools, and pipelines
              </li>
              <li className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
                To AI as a continuously running, governed enterprise system
              </li>
              <li className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
                At the center of this shift is a new operating model.
              </li>
              <li className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
                One where AI execution is controlled, observable, and
                accountable by design.
              </li>
            </ul>

            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              Learn how AI is built today versus how it must operate going
              forward.
            </p>
            <p className="max-md:text-[2.5vw] max-sm:text-[4.2vw]">
              Not as isolated projects, but as a continuously governed system.
            </p>
          </div>

          <div className="mt-[2vw]">
            <div className="mb-[2vw] max-md:mb-[4vw] max-sm:mb-[6vw]">
             <HeadingAnim>
              <h2 className="text-white-200 text-[2vw] leading-[1.15] max-md:text-[4vw] max-sm:text-[6vw]">
                Download the Whitepaper
              </h2>

             </HeadingAnim>
             <Copy>
              <p className="mt-[0.8vw] text-white/70 text-[1vw] max-md:text-[2.2vw] max-sm:text-[4vw]">
                Fill out the form below and the PDF will download automatically
                after submission.
              </p>

             </Copy>
            </div>
            <div className="fadeup">

            <DemoForm
              pdfUrl={whitepaper.pdfUrl}
              fileName={whitepaper.fileName}
              submitText="Download Whitepaper"
              loadingText="Downloading..."
              successMessage="Whitepaper download started!"
              redirectOnSuccess={false}
              closeModalOnSuccess={false}
              formSource="Traditional AI vs AI as a System Whitepaper Download Form Success"
            />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
