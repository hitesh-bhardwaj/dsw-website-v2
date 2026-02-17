"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BlogCard from "./BlogCard";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";

gsap.registerPlugin(ScrollTrigger);

const RelatedArticles = ({post, relatedPosts: relatedPostsProp}) => {
  const swiperRef = useRef(null);
  const relatedArticlesRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const relatedBlogs = relatedPostsProp || [];

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

  if (!relatedBlogs || relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section
      id="relatedArticles"
      ref={relatedArticlesRef}
      className={`h-full w-screen relative px-[5vw] flex-col flex py-[5%]`}
    >
      <div className="h-full w-full  gap-y-[4vw] flex flex-col items-start justify-between  max-sm:flex-col ">
        <div className="w-full">
          <h5 className="text-76 max-sm:w-full leading-[1.2] text-center headingAnim font-head text-foreground">
            Related Articles
          </h5>

          <div className="flex gap-6 w-fit ml-auto">
            <PreviousButton onClick={handlePrev} isDisabled={activeIndex === 0} />
            <NextButton onClick={handleNext} isDisabled={relatedBlogs.length <= 3 || activeIndex + 3 >= relatedBlogs.length} />
          </div>
        </div>
        <div className="w-full max-sm:py-[15vw] text-white fadeup ">
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
            {relatedBlogs.map((blog) => (
              <SwiperSlide key={blog.node.id} className="w-[26vw] h-full pr-1 max-sm:w-full">
                <BlogCard
                  title={blog.node.title}
                  featuredImage={blog.node.featuredImage?.node}
                  date={blog.node.date}
                  slug={blog.node.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
