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

const ctaContent={
  heading:"Own How AI Runs in Your Enterprise  ",
  para:"DSW is the enterprise AI operating system layer that sits on top of your existing OS and infrastructure – putting enterprises in control of how AI is built, governed, and operated at scale. ",
  primaryButton:{
    present:true,
    link:"#",
    text:"Explore the Platform"
  },
  secondaryButton:{
    present:true,
    link:"#",
    text:"Talk to our Team"
  },
}
