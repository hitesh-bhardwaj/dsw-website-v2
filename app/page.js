import WhyAIStruggles from "@/components/Homepage/WhyAIStruggles";
import RealWorldOutcomes from "@/components/RealWorldOutcomes";
import Testimonials from "@/components/Testimonials";
import CTAPricing from "@/components/CTAPricing";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import UnifiedRuntime from "@/components/Homepage/UnifiedRuntime";
import Features from "@/components/Homepage/Features";
import UseCases from "@/components/Homepage/UseCases";
import { WebpageJsonLd } from "@/lib/json-ld";
import dynamic from "next/dynamic";

const CoreEnterpriseSystemSticky = dynamic(() => import("@/components/Homepage/CoreEnterpriseSystemSticky"), {
  ssr: true,
});
const AlwaysOnAI = dynamic(() => import("@/components/AlwaysOnAI"), {
  ssr: true,
});
const CertificationsAndAwards = dynamic(() => import("@/components/Homepage/CertificationsAndAwards"), {
  ssr: true,
});
const ClientsBlur = dynamic(() => import("@/components/Homepage/ClientsBlur"), {
  ssr: true,
});
export const metadata = {
  title: "DSW UnifyAI – Enterprise AI Platform for Insurance",
  description:
    "Launch AI use cases in days — scale fast, reduce cost, deploy GenAI in hours with DSW UnifyAI’s insurance-focused enterprise AI platform.",
  url: "",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
};

export default function Home() {
  return (
    <>
      <WebpageJsonLd metadata={metadata} />
      <Layout>
        <main className="min-h-screen">
          <HeroNew heroContent={heroContent} variant="default" />
          <WhyAIStruggles />
          <UnifiedRuntime />
          <Features />
          <CoreEnterpriseSystemSticky />
          <UseCases />
          <AlwaysOnAI content={tourContent} />
          <ClientsBlur />
          <RealWorldOutcomes />
          <CTAPricing />
          <CertificationsAndAwards certificationsContent={certificationsContent} />
          <Testimonials />
          <CTAFinal ctaContent={ctaContent} />
        </main>
      </Layout>
    </>
  );
}


const heroContent = {
  tagline: "Build, integrate, deploy, govern, and operate AI at scale, in your own environment.",
  heading: "The Enterprise AI Operating System",
  primaryButton: {
    present: true,
    book: true,
    link: "#",
    text: "Book a Demo"
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team"
  },
}

const ctaContent = {
  heading: "Own How AI Runs in Your Enterprise  ",
  para: "DSW is the enterprise AI operating system layer that sits on top of your existing OS and infrastructure – putting enterprises in control of how AI is built, governed, and operated at scale. ",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book:true
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team"
  },
}

const tourContent = {
  heading: "Always-On AI. Built as Infrastructure.",
  para: "AI only scales when enterprises can build it safely, trust it in daily workflows, and run it continuously",
  tagline: "The AI Operating System makes this possible by running as part of your core enterprise architecture."
}

const certificationsContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};

