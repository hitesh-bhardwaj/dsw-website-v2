import { getPageMetadata } from "@/components/config/metadata";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import CertificationsAndAwards from "@/components/Homepage/CertificationsAndAwards";
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
  title: "Enterprise AI for Telecom - Telecom by DSW",
  description:
    "Run network, operations, and subscriber intelligence on one AI operating layer — governed execution across OSS, BSS, and service environments.",
  url: "telecom",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/telecom",
    languages: {
      "en-US": "/solutions/telecom",
    },
  },
  openGraph: {
    url: "telecom",
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
        <HeroNew heroContent={heroContent} variant={"topLeft"} breadcrumbs={true} />

        <Runtime runtimeContent={runtimeContent} />
        <Breaks breaksContent={breaksContent} />
        <Features featuresContent={featuresContent} />
        <WorkFlows workflowsContent={workflowsContent} />
        <CaseStudy caseStudyContent={caseStudyContent} />
        <Operations operationsContent={operationsContent} />
       <CertificationsAndAwards certificationsContent={certificationsContent}/>
        <Benefits benefitsContent={benefitsContent} />
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
};

export default Page;

/* ---------------------------------------------
   HERO
--------------------------------------------- */
const heroContent = {
  tagline:
    "Real-time AI execution across OSS, BSS, network, and service environments.",
  heading: "Run network, operations, and subscriber intelligence on one AI operating layer",
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
  paraWidth: "w-[60%]",
  images: false,
  para:
    "Operate Telecom AI and Agentic AI across network performance, customer experience, field operations, and revenue systems within one governed execution runtime.",
};

/* ---------------------------------------------
   RUNTIME
--------------------------------------------- */
const runtimeContent = {
  heading: "Telecom AI is everywhere. Operational control is not.",

  description:
    "Most telecom providers run AI across network optimization, churn, fraud, and customer operations. Few can operate it continuously across OSS, BSS, and service environments.",

  items: [
    { number: "01", text: "Drives network optimization and capacity decisions in real time" },
    { number: "02", text: "Operates inside service assurance and customer workflows" },
    { number: "03", text: "Supports NOC teams, field engineers, and care operations" },
    { number: "04", text: "Must be governed during execution, not after deployment" },
  ],
};

/* ---------------------------------------------
   BREAKS
--------------------------------------------- */
const breaksContent = {
  heading: "Where telecom AI breaks without an operating layer",

  challenges: [
    { icon: <UnderWriting />, title: "Network, customer, and operations AI operate in silos" },
    { icon: <Claims />, title: "Governance sits outside runtime execution" },
    { icon: <Focus />, title: "OSS and BSS environments remain fragmented" },
    { icon: <Nodes />, title: "Every new use case introduces new tooling, vendors, and complexity" },
  ],

  extra:
    "<p>Providers are not lacking AI capability. <br/> They are lacking a system to operate it across the telecom stack.</p>",
};

/* ---------------------------------------------
   FEATURES
--------------------------------------------- */
const featuresContent = {
  heading: "Unlimited Telecom AI and Agentic AI. One governed runtime.",

  cards: [
    {
      title: "Network intelligence operating at runtime",
      description:
        "Optimize performance, capacity, and fault detection within governed decision environments.",
      bullets: [
        "Predictive network performance intelligence",
        "Congestion and capacity optimization",
        "Fault detection and resolution support",
      ],
    },
    {
      title: "Service assurance and operations automation",
      description:
        "Run AI inside operational workflows supporting uptime and reliability.",
      bullets: [
        "Incident prediction and prioritization",
        "NOC workflow intelligence",
        "Root cause analysis support",
      ],
    },
    {
      title: "Subscriber intelligence across lifecycle and experience",
      description:
        "Operate personalization, churn prevention, and engagement within controlled execution environments.",
      bullets: [
        "Churn prediction intelligence",
        "Customer experience signals",
        "Next-best engagement actions",
      ],
    },
    {
      title: "Revenue assurance and fraud intelligence inside transaction ecosystems",
      description:
        "Monitor billing, usage, and financial activity in real time.",
      bullets: [
        "Usage anomaly detection",
        "Billing and revenue leakage insights",
        "Fraud monitoring across telecom workflows",
      ],
    },
    {
      title: "Agentic copilots for NOC, field, and service teams",
      description:
        "Assist engineers and operations teams with governed decision support.",
      bullets: [
        "NOC decision copilots",
        "Field engineer assist copilots",
        "Service operations support",
      ],
    },
  ],
};

