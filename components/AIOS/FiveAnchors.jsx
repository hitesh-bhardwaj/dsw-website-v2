"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

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

      const rot = gsap.to(ring, {
        rotation: "+=360",
        duration: 30,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      let impulse = 0,
        targetScale = 1,
        currentScale = 1;
      let lastY = window.scrollY;

      const onScroll = () => {
        const y = window.scrollY;
        impulse = Math.min(2.5, impulse + Math.abs(y - lastY) * 0.002);
        lastY = y;
      };

      const tick = () => {
        impulse *= 0.9;
        targetScale = clamp(1 + impulse, 1, 3.5);
        currentScale += (targetScale - currentScale) * 0.12;
        rot.timeScale(currentScale);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      gsap.ticker.add(tick);

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
              // toggleActions: "play none none none",
              // once: true,
              // markers: true,
              // scrub:true
            },
          }
        );
      } else {
        // keep desktop animation same
        gsap.set(ring, { opacity: 0 });
        gsap.set("[data-anchor-id]", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: "top 90%",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        tl.fromTo(
          ring,
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 0.5 },
          0
        );

        tl.fromTo(
          `[data-anchor-id="1"]`,
          { opacity: 0,scale:0.95 },
          { opacity: 1, ease: "power2.out", duration: 0.5 ,scale:1},
          0.05
        );

        anchors.slice(1).forEach((anchor, i) => {
          tl.fromTo(
            `[data-anchor-id="${anchor.id}"]`,
            { opacity: 0,scale:0.95 },
            { opacity: 1, ease: "power2.out", duration: 0.5,scale:1 },
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



// "use client";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { useRef } from "react";
// import HeadingAnim from "../Animations/HeadingAnim";

// gsap.registerPlugin(ScrollTrigger);

// /**
//  * The PNG circle-ring.png has a black bg and the orange dashed ring sits
//  * at ~6% inset from each edge of the image. So the ring's center is at
//  * 50%,50% of the container and its radius is ~44% of the container width.
//  *
//  * Icon placement uses the same 44% radius so icons sit exactly ON the ring.
//  * We express everything in % of the container (0–100 space).
//  */
// const CX = 50;   // center x in %
// const CY = 50;   // center y in %
// const R  = 44;   // radius in % — matches ring inset in PNG

// const anchors = [
//   {
//     id: 1,
//     label: "Continuous adaptation",
//     alt: "Continuous Adaption",
//     src: "/assets/icons/aios/anchors/continous-adaption-new.svg",
//     angleDeg: 0,    // top center
//   },
//   {
//     id: 2,
//     label: "Data Sovereignty",
//     alt: "Data Sovereignty",
//     src: "/assets/icons/aios/anchors/data-sovereignty-new.svg",
//     angleDeg: 72,   // top right
//   },
//   {
//     id: 3,
//     label: "Human Centric AI",
//     alt: "Human Centric",
//     src: "/assets/icons/aios/anchors/human-centric.svg",
//     angleDeg: 144,  // bottom right
//   },
//   {
//     id: 4,
//     label: "Strategic Flexibility",
//     alt: "Strategic Flexibility",
//     src: "/assets/icons/aios/anchors/startegic-flexibility.svg",
//     angleDeg: 216,  // bottom left
//   },
//   {
//     id: 5,
//     label: "Adoption Reality",
//     alt: "Adaption Reality",
//     src: "/assets/icons/aios/anchors/adoption-reality-new.svg",
//     angleDeg: 288,  // top left
//   },
// ];

// /** angleDeg: 0 = top, clockwise → left/top % on the container */
// function angleToPct(angleDeg) {
//   const rad = ((angleDeg - 90) * Math.PI) / 180;
//   return {
//     x: CX + R * Math.cos(rad),
//     y: CY + R * Math.sin(rad),
//   };
// }

// const FiveAnchors = () => {
//   const outerRef  = useRef(null);
//   const stickyRef = useRef(null);
//   const ringRef   = useRef(null); // the rotating image element

//   useGSAP(
//     () => {
//       const ring = ringRef.current;
//       if (!ring) return;

//       /* ── Continuous slow rotation (independent of scroll) ──────────
//          Starts immediately so it's already spinning when it fades in.   */
//       gsap.to(ring, {
//         rotation: 360,
//         duration: 30,
//         repeat: -1,
//         ease: "none",
//         transformOrigin: "50% 50%",
//         force3D: true,
//       });

//       /* ── Scroll-scrubbed fade timeline ─────────────────────────────
//          300vh / 6 items = ~0.14 each slot
//          Ring fades in at 0–0.12 (before section fully pins — "a little before")
//          Anchors follow at 0.12 intervals                                */
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: stickyRef.current,
//           start: "top 80%",   // starts triggering BEFORE the section pins
//           end: "bottom bottom",
//           scrub: 1,
//         },
//       });

//       // Ring fades in first (starts a little before sticky pins)
//       tl.fromTo(
//         ring,
//         { opacity: 0 },
//         { opacity: 1, ease: "power2.inOut", duration: 0.12 },
//         0
//       );

//       // Anchors fade in one by one, clockwise, after ring
//       anchors.forEach((anchor, i) => {
//         tl.fromTo(
//           `[data-anchor-id="${anchor.id}"]`,
//           { opacity: 0 },
//           { opacity: 1, ease: "power1.inOut", duration: 0.1 },
//           0.12 + i * 0.14
//         );
//       });
//     },
//     { scope: outerRef }
//   );

//   return (
//     <div ref={outerRef} className="relative bg-background">

//       {/* Heading — normal scroll flow */}
//       <div className="text-center px-[5vw] py-[7%] max-sm:py-[15%]">
//         <HeadingAnim>
//           <h2 className="text-76 text-[#0A1B4B] leading-[1.2]">
//             The Five Timeless Anchors of the Enterprise AI Operating System
//           </h2>
//         </HeadingAnim>
//       </div>

//       {/* 300vh sticky spacer */}
//       <div ref={stickyRef} style={{ height: "300vh" }}>
//         <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

//           {/* Square infographic container */}
//           <div
//             className="relative"
//             style={{ width: "min(45vw, 580px)", aspectRatio: "1 / 1" }}
//           >

//             {/* Rotating ring image — icons are siblings, NOT children,
//                 so they stay fixed while only the ring spins              */}
//             <Image
//               ref={ringRef}
//               src="/assets/icons/aios/anchors/circle-ring.png"
//               alt="Circle ring"
//               fill
//               className="object-contain"
//               style={{ opacity: 0 }}
//               priority
//             />

//             {/* Anchor icons — placed on circumference, fade in on scroll */}
//             {anchors.map((anchor) => {
//               const { x, y } = angleToPct(anchor.angleDeg);
//               return (
//                 <div
//                   key={anchor.id}
//                   data-anchor-id={anchor.id}
//                   className="absolute flex flex-col items-center z-10"
//                   style={{
//                     left: `${x}%`,
//                     top:  `${y}%`,
//                     transform: "translate(-50%, -50%)",
//                     opacity: 0,
//                     gap: "clamp(4px, 0.5vw, 8px)",
//                   }}
//                 >
//                   {/* Icon bubble — blue border */}
//                   <div
//                     className="relative rounded-full bg-background border border-primary-blue flex items-center justify-center flex-shrink-0"
//                     style={{
//                       width:  "clamp(44px, 6.5vw, 80px)",
//                       height: "clamp(44px, 6.5vw, 80px)",
//                     }}
//                   >
//                     <div className="absolute inset-[18%]">
//                       <Image
//                         src={anchor.src}
//                         alt={anchor.alt}
//                         fill
//                         className="object-contain"
//                       />
//                     </div>
//                   </div>

//                   <p
//                     className="text-foreground capitalize text-center font-medium leading-tight"
//                     style={{
//                       fontSize: "clamp(9px, 1vw, 13px)",
//                       maxWidth: "clamp(60px, 8vw, 100px)",
//                     }}
//                   >
//                     {anchor.label}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default FiveAnchors;