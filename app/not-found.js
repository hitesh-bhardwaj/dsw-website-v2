// app/not-found.jsx

import {
  ImageObjectJsonLd,
  LocalBusiness,
  OrganizationJsonLd,
  WebpageJsonLd,
  WebsiteJsonLd,
} from "@/lib/json-ld";
import dynamic from "next/dynamic";
const Notfound = dynamic(() => import("@/components/NotFound"), {
  ssr: true,
});
const HeaderNew = dynamic(
  () => import("@/components/Layout/Header/HeaderNew"),
  {
    ssr: true,
  },
);

export const metadata = {
  title: "DSW UnifyAI – Enterprise AI Platform for Insurance",
  description:
    "Launch AI use cases in days — scale fast, reduce cost, deploy GenAI in hours with DSW UnifyAI’s insurance-focused enterprise AI platform.",
  openGraph: { type: "website" },
};

export default function NotFoundPage() {
  return (
    <>
      <WebpageJsonLd metadata={metadata} />
      <OrganizationJsonLd />
      <LocalBusiness />
      <ImageObjectJsonLd />
      <WebsiteJsonLd />
      <HeaderNew />
      <Notfound />
    </>
  );
}
