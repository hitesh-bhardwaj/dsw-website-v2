import React from 'react'
import AgenticAbout from '@/components/AgenticAI/About'
import AgenticCards from '@/components/AgenticAI/AgenticCards'
import CoreCapabilities from '@/components/AgenticAI/CoreCapabilities'
import AgentSteps from '@/components/AgenticAI/AgentSteps'
import HowAgenticWorks from '@/components/AgenticAI/HowAgenticWorks'
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";


const AgenticAI = () => {
  return (
    <>
     <Layout>
    <main className="min-h-screen">
        <HeroNew heroContent={heroContent} variant={"bottomRight"} />
        <AgenticAbout />
        <AgenticCards />
        <CoreCapabilities />
        <AgentSteps />
        <HowAgenticWorks />
        {/* <HowAgenticWorksWheel/> */}
         <CTAFinal ctaContent={ctaContent}/>
    </main>
    </Layout>
    </>
  )
}

export default AgenticAI

const heroContent={
  tagline:"Deploy AI agents in hours! ",
  heading:"Governed, explainable, production-ready agents for enterprises.",
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}

const ctaContent={
  heading:"DSW AgenticAI runtime for BFSI ",
  para:"Unify data, models and agent orchestration with pre-built BFSI playbooks, audit-first governance and human-in-the-loop controls - built for regulated financial services. ",
  subPara: true,
  subParaText: 'Turn AI pilots into auditable, production-grade agents',
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}