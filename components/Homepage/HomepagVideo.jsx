"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const videoData = {
  title: "Here is why",
  description:
    "Artificial Intelligence is at a turning point.....",
  youtubeUrl: "https://www.youtube.com/watch?v=xeS2h37VO28",
  thumbnail: "/assets/product-videos/here-is-why.png",
};

const toEmbedUrl = (url) => {
  if (!url) return "";

  if (url.includes("youtube.com/embed/")) return url;

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
  }

  const longMatch = url.match(/[?&]v=([^?&]+)/);
  if (longMatch?.[1]) {
    return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1&rel=0`;
  }

  return url;
};

const HomepagVideo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section
      className="w-full h-full py-[10%] flex justify-center items-center relative max-sm:py-[15%]"
      id="film"
    >
      <div
        className="w-[75%] h-[37vw] border border-black/10 rounded-[1.2vw] overflow-hidden relative cursor-pointer video-modal-thumbnail outline-none fadeup group max-sm:h-[60vw] max-md:h-[50vw] max-md:w-[85%] max-sm:rounded-[4.5vw] max-md:border max-md:border-white/20 max-md:rounded-[2vw]"
        role="button"
        tabIndex={0}
        aria-label="Play video"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <Image
          src={videoData.thumbnail}
          alt={`${videoData.title} thumbnail`}
          className="w-full h-full object-cover group-hover:scale-[1.05] duration-700 ease-in-out"
          width={1200}
          height={700}
        />

          <div className="w-[5vw] h-auto max-sm:w-[8vw] max-md:w-[6vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4]">
            <Image
              alt="play-icon"
              className="group-hover:scale-[0.97] duration-700 ease-in-out w-full h-full"
              width={40}
              height={40}
              src="/assets/icons/play-icon.svg"
            />
          </div>
        <div className="w-full h-full absolute bg-black/10 z-[2] inset-0 flex justify-between items-end p-[2vw] max-sm:p-[5vw]"/>
      </div>

      <div
        className={[
          "fixed inset-0 z-[10000] flex items-center justify-center px-[2vw] max-sm:px-[4vw]",
          "transition-opacity duration-500 ease-out",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-[4px]"
          onClick={handleClose}
        />

        <div
          className={[
            "relative z-[101] w-[70vw] h-[84vh] flex items-center justify-center max-sm:h-fit max-sm:w-[85vw] max-md:w-[85vw] max-md:h-fit",
            "transition-all duration-500 ease-out",
            isOpen
              ? "opacity-100 translate-y-0 scale-100 delay-100"
              : "opacity-0 translate-y-4 scale-[0.96]",
          ].join(" ")}
        >
          <div className="w-full h-full bg-[#050E2B] rounded-[1.8vw] overflow-hidden shadow-xl p-[2vw] space-y-[1.5vw] max-sm:rounded-[4.5vw] max-sm:p-[5vw] max-sm:space-y-[7vw] max-sm:h-fit max-md:space-y-[5vw] max-md:p-[3vw]">
            

            {isOpen && (
              <iframe
                className="w-full h-[85%] rounded-[1.2vw] max-sm:rounded-[4.2vw] max-sm:h-[30vh] max-md:h-[40vh]"
                src={toEmbedUrl(videoData.youtubeUrl)}
                title={videoData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}

            <p className="text-[#cacaca]">{videoData.description}</p>
          </div>
        </div>
          <div
              onClick={handleClose}
              className={` h-auto absolute right-[5%] top-[5%] group  max-sm:w-[12vw] rounded-full   p-[2vw]  transition-all  ease-out max-sm:p-[6vw]  bg-[#F16B0D] cursor-pointer max-md:p-[4vw] `}
            >
              <div
                style={{
                  transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
                }}
                className="rotate-45 group-hover:rotate-[225deg] duration-700"
              >
                <span
                  className={`w-[1.5vw] rounded-full h-[2px] bg-[#ffffff] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[5vw] max-sm:h-[1.5px] rotate-90 max-md:w-[3vw]`}
                ></span>

                <span
                  className={`w-[1.5vw] rounded-full h-[2px] bg-[#ffffff] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transform-origin-center max-sm:w-[5vw] max-sm:h-[1.5px] max-md:w-[3vw]`}
                ></span>
              </div>
            </div>
      </div>
    </section>
  );
};

export default HomepagVideo;
