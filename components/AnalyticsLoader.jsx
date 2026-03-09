"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GoogleAnalytics = dynamic(
  () => import("@next/third-parties/google").then((mod) => mod.GoogleAnalytics),
  { ssr: false }
);

const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false }
);

const VercelSpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

export default function AnalyticsLoader() {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    // Load analytics after page is interactive
    // Delay ensures LCP/FCP metrics are captured first
    const timer = setTimeout(() => {
      setLoadAnalytics(true);
    }, 2000); // 2s delay

    return () => clearTimeout(timer);
  }, []);

  if (!loadAnalytics) return null;

  return (
    <>
      <VercelSpeedInsights />
      <VercelAnalytics />
      <GoogleAnalytics gaId="G-Z5CT0M9533" />
    </>
  );
}
