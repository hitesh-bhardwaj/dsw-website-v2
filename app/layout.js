import "./fonts.css";
import "./globals.css";
import { ReactLenis } from 'lenis/react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DeferredGoogleAnalytics from "@/components/Analytics/DeferredGoogleAnalytics";
import { GoogleTagManager } from '@next/third-parties/google';
import AnalyticsInit from "@/components/Analytics/AnalyticsInit";
import Script from "next/script";

export const metadata = {
  title: "DSW - Enterprise AI Operating System",
  description: "Governed. Explainable. Production-Ready AI at Scale.",
  metadataBase: new URL("https://www.datasciencewizards.ai/"),
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/favicons/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/favicons/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  manifest: "/favicons/manifest.webmanifest",
  openGraph: {
    title: "DSW - Enterprise AI Operating System",
    description: "Governed. Explainable. Production-Ready AI at Scale.",
    url: "https://www.datasciencewizards.ai/",
    siteName: "DSW",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/seo/homepage.png",
        width: 1200,
        height: 630,
        alt: "DSW - Enterprise AI Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DSW - Enterprise AI Operating System",
    description: "Governed. Explainable. Production-Ready AI at Scale.",
    images: ["/seo/homepage.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        {/* Preload critical fonts for fast LCP */}
        <link
          rel="preload"
          href="/fonts/ppneuemontreal-book.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Aspekta-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Aspekta-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Meta Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){
              n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)}; 
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '974422208276135');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=974422208276135&ev=PageView&noscript=1" />
        </noscript>
        <ReactLenis root>
          <main data-lenis-root id="main-content">
            {children}
          </main>
        </ReactLenis>
        <SpeedInsights />
        <Analytics />
        <AnalyticsInit />
        {/* <DeferredGoogleAnalytics gaId="G-Z5CT0M9533" /> */}
        <GoogleTagManager gtmId="GTM-KJVRKD37" />
      </body>
    </html>
  );
}
