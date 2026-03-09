"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Defer these so they don't compete with LCP
const LenisSmoothScroll = dynamic(() => import("@/components/LenisSmoothScroll"), {
  ssr: false,
});
const LayoutTransition = dynamic(() => import("@/components/LayoutTransition"), {
  ssr: false,
});

export default function ClientShell({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // after first paint; protects LCP
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) {
    // render immediately, no smooth scroll/transition yet
    return <>{children}</>;
  }

  return (
    <LenisSmoothScroll>
      <LayoutTransition>
        <main data-lenis-root id="main-content">
          {children}
        </main>
      </LayoutTransition>
    </LenisSmoothScroll>
  );
}
