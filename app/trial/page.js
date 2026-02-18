import HeroNew from '@/components/HeroNew'
import React from 'react'

const page = () => {
  return (
    <div>
       <HeroNew heroContent={heroContent} variant="default"/>
    </div>
  )
}

export default page


const heroContent={
  tagline:"Build, integrate, deploy, govern, and operate AI at scale, in your own environment.",
  heading:"The Enterprise AI Operating System",
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