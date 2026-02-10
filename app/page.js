import AlwaysOnAI from "@/components/AlwaysOnAI";
import WhyAIStruggles from "@/components/Homepage/WhyAIStruggles";
// import CoreEnterpriseSystem from "@/components/Homepage/CoreEnterpriseSystem";
import Clients from "@/components/Clients";
import RealWorldOutcomes from "@/components/RealWorldOutcomes";
import Testimonials from "@/components/Testimonials";
import CTAPricing from "@/components/CTAPricing";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import UnifiedRuntime from "@/components/Homepage/UnifiedRuntime";
import Features from "@/components/Homepage/Features";
import UseCases from "@/components/Homepage/UseCases";
import CoreEnterpriseSystemSticky from "@/components/Homepage/CoreEnterpriseSystemSticky";

export default function Home() {
  return (
    <Layout>
    <main className="min-h-screen">
      <HeroNew heroContent={heroContent}/>
      <WhyAIStruggles />
      <UnifiedRuntime/>
      <Features/>
      {/* <CoreEnterpriseSystem /> */}
      <CoreEnterpriseSystemSticky/>
      <UseCases/>
      <AlwaysOnAI />
      <Clients />
      <RealWorldOutcomes />
      <CTAPricing />
      <Testimonials />
      <CTAFinal ctaContent={ctaContent}/>
    </main>
    </Layout>
  );
}


const heroContent={
  tagline:"Governed. Explainable. Production-Ready AI at Scale.",
  heading:"The Enterprise AI Operating System",
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
  heading:"Own How AI Runs in Your Enterprise  ",
  para:"DSW is the enterprise AI operating system layer that sits on top of your existing OS and infrastructure – putting enterprises in control of how AI is built, governed, and operated at scale. ",
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
