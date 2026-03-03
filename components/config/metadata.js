// Next.js Metadata Configuration
export const siteMetadata = {
  metadataBase: new URL('https://www.datasciencewizards.ai/'),
  title: "DSW UnifyAI – Enterprise AI Platform for Insurance",
  description: "Launch AI use cases in days and GenAI in hours with DSW UnifyAI - insurance-domain trained, compliant, scalable, and vendor-lock-in free.",
  applicationName: "Data Science Wizards UnifyAI",
  authors: [{ name: "Data Science Wizards" }],
  generator: "Next.js",
  keywords: [
    "AI Platform", 
    "Insurance AI", 
    "Enterprise AI", 
    "GenAI", 
    "Data Science Wizards",
    "UnifyAI"
  ],
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  
  // Icons configuration
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", type: "image/x-icon" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: [
      { url: "/favicons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicons/apple-touch-icon-180x180.png",
    },
  },

  // Web App Manifest
  manifest: "/favicons/manifest.webmanifest",

  // Apple specific meta tags
  appleWebApp: {
    title: "Data Science Wizards UnifyAI",
    statusBarStyle: "black-translucent",
    capable: true,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.datasciencewizards.ai/",
    siteName: "Data Science Wizards UnifyAI",
    title: "DSW UnifyAI – Enterprise AI Platform for Insurance",
    description: "Launch AI use cases in days and GenAI in hours with DSW UnifyAI - insurance-domain trained, compliant, scalable, and vendor-lock-in free.",
    images: [
      {
        url: "/seo/homepage.png",
        width: 1200,
        height: 630,
        alt: "Data Science Wizards UnifyAI - Enterprise AI Platform",
      },
    ],
     locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@DSW",
    title: "DSW UnifyAI – Enterprise AI Platform for Insurance",
    description: "Launch AI use cases in days and GenAI in hours with DSW UnifyAI - insurance-domain trained, compliant, scalable, and vendor-lock-in free.",
    images: ["/assets/seo/homepage-og.jpg"],
  },

  // Additional meta tags (removing duplicates that are already covered by appleWebApp)
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#030815",
    "msapplication-config": "/favicons/browserconfig.xml",
  },
};

// Export default metadata for layout.js
export default siteMetadata;


export function getPageMetadata(overrides) {
  return {
    ...siteMetadata,
    ...overrides,
    title:
      typeof overrides.title === "string"
        ? { default: overrides.title, template: siteMetadata.title.template }
        : overrides.title || siteMetadata.title,
    openGraph: {
      ...siteMetadata.openGraph,
      ...(overrides.openGraph || {}),
    },
    twitter: {
      ...siteMetadata.openGraph,
      ...(overrides.openGraph || {}),
    },
    alternates: {
      ...siteMetadata.alternates,
      ...(overrides.alternates || {}),
    },
  };
}