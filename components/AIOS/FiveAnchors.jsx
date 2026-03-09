"use client";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsapCore";


import Image from "next/image";
import { useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";


const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const anchors = [
  {
    id: 1,
    label: "Continuous adaptation",
    alt: "Continuous Adaption",
    src: "/assets/icons/aios/anchors/continuous-adaptation-anchor.svg",
    position: "top-[4%] left-1/2 -translate-x-1/2",
  },
  {
    id: 2,
    label: "Data Sovereignty",
    alt: "Data Sovereignty",
    src: "/assets/icons/aios/anchors/data-sovereignty-anchor.svg",
    position: "top-[35%] right-0 max-sm:right-[-3%]",
  },
  {
    id: 3,
    label: "Human Centric AI",
    alt: "Human Centric",
    src: "/assets/icons/aios/anchors/human-centric-anchor.svg",
    position: "bottom-[5%] right-[15%] max-sm:bottom-[-2%]",
  },
  {
    id: 4,
    label: "Strategic Flexibility",
    alt: "Strategic Flexibility",
    src: "/assets/icons/aios/anchors/strategic-flexibility-anchor.svg",
    position: "bottom-[5%] left-[15%] max-sm:bottom-[-3%]",
  },
  {
    id: 5,
    label: "Adoption Reality",
    alt: "Adoption Reality",
    src: "/assets/icons/aios/anchors/adoption-reality-anchor.svg",
    position: "top-[35%] left-0 max-sm:left-[-2%]",
  },
];

const FiveAnchors = () => {
  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const ringRef = useRef(null);
  const diagramRef = useRef(null);

  useGSAP(
    () => {
      const ring = ringRef.current;
      const diagram = diagramRef.current;
      if (!ring || !diagram) return;

      // ── Continuous base rotation (same pattern as HowAgenticWorksWheel) ──
      gsap.set(ring, {
        transformOrigin: "50% 50%",
        willChange: "transform",
      });

      const rot = gsap.to(ring, {
        rotation: "+=360",
        duration: 30,
        repeat: -1,
        ease: "none",
        force3D: true,
      });

      const BASE = 0.35;
      const MAX = 8;
      const SENS = 0.08;
      const DECAY = 0.88;

      rot.timeScale(BASE);

      let boost = 0;
      let lastY = window.scrollY;

      const tick = () => {
        boost *= DECAY;
        const t = BASE + boost;
        rot.timeScale(t);
      };

      gsap.ticker.add(tick);

      const onScroll = () => {
        const y = window.scrollY;
        const dy = Math.abs(y - lastY);
        lastY = y;
        boost = Math.min(boost + dy * SENS, MAX);
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Fade-in animations (unchanged) ──
      const isMobileOrTablet = (globalThis.innerWidth ?? 1024) < 1024;

      if (isMobileOrTablet) {
        gsap.fromTo(
          diagram,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stickyRef.current,
              start: "10% 80%",
            },
          }
        );
      } else {
        gsap.set(ring, { opacity: 0 });
        gsap.set("[data-anchor-id]", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
            markers: false,
          },
        });

        tl.fromTo(
          ring,
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 0.35 },
          0
        );

        tl.fromTo(
          `[data-anchor-id="1"]`,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, ease: "power2.out", duration: 0.25, scale: 1 },
          0.05
        );

        anchors.slice(1).forEach((anchor, i) => {
          tl.fromTo(
            `[data-anchor-id="${anchor.id}"]`,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, ease: "power2.out", duration: 0.25, scale: 1 },
            0.15 + i * 0.14
          );
        });
      }

      return () => {
        window.removeEventListener("scroll", onScroll);
        gsap.ticker.remove(tick);
        rot.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: outerRef }
  );

  return (
    <div ref={outerRef} className="relative bg-background">
      <div className="text-center px-[5vw] pt-[7%] pb-[2vw] max-sm:pt-[15%] max-sm:pb-[6vw] max-md:pb-[3vw]">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] leading-[1.2]">
            The Five Timeless Anchors of the Enterprise AI Operating System
          </h2>
        </HeadingAnim>
      </div>

      <div
        ref={stickyRef}
        className="py-0 max-md:py-[10%] h-[300vh] max-md:h-auto"
      >
        <div className="w-full flex items-center justify-center overflow-hidden sticky top-0 h-screen max-md:relative max-md:h-[50vh]">
          <div
            ref={diagramRef}
            className="relative w-[45vw] aspect-square max-sm:w-[90vw] max-md:w-[70vw]"
          >
            <div ref={ringRef} className="absolute inset-[10%] z-0">
              <Image
                src="/assets/icons/aios/anchors/circle-ring.png"
                alt="Circle ring"
                fill
                className="object-contain"
                priority
              />
            </div>

            {anchors.map((anchor) => (
              <div
                key={anchor.id}
                data-anchor-id={anchor.id}
                className={`absolute ${anchor.position} flex flex-col items-center gap-[0.8vw] z-10 max-sm:gap-[2vw]`}
              >
                <div className="w-[7.5vw] h-[7.5vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[14vw] max-sm:h-[14vw] max-md:size-[10vw]">
                  <div className="absolute inset-[20%]">
                    <Image
                      src={anchor.src}
                      alt={anchor.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-24 text-foreground capitalize max-sm:text-[2.8vw] max-sm:w-[70%] max-sm:text-center max-md:text-[1.6vw]">
                  {anchor.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiveAnchors;