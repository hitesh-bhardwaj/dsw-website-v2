import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import UnifiedRuntime from "@/components/UnifiedRuntime";
import Reliability from "@/components/Reliability";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar /> 
      <Hero />
      <FeatureGrid />
      <UnifiedRuntime />
      <Reliability />
      <UseCases />
      <Footer />
    </main>
  );
}
