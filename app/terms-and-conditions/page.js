import { getPageMetadata } from '@/components/config/metadata';
import HeroNew from '@/components/HeroNew'
import Layout from '@/components/Layout/Layout'
import ContentTerms from '@/components/PrivacyPolicy/ContentTerms'
import { WebpageJsonLd } from '@/lib/json-ld';
import { homepage } from '@/lib/util';
import React from 'react'


export const metadata = getPageMetadata({
  title: "DSW Terms & Conditions - Use of Services Agreement",
  description: "Read the terms and conditions governing use of DSW’s services, user responsibilities, limitations of liability, and legal agreements.",
  url: "terms-and-conditions",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/terms-and-conditions",
    languages: {
      "en-US": "/terms-and-conditions",
    },
  },
  openGraph: {
    url: "terms-and-conditions",
    images: [
      {
        url: `${homepage}seo/terms-and-conditions.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

const page = () => {
  return (
    <>
     <WebpageJsonLd metadata={metadata}/>
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