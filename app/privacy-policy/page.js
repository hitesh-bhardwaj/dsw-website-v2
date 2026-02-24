import { getPageMetadata } from '@/components/config/metadata';
import HeroNew from '@/components/HeroNew'
import Layout from '@/components/Layout/Layout'
import Content from '@/components/PrivacyPolicy/Content'
import { WebpageJsonLd } from '@/lib/json-ld';
import { homepage } from '@/lib/util';


export const metadata = getPageMetadata({
  title: "DSW Privacy Policy - Your Data Rights & Protection",
  description: "Review DSW’s privacy policy: how we collect, use, and protect your data, your rights regarding personal information, and how to contact us.",
  url: "privacy-policy",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      "en-US": "/privacy-policy",
    },
  },
  openGraph: {
    url: "privacy-policy",
    images: [
      {
        url: `${homepage}seo/privacy-policy.png`,
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
    text:" "
  },
  secondaryButton:{
    present:false,
    link:"#",
    text:"Talk to our Team"
  },
}