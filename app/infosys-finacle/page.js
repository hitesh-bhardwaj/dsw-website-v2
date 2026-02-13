import HeroNew from "@/components/HeroNew";
import Deployments from "@/components/InfosysFinacle/Deployments";
import EngagementModels from "@/components/InfosysFinacle/EngagementModels";
import Expertise from "@/components/InfosysFinacle/Expertise";
import Outcomes from "@/components/InfosysFinacle/Outcomes";
import Recognized from "@/components/InfosysFinacle/Recognized";
import Values from "@/components/InfosysFinacle/Values";
import Layout from "@/components/Layout/Layout";
import Testimonials from "@/components/Testimonials";



export default async function InfosysFinacle() {
  return (
    <>
    <Layout>
        <HeroNew heroContent={heroContent}/>
        <Deployments/>
        <Recognized/>
        <Outcomes/>
        <Expertise/>
        <EngagementModels/>
        <Values/>
        <Testimonials/>
        {/* <CTAFinal ctaContent={ctaContent}/> */}
    </Layout>
    </>
  );
}

const heroContent={
  tagline:"Trusted Strategic Open-Source Consulting Partner to Infosys Finacle",
  heading:"Together, Bringing Open-Source Success to Global Banks",
  headingWidth:"w-[85%]",
  primaryButton:{
    present:false,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
  images:true
}

const ctaContent={
  heading:"Ready to run enterprise AI safely, continuously, and at scale ? ",
  para:"Launch smarter, faster, scalable AI / ML runtime.",
  subPara: false,
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:true,
    link:"#",
    text:"Contact Sales"
  },

}


const faqData = [
  {
    question:
      "What is Agentic AI, and why is it a game-changer for businesses using DSW Agentic AI?",
    answer: [
      "Agentic AI is like giving your AI systems the ability to think, plan, and act on their own to complete complex business tasks. Instead of just answering a question, it can break down a goal, execute the steps, and learn how to do it better next time. DSW Agentic AI provides the tools and structure (the 'control center') needed to safely build, deploy, and manage these independent AI agents, ensuring they operate efficiently and deliver real business value across many different applications.",
    ],
  },
  {
    question:
      "How does Agentic AI go beyond traditional AI to solve complex business problems?",
    answer: [
      "Traditional AI handles single, repetitive tasks based on strict rules (like a simple chatbot that only responds to set keywords). Agentic AI, however, acts as a genuine problem-solver: it can break down a large business goal, figure out the necessary steps, use different external systems (like a human would), and continuously learn and correct its course as needed. This capability allows AgenticAI platform users to automate complex, multi-step processes like end-to-end customer service resolution, supply chain optimization, or even autonomous software engineering—moving far beyond simple responses into true operational management.",
    ],
  },
  {
    question:
      "What are the key benefits of adopting Agentic AI for businesses?",
    answer: [
      "Agentic AI drives operational transformation and delivers rapid financial returns by enabling autonomous, complex workflows. The core benefits include: <br/> <ul class='pl-8 py-3 space-y-2 list-disc'> <li>Significant cost reduction </li> <li> Speed and scalability </li>  <li> Consistent quality </li> </ul>",
    ],
  },
  {
    question:
      "Do Agentic AI systems collaborate, and if so, how do they communicate with each other?",
    answer: [
      "Yes, collaboration is key to Agentic AI. To tackle a large business goal, agents often work together like a specialized team.",
      "They communicate using structured digital 'messages' (data formats like JSON) or specialized messaging protocols. This ensures that their digital dialogue is precise, accurate, and that complex information is clearly understood between different agents as they coordinate tasks.",
    ],
  },
  {
    question:
      "How do AI Agents learn and continuously improve their performance?",
    answer: [
      "Agents learn by running a simple, powerful cycle: they take an action, observe the result (the outcome), and then evaluate whether that result moved them closer to the goal. They continuously adjust their strategies based on this feedback to get better results next time. This process is enabled by built-in feedback loops and a working memory, helping the agents constantly refine their plans, making them smarter, more accurate, and more efficient over time.",
    ],
  },
  {
    question:
      "Are AI Agents secure, and how is their access to sensitive data managed?",
    answer: [
      "Security is critical because AI agents often interact with highly sensitive data and core operating systems. To manage this risk, agents are never granted blanket access. Instead, they operate on a 'least privilege' principle: each agent is given only the specific permissions it needs to complete its assigned task, ensuring tight control and data protection.",
    ],
  },
  {
    question:
      "What are the 'Guardrails' in AI Agents, and why are they important?",
    answer: [
      "Guardrails are the essential, built-in safety mechanisms that prevent an AI Agent from acting outside its intended rules or boundaries.",
      "They are critical because they:",
      "<ul class='pl-8 py-3 space-y-4 list-disc'> <li> <span class='font-medium'>Enforce Safety:<span> They block the agent from producing inappropriate, biased, or harmful outputs (like providing unauthorized advice). </li><li> <span class='font-medium'>Prevent Errors:<span> They stop the agent from taking high-risk or irreversible actions (like deleting a record or spending over a budget) without human review.</li> <li> <span='font-medium'>Ensure Compliance:</span> They guarantee that the agent adheres to all legal, ethical, and company policies, ensuring the system remains trustworthy and compliant. </li>  </ul>",
    ],
  },
];

