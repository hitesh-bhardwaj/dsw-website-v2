import Hero from "@/components/Blog/Hero";
import { getPageMetadata } from "@/components/config/metadata";
import CTAFinal from "@/components/CTAFinal";
import Layout from "@/components/Layout/Layout";
import NewsContentWp from "@/components/News/NewsContentWp";
import RelatedArticleNews from "@/components/News/RelatedArticleNews";
import { BreadcrumbsJSONLD, WebpageJsonLd } from "@/lib/json-ld";
import { getNewsBySlug, getAllNews } from "@/lib/news";
import { homepage, stripHtml } from "@/lib/util";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { news } = await getNewsBySlug(slug);

  if (!news) return {};

  return getPageMetadata({
    title: news.metaTitle || news.title,
    description: stripHtml(news.metaDescription || news.excerpt),
    url: `/news/${slug}`,
    date_published: news.date,
    date_modified: news.modified || news.date,
    alternates: {
      canonical: `/news/${slug}`,
      languages: { "en-US": `/${slug}` },
    },
    openGraph: {
      url: `/${slug}`,
      images: news.metaImage
        ? [{ url: news.metaImage.url, width: 1200, height: 630 }]
        : [{ url: `${homepage}seo/news-detail.png`, width: 1200, height: 630 }],
    },
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { news } = await getNewsBySlug(slug);

  if (!news) return notFound();

  // Get related news by fetching recent news and excluding current
  const { news: allNews } = await getAllNews();
  const relatedNews = allNews
    .filter((item) => item.slug !== slug)
    .slice(0, 6)
    .map((item) => ({
      node: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        date: item.date,
        newsDate: item.newsDate || null,
        featuredImage: {
          node: {
            sourceUrl: item.featuredImage?.sourceUrl || "",
            altText: item.featuredImage?.altText || "",
            srcSet: item.featuredImage?.srcSet || "",
            sizes: item.featuredImage?.sizes || "",
          },
        },
      },
    }));


    const pageMeta = getPageMetadata({
      title: news.metaTitle || news.title,
    description: stripHtml(news.metaDescription || news.excerpt),
    url: `/news/${slug}`,
    date_published: news.date,
    date_modified: news.modified || news.date,
    alternates: {
      canonical: `/news/${slug}`,
      languages: { "en-US": `/${slug}` },
    },
    openGraph: {
      url: `/${slug}`,
      images: news.metaImage
        ? [{ url: news.metaImage.url, width: 1200, height: 630 }]
        : [{ url: `${homepage}seo/blog-detail.png`, width: 1200, height: 630 }],
    },
  });


  return (
    <>
     <WebpageJsonLd metadata={pageMeta} />
     <BreadcrumbsJSONLD pathname={`/${slug}`} />
      <Layout>
        <Hero post={news}/>
        <NewsContentWp news={news} />
        <RelatedArticleNews news={news} relatedNews={relatedNews} />
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  );
}

const ctaContent = {
  heading: "Looking to write about us or request an interview?",
  para: "Download our press kit or reach out directly to our media team.",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
  },
  secondaryButton: {
    present: true,
    link: "#",
    text: "Schedule a Call",
  },
};
