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
       <CertificationsAndAwards certificationsContent={certificationsContent}/>
      <Benefits benefitsContent={benefitsContent}/>
       <CTAFinal ctaContent={ctaContent}/>
    </Layout>
    </>
  );
};

export default Page;

const heroContent = {
  tagline: "Production AI across commerce, supply chain, and store operations. Governed, real time, and operated as one system.",
  heading: "Run merchandising, demand, and customer intelligence on one AI operating layer",
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
    "Operate Retail AI and Agentic AI across merchandising, pricing, inventory, customer engagement, and fulfilment within a unified execution runtime.",
};

const runtimeContent = {
  heading:
    "Retail AI is deployed across channels. It is not yet operating as one system.",

  description:
    "Most retailers run AI across demand forecasting, personalization, and supply chain. Few can operate it continuously across stores, digital, and fulfilment environments.",

  items: [
    {
      number: "01",
      text: "Drives pricing, demand, and assortment decisions in real time",
    },
    {
      number: "02",
      text: "Operates across ecommerce, stores, and fulfilment networks",
    },
    {
      number: "03",
      text: "Supports merchandisers, planners, and operations teams",
    },
    {
      number: "04",
      text: "Must be governed during execution, not after deployment",
    },
  ],

  
};


const breaksContent = {
  heading:
    "Where retail AI breaks without an operating layer",

  challenges: [
    {
      icon: <UnderWriting />,
      title:
        "Merchandising, supply chain, and customer intelligence operate in silos",
    },
    {
      icon: <Claims />,
      title:
        "Governance sits outside pricing and operational decisions",
    },
    {
      icon: <Focus />,
      title:
        "Omnichannel execution remains fragmented",
    },
    {
      icon: <Nodes />,
      title:
        "Each new use case introduces new tooling, vendors, and operational complexity",
    },
  ],

  extra:
    "<p>Retailers are not lacking AI capability. <br/> They are lacking a system to run it across commerce operations.</p>",
};


const featuresContent = {
  heading:
    "Unlimited Retail AI and Agentic AI. One governed runtime.",

  cards: [
    {
      title: "Demand and Merchandising Intelligence at Execution",
      description:
        "Run forecasting, assortment, and pricing decisions within controlled execution environments.",
      bullets: [
        "Demand signal intelligence",
        "Assortment optimization",
        "Dynamic pricing decision support",
      ],
    },

    {
      title: "Inventory and Supply Chain Intelligence in Motion",
      description:
        "Operate replenishment, allocation, and fulfilment intelligence in real time.",
      bullets: [
        "Inventory optimization",
        "Allocation intelligence",
        "Fulfilment prioritization",
      ],
    },

    {
      title: "Customer Intelligence Across Omnichannel Experiences",
      description:
        "Run personalization, engagement, and retention inside governed execution workflows.",
      bullets: [
        "Customer segmentation intelligence",
        "Next-best engagement actions",
        "Loyalty and retention insights",
      ],
    },

    {
      title: "Store and Operations Intelligence Across Locations",
      description:
        "Enable operational visibility and decision support across stores and field teams.",
      bullets: [
        "Store performance intelligence",
        "Workforce planning insights",
        "Operational anomaly detection",
      ],
    },

    {
      title: "Agentic Copilots for Merchandising, Planning, and Operations Teams",
      description:
        "Assist retail teams with governed decision support across planning and execution.",
      bullets: [
        "Merchandising copilots",
        "Planning and allocation assist",
        "Operations support copilots",
      ],
    },
  ],
};



const workflowsContent = {
  heading: "Retail workflows expanding without new stacks or vendor sprawl",
  items: [
    { number: "01", title: "Promotion and campaign intelligence" },
    { number: "02", title: "Category performance analytics" },
    { number: "03", title: "Supplier and vendor performance monitoring" },
    { number: "04", title: "Returns and reverse logistics optimization" },
  ],
};

const caseStudyContent = {
  heading: "Retail AI in production",
  subheading: "Real deployment. Measurable operational impact.",
  company: "Borosil",
  description:
    "A leading Indian glassware and consumer product manufacturer managing a large and complex logistics network across the country.",
  imageContent: <p>Case Study Image</p>,
  imgSrc:"/assets/case-studies/case-study-retail.png",
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
    "Scale Retail AI without governance gaps, lock-in, or operational fragmentation",

  points: [
    {
      id: "01",
      text:
        "Operate merchandising, supply chain, and customer intelligence as one governed system",
    },
    {
      id: "02",
      text:
        "Reduce friction across planning, pricing, and fulfilment workflows",
    },
    {
      id: "03",
      text:
        "Scale use cases without multiplying infrastructure or vendors",
    },
    {
      id: "04",
      text:
        "Strengthen execution visibility and accountability",
    },
    {
      id: "05",
      text:
        "Move from isolated AI deployments to enterprise retail AI operations",
    },
  ],
};


const ctaContent={
  heading:"Operate Retail AI as infrastructure",
  para:"See how the DSW Enterprise AI Operating System governs execution across merchandising, demand, customer experience, and supply chain operations.",
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
    "Kernel-governed execution across commerce, supply chain, and store operations",

  tabs: [
    {
      label: "Governance enforced where retail decisions happen",
      intro:
        "Policies operate inside pricing, merchandising, and operational workflows.",
      bullets: [
        "Governance-as-code at runtime",
        "Policy enforcement across models, agents, and workflows",
        "Auditability, traceability, and reversibility embedded into execution",
      ],
    },

    {
      label:
        "Unified runtimes across customer, inventory, and operational intelligence",
      intro:
        "Operate ML and agentic systems in one governed environment.",
      bullets: [
        "Model lifecycle governance",
        "Real-time inference control",
        "Human-in-the-loop decision boundaries",
      ],
    },

    {
      label:
        "Integration across retail platforms without disruption",
      intro:
        "Connect ecommerce, store, and supply ecosystems through governed interfaces.",
      bullets: [
        "Works with existing commerce and enterprise platforms",
        "Enables modernization without system replacement",
        "Expands ecosystem without vendor lock-in",
      ],
    },

    {
      label:
        "Enterprise custody of retail AI infrastructure and assets",
      intro:
        "Operate entirely within retailer environments.",
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
