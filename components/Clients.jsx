"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeadingAnim from "./Animations/HeadingAnim";

export default function Clients() {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const marquee = marqueeRef.current;
    if (!track || !marquee) return;

    // Base + hover durations (bigger duration = slower)
    const BASE_DURATION = 25;
    const HOVER_DURATION = 65;

    // ✅ exact CSS percentages you tuned
    const tween = gsap.fromTo(
      track,
      { xPercent: 0 },
      {
        xPercent: -50.21,
        duration: BASE_DURATION,
        ease: "none",
        repeat: -1,
      }
    );

    // Helper: smooth speed changes by animating timeScale
    // timeScale = BASE_DURATION / targetDuration
    const setSpeedByDuration = (targetDuration) => {
      const targetTimeScale = BASE_DURATION / targetDuration;
      gsap.to(tween, {
        timeScale: targetTimeScale,
        duration: 0.6, // smooth ramp
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onEnter = () => setSpeedByDuration(HOVER_DURATION); // slow down smoothly
    const onLeave = () => setSpeedByDuration(BASE_DURATION);  // restore smoothly

    marquee.addEventListener("mouseenter", onEnter);
    marquee.addEventListener("mouseleave", onLeave);

    return () => {
      marquee.removeEventListener("mouseenter", onEnter);
      marquee.removeEventListener("mouseleave", onLeave);
      tween.kill();
    };
  }, []);

  return (
    <section className="relative w-screen overflow-hidden py-[7%] px-0 space-y-[5vw]">
      {/* Heading */}
      <HeadingAnim>
        <h2 className="text-76 text-[#0A1B4B] leading-[1.2] w-[60%] text-center mx-auto">
          Trusted by Enterprises
          <br />
          Operating AI at Scale
        </h2>
      </HeadingAnim>

      {/* Client Logos Marquee */}
      <div ref={marqueeRef} className="">
        <div
          ref={trackRef}
          className="flex justify-start gap-[1.88vw] w-fit"
        >
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="shrink-0 w-[16.67vw] clients-logo h-[13.54vw] border border-[#1727ff] rounded-[0.52vw] flex items-center justify-center shadow-md drop-shadow-sm"
            >
              <div className="relative">
                <Image
                  src={client.logo}
                  alt={client.name}
                  height={200}
                  width={200}
                  className="object-contain z-10"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const clients = [
  { name: "Bonprix", logo: "/assets/clients/bon-prix-color.png" },
  { name: "Canara HSBC", logo: "/assets/clients/canara-hsbc-color.png" },
  { name: "Ciek", logo: "/assets/clients/ciek-color.png" },
  { name: "Craft Silicon", logo: "/assets/clients/craft-silicon-color.png" },
  { name: "Earc", logo: "/assets/clients/earc-color.png" },
  { name: "Tokio", logo: "/assets/clients/edelweiss-tokio-life.png" },
  { name: "Edgeverve", logo: "/assets/clients/edge-verve-color.png" },
  { name: "IIFL", logo: "/assets/clients/iifl-capital-color.png" },
  { name: "Kelmac", logo: "/assets/clients/kelmac-group-color.png" },
  { name: "Manipal", logo: "/assets/clients/manipal-cigna-color.png" },
  { name: "oxsde", logo: "/assets/clients/oxsde-color.png" },
  { name: "Sodexo", logo: "/assets/clients/sodexo-color.png" },
];
