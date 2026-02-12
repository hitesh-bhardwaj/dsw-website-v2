"use client";

import Image from "next/image";
import Link from "next/link";
import WaveGradientCanvas from "./Homepage/HeroBg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { Facebook, Insta, LinkedIn, Twitter, Youtube } from "./Svg/Icons";

/** ✅ Isolated animated link (each item has its own ref + SplitText) */
function AnimatedFooterLink({ href = "#", children }) {
  const textRef = useRef(null);
  const splitRef = useRef(null);

  useGSAP(() => {
    // create once per component
    splitRef.current = new SplitText(textRef.current, {
      type: "chars",
      // NOTE: SplitText's "mask" works best with lines/words.
      // Keeping your intent, but chars won't use "lines" masking.
    });

    return () => {
      splitRef.current?.revert?.();
      splitRef.current = null;
    };
  }, []);

  const onEnter = () => {
    const chars = splitRef.current?.chars;
    if (!chars) return;

    gsap.killTweensOf(chars);
    gsap.to(chars, {
      yPercent: -100,
      stagger: 0.008,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const chars = splitRef.current?.chars;
    if (!chars) return;

    gsap.killTweensOf(chars);
    // bring it back to normal (0)
    gsap.to(chars, {
      yPercent: 0,
      stagger: 0.008,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="text-24 overflow-clip hover:text-[#1727ff] transition-colors duration-300 block max-sm:text-[5vw]"
    >
      <p ref={textRef} className="buttonTextShadow">
        {children}
      </p>
    </Link>
  );
}

export default function FooterNew() {
  const socialLinks = [
    { name: "LinkedIn", icon: <LinkedIn/>, url: "https://www.linkedin.com/company/data-science-wizards/" },
    { name: "Instagram", icon: <Insta/>, url: "https://www.instagram.com/datasciencewizards/" },
    { name: "Facebook", icon: <Facebook/>, url: "https://www.facebook.com/datasciencewizards/" },
    { name: "X", icon: <Twitter/>, url: "https://x.com/dswizards" },
    { name: "YouTube", icon: <Youtube/>, url: "https://www.youtube.com/@DataScienceWizards" },
  ];

  const navigationLinks = [
    "Technology",
    "Solutions",
    "Pilot Program",
    "Case Studies",
    "Resources",
  ];

  const companyLinks = [
    "About Us",
    "Contact Us",
    "Privacy Policy",
    "Terms & Condition",
    "Join Community",
  ];

  return (
    <footer className="relative w-full bg-white pt-[8.2vw] pb-[2vw] px-[4vw] overflow-hidden max-sm:px-[7vw] max-sm:py-[15%]">
      {/* Background Gradient */}
      <div className="w-screen h-full">
        <WaveGradientCanvas />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="flex justify-between mb-[2vw] max-sm:flex-col">
          <div className="w-[30%] max-sm:w-full max-sm:text-center">
            {/* Contact Us */}
            <div className="space-y-[1vw] max-sm:space-y-[2vw]">
              <div className="w-[40vw] h-auto hidden max-sm:block mx-auto mb-[10vw]">
                <Image
                  src="/logo-footer.svg"
                  alt="Data Science Wizards"
                  width={300}
                  height={170}
                  className="w-full h-full"
                />
              </div>
              <p className="text-24 max-sm:text-[6vw] max-sm:font-medium">
                Contact Us
              </p>
              <div className="space-y-[1vw] max-sm:flex max-sm:flex-col-reverse max-sm:gap-[2vw]">
                <Link
                  href="mailto:Contact@datasciencewizards.ai"
                  className="block text-24 max-sm:text-[5vw]"
                >
                  Contact@datasciencewizards.ai
                </Link>
                <div className="flex gap-[0.5vw] max-sm:flex-col max-sm:gap-[1vw]">
                  <Link
                    className="text-24 max-sm:text-[5vw]!"
                    href="tel:+91 96640 56847"
                  >
                    +91 96640 56847
                  </Link>
                  <span className="inline-block max-sm:hidden">|</span>
                  <Link
                    className="text-24 max-sm:text-[5vw]!"
                    href="tel:+353 894015233"
                  >
                    +353 894015233{" "}
                  </Link>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-[1.5vw] mt-[3vw] max-sm:gap-[10vw] max-sm:w-full max-sm:justify-center max-sm:my-[10vw]">
                {socialLinks.map((social, id) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className={`w-auto h-[2.2vw] relative duration-500 transition-all hover:scale-[0.95] block max-sm:h-[6vw] text-[#111111] hover:text-[#1727ff]`}
                  >
                   {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation + Company + Newsletter */}
          <div className="flex justify-between w-[60%] max-sm:flex-col max-sm:gap-[10vw] max-sm:w-full max-sm:items-center max-sm:text-center">
            {/* Navigation */}
            <div className="space-y-[1.2vw] max-sm:space-y-[2vw]">
              <h3 className="text-24 font-medium max-sm:text-[5.5vw]">
                Navigation
              </h3>
              <ul className="space-y-[0.85vw] max-sm:space-y-[2vw]">
                {navigationLinks.map((link) => (
                  <li key={link}>
                    <AnimatedFooterLink href="#">{link}</AnimatedFooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-[1.2vw]  max-sm:space-y-[2vw]">
              <h3 className="text-24 font-medium max-sm:text-[5.5vw]">
                Company
              </h3>
              <ul className="space-y-[0.85vw] max-sm:space-y-[2vw]">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <AnimatedFooterLink href="#">{link}</AnimatedFooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="w-[45%] relative max-sm:w-full">
              <div className="w-full h-[0.1px] bg-black absolute bottom-26 max-sm:bottom-18" />
              <p className="text-24 font-sans tracking-[0.025vw] mb-[3vw]">
                Subscribe to our newsletter for the latest tech insights and
                updates.
              </p>
              <div className="relative flex mt-[2vw] gap-[2vw] max-sm:flex-col max-sm:gap-[10vw]">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full bg-transparent text-[1vw] font-sans text-[#666] placeholder-[#666] focus:outline-none focus:border-[#ff5f00] transition-colors max-sm:text-[4.5vw] max-sm:mx-auto"
                />
                <button
                  className="px-[1.5vw] py-[0.5vw] rounded-full text-white text-[1vw] font-sans transition-all hover:opacity-90 max-sm:text-[4vw] max-sm:px-[7vw] max-sm:py-[2vw] max-sm:w-fit max-sm:mx-auto"
                  style={{
                    backgroundImage:
                      "linear-gradient(112.958deg, rgb(241, 107, 13) 7.1952%, rgb(230, 18, 22) 92.805%)",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-end justify-between pt-[5.2vw] max-sm:justify-center">
          <div className="w-[20vw] h-[11vw] relative max-sm:hidden">
            <Image
              src="/logo-footer.svg"
              alt="Data Science Wizards"
              fill
              className="object-contain object-left"
            />
          </div>

          <p className="text-20 font-sans">
            © Copyright Data Science Wizards 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
