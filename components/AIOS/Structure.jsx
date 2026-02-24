"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Diagram from "@/components/Homepage/Diagram";
import Copy from "@/components/Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";

gsap.registerPlugin(ScrollTrigger);

export default function Fragmented() {
  return (
    <section
      className="dark py-[10%] px-[5vw] bg-radial-night text-white space-y-[9vw] relative max-md:py-[15%] max-sm:px-[7vw] max-sm:pb-[30%] max-sm:space-y-[18vw]"
      id="fragmented"
    >
      <HeadingAnim>
        <h2 className="text-76 w-[50%] mx-auto max-md:w-full text-center">
            DSW Enterprise AI OS Kernel First Architecture
        </h2>
      </HeadingAnim>
      <Diagram />
    </section>
  );
}
