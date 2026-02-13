import Copy from "./Animations/Copy";
import HeadingAnim from "./Animations/HeadingAnim";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";

export default function CTAFinal({ ctaContent }) {
  const showButtons =
    ctaContent.primaryButton?.present || ctaContent.secondaryButton?.present;
  return (
    <section className="relative w-full bg-linear-to-b from-[#fcfcfc] to-[#eff1fb] py-[7vw] px-[5vw] max-sm:py-[10%]" id="footer-cta">
      <div className="relative  mx-auto bg-white rounded-[1.5vw] p-[5.25vw] overflow-hidden space-y-[1.5vw] fadeup max-sm:py-[35%] max-sm:space-y-[7vw] max-sm:rounded-[4vw]">
        <HeadingAnim>
          <h4 className="text-76 font-heading leading-[1.2] text-[#0A1B4B] text-center ">
            {ctaContent.heading}
          </h4>
        </HeadingAnim>

        {ctaContent.subPara && (
          <Copy>
            <h5 className="  text-44 text-center mt-[1vw] text-[#111111] font-heading">
              {ctaContent.subParaText}
            </h5>
          </Copy>
        )}
        <Copy>
          <p className="text-30 text-center w-[75%] text-[#111111] max-sm:w-full mx-auto max-sm:font-light ">
            {ctaContent.para}
          </p>
        </Copy>

        {/* CTA Buttons */}
        {showButtons && (
          <div className="flex items-center justify-center gap-[1vw] mt-15 w-full fadeup max-sm:flex-col max-sm:gap-[5vw] ">
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
