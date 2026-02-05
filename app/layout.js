import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { neueMontreal, aspekta } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "DSW - Enterprise AI Operating System",
  description: "Governed. Explainable. Production-Ready AI at Scale.",
};

export default function RootLayout({ children }) {
  return (
    <LenisSmoothScroll>
    <html lang="en">

      <body
        className={`${neueMontreal.variable} ${aspekta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </LenisSmoothScroll>
  );
}
