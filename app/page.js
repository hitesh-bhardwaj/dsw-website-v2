import AlwaysOnAI from "@/components/AlwaysOnAI";
import WhyAIStruggles from "@/components/WhyAIStruggles";
import CoreEnterpriseSystem from "@/components/CoreEnterpriseSystem";
import Clients from "@/components/Clients";
import RealWorldOutcomes from "@/components/RealWorldOutcomes";
import Testimonials from "@/components/Testimonials";
import CTAPricing from "@/components/CTAPricing";
import CTAFinal from "@/components/CTAFinal";
import FooterNew from "@/components/FooterNew";
import Navbar from "@/components/Homepage/Navbar";
import HeroNew from "@/components/HeroNew";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroNew />
      <AlwaysOnAI />
      <WhyAIStruggles />
      <CoreEnterpriseSystem />
      <Clients />
      <RealWorldOutcomes />
      <Testimonials />
      <CTAPricing />
      <CTAFinal />
      <FooterNew />
    </main>
  );
}
