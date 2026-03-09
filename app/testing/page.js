import Hero from "@/components/Testing/Hero";
import { ModalProvider } from "@/components/ModalProvider";
import dynamic from "next/dynamic";
import HeaderNew from "@/components/Layout/HeaderNew";

// Lazy load below-the-fold components for better Speed Index & TBT
const WhyAIStruggles = dynamic(() => import("@/components/Homepage/WhyAIStruggles"), { ssr: true });
const UnifiedRuntime = dynamic(() => import("@/components/Homepage/UnifiedRuntime"), { ssr: true });
const Features = dynamic(() => import("@/components/Homepage/Features"), { ssr: true });
const CoreEnterpriseSystemSticky = dynamic(() => import("@/components/Homepage/CoreEnterpriseSystemSticky"), { ssr: true });
const UseCases = dynamic(() => import("@/components/Homepage/UseCases"), { ssr: true });
const AlwaysOnAI = dynamic(() => import("@/components/AlwaysOnAI"), { ssr: true });
const ClientsBlur = dynamic(() => import("@/components/Homepage/ClientsBlur"), { ssr: true });
const RealWorldOutcomes = dynamic(() => import("@/components/RealWorldOutcomes"), { ssr: true });
const CTAPricing = dynamic(() => import("@/components/CTAPricing"), { ssr: true });
const CertificationsAndAwards = dynamic(() => import("@/components/Homepage/CertificationsAndAwards"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const CTAFinal = dynamic(() => import("@/components/CTAFinal"), { ssr: true });
const FooterNew = dynamic(() => import("@/components/Layout/Footer"), { ssr: true });

export default function TestingPage() {
  return (
    <ModalProvider>
      <HeaderNew />
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
        <FooterNew />
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