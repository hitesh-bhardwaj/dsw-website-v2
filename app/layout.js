import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { neueMontreal, aspekta } from "./fonts";
import "./globals.css";
import LayoutTransition from "@/components/LayoutTransition";

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
    <html lang="en" className={`${neueMontreal.variable} ${aspekta.variable} antialiased`}>
      <body >
        <LenisSmoothScroll>
          <LayoutTransition>
            <main data-lenis-root id="main-content">
              {children}
            </main>
          </LayoutTransition>

        </LenisSmoothScroll>
      </body>
    </html>
  );
}
