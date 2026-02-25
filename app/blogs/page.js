import FeaturedBlog from "@/components/Blog/FeaturedBlog";
import BlogGrid from "@/components/Blog/BlogGrid";
import { getAllPosts, sortStickyPosts } from "@/lib/posts";
import Layout from "@/components/Layout/Layout";
import HeroNew from "@/components/HeroNew";
import CTAFinal from "@/components/CTAFinal";
import { BreadcrumbsJSONLD, WebpageJsonLd } from "@/lib/json-ld";
import { getPageMetadata } from "@/components/config/metadata";
import { homepage } from "@/lib/util";

/**
 * Separates the featured post (sticky or first) from the rest of the posts
 * @param {Array} posts - All posts from WordPress
 * @returns {{ featuredPost: Object, remainingPosts: Array }}
 */
function separateFeaturedPost(posts) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return { featuredPost: null, remainingPosts: [] };
  }

  // Sort posts with sticky posts first
  const sortedPosts = sortStickyPosts(posts);

  // First sticky post becomes featured, or first post if no sticky
  const featuredPost = sortedPosts.find((post) => post.isSticky) || sortedPosts[0];

  // Remaining posts exclude the featured one
  const remainingPosts = sortedPosts.filter((post) => post.slug !== featuredPost.slug);

  return { featuredPost, remainingPosts };
}

export const metadata = getPageMetadata({
  title: "DSW Blog - Insights on AI & Enterprise Innovation",
  description:
    "Explore DSW’s blog: deep dives on AI, GenAI, insurance innovation, enterprise deployments, use cases, and tech trends.",
  url: "/blogs",
  date_published: "2026-02-18T00:00",
  date_modified: "2026-02-18T00:00",
  alternates: {
    canonical: "/blogs",
    languages: {
      "en-US": "/blogs",
    },
  },
  openGraph: {
    url: "/blogs",
    images: [
      {
        url: `${homepage}seo/blogs.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

export default async function BlogsPage() {
  const { posts } = await getAllPosts();

  // Separate featured post from the rest
  const { featuredPost, remainingPosts } = separateFeaturedPost(posts);

  return (
    <>
     <WebpageJsonLd metadata={metadata} />
      <BreadcrumbsJSONLD pathname={metadata.url} />
      <Layout>
        <HeroNew heroContent={heroContent} breadcrumbs={true}/>
        <FeaturedBlog featuredPost={featuredPost} />
        {remainingPosts.length > 0 && <BlogGrid posts={remainingPosts} />}
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
      </>
  );
}

const heroContent = {
  tagline: "",
  heading: "Explore the Future of AI, One Post at a Time",
  headingWidth: "w-[60%]",
  para: "",
  primaryButton: {
    present: false,
    link: "#",
    text: "Book a Demo",
  },
  secondaryButton: {
    present: false,
    link: "#",
    text: "Talk to our Team",
  },
  images: false,
};

const ctaContent = {
  heading: "Take a lightning tour of the Enterprise AI Platform",
  para: "Discover how UnifyAI can accelerate your AI/ML and GenAI initiatives with seamless deployment, scalability, and security.",
  primaryButton: {
    present: true,
    link: "#",
    text: "Book a Demo",
    book:true
  },
  secondaryButton: {
    present: true,
    link: "https://calendly.com/",
    text: "Schedule a Call",
    targetSecondary:true
  },
};
