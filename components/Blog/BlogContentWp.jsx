"use client";

import React, { useEffect, useRef, useState } from "react";
import Content from "./Content";
import Copy from "../Animations/Copy";
import { formatDate } from "@/lib/datetime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const BlogContentWp = ({ post }) => {
  const [activeSection, setActiveSection] = useState("Introduction");
  const [modifiedHtml, setModifiedHtml] = useState(post?.content || "");
  const [toc, setToc] = useState([]); // [{ id, title }]
  const [readingTime, setReadingTime] = useState("1 min");
  const contentRef = useRef(null);
// console.log(post,"AUTHOR.....");
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
    typeof str === "string" && str.length > max
      ? `${str.slice(0, 30)}...`
      : str;

  // Calculate reading time based on content
  const calculateReadingTime = (htmlContent) => {
    if (!htmlContent) return "1 min";

    // Parse HTML and extract text content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const text = doc.body.textContent || "";

    // Remove extra whitespace and split into words
    const words = text
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .filter((word) => word.length > 0);

    // Average reading speed: 200 words per minute
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words.length / wordsPerMinute);

    // Return at least 1 minute
    return `${Math.max(1, minutes)} min`;
  };

  useEffect(() => {
    if (!post?.content || typeof window === "undefined") return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
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
    setModifiedHtml(doc.body.innerHTML || post.content);

    // Calculate reading time
    setReadingTime(calculateReadingTime(post.content));

    if (items.length) {
      const intro = items.find((t) =>
        t.title.toLowerCase().includes("introduction")
      );
      setActiveSection(intro ? intro.title : items[0].title);
    }
  }, [post?.content]);

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
      className="h-fit relative py-[5%] max-md:flex-col bg-background flex w-full px-[5vw]"
    >
      {/* Info strip */}
      <div className="h-fit absolute max-md:relative max-sm:py-[15vw] max-md:pt-0! max-md:pb-[10vw] max-md:w-full w-fit blog-info">
        <div className="flex text-foreground flex-wrap items-center max-md:items-start max-md:justify-between max-md:flex-row-reverse gap-y-[2.5vw] max-md:gap-y-[5vw]">
          <div className="text-24 max-sm:text-[4vw] max-md:text-[3vw] space-y-[.8vw] w-[50%] max-md:w-[40%]">
            <Copy>
              <p className="">
                Publication Date
              </p>
            </Copy>
            <Copy>
              <p className="font-light">{formatDate(post.date)}</p>
            </Copy>
          </div>
          <div className="text-24 max-sm:text-[4vw] max-md:text-[3vw] space-y-[.8vw] w-[50%] max-md:w-[40%]">
            <Copy>
              <p className="">
                Category
              </p>
            </Copy>
            <Copy>
              {post.categories.map((category, id) => (
                <p className="font-light" key={id}>
                  {category.name}
                </p>
              ))}
            </Copy>
          </div>
          <div className="text-24 max-sm:text-[4vw] max-md:text-[3vw] space-y-[.8vw] w-[50%] max-md:w-[40%]">
            <Copy>
              <p className="">
                Reading Time
              </p>
            </Copy>
            <Copy>
              <p className="font-light">{readingTime}</p>
            </Copy>
          </div>
          <div className="text-24 max-sm:text-[4vw] max-md:text-[3vw] space-y-[.8vw] w-[50%] max-md:w-[40%]">
            <Copy>
              <p className="">
                Author Name
              </p>
            </Copy>
            <Copy>
              <p className="font-light"> {post?.blogAuthor?.author || "No author"}</p>
            </Copy>
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="space-y-[2vw] sticky top-[15%] mt-[15vw] max-md:hidden h-full w-[50%]">
        {toc[0] && (
          <>
            <Copy>
              <p className="text-30 max-sm:text-[4vw] max-md:text-[3vw] text-foreground">
                Table of Contents
              </p>
            </Copy>
            <div
              data-lenis-prevent
              className="w-fit overflow-y-scroll h-fit max-h=[55vh] max-md:hidden fadeup"
            >
              <ul className="flex flex-col items-start h-full gap-[1.5vw] list-disc pl-[1.5vw]">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`text-24 max-sm:text-[4vw] font-light max-md:text-[3vw] cursor-pointer transition-all duration-300 hover:text-primary-2 ${
                      activeSection === item.title
                        ? "text-primary-blue"
                        : "text-foreground"
                    }`}
                    title={item.title}
                  >
                    {truncate(item.title, 20)}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Content (scoped for queries) */}
      <div className="h-full w-full flex justify-end text-foreground">
        <div id="Introduction" className="w-full  h-full" ref={contentRef}>
          <Content content={modifiedHtml} />
        </div>
      </div>
    </section>
  );
};

export default BlogContentWp;
