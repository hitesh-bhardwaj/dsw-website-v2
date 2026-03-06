import Header from "@/components/Testing/Header";
import Hero from "@/components/Testing/Hero";
import { ModalProvider } from "@/components/ModalProvider";
import WhyAIStruggles from "@/components/Homepage/WhyAIStruggles";
import Features from "@/components/Homepage/Features";
import UseCases from "@/components/Homepage/UseCases";
import RealWorldOutcomes from "@/components/RealWorldOutcomes";
import Testimonials from "@/components/Testimonials";
import dynamic from "next/dynamic";

const UnifiedRuntime = dynamic(() => import("@/components/Homepage/UnifiedRuntime"), {
  ssr: true,
});
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
const CTAPricing = dynamic(() => import("@/components/CTAPricing"), {
  ssr: true,
});
const CTAFinal = dynamic(() => import("@/components/CTAFinal"), {
  ssr: true,
});

export const metadata = {
  title: "Performance Testing Page - DSW UnifyAI",
  description: "Optimized hero section with minimal JavaScript and CSS",
};

export default function TestingPage() {
  return (
    <ModalProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <Hero heroContent={heroContent} variant="default" />
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
    </ModalProvider>
  );
}

// Hero content from homepage
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
};

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

const ctaContent = {
  heading: "Own How AI Runs in Your Enterprise",
  para: "DSW is the enterprise AI operating system layer that sits on top of your existing OS and infrastructure – putting enterprises in control of how AI is built, governed, and operated at scale.",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book: true
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team"
  },
}