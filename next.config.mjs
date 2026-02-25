// next.config.mjs
import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  env: {
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    qualities: [50, 75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "darkseagreen-chicken-141904.hostingersite.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/enterpriseAIoperatingsystem/analyticsindiamagazine',
        destination: '/enterpriseAIoperatingsystem/analyticsindiamagazine.pdf',
        permanent: true,
      },
      {
        source: '/dsw-enterprise-ai-operating-system',
        destination: '/dsw-enterprise-ai-operating-system.pdf',
        permanent: true,
      },
      {
        source: '/dsw-enterprise-aios-technical-brochure',
        destination: '/dsw-enterprise-aios-technical-brochure.pdf',
        permanent: true,
      },
      {
        source: '/dsw-pilot-program',
        destination: '/dsw-pilot-program.pdf',
        permanent: true,
      },
    ]
  },

  compress: true,
  productionBrowserSourceMaps: true,

  async headers() {

    const csp = [
      "default-src 'self'",

      // ✅ Scripts (Next + Vercel + Google)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com",

      // ✅ Styles
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

      // ✅ Images (GA uses pixels)
      "img-src 'self' data: blob: https://bisque-okapi-883422.hostingersite.com https://darkseagreen-chicken-141904.hostingersite.com https://i.ytimg.com https://www.google-analytics.com https://www.googletagmanager.com",

      // ✅ Fonts
      "font-src 'self' data: https://fonts.gstatic.com",

      // ✅ Analytics & fetch requests
      "connect-src 'self' https: https://va.vercel-scripts.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",

      // ✅ Media
      "media-src 'self' blob: https://www.youtube.com https://*.googlevideo.com",

      // ✅ Iframes (GTM preview + YouTube)
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com",

      // ✅ Workers
      "worker-src 'self' blob:",

      // ✅ Security hardening
      "object-src 'none'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
      "base-uri 'self'",
    ].join("; ");

    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: csp,
      },

      // MIME-type sniffing protection
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },

      // Referrer policy
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },

      // Permissions policy
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), interest-cohort=(), fullscreen=(self), payment=()",
      },

      // HSTS (only use on HTTPS)
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },

      // Cross-origin isolation defaults
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
      {
        key: "Cross-Origin-Resource-Policy",
        value: "same-origin",
      },

      {
        key: "X-Permitted-Cross-Domain-Policies",
        value: "none",
      },

      {
        key: "X-XSS-Protection",
        value: "0",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
