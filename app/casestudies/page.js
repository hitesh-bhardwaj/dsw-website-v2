import React from "react";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import { BreadcrumbsJSONLD, WebpageJsonLd } from "@/lib/json-ld";
import { getPageMetadata } from "@/components/config/metadata";
import { homepage } from "@/lib/util";
import CaseStudyListing from "@/components/Solution/CaseStudyListing";

export const metadata = getPageMetadata({
  title: "DSW News & Press — Media Features & Announcements",
  description:
    "Read DSW’s latest press coverage, announcements, interviews, and media features highlighting our enterprise AI innovations and market impact.",
  url: "/news",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/news",
    languages: {
      "en-US": "/news",
    },
  },
  openGraph: {
    url: "/news",
    images: [
      {
        url: `${homepage}seo/news.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});
export default async function Page() {
  return (
    <>
      <WebpageJsonLd metadata={metadata} />
      <BreadcrumbsJSONLD pathname={metadata.url} />
      <Layout>
        <HeroNew heroContent={heroContent} breadcrumbs={true}/>
        <CaseStudyListing/>
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
}

const heroContent = {
  tagline: "",
  heading: "Case Studies",
  headingWidth: "w-[60%]",
  para: "​",
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
  images: false,
};

const ctaContent = {
  heading: "Looking to write about us or request an interview?",
  para: "Download our press kit or reach out directly to our media team.",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book:true
  },
  secondaryButton: {
    present: true,
    link: "https://calendly.com/",
    text: "Schedule a Call",
    targetSecondary:true
  },
};
