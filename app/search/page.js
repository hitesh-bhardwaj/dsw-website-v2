import Layout from "@/components/Layout/Layout";
import SearchPageClient from "@/components/Layout/Search/SearchPageClient";
import { WebpageJsonLd } from "@/lib/json-ld";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";

  const title = query
    ? `Search results for "${query}" | Data Science Wizards`
    : "Search | Data Science Wizards";

  const description = query
    ? `Explore search results for "${query}" across pages, solutions, technology, resources, blogs, and news on Data Science Wizards.`
    : "Search across pages, solutions, technology, resources, blogs, and news on Data Science Wizards.";

  const canonical = query
    ? `/search?q=${encodeURIComponent(query)}`
    : "/search";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
      },
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Data Science Wizards",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";

  const pageMetadata = {
    title: query
      ? `Search results for "${query}" | Data Science Wizards`
      : "Search | Data Science Wizards",
    description: query
      ? `Explore search results for "${query}" across pages, solutions, technology, resources, blogs, and news on Data Science Wizards.`
      : "Search across pages, solutions, technology, resources, blogs, and news on Data Science Wizards.",
    url: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    date_published: "2026-03-10T00:00",
    date_modified: "2026-03-10T00:00",
    alternates: {
      canonical: query
        ? `/search?q=${encodeURIComponent(query)}`
        : "/search",
      languages: {
        "en-US": query
          ? `/search?q=${encodeURIComponent(query)}`
          : "/search",
      },
    },
  };

  return (
    <>
      <WebpageJsonLd metadata={pageMetadata} />
      <Layout>
        <main className="min-h-screen">
          <SearchPageClient initialQuery={query} />
        </main>
      </Layout>
    </>
  );
}