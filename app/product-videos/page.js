import { getPageMetadata } from "@/components/config/metadata";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import VideoListing from "@/components/ProductVideos/VideoListing";
import { BreadcrumbsJSONLD, WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import React from "react";

export const metadata = getPageMetadata({
  title: "DSW Product Videos - AI Demos & Platform Insights",
  description: "Watch product walkthroughs and demos: platform explanations, GenAI use in insurance, security features, and CTO vision in action.",
  url: "resources/product-videos",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/product-videos",
    languages: {
      "en-US": "/product-videos",
    },
  },
  openGraph: {
    url: "resources/product-videos",
    images: [
      {
        url: `${homepage}seo/product-videos.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

const Page = () => {
  return (
    <>
    <WebpageJsonLd metadata={metadata}/>
      <BreadcrumbsJSONLD pathname={metadata.url}/>
    <Layout>
        <HeroNew heroContent={heroContent} variant={"default"} breadcrumbs={true}/>
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