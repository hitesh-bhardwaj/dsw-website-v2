"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Copy from "../Animations/Copy";

const toEmbedUrl = (url) => {
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    else if (u.searchParams.get("v")) id = u.searchParams.get("v");
    else if (u.pathname.includes("/embed/"))
      id = u.pathname.split("/embed/")[1];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";
  } catch {
    return "";
  }
};

const VideoListing = () => {
  // Which video is targeted
  const [openIndex, setOpenIndex] = useState(null);
  const lenis = useLenis();

  // Modal mount + animation states
  const [isMounted, setIsMounted] = useState(false); // controls render/mount
  const [isOpen, setIsOpen] = useState(false); // controls fade in/out

  // Open modal with fade-in
  const handleOpen = (i) => {
    setOpenIndex(i);
    lenis.stop();
    setIsMounted(true);
    // next microtask so Tailwind can see class change
    requestAnimationFrame(() => setIsOpen(true));
  };

  // Begin fade-out, then unmount after duration
  const handleClose = () => {
    setIsOpen(false);
    lenis.start();
    setTimeout(() => {
      setIsMounted(false);
      setOpenIndex(null);
    });
  };

  // Close on ESC + lock scroll while mounted
  useEffect(() => {
    if (!isMounted) return;
    const onKey = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMounted]);

  return (
    <>
      <section
        className={` px-[5vw] py-[7%] relative  w-screen h-full`}
        id="video-listing"
      >
        <div className="w-full h-full flex flex-wrap fadeup justify-between gap-y-[7vw] max-sm:gap-y-[20vw] max-md:gap-y-[15vw]">
          {videos.map((video, index) => (
            <div key={index} className="w-[47.5%] flex flex-col gap-[1vw] max-sm:w-full max-sm:gap-[7vw] max-md:w-full max-md:gap-[4vw]">
              <div
                className="w-full h-[25vw] rounded-[1.8vw] overflow-hidden relative cursor-pointer video-modal-thumbnail outline-none  fadeup  group max-sm:h-[27vh] max-md:h-[40vh] max-sm:rounded-[4.5vw] max-md:border max-md:border-white/20 max-md:rounded-[4vw]"
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${video.title}`}
                onClick={() => handleOpen(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpen(index);
                  }
                }}
              >
                <Image
                  src={video.image}
                  alt={video.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.1] duration-700 ease-in-out "
                  width={500}
                  height={400}
                />
                <div className="w-full h-full absolute bg-gradient-to-t from-black/80 via-transparent to-transparent z-[2] inset-0 flex justify-between items-end p-[2vw] max-sm:p-[5vw]">
                  <div className="w-[3.5vw] h-auto max-sm:w-[12vw] max-md:w-[10vw]">
                    <Image
                      alt="play-icon"
                      className="group-hover:scale-[0.9] duration-700 ease-in-out w-full h-full"
                      width={40}
                      height={40}
                      src={"/assets/icons/play-icon.svg"}
                    />
                  </div>
                  <p className="text-white-200">{video.duration}</p>
                </div>
              </div>
              <Copy>
                <h3 className="text-32 text-foreground mt-[1vw] max-sm:pl-[1vw] text-white-200 max-sm:text-[5.5vw]">{video.title}</h3>
              </Copy>
              <Copy>
                <p className="max-sm:pl-[1vw] text-24 text-foreground">{video.description}</p>
              </Copy>
            </div>
          ))}
        </div>
      </section>

      {/* Modal (mounted while animating out) */}
      {isMounted && openIndex !== null && (
        <div
          className={"fixed inset-0 z-[999] flex items-center justify-center w-screen overflow-hidden"}
          aria-modal="true"
          role="dialog"
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 backdrop-blur-md  bg-black/40 transition-opacity duration-700 ease-out ${isOpen ? "opacity-100" : "opacity-0"} `}
            onClick={handleClose}
          />

          {/* Close button */}
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

          {/* Dialog */}
          <div
            className={[
              "relative z-[101] w-[70vw] h-[90vh] flex items-center justify-center max-sm:h-fit max-sm:w-[85vw] max-md:w-[85vw] max-md:h-fit",
              "transition-all duration-500 ease-out ",
              isOpen
                ? "opacity-100 translate-y-0 delay-200"
                : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            <div className="w-full h-full bg-[#050E2B] rounded-[1.8vw] overflow-hidden shadow-xl p-[2vw] space-y-[1.5vw] max-sm:rounded-[4.5vw] max-sm:p-[5vw] max-sm:space-y-[7vw] max-sm:h-fit max-md:space-y-[5vw] max-md:p-[3vw]">
             
              <iframe
                className="w-full h-[80%] rounded-[1.2vw] max-sm:rounded-[4.2vw] max-sm:h-[30vh] max-md:h-[40vh]"
                src={toEmbedUrl(videos[openIndex].youtubeUrl)}
                title={videos[openIndex].title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <p className="text-[#cacaca]">{videos[openIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoListing;
const videos = [
  {
    image: "/assets/product-videos/inside-unify.png",
    alt: "inside-unify",
    duration: "3 min",
    title: "Inside UnifyAI: The Enterprise AI Platform Explained",
    description:
      "A product walkthrough that showcases how UnifyAI simplifies the entire AI lifecycle—from model development and training to deployment and governance—tailored for industries like insurance, banking, and healthcare.",
    youtubeUrl:
      "https://www.youtube.com/watch?v=aRNLs-wStkE&list=PLaL7dSxvENO3RMkKVFhesQMGXkD_t9CKo",
  },
  {
    image: "/assets/product-videos/genai-production.png",
    alt: "genai-production",
    duration: "2 min",
    title: "How Insurers Are Using GenAI in Production",
    description:
      "Real-world examples of how leading insurance companies are using DSW’s GenAI capabilities for claims automation, fraud detection, and policy personalization—deployed in as little as 2–4 hours.",
    youtubeUrl:
      "https://www.youtube.com/watch?v=7yMR3fkAI20&list=PLaL7dSxvENO3RMkKVFhesQMGXkD_t9CKo&index=2",
  },
  {
    image: "/assets/product-videos/ai-complexity.png",
    alt: "ai-complexity",
    duration: "2.30 min",
    title: "AI Without Complexity – A Message from Our CTO",
    description:
      "Hear directly from DSW’s CTO as they break down the vision behind UnifyAI and explain how the platform brings speed, security, and simplicity to enterprise AI adoption.",
    youtubeUrl:
      "https://www.youtube.com/watch?v=5mjRjIQELns&list=PLaL7dSxvENO3RMkKVFhesQMGXkD_t9CKo&index=4",
  },
  {
    image: "/assets/product-videos/securing-ai.png",
    alt: "securing-ai",
    duration: "2 min",
    title: "Securing AI: How We Achieved SOC 2 & ISO 27001",
    description:
      "An animated explainer of the security and compliance features built into UnifyAI—including encryption, audit trails, model explainability, and adherence to SOC 2, ISO 27001, GDPR, and HIPAA standards.",
    youtubeUrl:
      "https://www.youtube.com/watch?v=J30FaWTExyk&list=PLaL7dSxvENO3RMkKVFhesQMGXkD_t9CKo&index=5",
  },
  {
    image: "/assets/product-videos/unify-video-5.png",
    alt: "unify-video-5",
    duration: "3 min",
    title: "AI Without Complexity – A Message from Our CTO",
    description:
      "Hear directly from DSW’s CTO as they break down the vision behind UnifyAI and explain how the platform brings speed, security, and simplicity to enterprise AI adoption.",
    youtubeUrl:
      "https://www.youtube.com/watch?v=J30FaWTExyk&list=PLaL7dSxvENO3RMkKVFhesQMGXkD_t9CKo&index=5",
  },
  {
    image: "/assets/product-videos/unify-video-6.png",
    alt: "unify-video-6",
    duration: "2.30 min",
    title: "AI Without Complexity – A Message from Our CTO",
    description:
      "Hear directly from DSW’s CTO as they break down the vision behind UnifyAI and explain how the platform brings speed, security, and simplicity to enterprise AI adoption.",
    youtubeUrl:
      "https://www.youtube.com/watch?v=J30FaWTExyk&list=PLaL7dSxvENO3RMkKVFhesQMGXkD_t9CKo&index=5",
  },
];
