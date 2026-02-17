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
        <HeroNew heroContent={heroContent} variant={"topLeft"}/>
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
