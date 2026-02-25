"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/lib/datetime";
import Link from "next/link";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";
import LinkButton from "../Buttons/LinkButton";

const Listing = ({ news = [] }) => {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const startIndex = (page - 1) * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="px-[5vw] max-sm:py-[10%] py-[7%] relative z-10" id="news-listing">
      <div className="w-full space-y-[4.5vw] max-sm:space-y-[10vw] max-md:space-y-[5vw] fadeupDelay">
        {currentNews.map((newsItem, id) => (
          <div
            key={newsItem.id || id}
            className="w-full space-y-[4vw] fadeup max-md:space-y-[4vw] max-sm:space-y-[5vw]"
          >
            <div className="w-full h-fit flex gap-[2.5vw] max-md:flex-col max-md:gap-[5vw]">
              <div className="w-[30vw] h-[20vw] rounded-[2vw] overflow-hidden max-sm:w-full max-sm:h-[30vh] max-md:h-[35vw] max-md:w-[60vw] max-md:rounded-[2.5vw] max-sm:rounded-[5vw]">
                <Image
                  src={newsItem.featuredImage?.sourceUrl || "/placeholder.jpg"}
                  alt={newsItem.title || "News image"}
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              </div>
              <div className="w-[60%] text-foreground flex flex-col gap-[1.5vw] mt-[1vw] max-md:w-full max-sm:gap-[6vw]">
                <p className="text-24 font-light max-md:order-1">
                  {formatDate(newsItem.newsDate?.newsDate)}
                </p>
                <h3 className="text-32 max-md:order-2 max-sm:w-[90%]">
                  {newsItem.title}
                </h3>
                <div
                  className="text-24 font-light max-md:order-3"
                  dangerouslySetInnerHTML={{ __html: newsItem.excerpt }}
                />
                <LinkButton href={`/news/${newsItem.slug}`} text="Read More" />
              </div>
            </div>
            <span className="w-full h-px block bg-gray-1 lineDraw" />
          </div>
        ))}
      </div>

      {/* Pagination - only show if more than one page */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-[2vw] mt-[5vw] max-sm:mt-[12vw] max-sm:w-full max-md:w-[60%] max-md:mx-auto max-md:justify-between">
          {/* Left arrow */}
          <PreviousButton onClick={handlePrev} isDisabled={page === 1} />

          <div className="flex max-sm:w-fit max-sm:justify-center font-head max-sm:space-x-[10vw] max-md:space-x-[4vw] space-x-[2vw] text-30 text-[#909090]">
            {(() => {
              let pagesToShow = [];
              if (totalPages <= 3) {
                pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
              } else if (page <= 2) {
                pagesToShow = [1, 2, 3];
              } else if (page >= totalPages - 1) {
                pagesToShow = [totalPages - 2, totalPages - 1, totalPages];
              } else {
                pagesToShow = [page - 1, page, page + 1];
              }
              return pagesToShow.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`${
                    page === p ? "text-primary-blue" : "text-[#909090]"
                  } transition cursor-pointer`}
                >
                  {p}
                </button>
              ));
            })()}
          </div>

          <NextButton onClick={handleNext} isDisabled={page === totalPages} />
        </div>
      )}
    </section>
  );
};

export default Listing;
