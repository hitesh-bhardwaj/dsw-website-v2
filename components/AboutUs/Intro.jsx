import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";

export default function Intro() {
    return (
        <section className="relative w-full py-[7%] pt-[10%] max-sm:px-[7vw] max-sm:py-[15%] space-y-[8vw] max-sm:space-y-[24vw] z-[2]">
            <div className="text-center mx-auto space-y-[2vw] max-sm:w-full max-sm:space-y-[7vw]">
                <HeadingAnim>
                    <h2 className="text-76 text-center font-heading  text-[#0A1B4B]">
                        DSW Exists to Solve a New Enterprise Reality

                    </h2>
                </HeadingAnim>

                <Copy>
                    <p className="text-30 w-[70%] max-sm:w-full font-sans  leading-[1.4] text-foreground mx-auto">
                        AI is no longer just predicting. It is executing - through models, LLMs, and agents embedded
                        inside business workflows.
                        And when AI executes, enterprises need something they’ve never had before:

                    </p>
                </Copy>

                <Copy>
                    <p className="text-30 w-[60%] font-sans font-medium max-sm:font-normal max-sm:w-full leading-[1.4] text-foreground mx-auto">
                        An operating layer to run AI with control, governance, and ownership.

                    </p>
                </Copy>
            </div>




        </section>
    );
}


