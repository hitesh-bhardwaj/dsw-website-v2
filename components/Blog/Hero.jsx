"use client"
import Image from "next/image";
import BreadCrumbs from "../BreadCrumbs";
import HeadingAnim from "../Animations/HeadingAnim";
import { fadeUp } from "../Animations/gsapAnimations";

export default function Hero({ post }) {
  fadeUp()

  return (
    <>
      <section
        id="blogDetail"
        className="h-screen max-md:h-[85vh] max-sm:h-fit flex items-center justify-center w-full relative bg-[#FEFEFE] max-md:items-center max-sm:pt-[95vw]! overflow-hidden"
      >
        <div className="absolute inset-0 h-full w-full z-0 hero-img  max-md:h-full max-sm:h-[40vh]">
          <Image
            width={1920}
            height={1080}
            src={post?.featuredImage?.sourceUrl}
            alt="Blog hero background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
       <HeadingAnim>
        <h1 className="text-76 relative z-10 max-sm:px-[7vw] text-white max-sm:text-foreground  text-center hero-head w-[85%] max-md:text-background max-md:w-[70%] max-sm:w-full max-sm:mx-auto max-md:text-center max-sm:pb-[10vw]">
          {post?.title}
        </h1>
       </HeadingAnim>

        {/* Desktop: default positioning | Mobile: absolute, on top of image */}
        <div className="max-sm:absolute w-full max-sm:top-25 max-sm:left-4 max-sm:z-20 max-md:absolute max-md:top-4 max-md:left-4 max-md:z-20 md:contents fadeup">
          <BreadCrumbs />
        </div>
      </section>
    </>
  );
}