"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildSearchIndex, searchItems } from "./search-utils";
import SearchResultContent from "./SearchResultContent";

export default function SearchPageClient({ initialQuery = "" }) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery || "");
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

  useEffect(() => {
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
        console.error("Search page fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const searchIndex = useMemo(() => {
    return buildSearchIndex({ blogs, news });
  }, [blogs, news]);

  const results = useMemo(() => {
    return searchItems(searchIndex, query);
  }, [searchIndex, query]);

  const handleResultSelect = () => {
    setQuery("");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h1 className="text-110 text-[#0A1B4B]">Search</h1>
        {!!query && (
          <p className="mt-6 text-28 text-foreground/70 max-md:text-[1.2rem]">
            Search results for ‘{query}’
          </p>
        )}
      </div>

      <div className="px-[5vw] pb-[6vw] pt-[3vw] max-md:px-[7vw]">
        <div className="border-t border-foreground/20 pt-[4vw]">
          <SearchResultContent
            query={query}
            results={results}
            onSelect={handleResultSelect}
            scrollClassName="h-fit overflow-visible pr-0"
            variant="page"
          />
        </div>
      </div>
    </main>
  );
}