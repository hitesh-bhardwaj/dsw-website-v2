import CTAFinal from "@/components/CTAFinal";
import Faqs from "@/components/FAQs";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import { AIStrategy } from "@/components/Svg/Workshops/AIStrategy";
import { CTO } from "@/components/Svg/Workshops/CTO";
import { DataScienceEngineering } from "@/components/Svg/Workshops/DataScienceEngineering";
import { ProductRisk } from "@/components/Svg/Workshops/ProductRisk";
import Empower from "@/components/Workshops/Empower";
import Features from "@/components/Workshops/Features";
import KeyLearnings from "@/components/Workshops/KeyLearnings";
import Outcomes from "@/components/Workshops/Outcomes";
import WorkshopFlow from "@/components/Workshops/WorkshopFlow";
import React from "react";

const page = () => {
  return (
    <>
    <Layout>
        <HeroNew heroContent={heroContent} variant={"rightVertical"}/>
        <Features featuresData={featuresData}/>
        <KeyLearnings/>
         <WorkshopFlow sessionsData={sessionsData} space={"space-y-[2vw]"} />
         <Outcomes outcomesData={outcomesData}/>
          <Empower  heading="First Come First Basis - Limited Seats!"
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
    icon: <CTO/>,
    title: "CTOs, CIOs, and Heads of Innovation",
    para: "Learn how to align your organization’s AI roadmap with business goals, assess technology readiness, and accelerate adoption with governance-first deployment strategies. ",
  },
  {
    
    icon: <ProductRisk/>,
    title: "Product, Risk & Compliance Leaders",
    para: "Gain critical knowledge of AI explainability, bias mitigation, and regulatory compliance (SOC 2, GDPR, HIPAA, ISO 27001). Discover how to bring secure and trustworthy AI solutions to market while staying aligned with internal policies.",
  },
  {
   
    icon: <DataScienceEngineering/>,
    title: "Data Science, Engineering & ML Ops Teams",
    para: "Get hands-on experience with building, deploying, and managing GenAI and ML models in production. Learn to scale infrastructure, operationalize models faster, and integrate securely with enterprise systems—all within days.",
  },
  {
    icon: <AIStrategy/>,
    title: "AI Strategy & Transformation Consultants",
    para: "Understand how to scope, prioritize, and scale GenAI initiatives for enterprise clients. Gain access to frameworks, best practices, and deployment blueprints trusted by Fortune 500 firms and leading insurers.",
  },
  
];
const sessionsData=[
  {
    title:"AI, ML, Generative AI and Enterprise Integration",
    duration:"1 hr.",
    list:[
      {
        heading:"",
        para:"Introduction to core concepts of AI, ML and Deep Learning."
      },
      {
        heading:"",
        para:"Real-world AI/ML enterprise use cases."
      },
      {
        heading:"",
        para:"Introduction to Generative AI and Large Language Models (LLMs)."
      },
      {
        heading:"",
        para:"Real-world applications of GenAI for automation and process optimization."
      },
    ]
  },
  {
    title:"Hands on experience of AI lifecycle till production",
    duration:"1 hr.",
    list:[
      {
        heading:"",
        para:"Exploring components of Machine Learning solution lifecycle like data ingestion, data munging, ML/DL modeling, deployment and monitoring."
      },
      {
        heading:"",
        para:"Applying strategies to verify Data drift and Model drift of ML/DL models. "
      },
      {
        heading:"",
        para:"Lifecycle of AI projects – from ideation to business transformation."
      },
    ]
  },
  {
    title:"Advanced AI and ML Use Cases for Enterprise Value",
    duration:"1 hr.",
    list:[
      {
        heading:"",
        para:"Overview of advanced ML algorithms."
      },
      {
        heading:"",
        para:"Applying predictive analytics to enterprise problems."
      },
      {
        heading:"",
        para:"Deploying AI solutions at scale – cloud and on-premises strategies."
      },
      {
        heading:"",
        para:"Hands-on problem-solving session – Applying advanced techniques to real-world problems."
      },
    ]
  },
  {
    title:"AI, ML, Generative AI and Enterprise Integration",
    duration:"1 hr.",
    list:[
      {
        heading:"",
        para:"Introduction to core concepts of AI, ML and Deep Learning."
      },
      {
        heading:"",
        para:"Real-world AI/ML enterprise use cases."
      },
      {
        heading:"",
        para:"Introduction to Generative AI and Large Language Models (LLMs)."
      },
      {
        heading:"",
        para:"Real-world applications of GenAI for automation and process optimization."
      },
    ]
  },
  {
    title:"Hands on experience of AI lifecycle till production",
    duration:"1 hr.",
    list:[
      {
        heading:"",
        para:"Exploring components of Machine Learning solution lifecycle like data ingestion, data munging, ML/DL modeling, deployment and monitoring."
      },
      {
        heading:"",
        para:"Applying strategies to verify Data drift and Model drift of ML/DL models. "
      },
      {
        heading:"",
        para:"Lifecycle of AI projects – from ideation to business transformation."
      },
    ]
  },
  {
    title:"Advanced AI and ML Use Cases for Enterprise Value",
    duration:"1 hr.",
    list:[
      {
        heading:"",
        para:"Overview of advanced ML algorithms."
      },
      {
        heading:"",
        para:"Applying predictive analytics to enterprise problems."
      },
      {
        heading:"",
        para:"Deploying AI solutions at scale – cloud and on-premises strategies."
      },
      {
        heading:"",
        para:"Hands-on problem-solving session – Applying advanced techniques to real-world problems."
      },
    ]
  },
 
];
const outcomesData={
heading:"Walk Away With Real-World Skills, Strategy & Clarity",
para:"By the end of this hands-on workshop, your team will be equipped to move AI projects from concept to execution with confidence. Expect tangible outcomes, not just theory.",
para2:"What You'll Gain:",
points:[
  {
    id: "01",
    title: "Build & Test a Working AI/GenAI Use Case",
    text: "Create and deploy a working AI or GenAI prototype using real or sample data—no-code to full-code.",
  },
  {
    id: "02",
    title: "Learn Enterprise AI Governance",
    text: "Understand how to manage AI securely with built-in compliance, auditability, and explainability.",
    
  },
  {
    id: "03",
    title: "Align Tech, Data & Business Teams",
    text: "Bridge the gap between technical teams and business stakeholders for faster, unified execution.",
    
  },
  {
    id: "04",
    title: "Get Proven Tools & Templates",
    text: "Walk away with deployment checklists, governance frameworks, and architecture blueprints used by top enterprises.",
    
  },
  {
    id: "05",
    title: "Earn a Certificate of Completion",
    text: "Showcase your skills with a DSW-issued certificate recognizing your AI readiness and hands-on expertise.",
    
  }
]
}

const faqData = [
  {
    question: "What is UnifyAI?",
    answer:
      ["UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability."],
  },
  {
    question: "Who can use UnifyAI?",
    answer:
      ["UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability."],
  },
  {
    question: "How does UnifyAI integrate with existing systems?",
    answer:
      ["UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability."],
  },
  {
    question: "Is UnifyAI secure?",
    answer:
      ["UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability."],
  },
  {
    question: "What types of AI models does UnifyAI support?",
    answer:
      ["UnifyAI is an enterprise AI platform that enables businesses to develop, deploy, and manage AI models seamlessly. It supports machine learning, Generative AI, and large language models (LLMs) while ensuring security, compliance, and scalability."],
  },
]
