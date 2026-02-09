import PrimaryButton from './Buttons/PrimaryButton';
import SecondaryButton from './Buttons/SecondaryButton';

export default function CTAFinal({ctaContent}) {
    const showButtons = ctaContent.primaryButton?.present || ctaContent.secondaryButton?.present;
    return (
        <section className="relative w-full bg-linear-to-b from-[#fcfcfc] to-[#eff1fb] py-[7vw] px-[5vw] fadeup">
            <div className="relative  mx-auto bg-white rounded-[1.5vw] p-[5.25vw] overflow-hidden space-y-[1.5vw]">
                <h4 className="text-76 font-heading  leading-normal text-[#1d1d1d] text-center ">
                  {ctaContent.heading}
                </h4>

                <p className="text-30  text-[#111] text-center max-w-[55vw] mx-auto ">
                  {ctaContent.para}
                </p>

                {/* CTA Buttons */}
                {showButtons && (
                    <div className="flex items-center justify-center gap-[2.08vw] mt-15 w-full ">
                        {/* Primary Button */}
                        {ctaContent.primaryButton?.present && (
                            <PrimaryButton 
                                text={ctaContent.primaryButton.text} 
                                href={ctaContent.primaryButton.link}
                            />
                        )}

                        {/* Secondary Button */}
                        {ctaContent.secondaryButton?.present && (
                            <SecondaryButton 
                                text={ctaContent.secondaryButton.text} 
                                href={ctaContent.secondaryButton.link}
                            />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