/* ---------------------------------------------
   WORKFLOWS
--------------------------------------------- */
const workflowsContent = {
  heading: "Telecom workflows expanding without new stacks or vendor sprawl",
  items: [
    { number: "01", title: " Field service optimization" },
    { number: "02", title: " Infrastructure planning intelligence" },
    { number: "03", title: "Device lifecycle intelligence" },
    { number: "04", title: "Partner ecosystem monitoring" },
   
  ],
};

/* ---------------------------------------------
   CASE STUDY
--------------------------------------------- */
const caseStudyContent = {
  heading: "Telecom AI in production",
  subheading: "Real deployment. Measurable operational impact.",
  company: "Borosil",
  description:
    "A leading Indian glassware and consumer product manufacturer managing a large and complex logistics network across the country.",
  imageContent: <p>Case Study Image</p>,
  imgSrc:"/assets/case-studies/case-study-teleco.png",
  button: {
    present: true,
    text: "Download Case Study",
    href: "/assets/case-studies/borosil.pdf",
    type: "pdf",
  },
};

/* ---------------------------------------------
   OPERATIONS
--------------------------------------------- */
const operationsContent = {
  heading: "Kernel-governed execution across OSS, BSS, and network operations",

  tabs: [
    {
      label: "Governance enforced where telecom AI executes",
      intro: "Policies run inside network and operational workflows.",
      bullets: [
        "Governance-as-code at runtime",
        "Policy enforcement across models, agents, and workflows",
        "Auditability, traceability, and reversibility embedded into execution",
      ],
    },
    {
      label: "Unified runtimes across network, subscriber, and operations intelligence",
      intro: "Operate ML and agentic systems in one governed execution environment.",
      bullets: [
        "Model lifecycle governance",
        "Real-time inference control",
        "Human-in-the-loop operational boundaries",
      ],
    },
    {
      label: "Integration across telecom systems without disruption",
      intro: "Connect OSS, BSS, network platforms, and data environments through governed interfaces.",
      bullets: [
        "Works with existing telecom platforms",
        "Enables modernization without system replacement",
        "Expands ecosystem without vendor lock-in",
      ],
    },
    {
      label: "Enterprise custody of telecom AI infrastructure and assets",
      intro: "Operate entirely within provider environments.",
      bullets: [
        "On-prem, cloud, or hybrid deployment",
        "Full custody of data, models, and IP",
        "No outbound learning or forced SaaS dependency",
      ],
    },
  ],
};

/* ---------------------------------------------
   COMPLIANCE
--------------------------------------------- */

/* ---------------------------------------------
   BENEFITS
--------------------------------------------- */
const benefitsContent = {
  sectionId: "finacle-outcomes",
  heading: "Scale Telecom AI without governance gaps, lock-in, or operational fragmentation",
  points: [
    { id: "01", text: "Operate network, subscriber, and revenue intelligence as one governed system" },
    { id: "02", text: "Reduce operational friction across OSS, BSS, and service environments" },
    { id: "03", text: "Scale use cases without multiplying infrastructure and vendors" },
    { id: "04", text: "Strengthen reliability, accountability, and audit readiness" },
    { id: "05", text: "Move from isolated AI deployments to telecom-wide AI operations" },
  ],
};

/* ---------------------------------------------
   CTA
--------------------------------------------- */
const ctaContent = {
  heading: "Operate Telecom AI as infrastructure",
  para:
    "See how the DSW Enterprise AI Operating System governs execution across network operations, subscriber intelligence, revenue systems, and service environments.",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book:true
  },
  secondaryButton: {
    present: true,
    link: "https://calendly.com/",
    text: "Schedule a Call",
    targetSecondary:true

  },
};

const certificationsContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};

