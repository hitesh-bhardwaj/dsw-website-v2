import { getPageMetadata } from "@/components/config/metadata";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import CertificationsAndAwards from "@/components/Homepage/CertificationsAndAwards";
import Layout from "@/components/Layout/Layout";
import Benefits from "@/components/Solution/Benefits";
import Breaks from "@/components/Solution/Breaks";
import CaseStudy from "@/components/Solution/CaseStudy";
import Features from "@/components/Solution/Features";
import Operations from "@/components/Solution/Operations";
import Runtime from "@/components/Solution/Runtime";
import WorkFlows from "@/components/Solution/WorkFlows";
import { Governance } from "@/components/Svg/Solutions/Banking/Governance";
import { Compliance } from "@/components/Svg/Solutions/Compliance";
import Nodes from "@/components/Svg/Solutions/Nodes";
import UnderWriting from "@/components/Svg/Solutions/UnderWriting";
import { WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import React from "react";

export const metadata = getPageMetadata({
  title: "Healthcare AI Operating System | DSW",
  description: "Govern AI in clinical support, patient engagement, revenue cycle, and operations with a unified, controlled execution layer for healthcare.",
  url: "/solutions/healthcare",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/healthcare",
    languages: {
      "en-US": "/solutions/healthcare",
    },
  },
  openGraph: {
    url: "/solutions/healthcare",
    images: [
      {
        url: `${homepage}seo/solutions-healthcare.png`,
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
      <CertificationsAndAwards certificationsContent={certificationsContent}/>
      <Benefits benefitsContent={benefitsContent}/>
       <CTAFinal ctaContent={ctaContent}/>
    </Layout>
    </>
  );
};

export default Page;

const heroContent = {
  tagline: "Production AI across care delivery, patient operations, and payer workflows. Controlled, auditable, and operated as one system.",
  heading: "Govern clinical, operational, and revenue intelligence on one AI operating layer",
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
    "Operate Healthcare AI and Agentic AI across clinical support, revenue cycle, patient engagement, and operational environments within a governed execution runtime.",
};

const runtimeContent = {
  heading:
    "Healthcare AI is deployed across systems. It is not yet operating as one continuum.",

  description:
    "Most health systems and payers run AI across diagnostics support, operations, and claims. Few can operate it continuously across care, administrative, and financial environments.",

  items: [
    {
      number: "01",
      text: "Supports clinical and operational decisioning in real time",
    },
    {
      number: "02",
      text: "Operates across patient, provider, and payer workflows",
    },
    {
      number: "03",
      text: "Assists clinicians, care teams, and operations staff",
    },
    {
      number: "04",
      text: "Must be governed during execution, not after deployment",
    },
  ],
};



const breaksContent = {
  heading:
    "Where healthcare AI breaks without an operating layer",

  challenges: [
    {
      icon: <UnderWriting />,
      title:
        "Clinical, administrative, and financial AI operate in silos",
    },
    {
      icon: <Governance/>,
      title:
        "Governance sits outside care delivery and operational workflows",
    },
    {
      icon: <Compliance/>,
      title:
        "Compliance, PHI protection, and audit requirements increase execution risk",
    },
    {
      icon: <Nodes />,
      title:
        "Each new use case introduces new tools and fragmented environments",
    },
  ],

  extra:
    "<p>Healthcare organizations are not lacking AI capability. <br/> They are lacking a system to run it across care and operations.</p>",
};


const featuresContent = {
  heading:
    "Build Unlimited Healthcare AI and Agentic AI. One governed runtime.",

  cards: [
    {
      title: "Clinical Intelligence Operating Within Care Workflows",
      description:
        "Support clinical decision environments with governed AI execution.",
      bullets: [
        "Clinical documentation intelligence",
        "Diagnostic and triage support",
        "Care pathway insights",
      ],
    },

    {
      title: "Revenue Cycle Intelligence Across Financial Workflows",
      description:
        "Run AI inside billing, coding, and reimbursement operations.",
      bullets: [
        "Coding intelligence support",
        "Denial prediction and prevention",
        "Claims workflow optimization",
      ],
    },

    {
      title: "Patient Engagement Intelligence Across the Care Journey",
      description:
        "Operate outreach, engagement, and retention within controlled environments.",
      bullets: [
        "Patient segmentation intelligence",
        "Appointment and adherence insights",
        "Care engagement optimization",
      ],
    },

    {
      title: "Operational Intelligence Across Health System Environments",
      description:
        "Support staffing, resource allocation, and facility operations.",
      bullets: [
        "Capacity planning intelligence",
        "Workforce optimization",
        "Throughput and utilization insights",
      ],
    },

    {
      title:
        "Agentic Copilots for Clinicians, Care Teams, and Operations",
      description:
        "Assist teams with governed decision support across clinical and operational environments.",
      bullets: [
        "Clinical documentation copilots",
        "Care coordination copilots",
        "Administrative operations support",
      ],
    },
  ],
};




const workflowsContent = {
  heading: "Healthcare workflows expanding without new stacks or vendor sprawl",
  items: [
    { number: "01", title: "Population health intelligence" },
    { number: "02", title: "Value-based care analytics" },
    { number: "03", title: "Risk stratification support" },
    { number: "04", title: "Provider performance analytics" },
  ],
};

const caseStudyContent = {
  heading: "Healthcare AI in production",
  subheading: "Real deployment. Measurable operational impact.",
  company: "Customer Unification",
  description:
    "A leading Health Insurance company that serves millions of policyholders with a strong focus on healthcare integrity, operational scale, and patient-first principles. ",
  imageContent: <p>Case Study Image</p>,
  imgSrc:"/assets/case-studies/case-study-healthcare.png",
  button: {
    present: true,
    text: "Download Case Study",
    href: "/assets/case-studies/customer-unification.pdf",
    type: "pdf",
  },
};

const benefitsContent = {
  sectionId: "finacle-outcomes",

  heading:
    "Scale Healthcare AI without governance gaps, lock-in, or operational fragmentation",

  points: [
    {
      id: "01",
      text:
        "Operate clinical, operational, and financial intelligence as one governed system",
    },
    {
      id: "02",
      text:
        "Reduce friction across care, revenue, and patient engagement workflows",
    },
    {
      id: "03",
      text:
        "Scale use cases without multiplying infrastructure or vendors",
    },
    {
      id: "04",
      text:
        "Strengthen compliance, audit readiness, and execution accountability",
    },
    {
      id: "05",
      text:
        "Move from isolated AI deployments to enterprise healthcare AI operations",
    },
  ],
};


const ctaContent={
  heading:"Operate Healthcare AI as Infrastructure",
  para:"See how the DSW Enterprise AI Operating System governs execution across clinical care, patient engagement, revenue cycle, and operational environments.",
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
  heading:
    "Kernel-governed execution across care, operations, and revenue workflows",

  tabs: [
    {
      label:
        "Governance enforced where healthcare decisions happen",
      intro:
        "Policies operate inside clinical and operational environments.",
      bullets: [
        "Governance-as-code at runtime",
        "Policy enforcement across models, agents, and workflows",
        "Auditability, traceability, and reversibility embedded into execution",
      ],
    },

    {
      label:
        "Unified runtimes across clinical, administrative, and financial intelligence",
      intro:
        "Operate ML and agentic systems within one governed execution environment.",
      bullets: [
        "Model lifecycle governance",
        "Real-time inference control",
        "Human-in-the-loop decision boundaries",
      ],
    },

    {
      label:
        "Integration across EHR, payer, and operational systems without disruption",
      intro:
        "Connect clinical, payer, and operational platforms through governed interfaces.",
      bullets: [
        "Works with existing healthcare systems and data environments",
        "Enables modernization without system replacement",
        "Expands ecosystem without vendor lock-in",
      ],
    },

    {
      label:
        "Enterprise custody of healthcare AI infrastructure and PHI-sensitive assets",
      intro:
        "Operate entirely within healthcare environments.",
      bullets: [
        "On-prem, cloud, or hybrid deployment",
        "Full custody of data, models, and IP",
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
