import { getPageMetadata } from "@/components/config/metadata";
import CTAPricing from "@/components/CTAPricing";
import HeroNew from "@/components/Layout/HeroNew";
import PricingTableWrapper from "@/components/Homepage/PricingTableWrapper";
import Layout from "@/components/Layout/Layout";
import { WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import dynamic from "next/dynamic";
import React from "react";

import { Governance } from "@/components/Svg/Solutions/Banking/Governance";
import { Compliance } from "@/components/Svg/Solutions/Compliance";
import Config from "@/components/Svg/Solutions/Config";
import Nodes from "@/components/Svg/Solutions/Nodes";

const CTAFinal = dynamic(() => import("@/components/CTAFinal"), {
  ssr: true,
});

const CertificationsAndAwards = dynamic(
  () => import("@/components/Homepage/CertificationsAndAwards"),
  {
    ssr: true,
  }
);

const Breaks = dynamic(() => import("@/components/Solution/Breaks"), {
  ssr: true,
});

const CaseStudy = dynamic(() => import("@/components/Solution/CaseStudy"), {
  ssr: true,
});

const Features = dynamic(() => import("@/components/Solution/Features"), {
  ssr: true,
});

const Operations = dynamic(() => import("@/components/Solution/Operations"), {
  ssr: true,
});

const Runtime = dynamic(() => import("@/components/Solution/Runtime"), {
  ssr: true,
});

const WorkFlows = dynamic(() => import("@/components/Solution/WorkFlows"), {
  ssr: true,
});

export const metadata = getPageMetadata({
  title: "Hospitality AI Platform for Guest, Revenue & Operations",
  description:
    "Run guest experience, revenue optimization, and hospitality operations on one governed AI platform for hotels and hospitality enterprises.",
  url: "/solutions/hospitality",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/hospitality",
    languages: {
      "en-US": "/solutions/hospitality",
    },
  },
  openGraph: {
    url: "/solutions/hospitality",
    images: [
      {
        url: `${homepage}seo/solutions-hospitality.png`,
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
          variant={"bottomRight"}
          breadcrumbs={true}
        />
        <Runtime runtimeContent={runtimeContent} />
        <Breaks breaksContent={breaksContent} />
        <Features featuresContent={featuresContent} />
        <WorkFlows workflowsContent={workflowsContent} />
        {/* <CTAPricing />
        <PricingTableWrapper /> */}
        <CaseStudy caseStudyContent={caseStudyContent} />
        <Operations operationsContent={operationsContent} />
        <CertificationsAndAwards
          certificationsContent={certificationsContent}
        />
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
};

export default Page;

const heroContent = {
  tagline: "DSW UnifyAI OS - The Enterprise AI Operating System.",
  heading:
    "Run Guest Experience, Operations, And Revenue Intelligence On One AI Operating Layer",
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
};

const runtimeContent = {
  heading:
    "AI across hospitality operations. Controlled, auditable, and operated as one system.",
  description:
    "Hotels and hospitality groups are increasingly deploying AI across guest services, revenue optimization, operations, and marketing. Few organizations can operate these systems continuously across properties, service channels, and operational workflows. ",
  items: [
    {
      number: "01",
      text: "Personalizes guest engagement across digital and on - property interactions",
    },
    {
      number: "02",
      text: "Supports revenue optimization and dynamic pricing decisions",
    },
    {
      number: "03",
      text: "Operates within reservation, service, and operations workflows",
    },
    {
      number: "04",
      text: "Assists teams across front office, service, and management",
    },
    {
      number: "05",
      text: "Must be governed during execution, not after deployment",
    },
  ],
};

const breaksContent = {
  heading: "Where hospitality AI breaks without an operating layer",
  challenges: [
    {
      icon: <Governance />,
      title:
        "Guest experience, pricing, and operations intelligence remain siloed across systems",
    },
    {
      icon: <Config />,
      title: "Governance exists outside operational execution",
    },
    {
      icon: <Compliance />,
      title:
        "Property systems, customer platforms, and analytics environments remain fragmented",
    },
    {
      icon: <Nodes />,
      title:
        "Each new AI use case introduces new tools, integrations, and vendors",
    },
  ],
  extra:
    "<p>Hospitality organizations are not lacking AI capability. <br/> They are lacking a system to operate it across guest and operational environments.</p>",
};

const featuresContent = {
  heading: "Unlimited Hospitality AI and Agentic AI. One governed runtime.",
  cards: [
    {
      title: "Guest experience intelligence operating across channels",
      description:
        "Deliver personalized guest engagement across booking, stay, and post - stay interactions.",
      bullets: [
        "Guest preference intelligence",
        "Personalized recommendation engines",
        "Sentiment and feedback intelligence",
      ],
    },
    {
      title: "Revenue management intelligence across properties",
      description:
        "Run dynamic pricing and demand optimization inside governed operational workflows.",
      bullets: [
        "Demand forecasting intelligence",
        "Dynamic pricing optimization",
        "Occupancy and revenue intelligence",
      ],
    },
    {
      title: "Operations intelligence across properties and services",
      description:
        "Optimize service workflows, staffing, and property operations in real time.",
      bullets: [
        "Workforce scheduling intelligence",
        "Service response optimization",
        "Operational efficiency analytics",
      ],
    },
    {
      title: "Marketing and loyalty intelligence ",
      description:
        "Run AI - driven guest acquisition, retention, and loyalty strategies. ",
      bullets: [
        "Customer segmentation intelligence ",
        "Campaign performance optimization ",
        "Loyalty engagement analytics",
      ],
    },
    {
      title: "Agentic copilots for hospitality teams ",
      description:
        "Assist front office, service, and operations teams with governed decision support. ",
      bullets: [
        " Front desk operations copilots ",
        "Guest service support agents ",
        "Revenue management assistants ",
      ],
    },
  ],
};

const workflowsContent = {
  heading: "Hospitality use cases",
  items: [
    { number: "01", title: "Guest journey intelligence across channels" },
    { number: "02", title: "Service quality monitoring " },
    { number: "03", title: "Energy optimization across properties " },
    { number: "04", title: "Guest feedback and sentiment analysis " },
    { number: "05", title: "Workforce productivity insights " },
    { number: "06", title: "Digital concierge capabilities " },
    { number: "07", title: "Guest churn prediction " },
    { number: "08", title: "Cross - property demand intelligence " },
    { number: "09", title: " Model governance workflows" },
    { number: "10", title: "Loyalty optimization intelligence " },
  ],
};

const caseStudyContent = {
  heading: "Hospitality AI in production ",
  subheading: "Real deployment. Measurable operational impact. ",
  company: "Mahindra",
  description:
    "How a Leading Enterprise Transformed Guest Check - In with AI - Powered Facial Recognition on DSW UnifyAI",
  imageContent: <p>Case Study Image</p>,
  imgSrc: "/assets/case-studies/case-study-hospitality.png",
  button: {
    present: true,
    text: "Download Case Study",
    href: "/assets/case-studies/mahindra.pdf",
    type: "pdf",
  },
};

const ctaContent = {
  heading: "Operate Hospitality AI as Infrastructure",
  subPara: true,
  subParaText:
    "Explore how hospitality organizations can run AI continuously, securely, and at scale. ",
  para: "See how DSW UnifyAI OS - The Enterprise AI Operating System governs execution across guest engagement, property operations, revenue management, and hospitality intelligence.",
    primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book: true,
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team",
  },
};

const operationsContent = {
  heading:
    "Kernel - governed execution across care, operations, and revenue workflows",

  tabs: [
    {
      label:
        "Unified runtimes across guest, revenue, and operational intelligence",
      intro: "Operate ML and agentic systems within one governed environment.",
      bullets: [
        "Model lifecycle governance ",
        "Real - time inference control ",
        "Human - in - the - loop operational boundaries ",
      ],
    },
    {
      label: "Integration across hospitality systems without disruption",
      intro:
        "Connect property systems, reservation platforms, and customer systems through governed interfaces. ",
      bullets: [
        "Works with existing PMS, CRS, CRM, and operational systems",
        "Enables modernization without system replacement",
        "Expands ecosystem without vendor lock - in",
      ],
    },
    {
      label: "Enterprise custody of hospitality AI infrastructure and assets",
      intro: "Operate entirely within enterprise environments. ",
      bullets: [
        "On - prem, cloud, or hybrid deployment",
        "Full custody of data, models, and IP",
        "No outbound learning or forced SaaS dependency",
      ],
    },
  ],
};

const certificationsContent = {
  sectionId: "compliance",
  heading:
    "Built for hospitality enterprises operating in regulated and global environments ",
  subtext: "",
  footerText:
    "Supports auditability, traceability, and operational governance across guest data, service operations, and revenue management workflows. ",
};