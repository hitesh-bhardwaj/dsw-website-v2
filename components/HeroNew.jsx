"use client"
import Image from 'next/image';
import HeroBg from './Homepage/HeroBg';
import PrimaryButton from './Buttons/PrimaryButton';
import SecondaryButton from './Buttons/SecondaryButton';
import { initSplit } from './splitTextUtils';
import { useEffect } from 'react';

export default function HeroNew({heroContent}) {
    useEffect(() => {
        initSplit();
    }, []);

    // Check if at least one button should be displayed
    const showButtons = heroContent.primaryButton?.present || heroContent.secondaryButton?.present;

    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            <HeroBg/>
           
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center h-full pt-[12vw]">
                <div className='space-y-[1.2vw]'>
                    {/* Tagline */}
                    <p className="text-30 font-medium text-[#333] text-center tracking-wide">
                        {heroContent.tagline}
                    </p>

                    {/* Main Heading */}
                    <h1 
                        className="text-110 text-[#0A1B4B] leading-[1.2] font-extralight!  text-center max-w-[60vw]"
                    >
                        {heroContent.heading}
                    </h1>
                </div>

                {/* CTA Buttons - Only render if at least one button is present */}
                {showButtons && (
                    <div className="flex items-center gap-[2.08vw] mt-15">
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

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-10 right-5 flex items-center gap-[1vw]">
                    <div className="size-[0.63vw] rotate-90">
                        <Image
                            src="/arrow-down.svg"
                            alt=""
                            width={12}
                            height={12}
                            className="w-full h-full"
                        />
                    </div>
                    <p className="text-[0.94vw] font-sans  shimmer tracking-[0.056vw]">
                        Keep Scrolling to Discover More
                    </p>
                </div>
            </div>
        </section>
    );
}