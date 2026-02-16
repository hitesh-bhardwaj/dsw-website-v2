import HeroNew from '@/components/HeroNew'
import Layout from '@/components/Layout/Layout'
import Content from '@/components/PrivacyPolicy/Content'

const page = () => {
  return (
    <>
     <Layout>
      <HeroNew heroContent={heroContent}/>
      <Content/>
     </Layout>
   </>
  )
}

export default page


const heroContent={
  tagline:"",
  heading:"Privacy Policy",
  primaryButton:{
    present:false,
    link:"#",
    text:"Explore the Platform"
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}