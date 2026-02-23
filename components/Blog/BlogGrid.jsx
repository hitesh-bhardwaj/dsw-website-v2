"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { NextButton, PreviousButton } from "../Buttons/SliderButtons";

const BlogGrid = ({ posts = [] }) => {

  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardsPerPage = isMobile ? 12 : 12;
  const totalPages = Math.ceil(posts.length / cardsPerPage);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const startIndex = (page - 1) * cardsPerPage;
  const currentCards = posts.slice(startIndex, startIndex + cardsPerPage);

  return (
    <section className="px-[5vw] max-sm:px-[7vw] relative pt-0! mx-auto space-y-[7vw] h-fit py-[5%]">
      {/* Grid */}
      <div className="grid grid-cols-3 gap-[3vw] max-sm:gap-[9vw] max-md:grid-cols-1">
        {currentCards.map((card, idx) => (
          <BlogCard key={card.id || idx} {...card} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-[2vw] max-sm:mt-[18vw] max-md:w-full max-md:justify-between">
        {/* Left arrow */}
        <PreviousButton onClick={handlePrev} isDisabled={page === 1} />

        <div className="flex max-sm:w-fit   max-sm:justify-center font-head max-md:space-x-[10vw] space-x-[2vw] text-30 text-[#909090]">
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
    </section>
  );
};

export default BlogGrid;
