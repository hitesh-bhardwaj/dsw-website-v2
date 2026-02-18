import React from 'react'
import AgenticAbout from '@/components/AgenticAI/About'
import AgenticCards from '@/components/AgenticAI/AgenticCards'
import CoreCapabilities from '@/components/AgenticAI/CoreCapabilities'
import AgentSteps from '@/components/AgenticAI/AgentSteps'
import HowAgenticWorks from '@/components/AgenticAI/HowAgenticWorks'
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import { WebpageJsonLd } from '@/lib/json-ld'
import { getPageMetadata } from '@/components/config/metadata'
import { homepage } from '@/lib/util'
import CertificationsAndAwards from '@/components/Homepage/CertificationsAndAwards'

export const metadata = getPageMetadata({
  title: "DSW AgenticAI – Governed Enterprise AI Agents for BFSI",
  description:
    "Deploy governed, explainable, production-ready AI agents for banking and insurance. Turn AI pilots into auditable, compliant automation with DSW AgenticAI.",
  url: "agentic-ai",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/agentic-ai",
    languages: {
      "en-US": "/agentic-ai",
    },
  },
  openGraph: {
    url: "agentic-ai",
    images: [
      {
        url: `${homepage}seo/agentic-ai.png`,
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
        <HeroNew heroContent={heroContent} variant={"bottomRight"} />
        <AgenticAbout />
        <AgenticCards />
        <CoreCapabilities />
        <AgentSteps />
        <HowAgenticWorks />
        <CertificationsAndAwards certificationsContent={certificationsContent}/>
        {/* <HowAgenticWorksWheel/> */}
         <CTAFinal ctaContent={ctaContent}/>
    </main>
    </Layout>
    </>
  )
}

export default AgenticAI

const heroContent={
  tagline:"Deploy AI agents in hours! ",
  heading:"Governed, explainable, production-ready agents for enterprises.",
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}

const ctaContent={
  heading:"DSW AgenticAI runtime for BFSI ",
  para:"Unify data, models and agent orchestration with pre-built BFSI playbooks, audit-first governance and human-in-the-loop controls - built for regulated financial services. ",
  subPara: true,
  subParaText: 'Turn AI pilots into auditable, production-grade agents',
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}

const certificationsContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};