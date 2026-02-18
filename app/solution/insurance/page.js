import { getPageMetadata } from "@/components/config/metadata";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import Benefits from "@/components/Solution/Benefits";
import Breaks from "@/components/Solution/Breaks";
import CaseStudy from "@/components/Solution/CaseStudy";
import Compliance from "@/components/Solution/Compliance";
import Features from "@/components/Solution/Features";
import Operations from "@/components/Solution/Operations";
import Runtime from "@/components/Solution/Runtime";
import WorkFlows from "@/components/Solution/WorkFlows";
import Claims from "@/components/Svg/Solutions/Claims";
import Focus from "@/components/Svg/Solutions/Focus";
import Nodes from "@/components/Svg/Solutions/Nodes";
import UnderWriting from "@/components/Svg/Solutions/UnderWriting";
import { WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import React from "react";

export const metadata = getPageMetadata({
  title: "Enterprise AI for Insurance - insurAInce by DSW",
  description: "insurAInce is a unified AI & GenAI platform built for insurers — deploy AI use cases in days, agents in hours, with compliance and scale.",
  url: "insuraince",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/insurance",
    languages: {
      "en-US": "/solutions/insurance",
    },
  },
  openGraph: {
    url: "insuraince",
    images: [
      {
        url: `${homepage}seo/solutions.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});
const Page = () => {
  return (
    <>
    <WebpageJsonLd metadata={metadata} />
    <Layout>
      <HeroNew
        heroContent={heroContent}
        variant={"topLeft"}
        breadcrumbs={true}
      />

      <Runtime runtimeContent={runtimeContent} />
      <Breaks breaksContent={breaksContent}/>
      <Features featuresContent={featuresContent} />
      <WorkFlows workflowsContent={workflowsContent}/>
      <CaseStudy caseStudyContent={caseStudyContent}/>
      <Operations operationsContent={operationsContent} />
      <Compliance complianceContent={complianceContent}/>
      <Benefits benefitsContent={benefitsContent}/>
       <CTAFinal ctaContent={ctaContent}/>
    </Layout>
    </>
  );
};

export default Page;

const heroContent = {
  tagline: "Govern underwriting, claims, and fraud on a single AI operating layer",
  heading: "The Enterprise AI Operating System Purpose Built for Insurers",
  headingWidth: "w-[84%]",
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
  paraWidth: "w-[40%]",
  images: false,
  para:
    "Enable production AI across the insurance lifecycle - controlled, auditable, and operated as one system.",
};

const runtimeContent = {
  heading:
    "From disconnected models to runtime-governed insurance execution",
  description:
    "Most insurers already run models in underwriting, claims, and fraud. Few can operate them continuously across the enterprise.",
  items: [
    {
      number: "01",
      text: "Drives underwriting and pricing decisions in real time",
    },
    {
      number: "02",
      text: "Operates inside claims and servicing workflows",
    },
    {
      number: "03",
      text: "Interacts with policyholders, agents, and adjusters",
    },
    {
      number: "04",
      text: "Must be governed during execution, not after deployment",
    },
  ],
};

const breaksContent = {
  tagline:
    "It is not about building Insurance AI. It is about running it as a system across the enterprise.",
  heading:
    "Where insurance AI breaks without a governed operating system",
  challenges: [
    {
      icon: <UnderWriting />,
      title: "Underwriting, claims, and fraud models operate in silos",
    },
    {
      icon: <Claims />,
      title:
        "Governance exists as oversight instead of execution control",
    },
    {
      icon: <Focus />,
      title:
        "Regulatory pressure increases audit and model risk exposure",
    },
    {
      icon: <Nodes />,
      title:
        "Each new use case introduces new tooling, vendors, and operational complexity",
    },
  ],
};

const featuresContent = {
  heading:
    "Build unlimited Insurance AI and Agentic AI use cases. Scale without new stacks or vendors.",
  cards: [
    {
      title: "Runtime-governed underwriting and risk intelligence",
      description:
        "Deploy underwriting models with controlled decisioning and continuous monitoring.",
      bullets: [
        "Risk scoring and pricing intelligence",
        "Submission and document analysis",
        "Controlled model rollout and monitoring",
      ],
    },
    {
      title: "Claims execution with policy-aware automation",
      description:
        "Operate FNOL, triage, and adjudication with accountable AI workflows.",
      bullets: [
        "Claims severity prediction",
        "Case prioritization",
        "Adjuster workflow support",
      ],
    },
    {
      title: "Fraud detection operating inside the claims lifecycle",
      description:
        "Identify anomalies across policy and claims workflows with traceable decisioning.",
      bullets: [
        "Behavioral and network anomaly detection",
        "Fraud triage acceleration",
        "Investigation support",
      ],
    },
    {
      title: "Agentic operations across the enterprise",
      description:
        "Run agentic workflows safely with runtime controls and built-in guardrails.",
      bullets: [
        "Tool + action permissions",
        "Human-in-the-loop approvals",
        "Continuous audit trails and reversibility",
      ],
    },
  ],
};

const workflowsContent = {
  heading: "More insurance workflows on the AI Operating System",
  items: [
    { number: "01", title: "Policy servicing automation" },
    { number: "02", title: "Claims intake and triage" },
    { number: "03", title: "Agent-assisted customer support" },
    { number: "04", title: "Fraud investigation workflows" },
  ],
};

const caseStudyContent = {
  heading: "Insurance AI in production",
  subheading: "Real deployment. Measurable operational impact.",
  company: "Borosil",
  description:
    "A leading Indian glassware and consumer products manufacturer transforms logistics with AI-powered fleet analytics.",
  imageContent: <p>Case Study Image</p>, // Replace with <Image /> later
  button: {
    present: true,
    text: "Read More",
    href: "#",
  },
};


const benefitsContent = {
  sectionId: "finacle-outcomes",
  heading:
    "Scale insurance AI and Agentic AI easily – No governance gaps, vendor lock in, or cost sprawl",
  points: [
    { id: "01", text: "On-premises environments" },
    { id: "02", text: "Private data centers" },
    { id: "03", text: "Private cloud" },
    { id: "04", text: "Hybrid architectures" },
  ],
};

const complianceContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  logos: [
    { src: "/assets/solution/iso-42001.png", alt: "ISO 42001" },
    { src: "/assets/solution/iso-27001.png", alt: "ISO 27001" },
    { src: "/assets/solution/soc-2-compliant.png", alt: "SOC 2" },
    { src: "/assets/solution/hippa-compliant.png", alt: "HIPAA" },
    { src: "/assets/solution/gdpr-compliant.png", alt: "GDPR" },
  ],
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};

const ctaContent={
  heading:"Operate insurance AI as enterprise infrastructure  ",
  para:"See how the DSW Enterprise AI Operating System governs execution across underwriting, claims, fraud, operations, and customer engagement. ",
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo",
    book:true
  },
  secondaryButton:{
    present:true,
    link:"https://calendly.com/",
    text:"Schedule a Call",
    targetSecondary:true
  },
}

const operationsContent = {
  heading: "Kernel-governed execution across underwriting, claims, and operations",
  tabs: [
    {
      label: "Governance enforced where AI runs",
      intro: "Policies execute inside workflows, not outside them.",
      bullets: [
        "Governance-as-code at runtime",
        "Policy enforcement across models, agents, and workflows",
        "Auditability, traceability, and reversibility embedded into execution",
      ],
    },
    {
      label: "Unified runtimes for models and agentic systems",
      intro: "Operate ML and agentic execution within one controlled environment.",
      bullets: [
        "Model lifecycle governance",
        "Real-time and batch inference control",
        "Human-in-the-loop boundaries",
      ],
    },
    {
      label: "Integration without replacing core insurance platforms",
      intro: "Connect policy, claims, and data ecosystems through governed interfaces.",
      bullets: [
        "Works with core systems and decision engines",
        "Enables modernization without disruption",
        "Expands ecosystem without vendor lock-in",
      ],
    },
    {
      label: "Full enterprise custody of AI infrastructure and assets",
      intro: "Operate entirely within your environment with ownership intact.",
      bullets: [
        "On-prem, cloud, or hybrid",
        "Full custody of data, models, and IP",
        "No outbound learning or forced SaaS dependency",
      ],
    },
  ],
};