// app/not-found.jsx

import Header from "@/components/Layout/Header";
import Notfound from "@/components/NotFound";
import { ImageObjectJsonLd, LocalBusiness, OrganizationJsonLd, WebpageJsonLd, WebsiteJsonLd } from "@/lib/json-ld";


export const metadata = {
  title: "DSW UnifyAI – Enterprise AI Platform for Insurance",
  description:
    "Launch AI use cases in days — scale fast, reduce cost, deploy GenAI in hours with DSW UnifyAI’s insurance-focused enterprise AI platform.",
  openGraph: { type: "website" },
  // add canonical/url if available
};


export default function NotFoundPage() {
  return (
    <>
      {/* Server-only JSON-LD keeps the 404 HTML tiny */}

      <WebpageJsonLd metadata={metadata} />
      <OrganizationJsonLd />
      <LocalBusiness />
      <ImageObjectJsonLd />
      <WebsiteJsonLd />
      <Header />
      <Notfound/>
    </>
  );
}
