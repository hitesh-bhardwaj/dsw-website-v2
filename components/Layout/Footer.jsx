"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { Facebook, Insta, LinkedIn, Twitter, Youtube } from "../Svg/Icons";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Newsletter from "./Newsletter";


const DynamicFooterWave = dynamic(() => import("./FooterWave"), {
  ssr: false,
});

/** ✅ Isolated animated link (each item has its own ref + SplitText) */
function AnimatedFooterLink({ href = "#", children, ...props }) {
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
      {...props}
      className="text-24 max-md:text-[2.5vw] overflow-clip hover:text-[#1727ff] transition-colors duration-300 block max-sm:text-[5vw]"
    >
      <p ref={textRef} className="buttonTextShadow">
        {children}
      </p>
    </Link>
  );
}

export default function FooterNew() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <LinkedIn />,
      url: "https://www.linkedin.com/company/data-science-wizards/",
    },
    {
      name: "Instagram",
      icon: <Insta />,
      url: "https://www.instagram.com/datasciencewizards/",
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      url: "https://www.facebook.com/datasciencewizards/",
    },
    { name: "X", icon: <Twitter />, url: "https://x.com/dswizards" },
    {
      name: "YouTube",
      icon: <Youtube />,
      url: "https://www.youtube.com/@DataScienceWizards",
    },
  ];

  const navigationLinks = [
    {
      title: "Technology",
      link: "/aios-technical",
      id: "technology",
    },
    {
      title: "Solutions",
      link: "/solutions/insurance",
      id: "solutions",
    },
    {
      title: "Case Studies",
      link: "/casestudies",
      id: "case-studies",
    },
    {
      title: "Resources",
      link: "/blogs",
      id: "resources",
    },
  ];

  const companyLinks = [
    {
      title: "About Us",
      link: "/about",
      id: "about",
    },
    {
      title: "Contact Us",
      link: "/contact-us",
      id: "contact",
    },
    {
      title: "Privacy Policy",
      link: "/privacy-policy",
      id: "privacy-policy",
    },
    {
      title: "Terms & Conditions",
      link: "/terms-and-conditions",
      id: "terms-and-conditions",
    },
    {
      title: "Join Community",
      link: "https://chat.whatsapp.com/4UJBjd1ZjV3JcXWCgYqqRH",
      id: "join-community",
    },
  ];
     const pathname = usePathname();


  return (
    <footer
      className="relative w-full bg-white pt-[8.2vw] pb-[4vw] px-[4vw] max-md:px-[6vw] overflow-hidden max-sm:px-[7vw] max-sm:py-[15%]"
      id="footer"
    >
      {/* Background Gradient */}
      <div className="w-screen h-full">
        <DynamicFooterWave key={pathname} />
      </div>

      <div className="max-md:block hidden absolute bottom-0 w-full h-auto left-0 right-0">
        <Image
          src="/assets/footer-bg.png"
          width={500}
          loading="lazy"
          height={700}
          className="h-auto w-full"
          alt="footer-bg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="flex justify-between mb-[2vw] max-sm:flex-col max-md:flex-col max-md:gap-[10vw] max-sm:gap-0">
          <div className="w-[30%] max-sm:w-full max-md:w-[60%] max-sm:text-center">
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
              <h5 className="text-24 max-md:text-[3.5vw] font-medium max-sm:text-[5.5vw]">
                Contact Us
              </h5>
              <div className="space-y-[1vw] max-md:space-y-[1.5vw] max-sm:space-y-[1vw] max-md:gap-[2vw] max-sm:flex max-sm:flex-col-reverse max-sm:gap-[2vw]">
                <div className="under-multi-parent w-fit h-fit max-sm:mx-auto">
                  <Link
                    href="mailto:Contact@datasciencewizards.ai"
                    className="block text-24 max-md:text-[2.7vw] max-sm:text-[5vw] under-multi"
                  >
                    contact@datasciencewizards.ai
                  </Link>
                </div>

                <div className="flex gap-[0.5vw] max-md:gap-[2.5vw] max-sm:flex-col max-sm:gap-[1vw]">
                  <div className="under-multi-parent">
                    <Link
                      className="text-24 max-md:text-[2.7vw] max-sm:text-[5vw]! under-multi"
                      href="tel:+91 96640 56847"
                    >
                      +91 96640 56847
                    </Link>
                  </div>
                  <span className="inline-block max-md:hidden">|</span>
                  <span className="hidden max-md:block max-sm:hidden h-[3.5vw] w-[0.03vw] bg-black"></span>
                  <div className="under-multi-parent">
                    <Link
                      className="text-24 max-md:text-[2.7vw] max-sm:text-[5vw]! under-multi"
                      href="tel:+353 894015233"
                    >
                      +353 894015233{" "}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-[1.5vw] max-md:justify-between  mt-[3vw] max-sm:gap-[7vw] max-sm:w-full max-sm:justify-center max-sm:my-[10vw]">
                {socialLinks.map((social, id) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className={`w-auto h-[2.2vw] max-md:h-[6vw] max-md:w-[6vw] relative duration-500 transition-all hover:scale-[0.95] block max-sm:h-[10vw] max-sm:w-auto text-foreground hover:text-[#1727ff]`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation + Company + Newsletter */}
          <div className="flex justify-between w-[60%] max-md:w-full max-md:flex-wrap max-sm:flex-col max-sm:gap-[10vw] max-sm:w-full max-sm:items-center max-sm:text-center max-md:justify-between">
            {/* Navigation */}
            <div className="space-y-[1.2vw] max-sm:space-y-[2vw] max-md:w-[55%] max-sm:w-full">
              <h5 className="text-24 font-medium max-md:text-[3vw] max-sm:text-[5.5vw]">
                Navigation
              </h5>
              <ul className="space-y-[0.85vw] max-md:space-y-[1vw] max-sm:space-y-[2vw]">
                {navigationLinks.map((item, id) => (
                  <li key={id}>
                    <AnimatedFooterLink href={item.link}>
                      {item.title}
                    </AnimatedFooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-[1.2vw]  max-sm:space-y-[2vw] max-md:w-[40%] max-sm:w-full">
              <h5 className="text-24 font-medium max-md:text-[3vw] max-sm:text-[5.5vw]">
                Company
              </h5>
              <ul className="space-y-[0.85vw] max-md:space-y-[1vw] max-sm:space-y-[2vw]">
                {companyLinks.map((item, id) => (
                  <li key={id}>
                    <AnimatedFooterLink
                      href={item.link}
                      {...(item.id === "join-community"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.title}
                    </AnimatedFooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <Newsletter/>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-end justify-between  pt-[4.5vw] max-sm:justify-center">
          <div className="w-[18vw] max-md:w-[22vw] max-md:h-[10vw] h-auto relative max-sm:hidden">
            <Image
              src="/assets/dsw-logo.svg"
              alt="Data Science Wizards"
              width={200}
              height={200}
              className="object-contain object-left w-full h-full"
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
