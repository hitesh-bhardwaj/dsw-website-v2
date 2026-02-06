import AlwaysOnAI from "@/components/AlwaysOnAI";
import WhyAIStruggles from "@/components/WhyAIStruggles";
import CoreEnterpriseSystem from "@/components/CoreEnterpriseSystem";
import Clients from "@/components/Clients";
import RealWorldOutcomes from "@/components/RealWorldOutcomes";
import Testimonials from "@/components/Testimonials";
import CTAPricing from "@/components/CTAPricing";
import CTAFinal from "@/components/CTAFinal";
import FooterNew from "@/components/FooterNew";
import HeroNew from "@/components/HeroNew";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
    <main className="min-h-screen">
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
    </Layout>
  );
}
