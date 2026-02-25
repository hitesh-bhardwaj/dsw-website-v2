import CornerDecorations from '../CornerDecorations';
import HeadingAnim from '../Animations/HeadingAnim';
import { OpenSource } from '../Svg/InfosysFinacle/OpenSource';
import { CoDeploy } from '../Svg/InfosysFinacle/CoDeploy';
import { Workshops } from '../Svg/InfosysFinacle/Workshops';


function DeployementCard({ deployment }) {
    return (
        <div className="relative fadeup ">
            <div
                className={`
                    relative bg-white  hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out group 
                    w-[28vw] h-[19vw] max-md:h-[35vw] max-md:w-[42vw] px-[1.5vw] py-[2vw] max-sm:px-[6vw] max-sm:py-[6vw] max-sm:w-full max-sm:pr-[7vw] max-md:p-[3vw] max-sm:p-0 max-sm:h-[70vw] border
                    border-border-color flex flex-col justify-between
                `}
            >
                <CornerDecorations />
          
                <div className=" w-[5vw] h-[5vw] max-md:w-[7vw] max-md:h-[7vw] max-sm:h-[15vw] max-sm:w-[15vw] text-primary-blue">
                    {deployment.icon}
                </div>
                <p className="text-foreground max-sm:leading-[1.2] text-30 max-sm:text-[5vw] max-sm:font-light leading-[1.2]">
                    {deployment.title}
                </p>
            </div>
        </div>
    );
}




export default function Deployments() {

    return (
        <section className="relative w-full py-[10%] px-[5vw] max-sm:py-[15%] max-md:px-[6vw] space-y-[12vw] max-sm:px-[7vw]">
            <div className='w-full space-y-[6vw] max-md:space-y-[10vw] max-sm:space-y-[12vw]'>
               <div className='w-[80%] mx-auto max-md:w-full'>
                    <HeadingAnim>
                        <h2 className='text-76  text-[#0A1B4B] text-center  max-md:leading-[1.3] max-sm:leading-[1.4] leading-[1.2]'>
                           Finacle Deployments Anchored by Open-Source Expertise 
                        </h2>
                    </HeadingAnim>
                    </div>
              
        

            <div className="flex justify-between  max-sm:w-full max-sm:mx-auto max-sm:flex-col max-md:flex-wrap space-y-[6vw] max-sm:space-y-[10vw]">
                {deployments.map((deployment, index) => (
                    <DeployementCard key={index} deployment={deployment} />
                ))}
            </div>
            </div>



        </section>
    );
}

const deployments = [
    {
        icon: <OpenSource/>,
        title: "Joint open-source adoption strategies for Finacle at global banks. ​",
    },
    {
        icon: <CoDeploy/>,
        title: "Co-deploy, operate, and maintain Finacle open-source stacks worldwide. ​",
    },
    {
        icon: <Workshops/>,
        title: "Conduct workshops, playbooks, and research to build open-source capability across Finacle teams and customers. ​",
    }
];

