import React from 'react'
import HeadingAnim from '../Animations/HeadingAnim'
import Copy from '../Animations/Copy'
import Team from './Team'

const TeamWrapper = () => {
  return (
    <section className="relative w-full h-fit py-[7%] px-[5vw] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit">
                {/* Heading Section */}
                <div className="space-y-[5.5vw] h-fit max-sm:static overflow-hidden max-sm:space-y-[12vw] z-10">
                    <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
                        <HeadingAnim>
                            <h2 className="text-76 font-heading text-[#0A1B4B] capitalize">
                               Meet the Team
                            </h2>
                        </HeadingAnim>
                        <Copy>
                            <p className="text-24 font-sans leading-[1.4] tracking-[0.025vw] text-foreground w-[55%] max-sm:w-full mx-auto">
                              DSW is a team of engineers, data scientists, product builders, and enterprise operators -
building the infrastructure layer that makes AI real in the enterprise.
                            </p>
                        </Copy>
                    </div>

                    <div className="space-y-[10vw] max-sm:space-y-[20vw]">
                        <Team heading={"Founding Team"} cardsData={foundingTeam} teamId="founding"/>
                        <Team heading={"Growth Team"} cardsData={growthTeam} teamId="growth"/>
                        <Team heading={"Advisors"} cardsData={advisors} teamId="advisors"/>
                    </div>
                
                    </div>
                    </section>
  )
}

export default TeamWrapper


const foundingTeam = [
  {
    src: "/assets/about/sandeep.png",
    name: "Sandeep Khuperkar",
    role: "Founder & CEO",
    link:"https://www.linkedin.com/in/sandeepkhuperkar/"
  },
  {
    src: "/assets/about/pritesh.png",
    name: "Pritesh Tiwari",
    role: "Founder & Chief Data Scientist",
    link:"https://www.linkedin.com/in/pritesh-tiwari-b129a6a6/"
  },
  {
    src: "/assets/about/shivam.png",
    name: "Shivam Thakkar",
    role: "Founder & Chief Product Officer",
    link:"https://www.linkedin.com/in/skt7/"
  },

  {
    src: "/assets/about/sandhya.png",
    name: "Sandhya Oza",
    role: "Co-Founder & Chief Project Officer",
    link:"https://www.linkedin.com/in/sandhyaoza22/"
  }
];
const growthTeam = [
  {
    src: "/assets/about/deepti.png",
    name: "Deepti Dilip J.",
    role: "Chief Marketing Officer",
    link:"https://www.linkedin.com/in/deepti-dilip-727b6a14/"
  },
  {
    src: "/assets/about/rajeshwar.png",
    name: "Rajeshwar Singh",
    role: "Chief Business Development Officer",
    link:"https://www.linkedin.com/in/rajeshwar-singh-481aa83/"
  },
  {
    src: "/assets/about/rohit.png",
    name: "Rohit Rajgor",
    role: "Vice-President Business",
    link:"https://www.linkedin.com/in/rohitrajgor/"
  },

  
  {
    src: "/assets/about/hardik.png",
    name: "Hardik Raja",
    role: "Senior Data Scientist",
    link:"https://www.linkedin.com/in/hardik-raja-a3807824/"
  },
  {
    src: "/assets/about/saurabh.png",
    name: "Saurabh Singh",
    role: "Senior Data Scientist",
    link:"https://www.linkedin.com/in/saurabhsingh1401/"
  },
];
const advisors = [
  {
    src: "/assets/about/javed.png",
    name: "Javed Tapia",
    role: "Founder & Chairman,",
    company:"Clover InfoTech,Clover Realty, Ex-CEO RedHat India",
    link:"https://www.linkedin.com/in/javedtapia/"
  },
  {
    src: "/assets/about/hemant.png",
    name: "Hemant Kenia",
    role: "Founder & CEO",
    company:"SK International",
    link:"https://www.linkedin.com/in/hemant-kenia-2829a155/"
  },
  {
    src: "/assets/about/sharad.png",
    name: "Sharad Sanghi",
    role: "Chairman NTT",
    company:"Global Data India, Ex-CEO and MD, Netmagic",
    link:"https://linkedin.com/in/sharadsanghi"
  },
  {
    src: "/assets/about/upendra.png",
    name: "Dr. Upendra Rao",
    role: "Ex-CTO",
    company:"State Bank Independent Director IDBI-Intech, of India",
    link:"https://www.linkedin.com/in/seethala-upendra-rao-03802736/"
  },
];