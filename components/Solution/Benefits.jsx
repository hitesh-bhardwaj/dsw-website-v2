"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits({ benefitsContent }) {
  const { heading, points = [], sectionId = "finacle-outcomes" } = benefitsContent;

  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const set = () => setIsMobile(window.innerWidth <= 768);
    set();

    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // ✅ scope selectors to this section only (prevents cross-page conflicts)
    const ctx = gsap.context(() => {
      gsap.set(".about-item", {
        scale: 0.7,
        transformOrigin: "center",
        y: 60,
        x: 25,
        opacity: 0.45,
      });

      document.querySelectorAll(".about-item").forEach((item) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: isMobile ? "20% 180%" : "10% bottom",
            end: "bottom 40%",
            scrub: true,
            // markers: true,
          },
        }).to(item, {
          scale: 1,
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, points]);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-full px-[5vw] py-[7%] max-sm:py-[15%] max-sm:px-[7vw]"
      id={sectionId}
    >
      <div className="w-full flex flex-col items-center justify-center gap-y-[5vw] max-sm:gap-y-[15vw]">
        <div className="w-[85%] text-center max-sm:w-full">
          <HeadingAnim>
            <h2 className="text-76 leading-[1.2] max-sm:leading-[1.4] text-[#0A1B4B] capitalize">{heading}</h2>
          </HeadingAnim>
        </div>

        <div className="w-[50%] flex flex-col gap-[3vw] max-md:w-full max-md:gap-[7vw] max-sm:gap-[10vw]">
          {points.map((p, idx) => (
            <div key={p.id ?? idx} className="w-full flex gap-[3.2vw] items-center about-item">
              <div className="w-[15%] relative max-md:w-[30%]">
                <div className="relative w-[5vw] h-[5vw] border border-primary-blue rounded-full flex items-center justify-center max-sm:w-[18vw] max-sm:h-[18vw] max-md:w-[15vw] max-md:h-[15vw]">
                  <p className="about-id text-primary-1 font-head relative z-[1] text-30">
                    {p.id ?? String(idx + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>

              <p className={`text-30 w-full  ${p.className ?? ""}`}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
