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

const Page = () => {
    return (
        <>
            <Layout>
                <HeroNew heroContent={heroContent} variant={"bottomRight"} />
                <OperatingSystem />
                <AIProjects />
                <AIEcosystem />
                <Fragmented/>
                <ArchitecturalPrinciples />
                <FiveAnchors />
                <SystemStructure />
                <GovernanceBuiltIn />
                <Outcomes/>
                <Choose/>
                <WhoBuiltFor />
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
    para: "DSW is built for enterprises that are moving AI from experiments into long-running production systems.It provides the operating layer required to run AI safely, continuously, and at scale - without losing governance, ownership, or architectural freedom.",
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
    link: "#",
    text:"Explore the Platform"
  },
  secondaryButton:{
    present: true,
    link:"#",
    text:"Talk to our Team"
  },
}