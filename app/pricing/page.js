import { getPageMetadata } from "@/components/config/metadata";
import Layout from "@/components/Layout/Layout";
import { WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import dynamic from "next/dynamic";

import React from "react";
import HeroNew from "@/components/Layout/HeroNew";
import PricingTableWrapper from "@/components/Homepage/PricingTableWrapper";
import PricingForm from "@/components/Modals/PricingForm";


const CTAFinal = dynamic(() => import("@/components/CTAFinal"), {
  ssr: true,
});

export const metadata = getPageMetadata({
  title: "AI Operating System for Banking | DSW",
  description:
    "Operate AI across banking risk, compliance, credit, fraud, and customer workflows with one governed system built for production enterprise use.",
  url: "/solutions/banking",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/solutions/banking",
    languages: {
      "en-US": "/solutions/banking",
    },
  },
  openGraph: {
    url: "/solutions/banking",
    images: [
      {
        url: `${homepage}seo/solutions-banking.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

const Page = () => {
  return (
    <>
      <WebpageJsonLd metadata={metadata} />
      <Layout>
        <HeroNew
          heroContent={heroContent}
          variant={"bottomLeft"}
          breadcrumbs={true}
        />
        
        <PricingTableWrapper />
        <PricingForm/>
        
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
};

export default Page;

const heroContent = {
  tagline:
    "Eliminate unpredictable per-model and per-agent costs with a unified enterprise AI operating system.",
  heading: "One Subscription. Unlimited Scale. Zero Pricing Surprises.",
  headingWidth: "w-[84%]",
  primaryButton: {
    present: false,
    link: "#",
    text: "Book a Demo",
  },
  secondaryButton: {
    present: false,
    link: "#",
    text: "Talk to our Team",
  },
  paraWidth: "w-[60%]",
  images: false,
  para: "Most AI platforms charge you every time your AI scales-per model, per agent, and per workflow. DSW UnifyAI OS changes the economics of enterprise AI. With a single subscription and a centralized, governed runtime, you can build, deploy, and operate unlimited AI and Agentic AI use cases. Stop managing a fragmented AI stack and unpredictable scaling bills. ",
};


const ctaContent = {
  heading: "Own How AI Runs in Your Enterprise",
  para: "DSW UnifyAI OS is the enterprise AI operating system layer that sits on top of your existing OS and infrastructure – putting enterprises in control of how AI is built, governed, and operated at scale.",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book: true,
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team",
  },
};


