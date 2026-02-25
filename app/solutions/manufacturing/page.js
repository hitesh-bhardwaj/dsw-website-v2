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
import { Governance } from "@/components/Svg/Solutions/Banking/Governance";
import Claims from "@/components/Svg/Solutions/Claims";
import Focus from "@/components/Svg/Solutions/Focus";
import Nodes from "@/components/Svg/Solutions/Nodes";
import { Omnichannel } from "@/components/Svg/Solutions/Omnichannel";
import UnderWriting from "@/components/Svg/Solutions/UnderWriting";
import { WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import React from "react";

export const metadata = getPageMetadata({
  title: "Manufacturing AI Operating System | DSW",
  description: "Run factory, supply chain, quality, and maintenance AI under one governed system that delivers real-time insights and operational control.",
  url: "/solutions/manufacturing",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/manufacturing",
    languages: {
      "en-US": "/solutions/manufacturing",
    },
  },
  openGraph: {
    url: "/solutions/manufacturing",
    images: [
      {
        url: `${homepage}seo/solutions-manufacturing.png`,
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
  tagline: "Production AI across industrial operations. Controlled, auditable, and operated as one system.",
  heading: "Run plant, supply chain, and quality intelligence on one AI operating layer",
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
    "Operate Manufacturing AI and Agentic AI across shop floor, supply chain, maintenance, and production planning within a governed execution runtime.",
};

const runtimeContent = {
  heading:
    "Industrial AI exists on the floor. It is not yet operationalized.",

  description:
    "Most manufacturers run AI across predictive maintenance, quality, and planning. Few can operate it continuously across plants, lines, and supply networks.",

  items: [
    {
      number: "01",
      text: "Drives production and planning decisions in real time",
    },
    {
      number: "02",
      text: "Operates inside plant and supply workflows",
    },
    {
      number: "03",
      text: "Supports engineers, operators, and operations leaders",
    },
    {
      number: "04",
      text: "Must be governed during execution, not after deployment",
    },
  ],
};



const breaksContent = {
  heading:
    "Where manufacturing AI breaks without an operating layer",

  challenges: [
    {
      icon: <UnderWriting />,
      title:
        "Plant, quality, and supply chain intelligence remain siloed",
    },
    {
      icon: <Governance/>,
      title:
        "Governance exists outside operational execution",
    },
    {
      icon: <Omnichannel/>,
      title:
        "OT and IT environments remain fragmented",
    },
    {
      icon: <Nodes />,
      title:
        "Each new use case introduces new tooling and integration complexity",
    },
  ],

  extra:
    "<p>Manufacturers are not lacking AI capability. <br/> They are lacking a system to operate it across production environments.</p>",
};



const featuresContent = {
  heading:
    "Unlimited Manufacturing AI and Agentic AI. One governed runtime.",

  cards: [
    {
      title: "Predictive Maintenance Operating Inside Production Environments",
      description:
        "Monitor equipment health and predict failures within governed execution workflows.",
      bullets: [
        "Equipment performance intelligence",
        "Failure prediction and maintenance prioritization",
        "Asset lifecycle monitoring",
      ],
    },

    {
      title: "Quality Intelligence Across Production Lines",
      description:
        "Run defect detection and process optimization in real time.",
      bullets: [
        "Visual quality inspection intelligence",
        "Process variation detection",
        "Yield improvement support",
      ],
    },

    {
      title: "Supply Chain Intelligence Operating Across Networks",
      description:
        "Optimize inventory, logistics, and demand alignment within controlled environments.",
      bullets: [
        "Demand signal intelligence",
        "Inventory optimization",
        "Supplier risk monitoring",
      ],
    },

    {
      title: "Production Planning and Operations Optimization",
      description:
        "Run AI inside scheduling, throughput, and resource allocation workflows.",
      bullets: [
        "Production scheduling intelligence",
        "Throughput optimization",
        "Capacity planning support",
      ],
    },

    {
      title: "Agentic Copilots for Plant Engineers and Operations Teams",
      description:
        "Assist teams with governed decision support across production and maintenance.",
      bullets: [
        "Plant operations copilots",
        "Maintenance engineering assist",
        "Production workflow support",
      ],
    },
  ],
};




const workflowsContent = {
  heading: "Industrial Workflows Expanding Without New Stacks or Vendor Sprawl",
  items: [
    { number: "01", title: "Energy optimization across facilities" },
    { number: "02", title: "Digital twin intelligence support" },
    { number: "03", title: "Safety and compliance monitoring" },
    { number: "04", title: "Workforce productivity insights" },
    { number: "05", title: "Logistics optimization" },
    { number: "06", title: "Asset utilization intelligence" },
    { number: "07", title: "Production cost modeling" },
    { number: "08", title: "Equipment lifecycle intelligence" },
    { number: "09", title: "OT system monitoring" },
    { number: "10", title: "Model governance workflows" },
  ],
};


const caseStudyContent = {
  heading: "Manufacturing AI in production",
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

const benefitsContent = {
  sectionId: "finacle-outcomes",

  heading:
    "Scale Manufacturing AI without governance gaps, lock-in, or operational fragmentation",

  points: [
    {
      id: "01",
      text:
        "Operate plant, supply chain, and quality intelligence as one governed system",
    },
    {
      id: "02",
      text:
        "Reduce operational friction across production environments",
    },
    {
      id: "03",
      text:
        "Scale use cases without multiplying infrastructure or vendors",
    },
    {
      id: "04",
      text:
        "Strengthen accountability and operational visibility",
    },
    {
      id: "05",
      text:
        "Move from isolated AI deployments to enterprise-wide industrial AI operations",
    },
  ],
};



const ctaContent={
  heading:"Operate Manufacturing AI as infrastructure",
  para:"See how the DSW Enterprise AI Operating System governs execution across plant operations, supply chain, maintenance, and production intelligence. ",
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
    "Kernel-governed execution across plant, supply chain, and operations",

  tabs: [
    {
      label: "Governance enforced where production decisions happen",
      intro:
        "Policies operate inside plant and operational workflows.",
      bullets: [
        "Governance-as-code at runtime",
        "Policy enforcement across models, agents, and workflows",
        "Auditability, traceability, and reversibility embedded into execution",
      ],
    },

    {
      label:
        "Unified runtimes across plant, supply, and operational intelligence",
      intro:
        "Operate ML and agentic systems within one governed environment.",
      bullets: [
        "Model lifecycle governance",
        "Real-time inference control",
        "Human-in-the-loop operational boundaries",
      ],
    },

    {
      label:
        "Integration across OT and enterprise systems without disruption",
      intro:
        "Connect plant systems, supply platforms, and enterprise applications through governed interfaces.",
      bullets: [
        "Works with existing OT and IT environments",
        "Enables modernization without system replacement",
        "Expands ecosystem without vendor lock-in",
      ],
    },

    {
      label:
        "Enterprise custody of manufacturing AI infrastructure and assets",
      intro:
        "Operate entirely within industrial environments.",
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
