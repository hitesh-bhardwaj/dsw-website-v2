import React from "react";
// import { homepage } from "@/lib/util";
// import { getPageMetadata } from "@/config/metadata";
import { getAllNews } from "@/lib/news";
import Layout from "@/components/Layout/Layout";
import CTAFinal from "@/components/CTAFinal";
import HeroNew from "@/components/HeroNew";
import Listing from "@/components/News/Listing";

// export const metadata = getPageMetadata({
//   title: "DSW News & Press — Media Features & Announcements",
//   description:
//     "Read DSW’s latest press coverage, announcements, interviews, and media features highlighting our enterprise AI innovations and market impact.",
//   url: "/news",
//   date_published: "2025-09-30T00:00",
//   date_modified: "2025-09-30T00:00",
//   alternates: {
//     canonical: "/news",
//     languages: {
//       "en-US": "/news",
//     },
//   },
//   openGraph: {
//     url: "/news",
//     images: [
//       {
//         url: `${homepage}seo/news-and-pr.png`,
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
// });
export default async function Page() {
  const { news } = await getAllNews();
  return (
    <>
      {/* <WebpageJsonLd metadata={metadata} /> */}
      {/* <BreadcrumbsJSONLD pathname={metadata.url} /> */}
      <Layout>
        <HeroNew heroContent={heroContent} />
        <Listing news={news} />
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
}

const heroContent = {
  tagline: "",
  heading: "In the Media​",
  headingWidth: "w-[60%]",
  para: "See how DSW is making waves across global tech and AI publications. Explore press features, interviews with our leadership, and industry mentions.​",
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
  },
  secondaryButton: {
    present: true,
    link: "#",
    text: "Schedule a Call",
  },
};
