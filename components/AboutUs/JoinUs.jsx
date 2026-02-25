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
        <div className="relative fadeup max-md:w-[48%] ">
            <div
                className={`
                    relative bg-white  hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out group 
                    w-[21.5vw] h-[14vw] px-[1vw] py-[2vw] border
                    border-border-color flex flex-col justify-between  max-md:w-full max-md:p-[4vw] max-md:h-[30vw]
                `}>
                <CornerDecorations />
                <div className=" w-[4vw] h-[4vw] text-primary-blue max-md:size-[7vw]">
                    {deployment.icon}
                </div>
                <p className="text-foreground text-24 h-8 leading-[1.2] max-md:h-auto">
                    {deployment.title}
                </p>
            </div>
        </div>
    );
}

function ValueCardMobile({ deployment }) {
    return (
        <div
            className="
                relative flex-shrink-0 w-[50vw] h-[50vw]
                px-[5vw] pt-[5vw] justify-between flex flex-col pb-[8vw] items-end max-sm:items-start
                border border-solid border-border-color bg-white
            "
        >
            <CornerDecorations />
            <div className="text-primary-blue w-[12vw] h-[12vw]">
                {deployment.icon}
            </div>
            <p className="text-foreground w-[80%] text-24 font-light leading-[1.2] w-full">
                {deployment.title}
            </p>
        </div>
    );
}

const JoinUs = () => {
    return (
        <section className="relative w-full h-fit py-[7%] px-[5vw] pb-[3%] max-sm:px-0 max-sm:py-[15%] max-sm:pb-[15%] max-sm:h-fit max-md:py-[10%] max-md:overflow-hidden">
            {/* Heading Section */}
            <div className="space-y-[5.5vw]  h-fit max-sm:static max-sm: max-sm:space-y-[12vw] z-10">
                <div className="text-center max-sm:px-[7vw] space-y-[2vw] max-sm:space-y-[7vw] max-md:space-y-[4vw]">
                    <HeadingAnim>
                        <h2 className="text-76 font-heading text-[#0A1B4B] capitalize">
                            Join us
                        </h2>
                    </HeadingAnim>
                    <Copy>
                        <p className="text-24 font-sans leading-[1.4] text-foreground w-[55%] max-sm:w-full mx-auto max-md:w-[80%]">
                            We're building a category-defining foundation for enterprise AI - and we're looking for people
                            who want to solve deep, meaningful problems.
                        </p>
                    </Copy>
                </div>

                <div className='h-[50vw] w-full rounded-[2vw] overflow-hidden fadeup max-sm:px-[7vw]'>
                    <Image src={"/assets/about/team.png"} className='h-full w-full object-cover rounded-[2vw]' width={1772} height={756} alt='Join Us' />
                </div>
                <div className='mx-auto'>
                    <Copy>
                        <p className="text-30 font-sans text-center leading-[1.4] tracking-[0.025vw] text-foreground">
                            If you're Excited by
                        </p>
                    </Copy>
                </div>

                {/* Value Cards — Desktop */}
                <div className="flex justify-between max-sm:hidden max-md:flex-wrap max-md:gap-y-[3vw]">
                    {values.map((deployment, index) => (
                        <ValueCard key={index} deployment={deployment} />
                    ))}
                </div>

                {/* Value Cards — Mobile Slider */}
                <div className="hidden max-sm:block w-full overflow-x-auto overflow-y-visible mobile-scrollbar pb-6  px-[7vw]">
                    <div className="flex gap-[5vw] flex-nowrap w-max items-center">
                        {values.map((deployment, index) => (
                            <ValueCardMobile key={index} deployment={deployment} />
                        ))}
                    </div>
                </div>

                <div className='mx-auto'>
                    <Copy>
                        <p className="text-30 font-sans text-center leading-[1.4] text-foreground">
                            …you'll feel at home at DSW.
                        </p>
                    </Copy>
                </div>
                <div className='mx-auto flex items-center justify-center fadeup h-fit'>
                    <PrimaryButton text={"View Open Roles"} href="#" />
                </div>
            </div>
        </section>
    )
}

export default JoinUs

const values = [
    {
        icon: <RollOut />,
        title: "Production-scale AI systems ​",
    },
    {
        icon: <ReducedCost />,
        title: "​Governed runtimes",
    },
    {
        icon: <EnterpriseGrade />,
        title: "Enterprise integration complexity ​",
    },
    {
        icon: <SkilledTeam />,
        title: "Agentic + LLM operationalization "
    }
];