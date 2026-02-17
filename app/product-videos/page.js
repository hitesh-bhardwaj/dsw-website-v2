import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import VideoListing from "@/components/ProductVideos/VideoListing";
import React from "react";


const Page = () => {
  return (
    <>
    <Layout>
        <HeroNew heroContent={heroContent} variant={"topLeft"} breadcrumbs={true}/>
        <VideoListing/>
        <CTAFinal ctaContent={ctaContent}/>
    </Layout>
    </>
  );
};

export default Page;

const heroContent={
  tagline:"",
  heading:"Watch AI in Action- Learn, Explore, and Be Inspired",
  headingWidth:"w-[84%]",
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
  images:false,
  para:"Welcome to the DSW Video Hub — where we showcase how AI and GenAI are transforming enterprises through secure, scalable, and industry-specific solutions. Whether you’re evaluating platforms, looking for technical demos, or curious about how leading organizations are accelerating their AI journey, you’ll find valuable insights here.​"
}

const ctaContent={
  heading:"Don’t Miss What’s Next",
  para:"New videos are added regularly as we release features, run workshops, and scale AI across new industries.",
  primaryButton:{
    present:true,
    link:"https://www.youtube.com/@DataScienceWizards",
    targetPrimary:true,
    text:"Subscribe Our Youtube "
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Schedule a Call"
  },
}