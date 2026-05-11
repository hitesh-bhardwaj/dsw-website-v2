import dynamic from "next/dynamic";
import { BreadcrumbsJSONLD, WebpageJsonLd } from "@/lib/json-ld";
import { homepage } from "@/lib/util";
import Layout from "@/components/Layout/Layout";
import { getPageMetadata } from "@/components/config/metadata";
import HeroNew from "@/components/Layout/HeroNew";
import CTAFinal from "@/components/CTAFinal";

const Listing = dynamic(() => import("@/components/Whitepapers/Listing"), {
  ssr: true,
});


export const metadata = getPageMetadata({
  title: "Deep Insights. Real Strategies. Enterprise AI Whitepapers",
  description:
    "Access curated whitepapers offering actionable AI frameworks, technical guidance, and strategic insights to help enterprises adopt, scale, and govern AI confidently.",
  url: "resouces/whitepapers",
  date_published: "2025-09-30T00:00",
  date_modified: "2025-09-30T00:00",
  alternates: {
    canonical: "/whitepapers",
    languages: {
      "en-US": "/whitepapers",
    },
  },
  openGraph: {
    url: "resources/whitepapers",
    images: [
      {
        url: `${homepage}seo/whitepapers.png`,
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
      <BreadcrumbsJSONLD pathname={metadata.url} />
      <Layout>
        <HeroNew
          heroContent={heroData}
          variant={"default"}
          breadcrumbs={true}
        />
        <Listing />
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
};

export default Page;

const heroData = {
  heading: "Deep Insights. Real Strategies. Enterprise-Ready AI Intelligence.",
  para: "Our curated collection of whitepapers gives you actionable insights, frameworks, and technical guidance to navigate enterprise AI adoption with confidence. Whether you’re evaluating platforms, planning your compliance roadmap, or scaling AI across departments, these research-backed resources will help you make strategic, future-proof decisions.​",
  paraClass: "w-[80%] max-sm:w-[90%]",
  homepage: false,
  hidebtn: true,
  headingWidth: "w-[80%]",
};

const ctaContent = {
  heading: "Ready to operate AI like a unified, governed system? ",
  para: "Whether you’re exploring enterprise AI at scale or looking to build the foundation with us - we’d love to connect.",
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
