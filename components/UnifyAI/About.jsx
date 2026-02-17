import CornerDecorations from '../CornerDecorations';
import HeadingAnim from '../Animations/HeadingAnim';
import Copy from '../Animations/Copy';
import { GoLive } from '../Svg/Unify/GoLive';
import { CostCutting } from '../Svg/Unify/CostCutting';
import { EnterprisePrivacy } from '../Svg/Unify/EnterprisePrivacy';
import { Deploy } from '../Svg/Unify/Deploy';
import SectionBreak from '../SectionBreak';


function AboutCard({ challenge }) {
    return (
        <div className="relative fadeup ">
            <div
                className={`
                    relative bg-white  hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out group 
                    w-[21.5vw] h-[17vw] px-[1.5vw] py-[1.5vw] max-sm:px-[6vw] max-sm:py-[6vw] max-sm:w-full max-sm:pr-[12vw] max-sm:h-[54vw] border
                    border-border-color flex flex-col justify-start gap-[3vw] max-sm:gap-[8vw] max-sm:justify-between
                `}
            >
                <CornerDecorations />
                <CornerDecorations />
                <div className=" w-[5vw] h-[5vw] max-sm:h-[15vw] max-sm:w-[15vw]  text-primary-blue">
                    <challenge.icon className="w-full duration-300 ease-in-out h-full" />
                </div>
                <p className="text-foreground text-30 max-sm:text-[5vw] max-sm:font-light leading-[1.4]">
                    {challenge.title}
                </p>
            </div>
        </div>
    );
}




export default function UnifyAbout() {

    return (
        <section className="relative w-full pt-[15%] pb-[2%] px-[5vw] max-sm:py-[15%] max-sm:space-y-[15vw] space-y-[7vw]">
            <SectionBreak content={"Fragmented AI stacks, post-deployment governance, and limited runtime visibility keep enterprises stuck in pilots. The UnifyAI kernel solves this by enforcing governance and control in real time."}/>

            <div className='w-full flex max-sm:flex-col max-sm:gap-[7vw] items-end justify-between'>
                <div className='w-[45%] max-sm:w-full max-sm:mx-auto'>
                    <HeadingAnim>
                        <h2 className='text-56  text-[#0A1B4B] max-sm:text-center! max-sm:text-[8.5vw] leading-[1.2]'>
                            AI is Everywhere.<br/> But Operational AI is Rare.
                        </h2>
                    </HeadingAnim>
                </div>
                <div className='w-[45%] max-sm:w-full max-sm:mx-auto'>
                    <Copy>
                        <p className='text-30 text-[#333333] max-sm:font-light max-sm:text-18 max-sm:text-center'>
                            Most enterprises face the same hurdles: siloed teams, long development cycles,
                            integration nightmares, and governance concerns. UnifyAI kernel is here to solve
                            that – the AI/ML runtime fully equipped to help teams build, deploy, and scale faster,
                            for real outcomes.
                        </p>
                    </Copy>
                </div>

            </div>



            <div className="flex justify-between  max-sm:w-full max-sm:mx-auto max-sm:flex-col  space-y-[6vw] max-sm:space-y-[10vw]">
                {challenges.map((challenge, index) => (
                    <AboutCard key={index} challenge={challenge} />
                ))}
            </div>



        </section>
    );
}

const challenges = [
    {
        icon: GoLive,
        title: "Go live 50% faster",
    },
    {
        icon: CostCutting,
        title: "Cut AI/GenAI deployment costs by up to 60%",
    },
    {
        icon: EnterprisePrivacy,
        title: "Ensure enterprise-grade privacy, compliance and observability",
    },
    {
        icon: Deploy,
        title: "Deploy across AWS, Azure, GCP, or your private cloud or on-prem",
    }
];

