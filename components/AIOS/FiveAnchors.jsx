"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/**
 * ✅ Smooth scroll-reactive rotation
 *
 * What makes this smooth:
 * 1) We don't change tween.duration() every tick (that causes stutter/jumps).
 * 2) We keep ONE infinite rotation tween and only adjust its timeScale().
 * 3) We smooth the speed using a low-pass filter (lerp) over time.
 *
 * Props:
 * - baseDuration: seconds per rotation at idle (default 30)
 * - maxTimeScale: max speed multiplier on scroll (default 3.5)
 * - sensitivity: how much scroll delta adds speed (default 0.002)
 * - decay: how fast the impulse decays (default 0.9)
 * - smoothing: lerp factor toward target speed (default 0.12)
 * - maxImpulse: cap impulse amount (default 2.5)
 */
const FiveAnchors = ({
  baseDuration = 30,
  maxTimeScale = 3.5,
  sensitivity = 0.002,
  decay = 0.9,
  smoothing = 0.12,
  maxImpulse = 2.5,
} = {}) => {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(
    () => {
      const ring = ringRef.current;
      if (!ring) return;

      // ✅ One continuous rotation tween
      const rot = gsap.to(ring, {
        rotation: "+=360",
        duration: baseDuration,
        repeat: -1,
        ease: "none",
        force3D: true,
      });

      // impulse -> targetSpeed -> smoothedSpeed
      let impulse = 0; // accumulates with scroll
      let targetScale = 1; // desired timeScale
      let currentScale = 1; // smoothed timeScale

      let lastY = window.scrollY;

      const onScroll = () => {
        const y = window.scrollY;
        const dy = Math.abs(y - lastY);
        lastY = y;

        // add impulse based on dy
        impulse = Math.min(maxImpulse, impulse + dy * sensitivity);
      };

      const tick = () => {
        // decay impulse when scroll stops
        impulse *= decay;

        // map impulse to desired timeScale
        // 1..maxTimeScale
        targetScale = clamp(1 + impulse, 1, maxTimeScale);

        // smooth toward targetScale (low-pass filter)
        currentScale += (targetScale - currentScale) * smoothing;

        rot.timeScale(currentScale);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      gsap.ticker.add(tick);

     
    },
    { scope: sectionRef }
  );
  useGSAP(()=>{
    gsap.from(".fiveAnchorsCircle",{
      opacity:0,
      scale:0.98,
      duration:1,
      scrollTrigger:{
        trigger:sectionRef.current,
        start:"top 20%",
      }
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[7%] bg-background max-sm:py-[15%] overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center px-[5vw] mb-[5vw] max-sm:mb-[10vw]">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] leading-[1.2]">
            The Five Timeless Anchors of the Enterprise AI Operating System
          </h2>
        </HeadingAnim>
      </div>

      {/* Infographic Container */}
      <div className="relative w-[45vw] mx-auto aspect-square max-sm:w-[100vw] fiveAnchorsCircle">
        {/* Rotating Circle Ring */}
        <div ref={ringRef} className="absolute inset-[10%] z-0">
          <Image
            src="/assets/icons/aios/anchors/circle-ring.png"
            alt="Circle ring"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Top - Continuous Adaption */}
        <div className="absolute top-[4%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[0.8vw] z-10">
          <div className="w-[7.5vw] h-[7.5vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/continous-adaption-new.svg"
                alt="Continuous Adaption"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize max-sm:w-[70%] max-sm:text-center">
            Continuous adaptation
          </p>
        </div>

        {/* Right - Data Sovereignty */}
        <div className="absolute top-[35%] right-0 flex flex-col items-center gap-[0.8vw] z-10 max-sm:right-[-3%]">
          <div className="w-[7.5vw] h-[7.5vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/data-sovereignty-new.svg"
                alt="Data Sovereignty"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize max-sm:w-[70%] max-sm:text-center">
            Data Sovereignty
          </p>
        </div>

        {/* Bottom Right - Human Centric */}
        <div className="absolute bottom-[5%] right-[15%] flex flex-col items-center gap-[0.8vw] z-10 max-sm:bottom-[-2%]">
          <div className="w-[7.5vw] h-[7.5vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/human-centric.svg"
                alt="Human Centric"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize max-sm:w-[70%] max-sm:text-center">
            Human Centric AI
          </p>
        </div>

        {/* Bottom Left - Strategic Flexibility */}
        <div className="absolute bottom-[5%] left-[15%] flex flex-col items-center gap-[0.8vw] z-10 max-sm:bottom-[-3%]">
          <div className="w-[7.5vw] h-[7.5vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/startegic-flexibility.svg"
                alt="Strategic Flexibility"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize max-sm:w-[70%] max-sm:text-center">
            Strategic Flexibility
          </p>
        </div>

        {/* Left - Adaption Reality */}
        <div className="absolute top-[35%] left-0 flex flex-col items-center gap-[0.8vw] z-10 max-sm:left-[-2%]">
          <div className="w-[7.5vw] h-[7.5vw] relative rounded-full bg-background border border-primary-blue flex items-center justify-center max-sm:w-[15vw] max-sm:h-[15vw]">
            <div className="absolute inset-[20%]">
              <Image
                src="/assets/icons/aios/anchors/adoption-reality-new.svg"
                alt="Adaption Reality"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-24 text-foreground capitalize max-sm:w-[70%] max-sm:text-center">
            Adoption Reality
          </p>
        </div>
      </div>
    </section>
  );
};

export default FiveAnchors;

/**
 * ✅ Smooth presets:
 *
 * Cinematic (recommended):
 * <FiveAnchors
 *   baseDuration={34}
 *   maxTimeScale={2.8}
 *   sensitivity={0.0016}
 *   decay={0.92}
 *   smoothing={0.10}
 *   maxImpulse={1.8}
 * />
 *
 * More reactive:
 * <FiveAnchors
 *   baseDuration={30}
 *   maxTimeScale={4.0}
 *   sensitivity={0.0025}
 *   decay={0.88}
 *   smoothing={0.14}
 *   maxImpulse={2.8}
 * />
 */
