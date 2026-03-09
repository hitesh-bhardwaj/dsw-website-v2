import Clients from "@/components/Clients"
import { getPageMetadata } from "@/components/config/metadata"
import CTAFinal from "@/components/CTAFinal"
import Layout from "@/components/Layout/Layout"
import Form from "@/components/LiveDemo/Form"
import Hero from "@/components/LiveDemo/Hero"
import { WebpageJsonLd } from "@/lib/json-ld"
import { homepage } from "@/lib/util"

export const metadata = getPageMetadata({
  title: "Contact DSW UnifyAI - Get in Touch",
  description: "Reach out to DSW for demos, partnerships, or queries - accelerate AI adoption with UnifyAI.",
  url: "contact-us",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/contact-us",
    languages: {
      "en-US": "/contact-us",
    },
  },
  openGraph: {
    url: "contact-us",
    images: [
      {
        url: `${homepage}seo/contact-us.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

const Page = () => {
    return (
        <>
        <WebpageJsonLd metadata={metadata}/>
            <Layout>
               <Hero/>
                <Form/>
                <Clients/>
                <CTAFinal ctaContent={ctaContent} />
            </Layout>
        </>
    )
}

export default Page


const ctaContent={
  heading:"Take a lightning tour of the Enterprise AI Platform ",
  para:"Discover how UnifyAI can accelerate your AI/ML and GenAI initiatives with seamless deployment, scalability, and security.",
  primaryButton:{
    present:true,
    link:"#",
    text:"Book a Demo",
    book:true
  },
  secondaryButton:{
    present:true,
    link:"https://calendly.com/",
    text:"Schedule a Call",
    targetSecondary:true,
  },
}
