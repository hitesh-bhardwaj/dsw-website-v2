"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
//import "swiper/css/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { formatDate } from "@/lib/datetime";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";

gsap.registerPlugin(ScrollTrigger);

const BlogCard = ({ title, date, img, slug }) => {
  return (
    <>
      <Link href={`/news/${slug}`}>
        <div className="rounded-3xl group border border-primary-blue pb-4 space-y-8 overflow-hidden group cursor-pointer max-sm:pb-0 h-[33vw] max-sm:h-[110vw] max-md:h-[70vw] max-md:rounded-[3vw] max-sm:rounded-[6vw] max-md:space-y-4">
          <div className="w-full h-[65%] overflow-hidden rounded-[2.5vw] max-sm:h-[60%]">
            <div className="absolute top-[1vw] right-[1vw] size-[3vw] max-sm:size-[10vw] max-md:top-[3vw] max-md:size-[7vw] max-md:right-[3vw] bg-white/10 rounded-full z-10">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="30" cy="30" r="29" stroke="#fff" strokeWidth="1" fill="none" />
                <path
                  d="M22 38L38 22M38 22H26M38 22V34"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Image
              src={img}
              width={531}
              height={510}
              alt={title}
              className="object-cover h-full w-full group-hover:scale-[1.1] duration-700 ease-in-out transition-all max-sm:w-full max-sm:h-full"
            />
          </div>
          <div className="space-y-5 px-5">
            <h5 className="text-foreground text-24 leading-normal max-md:w-full max-sm:w-full max-md:text-[3vw] max-sm:text-[4.5vw]">
              {title}
            </h5>
            <p className="text-20 mt-auto text-gray-1 max-md:text-[2vw] max-sm:text-[3.5vw]">
              {formatDate(date)}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
const RelatedArticleNews = ({news, relatedNews: relatedNewsProp}) => {
  const swiperRef = useRef(null);
  const relatedArticlesRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const relatedNews = relatedNewsProp || [];

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  // Don't render if there are no related news
  if (!relatedNews || relatedNews.length === 0) {
    return null;
  }
  return (
    <section
      id="relatedArticles"
      ref={relatedArticlesRef}
      className={`h-full w-screen  overflow-x-hidden relative px-[5vw] flex-col flex py-[5%]`}
    >
      <div className="h-full w-full  gap-y-[4vw] flex flex-col items-start justify-between  max-sm:flex-col ">
        <div className="w-full text-center">
          <h2 className="text-76 max-sm:w-full leading-[1.2] headingAnim font-head max-sm:text-center">
            Related Articles
          </h2>

          <div className="flex gap-6 w-fit ml-auto max-md:absolute max-md:bottom-0 max-md:left-1/2 max-md:-translate-x-1/2">
            <PreviousButton onClick={handlePrev} isDisabled={activeIndex === 0} />
            <NextButton onClick={handleNext} isDisabled={activeIndex==relatedNews.length-1} />
          </div>
        </div>
        <div className="w-full max-sm:pb-[15vw] max-md:pb-[10vw] max-sm:pt-[7vw] max-md:pt-[4vw] text-white fadeup ">
          <Swiper
            slidesPerView={3}
            className="mySwiper swiper-container max-md:overflow-visible!"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={50}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            speed={1000}
            breakpoints={{
               320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1.4,
                spaceBetween: 30,
              },
              1025: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
          >
            {relatedNews.map((newsItem) => (
              <SwiperSlide key={newsItem.node.id} className="w-[26vw] h-full pr-1 max-sm:w-full">
                <BlogCard
                  title={newsItem.node.title}
                  img={newsItem.node.featuredImage?.node?.sourceUrl}
                  date={newsItem.node.newsDate?.newsDate || newsItem.node.date}
                  slug={newsItem.node.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticleNews;
