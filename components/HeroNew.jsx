"use client";
import Image from "next/image";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import Copy from "./Animations/Copy";
import HeadingAnim from "./Animations/HeadingAnim";
import { fadeUp } from "./Animations/gsapAnimations";
import WaveGradientCanvas from "./Homepage/HeroBg";

export default function HeroNew({ heroContent }) {
  const showButtons =
    heroContent.primaryButton?.present || heroContent.secondaryButton?.present;
  fadeUp();
  return (
    <section className="relative w-full h-screen bg-white">
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Image
          src="/assets/homepage/Hero.png"
          height={1500}
          width={1500}
          alt="mobile-hero-bg"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none h-[120vh]">
        <div className="absolute inset-0 flex justify-between px-16">
          {[...Array(16)].map((_, i) => (
            <span key={i} className="w-px h-full bg-white/10" />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col justify-between py-16">
          {[...Array(11)].map((_, i) => (
            <span key={i} className="h-px w-full bg-white/10" />
          ))}
        </div>
      </div>

      <WaveGradientCanvas />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center h-full pt-[12vw] max-sm:pt-[45vw]">
        <div className="space-y-[1.2vw] max-sm:space-y-[3vw]">
          {/* Tagline */}
          <Copy>
            <p className="text-30 text-center tracking-wide max-sm:font-light">
              {heroContent.tagline}
            </p>
          </Copy>

          {/* Main Heading */}
          <HeadingAnim>
            <h1 className="text-110 text-[#0A1B4B] leading-[1.2] !  text-center max-w-[60vw] max-sm:max-w-[100%] max-sm:mx-auto">
              {heroContent.heading}
            </h1>
          </HeadingAnim>
        </div>

        {/* CTA Buttons - Only render if at least one button is present */}
        <div className="fadeup">
          {showButtons && (
            <div className="flex max-sm:flex-col items-center gap-[2.08vw] max-sm:gap-[4vw] mt-15 ">
              {/* Primary Button */}
              {heroContent.primaryButton?.present && (
                <PrimaryButton
                  text={heroContent.primaryButton.text}
                  href={heroContent.primaryButton.link}
                />
              )}

              {/* Secondary Button */}
              {heroContent.secondaryButton?.present && (
                <SecondaryButton
                  text={heroContent.secondaryButton.text}
                  href={heroContent.secondaryButton.link}
                />
              )}
            </div>
          )}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 right-5 max-sm:left-25 flex items-center gap-[1vw]">
          <div className="size-[0.63vw] rotate-90">
            <Image
              src="/arrow-down.svg"
              alt=""
              width={12}
              height={12}
              className="w-full h-full invert"
            />
          </div>
          <p className="text-20 font-sans  shimmer tracking-[0.056vw]">
            Keep Scrolling to Discover More
          </p>
        </div>
      </div>
    </section>
  );
}
