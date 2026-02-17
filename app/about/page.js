import React from 'react'
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import Intro from '@/components/AboutUs/Intro'
import DSWArrival from '@/components/AboutUs/DSWArrival'
import WhatWeBelieve from '@/components/AboutUs/WhatWeBelieve';

const AgenticAI = () => {
  return (
    <>
     <Layout>
    <main className="min-h-screen">
        <HeroNew heroContent={heroContent} variant={"bottomRight"} />
        <Intro/>
        <DSWArrival/>
        <WhatWeBelieve/>
        {/* <AgenticAbout />
        <AgenticCards />
        <CoreCapabilities />
        <AgentSteps />
        <HowAgenticWorks /> */}
        {/* <HowAgenticWorksWheel/> */}
         <CTAFinal ctaContent={ctaContent}/>
    </main>
    </Layout>
    </>
  )
}

export default AgenticAI

const heroContent={
  tagline:"We’re building the Enterprise AI Operating System. Because production AI needs an ecosystem, not scattered tools.",
  heading:"About Us",
  primaryButton:{
    present:true,
    link:"#",
    text:"Explore the Platform"
  },
  secondaryButton:{
    present:true,
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