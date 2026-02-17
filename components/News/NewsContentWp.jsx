"use client";

import React, { useEffect, useRef, useState } from "react";
import Content from "./Content";
import Copy from "../Animations/Copy";
import { formatDate } from "@/lib/datetime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NewsContentWp = ({ news }) => {
  const [activeSection, setActiveSection] = useState("Introduction");
  const [modifiedHtml, setModifiedHtml] = useState(news?.content || "");
  const [toc, setToc] = useState([]); // [{ id, title }]
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef(null);
  // console.log(news, "NEWS.....")

  const getHeaderOffset = () => 100;

  const slugify = (str) =>
    (str || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&.+?;/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // NEW: simple truncate helper
  const truncate = (str, max = 40) =>
    typeof str === "string" && str.length > max ? `${str.slice(0, 50)}...` : str;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!news?.content || typeof window === "undefined") return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(news.content, "text/html");
    const h2s = Array.from(doc.querySelectorAll("h2"));

    const ids = new Set();
    const items = h2s.map((h2) => {
      const title = (h2.textContent || "").trim();
      let id = h2.getAttribute("id") || slugify(title) || "section";
      let unique = id;
      let n = 2;
      while (ids.has(unique)) unique = `${id}-${n++}`;
      ids.add(unique);
      h2.setAttribute("id", unique);
      h2.setAttribute("style", `scroll-margin-top:${getHeaderOffset()}px;`);
      return { id: unique, title };
    });

    setToc(items);
    setModifiedHtml(doc.body.innerHTML || news.content);

    if (items.length) {
      const intro = items.find((t) =>
        t.title.toLowerCase().includes("introduction")
      );
      setActiveSection(intro ? intro.title : items[0].title);
    }
  }, [news?.content]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!toc.length || !contentRef.current) return;

    const triggers = [];
    toc.forEach(({ id, title }) => {
      const el = contentRef.current.querySelector(`#${CSS.escape(id)}`);
      if (!el) return;
      const trig = ScrollTrigger.create({
        trigger: el,
        start: "-400% top",
        end: "bottom top",
        onEnter: () => setActiveSection(title),
        onEnterBack: () => setActiveSection(title),
      });
      triggers.push(trig);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [toc, modifiedHtml]);

  const handleScrollTo = (id) => {
    if (typeof window === "undefined" || !contentRef.current) return;
    const target = contentRef.current.querySelector(`#${CSS.escape(id)}`);
    if (!target) return;

    const headerOffset = getHeaderOffset();
    const y =
      target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    setActiveSection(target.textContent?.trim() || id);

    gsap.to(window, {
      duration: 1.2,
      scrollTo: y,
      ease: "power2.inOut",
      autoKill: false,
    });
  };

  return (
    <section
      id="content"
      className="h-fit max-sm:w-screen max-sm:overflow-x-hidden relative max-sm:py-[5%] max-md:flex-col bg-white px-[5vw] max-sm:px-[7vw] flex w-full py-[5%]"
    >
      {/* Info strip */}
      <div className="h-fit absolute max-md:relative max-sm:py-[15vw] max-md:pt-0! max-md:pb-[10vw] max-md:w-full w-fit blog-info">
        <div className="flex flex-wrap items-center max-md:items-start max-md:justify-start  gap-y-[2.5vw] max-md:gap-y-[5vw]">
          <div className="text-[1.05vw] max-sm:text-[4vw] max-md:text-[3vw] space-y-[.8vw] w-full max-md:w-full">
            <Copy>
              <p className="text-foreground text-24">
                Publication Date
              </p>
            </Copy>
            <Copy>
              <p className="text-foreground text-24 font-light">{formatDate(news.newsDate.newsDate)}</p>
            </Copy>
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="space-y-[3vw] max-md:space-y-[5vw] max-sm:pb-[12vw] md:sticky top-[15%] mt-[15vw] h-full w-[50%] max-sm:w-full max-sm:mt-[5vw]">
        {toc[0] && (
          <>
            <Copy>
              <p className="text-24 max-sm:text-[7vw] max-md:text-[5vw] text-foreground">
                Table of Contents
              </p>
            </Copy>
            <div
              data-lenis-prevent
              className="w-fit overflow-y-scroll h-fit max-h-[55vh] fadeup"
            >
              <ul className="flex flex-col items-start h-full list-none p-0 m-0">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`flex items-center gap-[2vw] max-sm:gap-[3vw] w-full py-[1.2vw] max-md:py-[3vw] cursor-pointer transition-all duration-300 hover:text-primary-2 ${
                      activeSection === item.title
                        ? "text-primary-blue"
                        : "text-foreground"
                    }`}
                    title={item.title}
                  >
                    <span className="shrink-0 w-1 h-1 bg-black rounded-full"/>
                    <span className="text-24 max-sm:text-[4vw] font-light leading-snug">
                      {truncate(item.title, isMobile ? 50 : 20)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Content (scoped for queries) */}
      <div className="h-full w-full flex justify-end text-foreground">
        <div id="Introduction" className="w-full border-b h-full" ref={contentRef}>
          <Content content={modifiedHtml} />
        </div>
      </div>
    </section>
  );
};

export default NewsContentWp;