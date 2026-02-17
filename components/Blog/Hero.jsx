import Image from "next/image";

export default function Hero({ post }) {

  return (
    <>
      <section
        id="blogDetail"
        className="h-screen max-md:h-fit flex items-center justify-center w-full relative bg-[#FEFEFE] max-md:items-start max-md:pt-[40vh]! overflow-hidden"
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

        <h1 className="text-76 relative z-10 text-white text-center hero-head w-[85%] max-md:text-background max-md:text-left max-md:w-full">
          {post?.title}
        </h1>
      </section>
    </>
  );
}
