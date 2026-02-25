import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";

export default function Intro() {
    return (
        <section className="relative w-full py-[7%] pt-[15%] max-sm:px-[7vw] max-sm:py-[15%] max-md:py-[10%] space-y-[8vw] max-sm:space-y-[24vw] z-[2]">
            <div className="text-center mx-auto space-y-[2vw] max-sm:w-full max-sm:space-y-[7vw] max-md:space-y-[4vw]">
                <HeadingAnim>
                    <h2 className="text-76 text-center font-heading  text-[#0A1B4B] leading-[1.2]">
                        DSW Exists to Solve a New Enterprise Reality

                    </h2>
                </HeadingAnim>

                <Copy>
                    <p className="text-30 w-[70%] max-sm:w-full max-md:w-[80%] font-sans  leading-[1.4] text-foreground mx-auto">
                        AI is no longer just predicting. It is executing - through models, LLMs, and agents embedded
                        inside business workflows.
                        And when AI executes, enterprises need something they’ve never had before:
                    </p>
                </Copy>
                <Copy>
                    <p className="text-30 w-[60%] font-sans font-medium max-sm:font-normal max-sm:w-full max-md:w-[80%] leading-[1.4] text-foreground mx-auto">
                        An operating layer to run AI with control, governance, and ownership.

                    </p>
                </Copy>
            </div>




        </section>
    );
}


