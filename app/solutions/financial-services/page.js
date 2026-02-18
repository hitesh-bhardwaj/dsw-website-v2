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
  title: "Enterprise AI for Financial Services - Financial AI by DSW",
  description:
    "Run Financial AI and Agentic AI across lending, capital markets, payments, and risk as one controlled, auditable execution environment.",
  url: "financial-services",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/financial-services",
    languages: {
      "en-US": "/solutions/financial-services",
    },
  },
  openGraph: {
    url: "financial-services",
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
        <Breaks breaksContent={breaksContent} />
        <Features featuresContent={featuresContent} />
        <WorkFlows workflowsContent={workflowsContent} />
        <CaseStudy caseStudyContent={caseStudyContent} />
        <Operations operationsContent={operationsContent} />
         <CertificationsAndAwards certificationsContent={certificationsContent}/>
        {/* <Compliance complianceContent={complianceContent} /> */}
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
  tagline: "One operating system for real-time financial decisioning.",
  heading: "Govern lending, markets, payments, and portfolio risk at runtime",
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
    "Run Financial AI and Agentic AI across lending, capital markets, payments, and risk as one controlled, auditable execution environment.",
};

/* ---------------------------------------------
   RUNTIME
--------------------------------------------- */
const runtimeContent = {
  heading: "Financial AI is already deployed. It is not yet operationalized.",

  description:
    "Most financial institutions run models across lending, capital markets, fraud, and compliance. Few can operate them continuously across business units and decision environments.",

  items: [
    { number: "01", text: "Drives lending, pricing, and portfolio decisions in real time" },
    { number: "02", text: "Operates inside trading, surveillance, and payment workflows" },
    { number: "03", text: "Interacts with analysts, relationship teams, and risk functions" },
    { number: "04", text: "Must be governed during execution, not after deployment" },
  ],
};

/* ---------------------------------------------
   BREAKS
--------------------------------------------- */
const breaksContent = {
  heading: "Where Financial Services AI loses control without an operating layer",

  challenges: [
    { icon: <UnderWriting />, title: "Lending, markets, and compliance models operate in silos" },
    { icon: <Claims />, title: "Governance exists as oversight instead of runtime enforcement" },
    {
      icon: <Focus />,
      title:
        "Regulatory pressure increases audit, surveillance, and model risk exposure",
    },
    {
      icon: <Nodes />,
      title:
        "Each new use case introduces new tooling, vendors, and operational fragmentation",
    },
  ],

  extra:
    "<p>Institutions do not struggle to build AI. <br/> They struggle to <span class='text-primary-blue'>operate it across portfolios, markets, and regulated workflows as one system.</span></p>",
};

/* ---------------------------------------------
   FEATURES
--------------------------------------------- */
const featuresContent = {
  heading: "Unlimited Financial AI and Agentic AI. One governed runtime.",

  cards: [
    {
      title: "Runtime-governed lending and credit intelligence",
      description:
        "Operate origination, underwriting, and portfolio monitoring within controlled execution environments.",
      bullets: [
        "Credit scoring and affordability modeling",
        "Early risk detection and portfolio surveillance",
        "Controlled model deployment and monitoring",
      ],
    },
    {
      title: "Portfolio and market intelligence operating in real time",
      description:
        "Run analytics and predictive intelligence across capital markets and investment operations.",
      bullets: [
        "Portfolio risk signals",
        "Market movement intelligence",
        "Investment research augmentation",
      ],
    },
    {
      title: "Payments and fraud intelligence operating inside transaction workflows",
      description:
        "Identify anomalies and operational risks across payment ecosystems.",
      bullets: [
        "Transaction monitoring intelligence",
        "Fraud detection and investigation support",
        "Decision traceability across workflows",
      ],
    },
    {
      title: "Agentic copilots for analysts, relationship teams, and operations",
      description:
        "Assist teams with context, recommendations, and next-best actions under policy control.",
      bullets: [
        "Relationship manager copilots",
        "Analyst productivity copilots",
        "Compliance and operations support",
      ],
    },
    {
      title: "Enterprise knowledge intelligence across financial operations",
      description:
        "Enable governed knowledge systems across product, policy, research, and compliance environments.",
      bullets: [
        "Role-based knowledge retrieval",
        "Traceable citations and decision support",
        "Tool usage governed at runtime",
      ],
    },
  ],
};

/* ---------------------------------------------
   WORKFLOWS
--------------------------------------------- */
const workflowsContent = {
  heading: "More financial workflows operating on the AI Operating System",
  items: [
    { number: "01", title: " Treasury and liquidity intelligence" },
    { number: "02", title: "Trade surveillance support" },
    { number: "03", title: "Regulatory reporting acceleration" },
    { number: "04", title: "Wealth and portfolio advisory intelligence" },
 
  ],
};

/* ---------------------------------------------
   CASE STUDY
--------------------------------------------- */
const caseStudyContent = {
  heading: "Financial AI in production",
  subheading: "Real deployment. Measurable operational impact.",
  company: "Castler",
  description:
    "The customer is a prominent fintech company specializing in digital escrow services, headquartered in Delhi, India. ",
  imageContent: <p>Case Study Image</p>,
  imgSrc:"/assets/case-studies/case-study-finance.png",
  button: {
    present: true,
    text: "Download Case Study",
    href: "/assets/case-studies/castler.pdf",
    type: "pdf",
  },
};

/* ---------------------------------------------
   OPERATIONS
--------------------------------------------- */
const operationsContent = {
  heading: "Kernel-governed execution across lending, markets, and payments",

  tabs: [
    {
      label: "Governance enforced where financial AI executes",
      intro: "Policies operate inside workflows and decision environments.",
      bullets: [
        "Governance-as-code at runtime",
        "Policy enforcement across models, agents, and workflows",
        "Auditability, traceability, and reversibility embedded into execution",
      ],
    },
    {
      label: "Unified runtimes for models, analytics, and agentic systems",
      intro: "Operate ML and agentic execution within one governed environment.",
      bullets: [
        "Model lifecycle governance",
        "Real-time and batch inference control",
        "Human-in-the-loop decision boundaries",
      ],
    },
    {
      label: "Integration across financial ecosystems without platform disruption",
      intro: "Connect lending, market, and payment systems through governed interfaces.",
      bullets: [
        "Works with core platforms and data environments",
        "Enables modernization without system replacement",
        "Expands ecosystem without vendor lock-in",
      ],
    },
    {
      label: "Enterprise custody of AI infrastructure and decision assets",
      intro: "Operate entirely within institutional environments.",
      bullets: [
        "On-prem, cloud, or hybrid deployment",
        "Full custody of models, data, and IP",
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

  heading: "Scale Financial AI without governance gaps, lock-in, or cost fragmentation",

  points: [
    { id: "01", text: "Operate lending, markets, payments, and risk as one governed system" },
    { id: "02", text: "Reduce friction in deploying and managing production AI" },
    { id: "03", text: "Scale use cases without multiplying infrastructure or vendors" },
    { id: "04", text: "Strengthen audit readiness and execution accountability" },
    { id: "05", text: "Transition from fragmented adoption to enterprise AI operations" },
  ],
};

/* ---------------------------------------------
   CTA
--------------------------------------------- */
const ctaContent = {
  heading: "Operate Financial AI as enterprise infrastructure",
  para:
    "See how the DSW Enterprise AI Operating System governs execution across lending, markets, payments, risk, and compliance workflows.",
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

