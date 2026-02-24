import AIProjects from "@/components/AIOS/AIProjects"
import AIEcosystem from "@/components/AIOS/AIEcosystem"
import ArchitecturalPrinciples from "@/components/AIOS/ArchitecturalPrinciples"
import FiveAnchors from "@/components/AIOS/FiveAnchors"
import GovernanceBuiltIn from "@/components/AIOS/GovernanceBuiltIn"
import OperatingSystem from "@/components/AIOS/OperatingSystem"
import SystemStructure from "@/components/AIOS/SystemStructure"
import WhoBuiltFor from "@/components/AIOS/WhoBuiltFor"
import CTAFinal from "@/components/CTAFinal"
import HeroNew from "@/components/HeroNew"
import Layout from "@/components/Layout/Layout"
import Fragmented from "@/components/AIOS/Structure"
import Outcomes from "@/components/AIOS/Outcomes"
import Choose from "@/components/AIOS/Choose"
import { WebpageJsonLd } from "@/lib/json-ld"
import { getPageMetadata } from "@/components/config/metadata"
import { homepage } from "@/lib/util"
import CertificationsAndAwards from "@/components/Homepage/CertificationsAndAwards"

export const metadata = getPageMetadata({
  title: "Enterprise AI Operating System | DSW AIOS Technical",
  description:
    "Discover the architecture of the DSW Enterprise AI Operating System — built to run AI safely, continuously, and at scale with governance, control, and production-grade execution.",
  url: "/aios-technical",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/aios-technical",
    languages: {
      "en-US": "/aios-technical",
    },
  },
  openGraph: {
    url: "/aios-technical",
    images: [
      {
        url: `${homepage}seo/aios-technical.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});
const Page = () => {
    return (
        <>
        <WebpageJsonLd metadata={metadata} />
            <Layout>
                <HeroNew heroContent={heroContent} variant={"bottomRight"} />
                <OperatingSystem />
                <AIProjects />
                <AIEcosystem ecosystemItems={ECOSYSTEM_ITEMS} />
                <Fragmented />
                <ArchitecturalPrinciples />
                <FiveAnchors />
                <SystemStructure />
                <GovernanceBuiltIn />
                <Outcomes/>
                <Choose/>
                <WhoBuiltFor />
                <CertificationsAndAwards certificationsContent={certificationsContent}/>
                <CTAFinal ctaContent={ctaContent} />
            </Layout>

        </>
    )
}

export default Page

const heroContent = {
    tagline: "Built for enterprises that don’t just build AI - but operate it.",
    heading: "The Architecture Behind The Enterprise AI Operating System",
    headingWidth: "w-[80%]",
    para: "DSW is built for enterprises that are moving AI from experiments into long-running production systems. It provides the operating layer required to run AI safely, continuously, and at scale - without losing governance, ownership, or architectural freedom.",
    primaryButton: {
        present: false,
        link: "#",
        text: "Book a Demo"
    },
    secondaryButton: {
        present: false,
        link: "#",
        text: "Talk to our Team"
    },
    images: false
}


const ctaContent={
  heading:"Own How AI Runs in Your Enterprise",
  para:"DSW is the enterprise AI operating system layer that sits on top of your existing OS and infrastructure – putting enterprises in control of how AI is built, governed, and operated at scale.",
  subPara: true,
  subParaText: 'Turn AI pilots into auditable, production-grade agents',
  primaryButton:{
    present: true,
    link: "/unifyai",
    text:"Explore the Platform"
  },
  secondaryButton:{
    present: true,
    link:"/contact-us",
    text:"Talk to our Team"
  },
}

const certificationsContent = {
  sectionId: "compliance",
  heading: "Tailor-made for regulated insurance environments",
  subtext: "Designed for compliance-driven, risk-sensitive operations.",
  footerText:
    "Supports governance, audit, and regulatory workflows across underwriting, claims, and servicing.",
};

const ECOSYSTEM_ITEMS = [
  {
    title: "Kernel-level governance",
    points: [
      "Policies execute as code",
      "Audit, traceability, and reversibility are native",
      "Controls cannot be bypassed or bolted on later",
    ],
  },
  {
    title: "Governed AI and agentic execution",
    points: [
      "Models and agents operate inside defined constraints",
      "Autonomy is controlled, not improvised",
      "Lifecycles are managed like system processes",
    ],
  },
  {
    title: "AI as enterprise infrastructure",
    points: [
      "Long-running, production-grade execution",
      "Independent of vendors, clouds, or tools",
      "Fully owned and operated by your enterprise",
    ],
  },
];