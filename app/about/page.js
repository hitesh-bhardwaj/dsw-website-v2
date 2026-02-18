import React from 'react'
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import Intro from '@/components/AboutUs/Intro'
import DSWArrival from '@/components/AboutUs/DSWArrival'
import WhatWeBelieve from '@/components/AboutUs/WhatWeBelieve';
import TeamWrapper from '@/components/AboutUs/TeamWrapper';
import JoinUs from '@/components/AboutUs/JoinUs';
import WhatWeStandFor from '@/components/AboutUs/WhatWeStandFor';

const AgenticAI = () => {
  return (
    <>
     <Layout>
    <main className="min-h-screen">
        <HeroNew heroContent={heroContent} variant={"bottomRight"} />
        <Intro/>
        <DSWArrival/>
        <WhatWeBelieve/>
        <WhatWeStandFor />
       <TeamWrapper/>
       <JoinUs/>
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
  heading:"Ready to operate AI like a unified, governed system? ",
  para:"Whether you’re exploring enterprise AI at scale or looking to build the foundation with us  - we’d love to connect.",
  subPara: false,
  primaryButton:{
    present:true,
    link:"#",
    text:"Talk to Us"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}