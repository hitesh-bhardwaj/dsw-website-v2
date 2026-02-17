"use client";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/datetime";
import PrimaryButton from "../Buttons/PrimaryButton";

const FeaturedBlog = ({ featuredPost }) => {
  if (!featuredPost) {
    return null;
  }

  // Get first category name or default to "Blog"
  const category = featuredPost.categories?.[0]?.name || "Blog";

  // Get author name
  const authorName = featuredPost.author?.name || "DSW Team";

  return (
    <section className="relative w-full py-[5%] max-sm:py-[15%] z-10">
      <div className="px-[5vw]">
        <div className="flex gap-[3vw] items-center max-sm:flex-col max-sm:gap-[8vw]">
          {/* Image Container */}
          <Link
            href={`/${featuredPost.slug}`}
            className="relative w-[38%] aspect-685/500 rounded-[1.2vw] overflow-hidden group max-sm:w-full max-sm:aspect-4/3 max-sm:rounded-[4vw]"
            aria-label={`Read blog post: ${featuredPost.title}`}
          >
            <Image
              src={featuredPost.featuredImage?.sourceUrl || "/assets/images/blog/ai-blog.png"}
              fill
              alt={featuredPost.featuredImage?.altText || featuredPost.title || "Featured blog image"}
              className="object-cover group-hover:scale-105 duration-700 ease-out transition-transform"
            />
            {/* Arrow Icon */}
            <div className="absolute top-[1vw] right-[1vw] w-[3.5vw] h-[3.5vw] max-sm:w-[10vw] max-sm:h-[10vw] max-sm:top-[3vw] max-sm:right-[3vw] bg-white/10 rounded-full">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="30" cy="30" r="29" stroke="#fff" strokeWidth="1" fill="none"/>
                <path
                  d="M22 38L38 22M38 22H26M38 22V34"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>

          <div className="flex-1 space-y-[2vw] max-sm:space-y-[6vw]">
            <h2 className="text-44 text-foreground font-heading leading-[1.2] tracking-[0.02em] max-sm:leading-[1.3]">
              {featuredPost.title}
            </h2>
            <div
              className="text-24 text-[#111] leading-normal line-clamp-4"
              dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
            />

            {/* Metadata */}
            <div className="flex gap-[4vw] pt-[1vw] max-sm:flex-wrap max-sm:gap-[8vw] max-sm:pt-[2vw]">
              <div className="space-y-[0.3vw] max-sm:space-y-[1vw]">
                <p className="text-24 text-[#919191] tracking-[0.02em]">
                  Format
                </p>
                <p className="text-24 text-foreground tracking-[0.02em]">
                  {category}
                </p>
              </div>

              <div className="space-y-[0.3vw] max-sm:space-y-[1vw]">
                <p className="text-24 text-[#919191] tracking-[0.02em]">
                  Published Date
                </p>
                <p className="text-24 text-foreground tracking-[0.02em]">
                  {formatDate(featuredPost.date)}
                </p>
              </div>

              <div className="space-y-[0.3vw] max-sm:space-y-[1vw]">
                <p className="text-24 text-[#919191] tracking-[0.02em]">
                  Author
                </p>
                <p className="text-24 text-foreground tracking-[0.02em]">
                  {authorName}
                </p>
              </div>
            </div>

            {/* Read More Button */}
            <div className="pt-[1vw] max-sm:pt-[4vw]">
              <PrimaryButton
                href={`/${featuredPost.slug}`}
                text="Read More"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
