import { getPageMetadata } from "@/components/config/metadata";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import { Business } from "@/components/Svg/Workshops/Business";
import { DataScience } from "@/components/Svg/Workshops/DataScience";
import { Innovation } from "@/components/Svg/Workshops/Innovation";
import { RiskCompliance } from "@/components/Svg/Workshops/RiskCompliance";
import Empower from "@/components/Workshops/Empower";
import Features from "@/components/Workshops/Features";
import Outcomes from "@/components/Workshops/Outcomes";
import WorkshopFlow from "@/components/Workshops/WorkshopFlow";
import { BreadcrumbsJSONLD, WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import React from "react";

export const metadata = getPageMetadata({
  title: "AI for Insurance Workshop | DSW",
  description:
    "Join our hands-on AI & GenAI workshop for insurers - build prototypes, learn compliance, and turn ideas into action in underwriting, claims & fraud.",
  url: "/ai-insurance-workshops",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/ai-insurance-workshops",
    languages: {
      "en-US": "/ai-insurance-workshops",
    },
  },
  openGraph: {
    url: "/ai-insurance-workshops",
    images: [
      {
        url: `${homepage}seo/workshops.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

const page = () => {
  return (
    <>
     <WebpageJsonLd metadata={metadata} />
      <BreadcrumbsJSONLD pathname={metadata.url} />
    <Layout>
        <HeroNew heroContent={heroContent} variant={"default"} breadcrumbs={true}/>
        <Features featuresData={featuresData}/>
         <WorkshopFlow sessionsData={sessionsData} space={"space-y-[2vw]"} />
         <Outcomes outcomesData={outcomesData}/>
          <Empower  heading="Ready to Empower Your Team with Practical AI Skills?"
          para="Fill out the form"
          width={"w-[90%]"}/>
          {/* <Faqs data={faqData}/> */}
        <CTAFinal ctaContent={ctaContent}/>
    </Layout>
    </>
  );
};

export default page;

const heroContent={
  tagline:"",
  heading:"Equip Your Team With Real -World AI & GenAI Skills for Insurance",
  primaryButton:{
    present:false,
    link:"#",
    text:""
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
  para:"The insurance industry is evolving—and AI is no longer optional. Our hands-on workshops are designed specifically for insurersready to unlock real value from AI, Machine Learning, and Generative AI. Led by enterprise AI experts, these sessions blend strategy,compliance, and implementation—all tailored for insurance workflows."
}

const ctaContent={
  heading:"Take a lightning tour of the Enterprise AI Platform",
  para:"Discover how UnifyAI can accelerate your AI/ML and GenAI initiatives with seamless deployment, scalability, and security.",
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
    targetSecondary:true,
    
  },
}
const featuresData = [
  {
    icon: <Business/>,
    title: "Business & Operations Leaders",
    para: "Discover how AI can improve efficiency, reduce risk, and unlock new revenue opportunities across the insurance value chain.",
  },
  {
        icon: <DataScience/>,
    title: "Data Science & Analytics Teams",
    para: "Explore hands-on methods to train, fine-tune, and deploy models tailored for fraud detection, claims automation, and more. ",
  },
  {
    icon: <RiskCompliance/>,
    title: "Risk, Compliance & IT Professionals",
    para: "Understand governance frameworks, model explainability, and security protocols that align with industry regulations like SOC 2, ISO 27001, HIPAA, and GDPR.",
  },
  {
    icon: <Innovation/>,
    title: "Innovation, Product & Strategy Leaders",
    para: "Identify high-impact AI use cases and learn how to bring GenAI projects from concept to production in days—not months.",
  },
];
const sessionsData = [
  {
    title: "AI Use Cases in Insurance",
    duration: "1 hr.",
    list: [
      {
        heading: "AI in Insurance – The Big Picture:",
        para: "Get a clear intro to how ML, NLP, and predictive analytics are transforming the insurance landscape.",
      },
      {
        heading: "High-Impact Use Cases:",
        para: "Explore real examples of AI improving claims processing, underwriting, fraud detection, CX, and risk management.",
      },
      {
        heading: "Value Across the Value Chain:",
        para: "Join an interactive session on how AI drives measurable ROI across every stage of the insurance lifecycle.",
      },
    ],
  },
  {
    title: "AI Use Cases in Insurance",
    duration: "1 hr.",
    list: [
      {
        heading: "AI in Insurance – The Big Picture:",
        para: "Get a clear intro to how ML, NLP, and predictive analytics are transforming the insurance landscape.",
      },
      {
        heading: "High-Impact Use Cases:",
        para: "Explore real examples of AI improving claims processing, underwriting, fraud detection, CX, and risk management.",
      },
      {
        heading: "Value Across the Value Chain:",
        para: "Join an interactive session on how AI drives measurable ROI across every stage of the insurance lifecycle.",
      },
    ],
  },
  {
    title: "AI Use Cases in Insurance",
    duration: "1 hr.",
    list: [
      {
        heading: "AI in Insurance – The Big Picture:",
        para: "Get a clear intro to how ML, NLP, and predictive analytics are transforming the insurance landscape.",
      },
      {
        heading: "High-Impact Use Cases:",
        para: "Explore real examples of AI improving claims processing, underwriting, fraud detection, CX, and risk management.",
      },
      {
        heading: "Value Across the Value Chain:",
        para: "Join an interactive session on how AI drives measurable ROI across every stage of the insurance lifecycle.",
      },
    ],
  },
  {
    title: "AI Use Cases in Insurance",
    duration: "1 hr.",
    list: [
      {
        heading: "AI in Insurance – The Big Picture:",
        para: "Get a clear intro to how ML, NLP, and predictive analytics are transforming the insurance landscape.",
      },
      {
        heading: "High-Impact Use Cases:",
        para: "Explore real examples of AI improving claims processing, underwriting, fraud detection, CX, and risk management.",
      },
      {
        heading: "Value Across the Value Chain:",
        para: "Join an interactive session on how AI drives measurable ROI across every stage of the insurance lifecycle.",
      },
    ],
  },
  {
    title: "AI Use Cases in Insurance",
    duration: "1 hr.",
    list: [
      {
        heading: "AI in Insurance – The Big Picture:",
        para: "Get a clear intro to how ML, NLP, and predictive analytics are transforming the insurance landscape.",
      },
      {
        heading: "High-Impact Use Cases:",
        para: "Explore real examples of AI improving claims processing, underwriting, fraud detection, CX, and risk management.",
      },
      {
        heading: "Value Across the Value Chain:",
        para: "Join an interactive session on how AI drives measurable ROI across every stage of the insurance lifecycle.",
      },
    ],
  },
  {
    title: "AI Use Cases in Insurance",
    duration: "1 hr.",
    list: [
      {
        heading: "AI in Insurance – The Big Picture:",
        para: "Get a clear intro to how ML, NLP, and predictive analytics are transforming the insurance landscape.",
      },
      {
        heading: "High-Impact Use Cases:",
        para: "Explore real examples of AI improving claims processing, underwriting, fraud detection, CX, and risk management.",
      },
      {
        heading: "Value Across the Value Chain:",
        para: "Join an interactive session on how AI drives measurable ROI across every stage of the insurance lifecycle.",
      },
    ],
  },
];
const outcomesData = {
  heading: "Walk Away With Real-World Skills, Strategy & Clarity",
  para: "By the end of this hands-on workshop, your team will be equipped to move AI projects from concept to execution with confidence. Expect tangible outcomes, not just theory.",
  para2: "What You'll Gain:",
  points: [
    {
      id: "1",
      title: "Clear AI Roadmap",
      text: "Identify high-impact use cases tailored to your insurance workflows—from underwriting to claims automation.",
      width: "w-[30%]",
    },
    {
      id: "2",
      title: "Hands-On GenAI Experience",
      text: "Build and deploy a working AI/GenAI prototype using your own or sample data—no-code to full-code options available.",
      width: "w-full",
    },
    {
      id: "3",
      title: "Compliance-First AI Knowledge",
      text: "Understand how to align AI solutions with SOC 2, ISO 27001, HIPAA, and GDPR standards.",
      width: "w-full",
    },
    {
      id: "4",
      title: "Cross-Functional Alignment",
      text: "Align business, data, and tech teams on a shared AI vision and execution path.",
      width: "w-[60%] max-sm:w-full",
    },
    {
      id: "5",
      title: "Access to Expert Frameworks & Templates",
      text: "Take home checklists, governance templates, and deployment blueprints used by top insurers.",
      width: "w-[60%] max-sm:w-full",
    },
  ],
};



const faqData = [
  {
    question: "What is UnifyAI?",
    answer: [
      "UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability.",
    ],
  },
  {
    question: "Who can use UnifyAI?",
    answer: [
      "UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability.",
    ],
  },
  {
    question: "How does UnifyAI integrate with existing systems?",
    answer: [
      "UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability.",
    ],
  },
  {
    question: "Is UnifyAI secure?",
    answer: [
      "UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability.",
    ],
  },
  {
    question: "What types of AI models does UnifyAI support?",
    answer: [
      "UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability.",
    ],
  },
];
