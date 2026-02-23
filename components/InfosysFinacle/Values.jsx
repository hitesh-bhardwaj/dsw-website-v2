import CornerDecorations from '../CornerDecorations';
import HeadingAnim from '../Animations/HeadingAnim';
import { OpenSource } from '../Svg/InfosysFinacle/OpenSource';
import { CoDeploy } from '../Svg/InfosysFinacle/CoDeploy';
import { Workshops } from '../Svg/InfosysFinacle/Workshops';
import { RollOut } from '../Svg/InfosysFinacle/RolllOut';
import { ReducedCost } from '../Svg/InfosysFinacle/ReducedCost';
import { EnterpriseGrade } from '../Svg/InfosysFinacle/EnterpriseGrade';
import { SkilledTeam } from '../Svg/InfosysFinacle/SkilledTeam';


function ValueCard({ deployment }) {
    return (
        <div className="relative fadeup ">
            <div
                className={`
                    relative bg-white  hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out group 
                    w-[21.5vw] h-[25vw] px-[1vw] py-[2vw] max-sm:px-[6vw] max-sm:py-[6vw] max-sm:w-full max-sm:pr-[12vw] max-sm:h-[58vw] border
                    border-border-color flex flex-col justify-between
                `}
            >
                <CornerDecorations />
                <div className=" w-[5vw] h-[5vw] max-sm:h-[15vw] max-sm:w-[15vw] text-primary-blue">
                    {deployment.icon}
                </div>
                <p className="text-foreground h-18 max-sm:leading-[1.2] text-24 max-sm:text-[5vw] max-sm:font-light leading-[1.2]">
                    {deployment.title}
                </p>
            </div>
        </div>
    );
}




export default function Values() {

    return (
        <section className="relative w-full py-[5%] px-[5vw] max-sm:py-[15%] space-y-[12vw] max-sm:px-[7vw]">
            <div className='w-full space-y-[6vw]'>
               <div className='w-[80%] mx-auto'>
                    <HeadingAnim>
                        <h2 className='text-76  text-[#0A1B4B] text-center  max-sm:leading-[1.3] leading-[1.4]'>
                          Bringing Cohesive Value to Banks
                        </h2>
                    </HeadingAnim>
                    </div>
              
        

            <div className="flex justify-between  max-sm:w-full max-sm:mx-auto max-sm:flex-col  space-y-[6vw] max-sm:space-y-[10vw]">
                {values.map((deployment, index) => (
                    <ValueCard key={index} deployment={deployment} />
                ))}
            </div>
            </div>
        </section>
    );
}

const values = [
    {
        icon: <RollOut/>,
        title: "Predictable and accelerated Finacle rollouts at scale. ​",
    },
    {
        icon: <ReducedCost/>,
        title: "Reduced total cost of ownership (TCO) for core banking stacks.​",
    },
    {
        icon: <EnterpriseGrade/>,
        title: "Enterprise-grade reliability with modernized, open architectures.​",
    },
    {
        icon:<SkilledTeam/>,
        title:"Skilled teams ready to operate, extend, and innovate with Finacle. "
    }
];

