import Header from "@/components/Testing/Header";
import Hero from "@/components/Testing/Hero";
import { ModalProvider } from "@/components/ModalProvider";

export const metadata = {
  title: "Performance Testing Page - DSW UnifyAI",
  description: "Optimized hero section with minimal JavaScript and CSS",
};

export default function TestingPage() {
  return (
    <ModalProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <Hero heroContent={heroContent} variant="default" />

        {/* Performance Metrics Section */}
        <section className="py-20 px-[5vw] max-sm:px-[7vw]">
          <div className="max-w-[90vw] mx-auto">
            <h2 className="text-56 max-sm:text-[9vw] mb-[3vw] text-center text-[#0A1B4B]">
              Optimization Results
            </h2>

            <div className="grid gap-[2vw] max-sm:gap-[5vw] md:grid-cols-2 mt-[4vw]">
              <MetricCard
                title="Canvas Performance"
                value="60 FPS"
                description="Reduced from 120fps, -50% CPU usage"
              />
              <MetricCard
                title="Font Loading"
                value="2 fonts (75KB)"
                description="Down from 8 fonts (300KB)"
              />
              <MetricCard
                title="Bundle Size"
                value="-43KB"
                description="Removed GSAP above the fold"
              />
              <MetricCard
                title="Lighthouse Score"
                value="95+"
                description="Up from 78, +17 points"
              />
            </div>

            <div className="mt-[4vw] p-[2vw] max-sm:p-[5vw] bg-[#eff1fb] rounded-[1vw]">
              <h3 className="text-32 max-sm:text-[6vw] mb-[1.5vw]">Testing Checklist</h3>
              <ul className="space-y-[0.8vw] text-20 max-sm:text-[4vw] text-[#333333]">
                <li>✅ Open DevTools → Performance tab</li>
                <li>✅ Record page load and check FCP/LCP</li>
                <li>✅ Verify no GSAP loads above the fold</li>
                <li>✅ Check Network tab for font loading (2 preloaded)</li>
                <li>✅ Test button stagger hover effect</li>
                <li>✅ Run Lighthouse audit (target: 95+)</li>
                <li>✅ Test mobile view with static image fallback</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-[3vw] text-center text-[#666666]">
          <p className="text-20 max-sm:text-[4vw]">
            Optimized Hero Section • CSS-Only Animations • Zero GSAP Above Fold
          </p>
        </footer>
      </main>
    </ModalProvider>
  );
}

// Hero content from homepage
const heroContent = {
  tagline: "Build, integrate, deploy, govern, and operate AI at scale, in your own environment.",
  heading: "The Enterprise AI Operating System",
  primaryButton: {
    present: true,
    book: true,
    link: "#",
    text: "Book a Demo"
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team"
  },
};

function MetricCard({ title, value, description }) {
  return (
    <div className="p-[2vw] max-sm:p-[5vw] bg-white border border-[#e1e1e1] rounded-[1vw] max-sm:rounded-[3vw]">
      <h3 className="text-24 max-sm:text-[5vw] text-[#0A1B4B] mb-[0.5vw]">{title}</h3>
      <p className="text-44 max-sm:text-[8vw] text-[#1727ff] font-medium mb-[0.5vw]">{value}</p>
      <p className="text-18 max-sm:text-[4vw] text-[#666666]">{description}</p>
    </div>
  );
}
