"use client";

import Link from "next/link";

function partitionResults(results = []) {
  return {
    pages: results.filter((item) => item.type === "Page"),
    solutions: results.filter((item) => item.type === "Solution"),
    technology: results.filter((item) => item.type === "Technology"),
    resources: results.filter((item) => item.type === "Resource"),
    blogs: results.filter((item) => item.type === "Blog"),
    news: results.filter((item) => item.type === "News"),
  };
}

function SectionBlock({ title, items, onSelect }) {
  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-[9rem_1px_minmax(0,1fr)] gap-6 max-md:grid-cols-1 max-md:gap-4">
      <div className="pt-1">
        <p className="text-[1vw] uppercase text-foreground/70 max-sm:text-[3.5vw] max-md:text-[1.8vw] max-md:font-medium max-md:text-primary-blue">
          {title}
        </p>
      </div>

      <div className="w-px bg-primary-blue/70 max-md:hidden" />

      <div>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onSelect}
              className="group w-fit text-foreground/90 transition-colors duration-300 hover:text-foreground"
            >
              <div className="text-30 leading-[1.25] font-light max-md:text-[1.2rem] transition-colors duration-300 group-hover:text-primary-blue">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchResults({
  query,
  results,
  onSelect,
  scrollClassName = "h-[73vh] overflow-y-auto pr-2 max-sm:h-[150vw] max-md:h-[80vw]",
}) {
  if (!query?.trim()) {
    return (
      <div className="flex min-h-[30vh] items-center">
        <p className="text-[1.1rem] text-foreground/45">
          Search pages, blogs, and news.
        </p>
      </div>
    );
  }

  const {
    pages,
    solutions,
    technology,
    resources,
    blogs,
    news,
  } = partitionResults(results);

  const hasAny =
    pages.length ||
    solutions.length ||
    technology.length ||
    resources.length ||
    blogs.length ||
    news.length;

  if (!hasAny) {
    return (
      <div className="flex min-h-[30vh] items-center">
        <p className="text-[1.1rem] text-foreground/45">
          No results found for{" "}
          <span className="text-foreground/85">“{query}”</span>
        </p>
      </div>
    );
  }

  return (
    <div className={scrollClassName}>
      <div className="flex flex-col gap-10 pt-2 max-md:gap-8">
        <SectionBlock title="Pages" items={pages} onSelect={onSelect} />
        <SectionBlock title="Solutions" items={solutions} onSelect={onSelect} />
        <SectionBlock title="Technology" items={technology} onSelect={onSelect} />
        <SectionBlock title="Resources" items={resources} onSelect={onSelect} />
        <SectionBlock title="Blogs" items={blogs} onSelect={onSelect} />
        <SectionBlock title="News" items={news} onSelect={onSelect} />
      </div>
    </div>
  );
}