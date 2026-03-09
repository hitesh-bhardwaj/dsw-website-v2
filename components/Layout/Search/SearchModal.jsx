"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildSearchIndex, searchItems } from "./search-utils";
import SearchResults from "./SearchResults";
import { Logo } from "@/components/Svg/Logo";
import SearchInput from "./SearchInputField";
import { useLenis } from "lenis/react";

export default function SearchModal({
  isOpen,
  onClose,
  query,
  setQuery,
  onSelectResult,
}) {
  const inputRef = useRef(null);
  const router = useRouter();
  const lenis = useLenis();

  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);

  const handleClose = () => {
    setQuery("");
    onClose?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = query?.trim();
    if (!trimmed) return;

    handleClose();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    if (!isOpen) {
      lenis && lenis.start();
      setQuery("");
      return;
    }

    lenis && lenis.stop();

    const fetchData = async () => {
      try {
        const [blogsRes, newsRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/news"),
        ]);

        const blogsData = await blogsRes.json();
        const newsData = await newsRes.json();

        setBlogs(Array.isArray(blogsData) ? blogsData : []);
        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (err) {
        console.error("Search fetch error:", err);
      }
    };

    fetchData();

    return () => {
      lenis && lenis.start();
    };
  }, [isOpen, lenis, setQuery]);

  const searchIndex = useMemo(() => {
    return buildSearchIndex({ blogs, news });
  }, [blogs, news]);

  const results = useMemo(() => {
    return searchItems(searchIndex, query);
  }, [searchIndex, query]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[1200] bg-white/70 backdrop-blur-lg duration-500 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="relative flex h-full w-full flex-col">
        <div className="flex items-center justify-between px-[3.3vw] pt-[1vw] max-md:pt-[2.5vw] max-sm:px-[7vw]">
          <Link href="/" className="flex items-center" onClick={handleClose}>
            <Logo className="h-7 w-auto max-md:h-10 max-md:w-full max-sm:h-7" />
          </Link>

          <div
            onClick={handleClose}
            className="group relative z-[10] h-auto cursor-pointer rounded-full bg-primary p-[2vw] transition-all ease-out max-md:p-[4vw] max-sm:w-[12vw] max-sm:p-[6vw]"
          >
            <div
              style={{
                transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
              }}
              className="rotate-45 duration-700 group-hover:rotate-225"
            >
              <span className="absolute left-1/2 top-1/2 h-[2px] w-[1.5vw] -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-[#ffffff] duration-300 transform-origin-center max-md:w-[3vw] max-sm:h-[1.5px] max-sm:w-[5vw]"></span>
              <span className="absolute left-1/2 top-1/2 h-[2px] w-[1.5vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffffff] duration-300 transform-origin-center max-md:w-[3vw] max-sm:h-[1.5px] max-sm:w-[5vw]"></span>
            </div>
          </div>
        </div>

        <div className="absolute left-[8%] top-[4%] w-[90%] flex-1 overflow-y-auto px-[12vw] pb-[6vw] max-md:top-[10%] max-md:w-full max-md:left-0 max-md:px-[7vw]">
          <form onSubmit={handleSubmit}>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              inputRef={inputRef}
              totalResults={results.length}
            />
          </form>

          <div data-lenis-prevent className="mt-12 h-[75vh] overflow-y-scroll">
            <SearchResults
              query={query}
              results={results}
              onSelect={() => {
                setQuery("");
                onSelectResult?.();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}