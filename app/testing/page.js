import Header from "@/components/Testing/Header";

export const metadata = {
  title: "Performance Testing Page",
  description: "Optimized for maximum performance",
};

export default function Page() {
  return (
    <>
    <Header />
    <main className="min-h-screen bg-white">
      {/* Hero Section - Inline critical CSS */}
      <section
        className="h-screen w-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          willChange: 'opacity',
        }}
      >
        <div className="text-center px-4 max-w-4xl">
          <h1
            className="mb-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'white',
              lineHeight: '1.2',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Performance Testing Page
          </h1>
          <p
            className="text-white/90 font-medium"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Zero forced reflows • Optimized fonts • Fast LCP
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-32 mb-6">Optimization Results</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <MetricCard
              title="Font Loading"
              value="2 critical fonts"
              description="Only Book (400) weights preloaded"
            />
            <MetricCard
              title="CSS Strategy"
              value="Inline critical"
              description="Above-fold styles inlined"
            />
            <MetricCard
              title="Network Requests"
              value="Minimal"
              description="2 font files + 1 CSS bundle"
            />
            <MetricCard
              title="Forced Reflows"
              value="0"
              description="No getBoundingClientRect() calls"
            />
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-24 mb-4">Testing Checklist</h3>
            <ul className="space-y-2 text-18">
              <li>✅ Open DevTools → Performance tab</li>
              <li>✅ Record page load</li>
              <li>✅ Check for layout shifts (CLS should be 0)</li>
              <li>✅ Verify LCP under 1.2s</li>
              <li>✅ Check Network tab for font waterfall</li>
              <li>✅ Run Lighthouse audit</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-600">
        <p className="text-18">Optimized for maximum performance</p>
      </footer>
    </main>
    </>
  );
}

function MetricCard({ title, value, description }) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-20 text-gray-900 mb-2">{title}</h3>
      <p className="text-32 text-primary-blue mb-2">{value}</p>
      <p className="text-16 text-gray-600">{description}</p>
    </div>
  );
}