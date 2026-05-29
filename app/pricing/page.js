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
  title:
    "Enterprise AI Pricing Platform | Unlimited AI Subscription | DSW UnifyAI OS",
  description:
    "Simplify enterprise AI costs with one predictable subscription for AI, Agentic AI, governance, deployment, orchestration, and enterprise-scale operations across your organization.",
  url: "/pricing",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/pricing",
    languages: {
      "en-US": "/pricing",
    },
  },
  keywords: [
    "enterprise AI pricing",
    "AI subscription platform",
    "AI operating system pricing",
    "agentic AI pricing",
    "enterprise AI platform",
    "predictable AI pricing",
    "AI governance platform",
    "enterprise AI deployment",
    "AI infrastructure platform",
    "DSW UnifyAI OS",
  ],
  openGraph: {
    title:
      "Enterprise AI Pricing Platform | Unlimited AI Subscription | DSW UnifyAI OS",
    description:
      "One enterprise subscription to build, deploy, govern, and scale AI and Agentic AI without unpredictable pricing escalation.",
    url: "/pricing",
    type: "website",
    images: [
      {
        url: `${homepage}seo/pricing-page.png`,
        width: 1200,
        height: 630,
        alt: "DSW UnifyAI OS Enterprise AI Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Enterprise AI Pricing Platform | Unlimited AI Subscription | DSW UnifyAI OS",
    description:
      "Operate enterprise AI with predictable pricing using one subscription for deployment, governance, orchestration, and scale.",
    images: [`${homepage}seo/pricing-page.png`],
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

        <PricingForm />

        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
};

export default Page;

const heroContent = {
  tagline: "Enterprise AI Pricing Reimagined",

  heading:
    "<span class='text-primary-blue shimmer-text'>One Subscription.</span><br/> Unlimited AI.<br/> Predictable Enterprise Scale.",

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

  para:
    "Break free from per-model, per-agent, and per-workflow pricing. DSW UnifyAI OS gives enterprises a single subscription to build, deploy, govern, and operate AI and Agentic AI at scale without unpredictable cost escalation.",
};

const ctaContent = {
  heading: "Own How AI Runs Across Your Enterprise",
  para:
    "DSW UnifyAI OS is the Enterprise AI Operating System runs like a horizontal layer on top of your current infrastructure or OS, without disturbing it. Deploy on-premises, in the cloud, or in hybrid environments while maintaining full ownership of enterprise-built AI assets.",

  para2:
    "Retain complete control of your AI strategy with no vendor lock-in, while operating AI securely and consistently across the enterprise.",

  paraWidth: "w-[85%]",

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