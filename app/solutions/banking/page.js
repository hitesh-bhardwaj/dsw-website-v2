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
import { Fraud } from "@/components/Svg/Solutions/Banking/Fraud";
import { Governance } from "@/components/Svg/Solutions/Banking/Governance";
import { UseCase } from "@/components/Svg/Solutions/Banking/UseCase";
import Claims from "@/components/Svg/Solutions/Claims";
import Focus from "@/components/Svg/Solutions/Focus";
import Nodes from "@/components/Svg/Solutions/Nodes";
import UnderWriting from "@/components/Svg/Solutions/UnderWriting";
import { WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import React from "react";

export const metadata = getPageMetadata({
  title: "AI Operating System for Banking | DSW",
  description: "Operate AI across banking risk, compliance, credit, fraud, and customer workflows with one governed system built for production enterprise use.",
  url: "/solutions/banking",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/banking",
    languages: {
      "en-US": "/solutions/banking",
    },
  },
  openGraph: {
    url: "/solutions/banking",
    images: [
      {
        url: `${homepage}seo/solutions-banking.png`,
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
        variant={"bottomLeft"}
        breadcrumbs={true}
      />
      <Runtime runtimeContent={runtimeContent} />
      <Breaks breaksContent={breaksContent}/>
      <Features featuresContent={featuresContent} />
      <WorkFlows workflowsContent={workflowsContent}/>
      <CaseStudy caseStudyContent={caseStudyContent}/>
      <Operations operationsContent={operationsContent} />
      <CertificationsAndAwards certificationsContent={certificationsContent}/>
      <Benefits benefitsContent={benefitsContent}/>
       <CTAFinal ctaContent={ctaContent}/>
    </Layout>
    </>
  );
};

export default Page;

const heroContent = {
  tagline: "Run AI across risk, compliance, operations, and customer engagement as one governed system.",
  heading: "The Operating Layer for Production AI in Banking",
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
    "Build, integrate, deploy, govern, and operate AI as a long-running enterprise system - inside your own environment, with full control, auditability, and accountability.",
};

const runtimeContent = {
  heading:
    "Banking has moved past AI pilots. Now it must operate AI.",
  description:
    "Most banks have models in production. Few have a system to operate them continuously across lines of business.",
  items: [
    {
      number: "01",
      text: "Triggers decisions in real time",
    },
    {
      number: "02",
      text: "Operates inside regulated workflows",
    },
    {
      number: "03",
      text: "Interacts with customers, employees, and systems",
    },
    {
      number: "04",
      text: "Must be governed as it runs - not after deployment",
    },
  ],
  extra:"<p>Banks are moving from AI programs to <span class='text-primary-blue'>AI operations</span> - where governance, model lifecycle, and execution accountability are built into the runtime.</p>"
};

const breaksContent = {
  tagline:
    "Banks are moving from isolated AI initiatives to always-on execution across onboarding, credit, fraud, collections, servicing, and regulatory workflows.",
  heading:
    "Where AI execution breaks inside banks today",
  challenges: [
    {
      icon: <Fraud/>,
      title: "Models sit in silos across risk, fraud, underwriting, and operations",
    },
    {
      icon: <Governance/>,
      title:
        "Governance exists as review processes, not execution controls",
    },
    {
      icon: <Focus />,
      title:
        "Regulatory pressure increases model risk, audit exposure, and change complexity",
    },
    {
      icon: <UseCase/>,
      title:
        "Every new use case becomes a new stack, new vendor, and new cost structure",
    },
  ],
  extra:"<p>Banks don’t struggle to build AI. <br/> They struggle to<span class='text-primary-blue'> operate AI as a system across the enterprise.</span> </p>"
};

const featuresContent = {
  heading:
    "High-impact Banking Use Cases on the AI Operating System",

  cards: [
    {
      title: "KYC / AML Intelligence and Continuous Monitoring",
      description:
        "Run onboarding and transaction monitoring as governed, real-time pipelines across customer data, behavioral signals, and alerts.",
      bullets: [
        "Continuous risk scoring",
        "Suspicious activity monitoring acceleration",
        "Audit-ready lineage across models and decisions",
      ],
    },

    {
      title: "Credit Risk Modeling and Portfolio Scoring",
      description:
        "Deploy, monitor, and refresh models across retail, SME, and corporate portfolios.",
      bullets: [
        "Challenger model rollout",
        "Drift monitoring and performance telemetry",
        "Controlled promotion to production environments",
      ],
    },

    {
      title: "Collections Optimization and Delinquency Prediction",
      description:
        "Predict early delinquency, prioritize accounts, and optimize outreach strategies.",
      bullets: [
        "Policy-aware automation",
        "Traceable decision pathways",
        "Reversible workflows across customer engagement actions",
      ],
    },

    {
      title:
        "Agentic Copilots for Relationship Managers, Operations, and Compliance",
      description:
        "Support frontline and operations teams with contextual insights, policy checks, and next-best actions.",
      bullets: [
        "RM copilots for portfolio insights",
        "Compliance copilots for policy adherence",
        "Operations copilots for case workflows",
      ],
    },

    {
      title: "Enterprise GenAI Knowledge Systems for Banking Teams",
      description:
        "Enable governed enterprise knowledge across policy, product, risk, and operational content.",
      bullets: [
        "Controlled retrieval and citations",
        "Role-based access enforcement",
        "Tool usage governed at runtime",
      ],
    },
  ],
};


const workflowsContent = {
  heading: "Unlimited Use Cases with a Single Subscription.",
  para:"",
  para:"No more use-case-based cost barrier.",
  items: [
    { number: "01", title: "Fraud detection and anomaly monitoring" },
    { number: "02", title: "Transaction monitoring triage" },
    { number: "03", title: "Underwriting decision intelligence" },
    { number: "04", title: "Customer churn prediction and retention" },
    { number: "05", title: "Next-best offer and personalization" },
    { number: "06", title: "Contact center assist and QA analytics" },
    { number: "07", title: "Dispute and chargeback workflow support" },
    { number: "08", title: "Treasury and liquidity forecasting" },
    { number: "09", title: "Regulatory reporting acceleration" },
    { number: "10", title: "Model risk management and governance workflows" },
  ],
};


const caseStudyContent = {
  heading: "Running Real-Time Banking Decisions on a Unified AI Runtime",
  subheading: "Real deployment. Measurable operational impact.",
  company: "Castler",
  description:
    "Revolutionizing Document Intelligence for a Leading Indian Fintech Company",
  imageContent: <p>Case Study Image</p>,
  imgSrc:"/assets/case-studies/case-study-banking.png",
  button: {
    present: true,
    text: "Download Case Study",
    href: "/assets/case-studies/castler.pdf",
    type: "pdf",
  },
};

const benefitsContent = {
  sectionId: "finacle-outcomes",

  heading:
    "From fragmented AI to an enterprise operating model",

  points: [
    {
      id: "01",
      text:
        "Operate AI across risk, fraud, compliance, and customer workflows as one governed system",
    },
    {
      id: "02",
      text:
        "Reduce model deployment friction and governance overhead",
    },
    {
      id: "03",
      text:
        "Scale AI use cases without multiplying vendors or infrastructure",
    },
    {
      id: "04",
      text:
        "Improve audit readiness and execution accountability",
    },
    {
      id: "05",
      text:
        "Move from fragmented AI adoption to enterprise-wide AI operations",
    },
  ],
};


const ctaContent={
  heading:"Operate AI as Infrastructure Inside your Bank ",
  para:"Experience the DSW Enterprise AI Operating System ",
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
    targetSecndary:true

  },
}

const operationsContent = {
  heading: "How the Enterprise AI Operating System runs inside your Bank",

  tabs: [
    {
      label: "The AI OS Kernel: governance enforced where AI executes",
      intro: "The governed control plane for AI execution.",
      bullets: [
        "Governance-as-code enforced at runtime",
        "Policy enforcement across models, agents, and workflows",
        "Auditability, traceability, and reversibility built into execution",
      ],
    },

    {
      label: "Governed Runtimes: models and agents operating under policy",
      intro: "Unified execution across ML and agentic systems.",
      bullets: [
        "Model lifecycle governance",
        "Real-time and batch inference control",
        "Agent autonomy boundaries and human-in-the-loop oversight",
      ],
    },

    {
      label: "AI Fabric: integrate the banking ecosystem without lock-in",
      intro: "Integration layer across existing banking ecosystems.",
      bullets: [
        "Connect core banking, data platforms, decision engines, and enterprise systems",
        "Avoid rip-and-replace modernization",
        "Enable ecosystem expansion without lock-in",
      ],
    },

    {
      label: "Enterprise deployment: run entirely within your environment",
      intro: "Operate entirely within the bank’s environment.",
      bullets: [
        "On-prem, cloud, or hybrid deployment",
        "Full custody of models, data, artifacts, and IP",
        "No outbound learning or forced SaaS dependency",
      ],
    },
  ],
};


const certificationsContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};
