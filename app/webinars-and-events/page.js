import React from "react";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import Expect from "@/components/WebinarsAndEvents/Expect";
import UpcomingWebinars from "@/components/WebinarsAndEvents/UpcomingWebinars";
import Workshops from "@/components/WebinarsAndEvents/Workshops";
import WatchOnDemand from "@/components/WebinarsAndEvents/WatchOnDemand";
import { BreadcrumbsJSONLD, WebpageJsonLd } from "@/lib/json-ld";
import { getPageMetadata } from "@/components/config/metadata";
import { homepage } from "@/lib/util";


export const metadata = getPageMetadata({
  title: "Webinars & Events — DSW UnifyAI Live Sessions",
  description: "Join DSW’s webinars, virtual events & masterclasses to explore enterprise AI, GenAI strategies & AI deployments in insurance, banking, healthcare.",
  url: "resouces/webinars-and-events",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/webinars-and-events",
    languages: {
      "en-US": "/webinars-and-events",
    },
  },
  openGraph: {
    url: "resources/webinars-and-events",
    images: [
      {
        url: `${homepage}seo/webinars-and-events.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});
const AgenticAI = () => {
  return (
    <>
     <WebpageJsonLd metadata={metadata}/>
      <BreadcrumbsJSONLD pathname={metadata.url}/>
      <Layout>
        <main className="min-h-screen">
          <HeroNew heroContent={heroContent} variant={"leftVertical"} breadcrumbs={true} />
            <Expect />
            <UpcomingWebinars />
            <Workshops />
            <WatchOnDemand />
          <CTAFinal ctaContent={ctaContent} />
        </main>
      </Layout>
    </>
  );
};

export default AgenticAI;

const heroContent = {
  
  heading: "Stay Ahead with Live Insights, Expert Panels & Hands-On Learning",
  para:"At Data Science Wizards, we don’t just talk about AI—we show you how to build it, deploy it, and scale it securely in the enterprise. Our webinars, virtual sessions, and live events are designed to help decision-makers, technologists, and innovators stay ahead in the fast-moving world of AI and GenAI.​",
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
};

const ctaContent = {
  heading: "Looking to write about us or request an interview? ",
  para: "Download our press kit or reach out directly to our media team.",
  subPara: false,
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book:true
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Contact",
  },
};
