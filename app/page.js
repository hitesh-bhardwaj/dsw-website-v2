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
import ClientsBlur from "@/components/Homepage/ClientsBlur";

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
      <AlwaysOnAI content={tourContent}/>
      {/* <Clients /> */}
      <ClientsBlur/>
      <RealWorldOutcomes />
      <CTAPricing />
      <Testimonials />
      <CTAFinal ctaContent={ctaContent}/>
    </main>
    </Layout>
  );
}


const heroContent={
  tagline:"Build, integrate, deploy, govern, and operate AI at scale, in your own environment.",
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

const tourContent={
  heading:"Always-On AI. Built as Infrastructure.",
  para:"AI only scales when enterprises can build it safely, trust it in daily workflows, and run it continuously",
  tagline:"The AI Operating System makes this possible by running as part of your core enterprise architecture."
}
