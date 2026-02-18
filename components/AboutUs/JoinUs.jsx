import React from 'react'
import HeadingAnim from '../Animations/HeadingAnim'
import Copy from '../Animations/Copy'
import Image from 'next/image'
import { RollOut } from '../Svg/InfosysFinacle/RolllOut';
import { ReducedCost } from '../Svg/InfosysFinacle/ReducedCost';
import { EnterpriseGrade } from '../Svg/InfosysFinacle/EnterpriseGrade';
import { SkilledTeam } from '../Svg/InfosysFinacle/SkilledTeam';
import CornerDecorations from '../CornerDecorations';
import PrimaryButton from '../Buttons/PrimaryButton';


function ValueCard({ deployment }) {
    return (
        <div className="relative fadeup ">
            <div
                className={`
                    relative bg-white  hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out group 
                    w-[21.5vw] h-[14vw] px-[1vw] py-[2vw] max-sm:px-[6vw] max-sm:py-[6vw] max-sm:w-full max-sm:pr-[12vw] max-sm:h-[58vw] border
                    border-border-color flex flex-col justify-between
                `}>
                <CornerDecorations />
                <div className=" w-[4vw] h-[4vw] max-sm:h-[15vw] max-sm:w-[15vw] text-primary-blue">
                    {deployment.icon}
                </div>
                <p className="text-foreground max-sm:leading-[1.2] text-24 max-sm:text-[5vw] max-sm:font-light leading-[1.2]">
                    {deployment.title}
                </p>
            </div>
        </div>
    );
}
const JoinUs = () => {
    return (
        <section className="relative w-full h-fit py-[7%] px-[5vw] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit">
            {/* Heading Section */}
            <div className="space-y-[5.5vw] h-fit max-sm:static overflow-hidden max-sm:space-y-[12vw] z-10">
                <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
                    <HeadingAnim>
                        <h2 className="text-76 font-heading text-[#0A1B4B] capitalize">
                            Join us
                        </h2>
                    </HeadingAnim>
                    <Copy>
                        <p className="text-24 font-sans leading-[1.4] tracking-[0.025vw] text-foreground w-[55%] max-sm:w-full mx-auto">
                            We’re building a category-defining foundation for enterprise AI - and we’re looking for people
                            who want to solve deep, meaningful problems.
                        </p>
                    </Copy>
                </div>

                <div className='h-[40vw] w-full rounded-[2vw] overflow-hidden'>
                    <Image src={"/assets/about/join-us.png"} className='h-full w-full object-cover' width={1772} height={756} alt='Join Us'/>
                </div>
                <div className='mx-auto'>
                    <Copy>
                        <p className="text-30 font-sans text-center leading-[1.4] tracking-[0.025vw] text-foreground">
                           If you’re Excited by 
                        </p>
                    </Copy>
                </div>
                <div className="flex justify-between  max-sm:w-full max-sm:mx-auto max-sm:flex-col max-sm:space-y-[10vw]">
                {values.map((deployment, index) => (
                    <ValueCard key={index} deployment={deployment} />
                ))}
            </div>
            <div className='mx-auto'>
                    <Copy>
                        <p className="text-30 font-sans text-center leading-[1.4] tracking-[0.025vw] text-foreground">
                          …you’ll feel at home at DSW.
                        </p>
                    </Copy>
                </div>
                <div className='mx-auto flex items-center justify-center'>
                    <PrimaryButton text={"View Open Roles"} href="#"/>

                </div>
            </div>
        </section>
    )
}

export default JoinUs

const values = [
    {
        icon: <RollOut/>,
        title: "Production-scale AI systems ​",
    },
    {
        icon: <ReducedCost/>,
        title: "​Governed runtimes.",
    },
    {
        icon: <EnterpriseGrade/>,
        title: "Enterprise integration complexity ​",
    },
    {
        icon:<SkilledTeam/>,
        title:"Agentic + LLM operationalization "
    }
];