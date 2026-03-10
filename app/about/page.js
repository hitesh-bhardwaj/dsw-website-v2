import React from "react";
import dynamic from "next/dynamic";
import HeroNew from "@/components/Layout/HeroNew";
import Layout from "@/components/Layout/Layout";
import { WebpageJsonLd } from "@/lib/json-ld";
import { getPageMetadata } from "@/components/config/metadata";
import { homepage } from "@/lib/util";

// Dynamic Components
const Intro = dynamic(() => import("@/components/AboutUs/Intro"));
const DSWArrival = dynamic(() => import("@/components/AboutUs/DSWArrival"));
const Infrastructure = dynamic(() => import("@/components/AboutUs/Infrastructure"));
const WhatWeBelieve = dynamic(() => import("@/components/AboutUs/WhatWeBelieve"));
const WhatWeStandFor = dynamic(() => import("@/components/AboutUs/WhatWeStandFor"));
const TeamWrapper = dynamic(() => import("@/components/AboutUs/TeamWrapper"));
const JoinUs = dynamic(() => import("@/components/AboutUs/JoinUs"));
const CTAFinal = dynamic(() => import("@/components/CTAFinal"));

export const metadata = getPageMetadata({
  title: "About DSW UnifyAI - Deep-Tech AI for Enterprises",
  description:
    "Learn about Data Science Wizards: mission, vision, team & enterprise AI platform UnifyAI that powers scalable, secure, real-world AI deployments.",
  url: "about",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/about",
    languages: {
      "en-US": "/about",
    },
  },
  openGraph: {
    url: "about",
    images: [
      {
        url: `${homepage}seo/about.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

const AgenticAI = () => {
  return (
    <>
      <WebpageJsonLd metadata={metadata} />
      <Layout>
        <main className="min-h-screen">
          <HeroNew heroContent={heroContent} variant={"bottomRight"} />
          <Intro />
          <DSWArrival />
          <Infrastructure />
          <WhatWeBelieve />
          <WhatWeStandFor />
          <TeamWrapper />
          <JoinUs />
          <CTAFinal ctaContent={ctaContent} />
        </main>
      </Layout>
    </>
  );
};

export default AgenticAI;

const heroContent = {
  tagline:
    "We're building the Enterprise AI Operating System. Because production AI needs an ecosystem, not scattered tools.",
  heading: "About Us",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book:true
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team",
  },
};

const ctaContent = {
  heading: "Ready to operate AI like a unified, governed system? ",
  para: "Whether you’re exploring enterprise AI at scale or looking to build the foundation with us  - we’d love to connect.",
  subPara: false,
  primaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to Us",
  },
  secondaryButton: {
    present: false,
    link: "#",
    text: "Talk to our Team",
  },
};
