import CTAFinal from "@/components/CTAFinal";
import Faqs from "@/components/FAQs";
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
import React from "react";

const page = () => {
  return (
    <>
    <Layout>
        <HeroNew heroContent={heroContent} variant={"rightVertical"}/>
        <Features featuresData={featuresData}/>
         <WorkshopFlow sessionsData={sessionsData} space={"space-y-[2vw]"} />
         <Outcomes outcomesData={outcomesData}/>
          <Empower  heading="Ready to Empower Your Team with Practical AI Skills?"
          para="Fill out the form"
          width={"w-[90%]"}/>
          <Faqs data={faqData}/>
        <CTAFinal ctaContent={ctaContent}/>
    </Layout>
    </>
  );
};

export default page;



const heroContent={
  tagline:"",
  heading:"DeepTech AI + GenAI Hands-On Masterclass",
  primaryButton:{
    present:false,
    link:"#",
    text:"Explore the Platform"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
  para:"Led by AI architects and industry experts from Data Science Wizards (DSW), this session covers strategy, architecture, compliance, and practical implementation using our enterprise platform, UnifyAI. This intensive hands-on masterclass is designed for enterprises, innovation leaders, and technical teams who want to go beyond theory and bring AI and Generative AI into real-world production."
}

const ctaContent={
  heading:"Take a lightning tour of the Enterprise AI Platform",
  para:"Discover how UnifyAI can accelerate your AI/ML and GenAI initiatives with seamless deployment, scalability, and security.",
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:true,
    link:"#",
    text:"Schedule a Call"
  },
}
const featuresData=[
  {
    icon: <Business/>,
    title: "CTOs, CIOs, and Heads of Innovation",
    para: "Learn how to align your organization’s AI roadmap with business goals, assess technology readiness, and accelerate adoption with governance-first deployment strategies. ",
  },
  {
    
    icon: <DataScience/>,
    title: "Product, Risk & Compliance Leaders",
    para: "Gain critical knowledge of AI explainability, bias mitigation, and regulatory compliance (SOC 2, GDPR, HIPAA, ISO 27001). Discover how to bring secure and trustworthy AI solutions to market while staying aligned with internal policies.",
  },
  {
   
    icon: <RiskCompliance/>,
    title: "Data Science, Engineering & ML Ops Teams",
    para: "Get hands-on experience with building, deploying, and managing GenAI and ML models in production. Learn to scale infrastructure, operationalize models faster, and integrate securely with enterprise systems—all within days.",
  },
  {
    icon: <Business/>,
    title: "AI Strategy & Transformation Consultants",
    para: "Understand how to scope, prioritize, and scale GenAI initiatives for enterprise clients. Gain access to frameworks, best practices, and deployment blueprints trusted by Fortune 500 firms and leading insurers.",
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
