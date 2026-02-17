import { getApolloClient } from './apollo-client';

import {
  QUERY_ALL_NEWS,
  QUERY_NEWS_BY_SLUG,
  QUERY_NEWS_SEO_BY_SLUG,
} from '../data/news';

export async function getNewsBySlug(slug) {
  const apolloClient = getApolloClient();

  let newsData;
  let seoData;

  try {
    newsData = await apolloClient.query({
      query: QUERY_NEWS_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    // console.log(`[news][getNewsBySlug] Failed to query news data: ${e.message}`);
    throw e;
  }

  if (!newsData?.data?.news) return { news: undefined };

  const news = [newsData.data.news].map(mapNewsData)[0];

  try {
    seoData = await apolloClient.query({
      query: QUERY_NEWS_SEO_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    // console.log(`[news][getNewsBySlug] Failed to query SEO plugin: ${e.message}`);
    // console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
    throw e;
  }

  const { seo = {} } = seoData?.data?.news || {};

  news.metaTitle = seo.title;
  news.metaDescription = seo.metaDesc;
  news.metaImage = seo.opengraphImage;

  return {
    news,
  };
}

/**
 * getAllNews
 */
export async function getAllNews() {
 const apolloClient = getApolloClient();

  const result = await apolloClient.query({ query: QUERY_ALL_NEWS });
  
  const edges = result?.data?.allNews?.edges ?? [];
  const nodes = edges.map((e) => (e && e.node) || {});

  return { news: nodes.map(mapNewsData) , result};
}

export function mapNewsData(item = {}) {
  const data = { ...item };

  // Normalize author shape
  if (data.author) {
    data.author = {
      ...data.author.node,
    };
  }

  // Ensure secure avatar URLs (http -> https)
  if (data.author?.avatar) {
    data.author.avatar = updateUserAvatar(data.author.avatar);
  }

  // Normalize categories shape
  if (data.categories) {
    data.categories = data.categories.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  // Normalize featured image shape
  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}
