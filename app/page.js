import FeatureGrid from "@/components/Homepage/FeatureGrid";
import Hero from "@/components/Homepage/Hero";
import Reliability from "@/components/Homepage/Reliability";
import UnifiedRuntime from "@/components/Homepage/UnifiedRuntime";
import UseCases from "@/components/Homepage/UseCases";
import Layout from "@/components/Layout/Layout";


export default function Home() {
  return (
    <Layout>
    <main className="min-h-screen">
      <Hero />
      <FeatureGrid />
      <UnifiedRuntime />
      <Reliability />
      <UseCases />
    </main>
    </Layout>
  );
}
