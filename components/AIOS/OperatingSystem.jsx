import Image from "next/image";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";

const OperatingSystem = () => {
    return (
        <>
            <section className="relative w-full h-fit py-[7%] max-sm:px-[7vw] max-sm:py-[15%] max-sm:h-fit pt-[10%]">
                <div className="text-center w-4/6 mx-auto space-y-[2vw]">
                    <HeadingAnim>
                        <h2 className="text-76 text-center leading-20 font-heading text-[#0A1B4B]">
                            Why Enterprises Need an AI Operating System
                        </h2>
                    </HeadingAnim>
                    <Copy>
                        <p className="text-30 font-sans leading-[1.4] tracking-[0.025vw] text-foreground mx-auto">
                            AI no longer lives in one team, one model, or one tool.
                        </p>
                    </Copy>
                </div>

                <div className="py-[5vw] w-[54%] mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="size-[20vw] relative flex items-center justify-center">
                            <div className="size-[14vw] border border-primary-blue rounded-full flex items-center justify-center text-center">
                                <p className="text-30 leading-[1.4]">It Runs Across</p>
                            </div>
                            <Image className="left-1/4!" src={"/assets/icons/run-across-half.svg"} alt="half circle image" fill="true" objectFit="contain" />
                        </div>
                        <div className="space-y-[1.8vw]">
                            {data.map((item) => (
                                <div 
                                    key={item.id} 
                                    style={{ transform: `translateX(${item.left})` }}
                                    className="p-2 border border-primary-blue rounded-full pr-[2.5vw] flex items-center justify-start gap-[2vw]"
                                >
                                    <Image className="size-[3vw]" src={item.imgSrc} alt="icon" width={20} height={20} />
                                    <p className="text-24">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center w-4/5 mx-auto space-y-[2vw]">
                    <Copy>
                        <p className="text-30 text-center font-sans leading-[1.4] tracking-[0.025vw] text-foreground">
                            Without a system layer, AI becomes fragmented, difficult to govern, and dangerous to scale. Enterprises don’t just need more AI tools. <span className="text-primary-blue">They need a foundation to operate AI as part of the enterprise itself.</span>
                        </p>
                    </Copy>
                    <Copy>
                        <p className="text-30 font-sans leading-[1.4] tracking-[0.025vw] text-foreground">
                            AI no longer lives in one team, one model, or one tool.
                        </p>
                    </Copy>
                </div>
            </section>
        </>
    )
}

export default OperatingSystem;

const data = [
    {
        id: 1,
        text: "Models and Agents",
        imgSrc: "/assets/icons/aios/icon-1.svg",
        left: "-10%"
    },
    {
        id: 2,
        text: "Business Workflows",
        imgSrc: "/assets/icons/aios/icon-2.svg",
        left: 0,
    },
    {
        id: 3,
        text: "Data Platforms And Applications",
        imgSrc: "/assets/icons/aios/icon-3.svg",
        left: 0,
    },
    {
        id: 4,
        text: "Regulated Environments With Real Risk",
        imgSrc: "/assets/icons/aios/icon-4.svg",
        left: '-10%',
    },
]