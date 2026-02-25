import { getPageMetadata } from "@/components/config/metadata";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import CertificationsAndAwards from "@/components/Homepage/CertificationsAndAwards";
import Deployments from "@/components/InfosysFinacle/Deployments";
import EngagementModels from "@/components/InfosysFinacle/EngagementModels";
import Expertise from "@/components/InfosysFinacle/Expertise";
import Outcomes from "@/components/InfosysFinacle/Outcomes";
import Recognized from "@/components/InfosysFinacle/Recognized";
import Values from "@/components/InfosysFinacle/Values";
import Layout from "@/components/Layout/Layout";
import Testimonials from "@/components/Testimonials";
import { WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";

export const metadata = getPageMetadata({
  title: "Infosys Finacle Open Source Partner – DSW",
  description: "DSW is a strategic open-source consulting partner for Infosys Finacle, helping global banks modernize, deploy, and operate Finacle at scale with enterprise-grade governance.",
  url: "infosys-finacle",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/infosys-finacle",
    languages: {
      "en-US": "/infosys-finacle",
    },
  },
  openGraph: {
    url: "infosys-finacle",
    images: [
      {
        url: `${homepage}seo/infosys-finacle.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});


export default async function InfosysFinacle() {
  return (
    <>
    <WebpageJsonLd metadata={metadata} />
    <Layout>
        <HeroNew heroContent={heroContent} variant={"topLeft"}/>
        <Deployments/>
        <Recognized/>
        <Outcomes/>
        <Expertise/>
        <EngagementModels/>
        <Values/>
        <CertificationsAndAwards certificationsContent={certificationsContent}/>
        <Testimonials/>
        <CTAFinal ctaContent={ctaContent}/>
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
  heading:"Together aligned to build Global Banking Success.",
  subParaText:"62+ Years of Collective Open Source Experience & Exposure with Deep-Tech Expertise.",
  subPara:true,
  paraWidth:"w-full",
  para:"With a strong background in operating systems, middleware,  and the core enterprise technology ecosystem, we have been active contributors and trusted practitioners in the global open source community.  As Infosys Finacle’s strategic open-source consulting and services partner, we bring this collective depth of experience to jointly deliver skills, expertise, and predictable success for Finacle customers and global banks. ",
  primaryButton:{
    present:true,
    link:"/contact-us",
    text:" Talk to the team"
  },
}

const certificationsContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};