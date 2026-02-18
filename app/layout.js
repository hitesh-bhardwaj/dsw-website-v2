import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { neueMontreal, aspekta } from "./fonts";
import "./globals.css";
import LayoutTransition from "@/components/LayoutTransition";

export const metadata = {
  title: "DSW - Enterprise AI Operating System",
  description: "Governed. Explainable. Production-Ready AI at Scale.",
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
