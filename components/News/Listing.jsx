"use client";
import Image from "next/image";
import React from "react";
import { formatDate } from "@/lib/datetime";
import Link from "next/link";

const Listing = ({news}) => {
  return (
    <section className="px-[5vw] max-sm:py-[10%] relative z-10" id="news-listing">
      <div className="w-full space-y-[4.5vw] max-sm:space-y-[10vw] max-md:space-y-[5vw] fadeupDelay">
        {news.map((news,id) => (
          <div
            key={id}
            className="w-full space-y-[4vw] fadeup max-md:space-y-[4vw] max-sm:space-y-[5vw]"
          >
            <div className="w-full h-fit flex gap-[2.5vw] max-md:flex-col max-md:gap-[5vw]">
              <div className="w-[30vw] h-[20vw] rounded-[2vw] overflow-hidden max-md:w-full max-sm:h-[30vh] max-md:h-[55vw] max-md:rounded-[3vw] max-sm:rounded-[5vw]">
                <Image
                  src={news.featuredImage.sourceUrl}
                  alt="listing images"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              </div>
              <div className="w-[60%] text-foreground flex flex-col gap-[1.5vw] mt-[1vw] max-md:w-full max-md:gap-[6vw]">
                <p className="text-24 font-light max-md:order-1">{formatDate(news.newsDate.newsDate)}</p>
                <h3 className="text-32 max-md:order-2  max-sm:w-[90%]">{news.title}</h3>
                <div className="text-24 font-light max-md:order-3" dangerouslySetInnerHTML={{__html:news.excerpt}}/>
                <Link href={`/news/${news.slug}`} className="text-primary-blue pt-[1vw] text-24 group max-md:order-4">
                  <span className="before:absolute before:block relative before:w-0 before:h-px before:bottom-0 before:left-0 before:bg-primary-blue group-hover:before:w-full before:duration-300">
                    Read More
                  </span>
                </Link>
              </div>
            </div>
            <span className="w-full h-px block bg-gray-1 lineDraw" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listing;