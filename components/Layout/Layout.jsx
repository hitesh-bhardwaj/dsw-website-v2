"use client";

import React from "react";
import { ModalProvider } from "../ModalProvider";
import dynamic from "next/dynamic";
import {
  ImageObjectJsonLd,
  LocalBusiness,
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/lib/json-ld";
import { fadeUp } from "../Animations/gsapAnimations";
import HeaderNew from "./Header/HeaderNew";

// Footer (already dynamic)
const FooterNew = dynamic(() => import("./Footer"), { ssr: false });
// const HeaderNew = dynamic(() => import("./Header/HeaderNew"), { ssr: false });

// ✅ Dynamic modals (no SSR)
const GlobalPopup = dynamic(() => import("../Modals/GlobalPopup"), { ssr: false });
const WalkthroughPopup = dynamic(() => import("../Modals/WalkthroughPopup"), {
  ssr: false,
});
const WalkthroughIframePopup = dynamic(
  () => import("../Modals/WalkthroughIframePopup"),
  { ssr: false }
);

const Layout = ({ children }) => {
  fadeUp()
  return (
    <ModalProvider>
      {/* JSON-LD: keep SSR-friendly if these are server-safe; otherwise wrap too */}
      <OrganizationJsonLd />
      <LocalBusiness />
      <ImageObjectJsonLd />
      <WebsiteJsonLd />
      <HeaderNew />
      {children}
      <FooterNew />
      {/* ✅ All modals now lazy-loaded */}
      <GlobalPopup />
      <WalkthroughPopup />
      <WalkthroughIframePopup />
    </ModalProvider>
  );
};

export default Layout;