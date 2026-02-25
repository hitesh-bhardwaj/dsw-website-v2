import BlogContentWp from '@/components/Blog/BlogContentWp'
import Hero from '@/components/Blog/Hero'
import CTAFinal from '@/components/CTAFinal'
import Layout from '@/components/Layout/Layout'
import RelatedArticles from '@/components/Blog/RelatedArticles'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { homepage, stripHtml } from '@/lib/util'
import { notFound } from 'next/navigation'
import { BreadcrumbsJSONLD, WebpageJsonLd } from '@/lib/json-ld'
import { getPageMetadata } from '@/components/config/metadata'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { post } = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  return getPageMetadata({
    title: post.metaTitle || post.title,
    description: stripHtml(post.metaDescription || post.excerpt),
    url: `/${slug}`,
    date_published: post.date,
    date_modified: post.modified || post.date,
    alternates: {
      canonical: `/${slug}`,
      languages: { 'en-US': `/${slug}`},
    },
    openGraph: {
      url: `/${slug}`,
      images: post.metaImage
        ? [{ url: post.metaImage.url, width: 1200, height: 630 }]
        : [{ url: `${homepage}seo/homepage.png`, width: 1200, height: 630 }],
    },
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const { post } = await getPostBySlug(slug)

  if (!post) return notFound();
  
  const { posts: allPosts } = await getAllPosts();
  const relatedPosts = allPosts
    .filter((item) => item.slug !== slug)
    .slice(0, 6)
    .map((item) => ({
      node: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        date: item.date,
        featuredImage: {
          node: {
            sourceUrl: item.featuredImage?.sourceUrl || "",
            altText: item.featuredImage?.altText || "",
            srcSet: item.featuredImage?.srcSet || "",
            sizes: item.featuredImage?.sizes || "",
          },
        },
      },
    }))

  const pageMeta = getPageMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    url: `/${slug}`,
    date_published: post.date,
    date_modified: post.modified || post.date,
    alternates: {
      canonical: `/${slug}`,
      languages: { 'en-US': `/${slug}`},
    },
    openGraph: {
      url: `/${slug}`,
      images: post.metaImage
        ? [{ url: post.metaImage.url, width: 1200, height: 630 }]
        : [{ url: `${homepage}seo/blog-detail.png`, width: 1200, height: 630 }],
    },
  })

  return (
    <>
      <WebpageJsonLd metadata={pageMeta} />
      <BreadcrumbsJSONLD pathname={`/${slug}`} />
      <Layout>
        <Hero breadcrumbs post={post}/>
        <BlogContentWp post={post}/>
        <RelatedArticles post={post} relatedPosts={relatedPosts} />
        <CTAFinal ctaContent={ctaContent} />
      </Layout>
    </>
  )
}

const ctaContent = {
  heading: "Take a lightning tour of the Enterprise AI Platform",
  para: "Discover how UnifyAI can accelerate your AI/ML and GenAI initiatives with seamless deployment, scalability, and security.",
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

