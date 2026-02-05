import FeatureGrid from "@/components/Homepage/FeatureGrid";
import Footer from "@/components/Homepage/Footer";
import Hero from "@/components/Homepage/Hero";
import Navbar from "@/components/Homepage/Navbar";
import Reliability from "@/components/Homepage/Reliability";
import UnifiedRuntime from "@/components/Homepage/UnifiedRuntime";
import UseCases from "@/components/Homepage/UseCases";


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
