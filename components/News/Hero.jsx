"use client";
import React, { useEffect } from "react";
import {
  fadeIn,
  fadeUp,
  headingAnim,
  lineAnim,
  paraAnim,
} from "../Animations/gsapAnimations";
import { initSplit } from "../splitTextUtils";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero({ breadcrumbs, news }) {
  const router = useRouter();

  headingAnim();
  paraAnim();
  fadeUp();

  useEffect(() => {
     gsap.set(".hero-overlay", { opacity: 0 });
    initSplit();
    gsap.to(".hero-img", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.set(".hero-head, .hero-crumb", {
      opacity: 1,
    });
    gsap.fromTo(
      ".breadcrumbsContainer",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
    );
  }, []);

  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  const createBreadcrumbName = (segment) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Truncate to at most 4 words, append ellipsis if longer
  const truncateWords = (str, maxWords = 4) => {
    const words = (str || "").trim().split(/\s+/);
    if (words.length <= maxWords) return str;
    return words.slice(0, maxWords).join(" ") + "…";
  };

  return (
    <>
    <section
      id="blogDetail"
      className="h-screen max-md:h-fit container flex items-center justify-center w-full relative bg-[#FEFEFE] max-md:items-start max-md:!pt-[40vh] overflow-hidden"
    >
      <div className="absolute inset-0 h-full w-full z-0 hero-img max-md:h-[35vh]">
        <Image
          width={1920}
          height={1080}
          src={news?.featuredImage?.sourceUrl}
          alt="Blog hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b to-black/30 from-black/90 max-md:from-black/20"></div>
      </div>

      <h1 className="text-100 headingAnim max-md:!text-[8vw] relative z-10 text-white-200 text-center hero-head w-[85%] max-md:text-background max-md:text-left max-md:w-full">
        {news?.title}
      </h1>

      {breadcrumbs && (
        <div className="breadcrumbs overflow-hidden w-full flex items-start justify-start text-[1vw] text-[#CACACA] max-md:text-[2.7vw] max-sm:text-[3vw] max-md:h-fit absolute left-[5%] bottom-[8%] max-md:bottom-[2%] max-sm:left-[7%] z-[800] hero-crumb max-md:text-background">
          <div className="flex gap-3 breadcrumbsContainer items-center">
            <a href="#">Resources</a>{" "}
            <span className=" w-2 h-2">
              <Image
                src={"/assets/icons/breadcrumbs.svg"}
                alt="breadcrumb icon"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </span>{" "}
            {pathArray
              .filter((segment) => segment && segment.toLowerCase() !== "home")
              .map((segment, index, arr) => {
                const href = "/" + arr.slice(0, index + 1).join("/");
                const isLast = index === arr.length - 1;

                const fullLabel = createBreadcrumbName(segment);
                const shortLabel = truncateWords(fullLabel, 4);

                return (
                  <div key={href} className="flex items-center gap-2">
                    {index > 0 && <span>&gt;</span>}

                    {isLast ? (
                      <span title={fullLabel}>{shortLabel}</span>
                    ) : (
                      <a
                        href={href}
                        title={fullLabel}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(href);
                        }}
                      >
                        {shortLabel}
                      </a>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </section>
        <div className="w-screen h-screen absolute inset-0 bg-background z-[999] hero-overlay pointer-events-none opacity-100" />
    
    </>
  );
}
