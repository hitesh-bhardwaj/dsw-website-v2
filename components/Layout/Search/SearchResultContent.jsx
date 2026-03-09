"use client";

import Link from "next/link";
import LinkButton from "@/components/Buttons/LinkButton";

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

function decodeHtmlEntities(value = "") {
  if (typeof window === "undefined") return value;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function getSanitizedExcerpt(html = "", limit = 20) {
  if (!html) return "";

  let text = html;

  // Remove all HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // Decode entities like &hellip;
  text = decodeHtmlEntities(text);

  // Normalize spacing
  text = text.replace(/\s+/g, " ").trim();

  if (text.length <= limit) return text;

  return `${text.slice(0, limit).trim()}...`;
}



function SectionBlock({ title, items, onSelect, variant = "modal" }) {
  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-[9rem_1px_minmax(0,1fr)] gap-6 max-md:grid-cols-1 max-md:gap-4">
      <div className="pt-1">
        <p className="text-[1vw] uppercase text-foreground/70 max-sm:text-[1rem] max-md:text-[1.2rem]">
          {title}
        </p>
      </div>

      <div className="w-px bg-primary-blue/40 max-md:hidden" />

      <div>
        {variant === "page" ? (
          <div className="flex flex-col gap-6">
            {items.map((item) => {
              const safeExcerpt = getSanitizedExcerpt(item.description, 100);

              return (
                <div
                  key={item.id}
                  className="rounded-[1.2vw] border border-foreground/10 bg-white px-[2vw] py-[2vw] max-md:rounded-[20px] max-md:px-[5vw] max-md:py-6"
                >
                  <Link
                    href={item.href}
                    onClick={onSelect}
                    className="group block w-fit text-foreground transition-colors duration-300 hover:text-primary-blue"
                  >
                    <h3 className="text-40  leading-[1.2] max-md:text-[1.6rem]">
                      {item.title}
                    </h3>
                  </Link>

                  {!!safeExcerpt && (
                    <p
                      className="my-3 text-22 leading-[1.4] text-foreground/60 max-md:text-[1rem]"
                      dangerouslySetInnerHTML={{ __html: safeExcerpt }}
                    />
                  )}

                  <LinkButton href={item.href} text={"Read More"} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onSelect}
                className="group w-fit text-foreground/90 transition-colors duration-300 hover:text-foreground"
              >
                <div className="text-30 leading-[1.25] font-light transition-colors duration-300 group-hover:text-primary-blue max-md:text-[1.2rem]">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchResultContent({
  query,
  results,
  onSelect,
  scrollClassName = "h-[73vh] overflow-y-auto pr-2",
  variant = "modal",
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
        <SectionBlock
          title="Pages"
          items={pages}
          onSelect={onSelect}
          variant={variant}
        />
        <SectionBlock
          title="Solutions"
          items={solutions}
          onSelect={onSelect}
          variant={variant}
        />
        <SectionBlock
          title="Technology"
          items={technology}
          onSelect={onSelect}
          variant={variant}
        />
        <SectionBlock
          title="Resources"
          items={resources}
          onSelect={onSelect}
          variant={variant}
        />
        <SectionBlock
          title="Blogs"
          items={blogs}
          onSelect={onSelect}
          variant={variant}
        />
        <SectionBlock
          title="News"
          items={news}
          onSelect={onSelect}
          variant={variant}
        />
      </div>
    </div>
  );
}