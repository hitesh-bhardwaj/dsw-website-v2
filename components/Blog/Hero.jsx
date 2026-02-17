import Image from "next/image";
import BreadCrumbs from "../BreadCrumbs";

export default function Hero({ post }) {

  return (
    <>
      <section
        id="blogDetail"
        className="h-screen max-md:h-fit flex items-center justify-center w-full relative bg-[#FEFEFE] max-md:items-start max-sm:pt-[40vh]! overflow-hidden"
      >
        <div className="absolute inset-0 h-full w-full z-0 hero-img  max-md:h-[35vh]">
          <Image
            width={1920}
            height={1080}
            src={post?.featuredImage?.sourceUrl}
            alt="Blog hero background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        <h1 className="text-76 relative z-10 max-sm:px-[7vw] text-white max-sm:text-black! text-center hero-head w-[85%] max-md:text-background max-md:text-left max-md:w-full max-sm:w-full max-sm:mx-auto max-sm:text-center max-sm:pb-[10vw]">
          {post?.title}
        </h1>

        {/* Desktop: default positioning | Mobile: absolute, on top of image */}
        <div className="max-sm:absolute w-full max-sm:top-25 max-sm:left-4 max-sm:z-20 max-md:absolute max-md:top-4 max-md:left-4 max-md:z-20 md:contents">
          <BreadCrumbs />
        </div>
      </section>
    </>
  );
}