"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Facebook, Insta, LinkedIn, Twitter, Youtube } from "../Svg/Icons";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Newsletter from "./Newsletter";
import AnimatedHoverLink from "./AnimatedHoverLink";
// import AnimatedHoverLink from "@/components/shared/AnimatedHoverLink";

const DynamicFooterWave = dynamic(() => import("./FooterWave"), {
  ssr: false,
});


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
    { title: "Technology", link: "/aios-technical", id: "technology" },
    { title: "Solutions", link: "/solutions/insurance", id: "solutions" },
    { title: "Case Studies", link: "/casestudies", id: "case-studies" },
    { title: "Resources", link: "/blogs", id: "resources" },
  ];

  const companyLinks = [
    { title: "About Us", link: "/about", id: "about" },
    { title: "Contact Us", link: "/contact-us", id: "contact" },
    { title: "Privacy Policy", link: "/privacy-policy", id: "privacy-policy" },
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
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const update = () => setMob(window.innerWidth <= 1024);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <footer
      className="relative w-full bg-white pt-[8.2vw] pb-[4vw] px-[4vw] max-md:px-[6vw] overflow-hidden max-sm:px-[7vw] max-sm:py-[15%]"
      id="footer"
    >
      {/* Background Gradient */}
      {!mob && (
        <div className="w-screen h-full">
          <DynamicFooterWave key={pathname} />
        </div>
      )}

      {mob && (
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
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="flex justify-between mb-[2vw] max-sm:flex-col max-md:flex-col max-md:gap-[10vw] max-sm:gap-0">
          <div className="w-[30%] max-sm:w-full max-md:w-[60%] max-sm:text-center">
            <div className="space-y-[1vw] max-sm:space-y-[2vw]">
              <div className="w-[50vw] h-auto hidden max-sm:block mx-auto mb-[10vw]">
                <Image
                  src="/assets/icons/dsw-logo-bottom.png"
                  alt="Data Science Wizards"
                  width={300}
                  height={170}
                  className="w-full h-full"
                />
              </div>
              <p className="text-24 max-md:text-[3.5vw] font-medium max-sm:text-[5.5vw]">
                Contact Us
              </p>

              <div className="space-y-[1vw] max-md:space-y-[1.5vw] max-sm:space-y-[1vw] max-md:gap-[2vw] max-sm:flex max-sm:flex-col-reverse max-sm:gap-[2vw]">
                <div className="under-multi-parent w-fit h-fit max-sm:mx-auto">
                  <Link
                    prefetch={false}
                    href="mailto:Contact@datasciencewizards.ai"
                    className="block text-24 max-md:text-[2.7vw] max-sm:text-[5vw] under-multi"
                  >
                    contact@datasciencewizards.ai
                  </Link>
                </div>

                <div className="flex gap-[0.5vw] max-md:gap-[2.5vw] max-sm:flex-col max-sm:gap-[1vw]">
                  <div className="under-multi-parent">
                    <Link
                      prefetch={false}
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
                      prefetch={false}
                      className="text-24 max-md:text-[2.7vw] max-sm:text-[5vw]! under-multi"
                      href="tel:+353 894015233"
                    >
                      +353 894015233{" "}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-[1.5vw] max-md:justify-between mt-[3vw] max-sm:gap-[7vw] max-sm:w-full max-sm:justify-center max-sm:my-[10vw]">
                {socialLinks.map((social) => (
                  <Link
                    prefetch={false}
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Data Science Wizards on ${social.name}`}
                    title={`Data Science Wizards on ${social.name}`}
                    className="w-auto h-[2.2vw] max-md:h-[6vw] max-md:w-[6vw] relative duration-500 transition-all hover:scale-[0.95] block max-sm:h-[10vw] max-sm:w-auto text-foreground hover:text-primary-blue"
                  >
                    <span aria-hidden="true" className="block h-full w-full">
                      {social.icon}
                    </span>
                    <span className="sr-only">Visit us on {social.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation + Company + Newsletter */}
          <div className="flex justify-between w-[60%] max-md:w-full max-md:flex-wrap max-sm:flex-col max-sm:gap-[10vw] max-sm:w-full max-sm:items-center max-sm:text-center max-md:justify-between">
            {/* Navigation */}
            <div className="space-y-[1.2vw] max-sm:space-y-[2vw] max-md:w-[55%] max-sm:w-full">
              <p className="text-24 font-medium max-md:text-[3vw] max-sm:text-[5.5vw]">
                Navigation
              </p>

              <ul className="space-y-[0.85vw] max-md:space-y-[1vw] max-sm:space-y-[2vw]">
                {navigationLinks.map((item) => (
                  <li key={item.id}>
                    <AnimatedHoverLink
                      href={item.link}
                      className="text-24 max-md:text-[2.5vw] overflow-clip hover:text-primary-blue transition-colors duration-300 block max-sm:text-[5vw]"
                      // optional if you want strict height:
                      maskClassName="h-[1.75vw] max-sm:h-[7vw] max-md:h-[4vw]"
                    >
                      {item.title}
                    </AnimatedHoverLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-[1.2vw] max-sm:space-y-[2vw] max-md:w-[40%] max-sm:w-full">
              <p className="text-24 font-medium max-md:text-[3vw] max-sm:text-[5.5vw]">
                Company
              </p>

              <ul className="space-y-[0.85vw] max-md:space-y-[1vw] max-sm:space-y-[2vw]">
                {companyLinks.map((item) => (
                  <li key={item.id}>
                    <AnimatedHoverLink
                      href={item.link}
                      maskClassName="h-[1.75vw] max-sm:h-[7vw] max-md:h-[4vw]"
                      {...(item.id === "join-community"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-24 max-md:text-[2.5vw] overflow-clip hover:text-primary-blue transition-colors duration-300 block max-sm:text-[5vw]"
                    >
                      {item.title}
                    </AnimatedHoverLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[40%] flex flex-col gap-[2vw] max-sm:w-full max-md:w-full max-sm:items-center max-sm:gap-[7vw]">
              <div className="w-fit flex gap-[1.5vw]  max-sm:gap-[4vw]">
                <div className="size-[6vw] max-sm:size-[20vw] max-md:size-[10vw] ">
                  <Image
                    src={"/assets/certifications/soc-2-compliant-wbg.png"}
                    alt=""
                    className="w-full h-full"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="size-[6vw] max-sm:size-[20vw] max-md:size-[10vw]">
                  <Image
                    src={"/assets/certifications/iso-27001-wbg.png"}
                    alt=""
                    className="w-full h-full"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <Newsletter />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-end justify-between pt-[4.5vw] max-sm:justify-center">
          <div className="w-[18vw] max-md:w-[30vw] max-md:h-[10vw] h-auto relative max-sm:hidden">
            <Image
              src="/assets/icons/dsw-logo-bottom.png"
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
