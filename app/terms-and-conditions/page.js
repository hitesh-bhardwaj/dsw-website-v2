import HeroNew from '@/components/HeroNew'
import Layout from '@/components/Layout/Layout'
import ContentTerms from '@/components/PrivacyPolicy/ContentTerms'
import React from 'react'


const page = () => {
  return (
    <>
    <Layout>
      <HeroNew heroContent={heroContent}/>
       <ContentTerms/>
    </Layout>
    
    
   
   
   </>
  )
}

export default page

const heroContent={
  tagline:"",
  heading:"Terms and Conditions",
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