import Form from "@/components/ContactUs/Form"
import Help from "@/components/ContactUs/Help"
import OfficeLocations from "@/components/ContactUs/OfficeLocations"
import CTAFinal from "@/components/CTAFinal"
import HeroNew from "@/components/HeroNew"
import Layout from "@/components/Layout/Layout"

const Page = () => {
    return (
        <>
            <Layout>
                <HeroNew heroContent={heroContent} variant={"default"} />
                <Help />
                <Form/>
                <OfficeLocations />
                <CTAFinal ctaContent={ctaContent} />
            </Layout>
        </>
    )
}

export default Page

const heroContent = {
    tagline: "",
    heading: "Let’s Build the Future of AI Together",
    headingWidth: "w-[60%]",
    para: " Whether you're ready to launch your next AI initiative or just exploring possibilities - let’s talk​",
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

const ctaContent = {
    heading: "Take a lightning tour of the  Enterprise AI Platform",
    para: "Discover how UnifyAI can accelerate your AI/ML and GenAI initiatives with seamless deployment, scalability, and security.",
    primaryButton: {
        present: true,
        link: "#",
        text: "Book a Demo"
    },
    secondaryButton: {
        present: true,
        link: "#",
        text: "Schedule a Call"
    },
}
