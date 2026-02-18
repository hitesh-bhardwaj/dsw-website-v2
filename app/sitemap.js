
// app/sitemap.js
import fs from 'fs';
import path from 'path';
import { headers } from 'next/headers';
import { homepage as HOMEPAGE_FROM_UTIL } from '@/lib/util';

// Ensure Node runtime (so `fs` works)
export const runtime = 'nodejs';
// Force static generation at build time for consistency
export const dynamic = 'force-static';

// Support both app/ and src/app/
const APP_CANDIDATES = [
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'src', 'app'),
].filter(p => {
  try { return fs.existsSync(p) && fs.statSync(p).isDirectory(); } catch { return false; }
});

const PAGE_FILES = new Set([
  'page.jsx', 'page.js'
]);

function isRouteGroup(name) { return name.startsWith('(') && name.endsWith(')'); }
function isParallelRoute(name) { return name.startsWith('@'); }
function isDynamicSegment(name) { return name.includes('[') && name.includes(']'); }

function findPageFile(dirAbs) {
  for (const file of PAGE_FILES) {
    const full = path.join(dirAbs, file);
    try { if (fs.existsSync(full)) return full; } catch {}
  }
  return null;
}

function toUrlPath(dirRel) {
  const parts = dirRel
    .split(path.sep)
    .filter(Boolean)
    .filter(p => !isRouteGroup(p) && !isParallelRoute(p));
  const joined = '/' + parts.join('/');
  return joined === '//' ? '/' : joined;
}

function safeReaddir(dirAbs) {
  try { return fs.readdirSync(dirAbs, { withFileTypes: true }); } catch { return []; }
}

function collectStaticRoutesFrom(baseDirAbs, dirRel = '') {
  const out = [];
  const dirAbs = path.join(baseDirAbs, dirRel);
  const entries = safeReaddir(dirAbs);

  const pageFile = findPageFile(dirAbs);
  const hasDynamicInPath = dirRel.split(path.sep).some(seg => isDynamicSegment(seg));

  if (pageFile && !hasDynamicInPath) {
    let lastModified;
    try { lastModified = fs.statSync(pageFile).mtime; } catch {}
    out.push({ path: toUrlPath(dirRel), lastModified });
  }

  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const name = e.name;

    // Always descend into route groups / parallel routes
    if (isRouteGroup(name) || isParallelRoute(name)) {
      out.push(...collectStaticRoutesFrom(baseDirAbs, path.join(dirRel, name)));
      continue;
    }

    // Skip dynamic segments here
    if (isDynamicSegment(name)) continue;

    out.push(...collectStaticRoutesFrom(baseDirAbs, path.join(dirRel, name)));
  }

  return out;
}

function collectStaticRoutes() {
  const all = [];
  for (const base of APP_CANDIDATES) {
    all.push(...collectStaticRoutesFrom(base, ''));
  }

  // De-duplicate by path
  const seen = new Map();
  for (const r of all) {
    if (!seen.has(r.path)) seen.set(r.path, r);
  }
  return Array.from(seen.values()).sort((a, b) => (a.path > b.path ? 1 : -1));
}

// Resolve base URL - always use production URL for consistency
async function resolveBaseUrl() {
  // In production, ALWAYS use the canonical URL
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    // Use the canonical production URL regardless of which domain is being accessed
    return 'https://www.datasciencewizards.ai/';
  }

  // In preview/development, try to infer from request headers
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'http';
    if (host) {
      const baseUrl = `${proto}://${host}/`;
      console.log('[Sitemap] Using base URL:', baseUrl);
      return baseUrl;
    }
  } catch (error) {
    console.error('[Sitemap] Error getting headers:', error);
  }

  // Fallback to environment variables
  const candidates = [
    process.env.NEXT_PUBLIC_HOMEPAGE,
    HOMEPAGE_FROM_UTIL,
  ].filter(Boolean);

  for (const c of candidates) {
    try {
      const url = new URL(c).toString();
      console.log('[Sitemap] Using fallback URL:', url);
      return url;
    } catch {}
  }

  // Final fallback
  console.warn('[Sitemap] No base URL found, using production URL as fallback');
  return 'https://www.datasciencewizards.ai/';
}

// ============================================
// 🔥 WORDPRESS GRAPHQL FETCHING
// ============================================

async function fetchGraphQL(query) {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    console.error('[Sitemap] WORDPRESS_GRAPHQL_ENDPOINT is not defined');
    return null;
  }

  try {
    console.log('[Sitemap] Fetching from WordPress GraphQL...');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: 'no-store', // Don't cache during build to get fresh data
    });

    if (!response.ok) {
      console.error(`[Sitemap] WordPress GraphQL returned ${response.status}: ${response.statusText}`);
      const text = await response.text();
      console.error('[Sitemap] Response body:', text.substring(0, 500));
      return null;
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error('[Sitemap] GraphQL Errors:', JSON.stringify(errors, null, 2));
      return null;
    }

    return data;
  } catch (error) {
    console.error('[Sitemap] Error fetching from WordPress:', error.message);
    console.error('[Sitemap] Stack:', error.stack);
    return null;
  }
}

