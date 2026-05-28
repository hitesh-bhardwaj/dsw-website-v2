"use client";

import React, { useEffect, useRef } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomepageVideo = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log("Autoplay blocked:", err);
      }
    };

    const pauseVideo = () => {
      video.pause();
    };

    const initScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",

        onEnter: () => {
          playVideo();
        },

        onEnterBack: () => {
          playVideo();
        },

        onLeave: () => {
          pauseVideo();
        },

        onLeaveBack: () => {
          pauseVideo();
        },
      });
    };

    // Better than loadedmetadata for remote CDN videos
    video.addEventListener("canplay", initScrollTrigger);

    return () => {
      video.removeEventListener("canplay", initScrollTrigger);

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="film"
      className="w-full py-[10%] flex flex-col gap-[7vw] justify-center items-center relative max-sm:py-[15%] px-[7vw]"
    >
      <HeadingAnim>
        <h2 className="text-76 font-heading text-[#0A1B4B] text-center leading-[1.2]">
          Inside DSW UnifyAI OS -
          <br />
          Where AI Runs as a System
        </h2>
      </HeadingAnim>

      <div className="w-[85%] rounded-[1.2vw] overflow-hidden border border-black/10 max-md:w-[95%] max-sm:rounded-[4vw]">
        <video
          ref={videoRef}
          className="w-full h-auto object-cover"
          controls
          muted
          playsInline
          autoPlay={true}
          preload="auto"
          crossOrigin="anonymous"
          poster="/assets/homepage/video-poster.png"
        >
          <source
            src="https://wordpress.datasciencewizards.ai/wp-content/uploads/2026/05/DSW-Enterprise-Ai-OS-vo-clip-01-1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
};

export default HomepageVideo;