import React from 'react'
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import UnifyAbout from '@/components/UnifyAI/About'
import AlwaysOnAI from '@/components/AlwaysOnAI'
import UseCases from '@/components/UnifyAI/UseCases'
import Fragmented from '@/components/UnifyAI/Fragmented'
import Capabilities from '@/components/UnifyAI/Capabilities';
import Accelerate from '@/components/UnifyAI/Accelerate';


const AgenticAI = () => {
  return (
    <>
     <Layout>
    <main className="min-h-screen">
        <HeroNew heroContent={heroContent} />
        <UnifyAbout/>
        <AlwaysOnAI content={tourContent}/>
        <UseCases/>
        <Fragmented/>
        <Capabilities/>
        <Accelerate/>
         <CTAFinal ctaContent={ctaContent}/>
    </main>
    </Layout>
    </>
  )
}

export default AgenticAI

const heroContent={
  tagline:"No more delays. No more stalled pilots. Just production-ready AI/ML in weeks.",
  heading:"Enterprise AI/ML Runtime Built for Real-World Use Case Deployment",
  primaryButton:{
    present:false,
    link:"#",
    text:"Book a demo"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}

const ctaContent={
  heading:"Ready to run enterprise AI safely, continuously, and at scale ? ",
  para:"Launch smarter, faster, scalable AI / ML runtime.",
  subPara: false,
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a demo"
  },
  secondaryButton:{
    present:true,
    link:"#",
    text:"Contact Sales"
  },

}

const tourContent={
  heading:"Take a Lightning Tour of DSW UnifyAI",
  para:"Your AI foundation — not just for today’s use cases, but for tomorrow’s vision.",
  tagline:""
}