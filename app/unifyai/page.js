import React from "react";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import UnifyAbout from "@/components/UnifyAI/About";
import AlwaysOnAI from "@/components/AlwaysOnAI";
import UseCases from "@/components/UnifyAI/UseCases";
import Fragmented from "@/components/UnifyAI/Fragmented";
import Capabilities from "@/components/UnifyAI/Capabilities";
import Accelerate from "@/components/UnifyAI/Accelerate";
import { WebpageJsonLd } from "@/lib/json-ld";
import { getPageMetadata } from "@/components/config/metadata";
import { homepage } from "@/lib/util";
import CertificationsAndAwards from "@/components/Homepage/CertificationsAndAwards";


export const metadata = getPageMetadata({
  title: "UnifyAI - Operating System for Enterprise AI",
  description:
    "Deploy AI use cases in 30 days, GenAI in hours — UnifyAI delivers full-stack, secure, scalable platform for enterprises.",
  url: "unify",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/unifyai",
    languages: {
      "en-US": "/unifyai",
    },
  },
  openGraph: {
    url: "unifyai",
    images: [
      {
        url: `${homepage}seo/unifyai.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});
const AgenticAI = () => {
  return (
    <>
    <WebpageJsonLd metadata={metadata} />
      <Layout>
        <main className="min-h-screen">
          <HeroNew heroContent={heroContent} variant={"rightVertical"} />
          <UnifyAbout />
          <AlwaysOnAI content={tourContent} imgWidth={"w-[80vw]"} walkthrough={true} />
          <UseCases />
          <Fragmented />
          <Capabilities />
          <Accelerate />
           <CertificationsAndAwards certificationsContent={certificationsContent}/>
          <CTAFinal ctaContent={ctaContent} />
        </main>
      </Layout>
    </>
  );
};

export default AgenticAI;

const heroContent = {
  tagline:
    "No more delays. No more stalled pilots. Just production-ready AI/ML in weeks.",
  heading: "Enterprise AI/ML Runtime Built for Real-World Use Case Deployment",
  primaryButton: {
    present: false,
    link: "#",
    text: "Book a Demo",
  },
  secondaryButton: {
    present: false,
    link: "#",
    text: "Talk to our Team",
  },
};

const ctaContent = {
  heading: "Ready to run enterprise AI safely, continuously, and at scale ? ",
  para: "Launch smarter, faster, scalable AI / ML runtime.",
  subPara: false,
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
  },
  secondaryButton: {
    present: true,
    link: "#",
    text: "Contact Sales",
  },
};

const tourContent = {
  heading: "Take a lightning tour of the DSW AI/ML Runtime",
  para: "Your AI foundation not just for today’s use cases, but for tomorrow’s vision.",
  tagline: "",
};

const certificationsContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};