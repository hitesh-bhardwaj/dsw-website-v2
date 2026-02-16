import HeroNew from "@/components/HeroNew"
import Layout from "@/components/Layout/Layout"

const Page = () => {
  return (
    <>
<Layout>
    <HeroNew heroContent={heroContent} variant={"default"} />
</Layout>
        {/* <Layout>
        <Hero heroData={heroData} />
        <Help/>
        <Form />
         <OfficeLocations />
         <FooterCTA footerCTAData={footerCTAData} width={"w-[95%]"}/>
        </Layout> */}
    </>
  )
}

export default Page

const heroContent={
  tagline:"",
  heading:"Let’s Build the Future of AI Together",
  headingWidth:"w-[60%]",
  para:" Whether you're ready to launch your next AI initiative or just exploring possibilities - let’s talk​",
  primaryButton:{
    present:false,
    link:"#",
    text:"Book a Demo"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
  images:false
}


const footerCTAData={
  heading:"Take a lightning tour of the Enterprise AI Platform ",
  para:"Discover how UnifyAI can accelerate your AI/ML and GenAI initiatives with seamless deployment, scalability, and security. ",
  btnText1:"Book a Demo",
  btnLink1:"/#",
  btnText2:"Schedule a Call",
  btnLink2:"https://calendly.com/",
  book:true,
  target:true,
  img1:"/assets/images/footer/cta-3.png",
  img2:"/assets/images/footer/cta-1.png"
}