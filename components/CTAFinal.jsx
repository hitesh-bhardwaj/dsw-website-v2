"use client"
import Copy from "./Animations/Copy";
import HeadingAnim from "./Animations/HeadingAnim";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import { useModal } from "./ModalProvider";

export default function CTAFinal({ ctaContent }) {
  const { openModal } = useModal();

  const showButtons =
    ctaContent.primaryButton?.present || ctaContent.secondaryButton?.present;
  return (
    <section className="relative w-full bg-linear-to-b from-[#fcfcfc] to-[#eff1fb] py-[7vw] px-[5vw] max-md:py-[10%]" id="footer-cta">
      <div className="relative  mx-auto bg-white rounded-[1.5vw] p-[5.25vw] overflow-hidden space-y-[1.5vw] max-md:space-y-[5vw] fadeup max-sm:py-[35%] max-sm:space-y-[7vw] max-sm:rounded-[4vw] max-md:rounded-[3vw] max-md:py-[10%] ">
        <HeadingAnim>
          <h2 className="text-76 w-[85%] mx-auto max-sm:w-full font-heading leading-[1.2] text-[#0A1B4B] text-center max-sm:text-[9vw] ">
            {ctaContent.heading}
          </h2>
        </HeadingAnim>

        {ctaContent.subPara && (
          <Copy>
            <h5 className=" text-44 text-center text-foreground font-heading w-[80%] mx-auto max-md:w-full">
              {ctaContent.subParaText}
            </h5>
          </Copy>
        )}
        <Copy>
          <p className={`text-30 text-center max-md:w-[90%] text-foreground max-sm:w-full mx-auto max-sm:font-light ${ctaContent.paraWidth?ctaContent.paraWidth:"w-[70%]"}`}>
            {ctaContent.para}
          </p>
        </Copy>

        {/* CTA Buttons */}
        {showButtons && (
          <div className="flex items-center justify-center gap-[1vw] max-md:gap-[3vw] mt-15 w-full fadeup max-sm:flex-col max-sm:gap-[5vw] ">
            {/* Primary Button */}
            {ctaContent.primaryButton?.present && (
              <PrimaryButton
              onClick={(e) => {
                if (ctaContent.primaryButton.book) {
                  e.preventDefault();
                  openModal()
                }
              }}
                target={`${ctaContent.primaryButton.targetPrimary ? "_blank" : ""}`}
                text={ctaContent.primaryButton.text}
                href={ctaContent.primaryButton.link}
              />
            )}

            {/* Secondary Button */}
            {ctaContent.secondaryButton?.present && (
              <SecondaryButton
                target={`${ctaContent.secondaryButton.targetSecondary ? "_blank" : ""}`}
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