// Fetch all news posts for /news/[slug]
async function fetchAllNews() {
  const query = `
    query AllNews {
      allNews(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            slug
            modified
            date
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);

  if (!data?.allNews?.edges) {
    console.warn('[Sitemap] No news items found or query failed');
    return [];
  }

  const newsItems = data.allNews.edges.map(({ node }) => ({
    slug: node.slug,
    lastModified: new Date(node.modified || node.date),
  }));

  console.log(`[Sitemap] Found ${newsItems.length} news items`);
  return newsItems;
}

// Fetch all pages for /[slug]
async function fetchAllPages() {
  const query = `
    query AllPages {
      pages(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            slug
            modified
            date
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);

  if (!data?.pages?.edges) {
    console.warn('[Sitemap] No pages found or query failed');
    return [];
  }

  const pages = data.pages.edges.map(({ node }) => ({
    slug: node.slug,
    lastModified: new Date(node.modified || node.date),
  }));

  console.log(`[Sitemap] Found ${pages.length} pages`);
  return pages;
}

// Fetch all blog posts for /[slug] (if posts are also at root)
async function fetchAllPosts() {
  const query = `
    query AllPosts {
      posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            slug
            modified
            date
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);

  if (!data?.posts?.edges) {
    console.warn('[Sitemap] No posts found or query failed');
    return [];
  }

  const posts = data.posts.edges.map(({ node }) => ({
    slug: node.slug,
    lastModified: new Date(node.modified || node.date),
  }));

  console.log(`[Sitemap] Found ${posts.length} posts`);
  return posts;
}

// Collect all dynamic routes from WordPress
async function getAllDynamicRoutes() {
  const dynamicRoutes = [];

  try {
    // Fetch news posts for /news/[slug]
    const newsItems = await fetchAllNews();
    dynamicRoutes.push(
      ...newsItems.map(item => ({
        url: `/news/${item.slug}`,
        lastModified: item.lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    );

    // Fetch WordPress pages for /[slug]
    const pages = await fetchAllPages();
    dynamicRoutes.push(
      ...pages.map(page => ({
        url: `/${page.slug}`,
        lastModified: page.lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      }))
    );

    // Optional: Fetch blog posts if they're also at root level /[slug]
    // Uncomment if your blog posts are at root, not under /blog
    const posts = await fetchAllPosts();
    dynamicRoutes.push(
      ...posts.map(post => ({
        url: `/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: 'weekly',
        priority: 0.6,
      }))
    );

  } catch (error) {
    console.error('Error fetching dynamic routes:', error);
  }

  return dynamicRoutes;
}

// ============================================
// MAIN SITEMAP EXPORT
// ============================================

export default async function sitemap() {
  console.log('[Sitemap] Starting sitemap generation...');
  console.log('[Sitemap] NODE_ENV:', process.env.NODE_ENV);
  console.log('[Sitemap] VERCEL_ENV:', process.env.VERCEL_ENV);

  const base = await resolveBaseUrl();
  console.log('[Sitemap] Base URL resolved to:', base);

  // Get static routes from file system
  const staticRoutes = collectStaticRoutes();
  console.log(`[Sitemap] Found ${staticRoutes.length} static routes`);

  // Get dynamic routes from WordPress GraphQL
  const dynamicRoutes = await getAllDynamicRoutes();
  console.log(`[Sitemap] Found ${dynamicRoutes.length} dynamic routes`);

  // Convert static routes to sitemap format
  const staticUrls = staticRoutes.map(({ path, lastModified }) => ({
    url: new URL(path === '/' ? '' : path, base).toString(),
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1.0 : 0.8,
  }));

  // Convert dynamic routes to sitemap format
  const dynamicUrls = dynamicRoutes.map(({ url, lastModified, changeFrequency, priority }) => ({
    url: new URL(url, base).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));

  // Combine and return all URLs
  const allUrls = [...staticUrls, ...dynamicUrls];

  console.log(`[Sitemap] Total URLs in sitemap: ${allUrls.length}`);
  console.log(`[Sitemap] Static URLs: ${staticUrls.length}, Dynamic URLs: ${dynamicUrls.length}`);

  // If no routes found, return at least homepage
  if (!allUrls.length) {
    console.warn('[Sitemap] No routes found! Returning only homepage');
    return [{
      url: new URL('/', base).toString(),
      changeFrequency: 'monthly',
      priority: 1.0
    }];
  }

  console.log('[Sitemap] Generation complete!');
  return allUrls;
}