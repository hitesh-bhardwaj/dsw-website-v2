"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Deferred Google Analytics - loads after initial paint
 * This prevents GA from blocking LCP and other Core Web Vitals
 *
 * Strategy: Wait 2 seconds after page load to ensure LCP is captured,
 * then load GA. This balances PageSpeed optimization with reliable tracking.
 */
export default function DeferredGoogleAnalytics({ gaId }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Wait for page to be interactive before loading GA
    // 2 seconds is enough for LCP to be measured while ensuring GA loads reliably
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
