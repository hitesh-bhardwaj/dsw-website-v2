import { NAV_LINKS } from "../Header/nav-data";

const normalize = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

function tokenize(value = "") {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean);
}

function uniqueTokens(tokens = []) {
  return [...new Set(tokens.filter(Boolean))];
}

function buildTitleTokens(title = "") {
  return uniqueTokens(tokenize(title));
}

function flattenNavLinks(navLinks = []) {
  const items = [];

  navLinks.forEach((item) => {
    const hasRealHref = item?.href && item.href !== "#";

    if (hasRealHref) {
      const mapped = {
        id: `nav-${item.id}`,
        title: item.label,
        href: item.href,
        type: "Page",
        description: item.description || "",
        keywords: [item.label, item.id].filter(Boolean),
      };

      items.push({
        ...mapped,
        tokens: buildTitleTokens(mapped.title),
      });
    }

    if (Array.isArray(item.children)) {
      item.children.forEach((child) => {
        if (!child?.href || child.href === "#") return;

        let type = "Page";

        if (item.id === "solutions") {
          type = "Solution";
        } else if (item.id === "technology") {
          type = "Technology";
        } else if (item.id === "resources") {
          type = "Resource";
        }

        const mapped = {
          id: `nav-child-${child.id}`,
          title: child.label,
          href: child.href,
          type,
          description: child.description || "",
          keywords: [
            child.label,
            child.group,
            item.label,
            item.id,
            child.id,
            child.href,
          ].filter(Boolean),
        };

        items.push({
          ...mapped,
          tokens: buildTitleTokens(mapped.title),
        });
      });
    }
  });

  return items;
}

export function mapBlogsToSearchIndex(blogs = []) {
  return blogs
    .filter((item) => item?.slug && (item?.title || item?.heading))
    .map((item) => {
      const title = item.title || item.heading || "";

      return {
        id: `blog-${item.slug}`,
        title,
        href: `/${item.slug}`,
        type: "Blog",
        description: item.excerpt || item.description || item.summary || "",
        keywords: ["blog", item.slug].filter(Boolean),
        tokens: buildTitleTokens(title),
      };
    });
}

export function mapNewsToSearchIndex(news = []) {
  return news
    .filter((item) => item?.slug && (item?.title || item?.heading))
    .map((item) => {
      const title = item.title || item.heading || "";

      return {
        id: `news-${item.slug}`,
        title,
        href: `/news/${item.slug}`,
        type: "News",
        description: item.excerpt || item.description || item.summary || "",
        keywords: ["news", item.slug].filter(Boolean),
        tokens: buildTitleTokens(title),
      };
    });
}

export function buildSearchIndex({ blogs = [], news = [] }) {
  return [
    ...flattenNavLinks(NAV_LINKS),
    ...mapBlogsToSearchIndex(blogs),
    ...mapNewsToSearchIndex(news),
  ];
}

function scoreTitleOnlyItem(item, queryTokens, normalizedQuery) {
  const title = normalize(item.title);
  const titleTokens = item.tokens || [];

  let score = 0;
  let matched = 0;

  for (const q of queryTokens) {
    let found = false;

    for (const token of titleTokens) {
      if (token === q) {
        score += 60;
        found = true;
        break;
      }

      if (token.startsWith(q)) {
        score += q.length === 1 ? 10 : q.length === 2 ? 18 : 28;
        found = true;
        break;
      }
    }

    if (found) matched += 1;
  }

  if (matched === 0) return 0;
  if (matched !== queryTokens.length) return 0;

  if (title === normalizedQuery) score += 140;
  else if (title.startsWith(normalizedQuery)) score += 70;
  else if (normalizedQuery.length >= 1 && title.includes(normalizedQuery)) score += 20;

  score += 30;

  return score;
}

export function scoreItem(item, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const queryTokens = uniqueTokens(tokenize(normalizedQuery));
  if (!queryTokens.length) return 0;

  return scoreTitleOnlyItem(item, queryTokens, normalizedQuery);
}

export function searchItems(index = [], query = "") {
  const normalizedQuery = normalize(query);
  const queryTokens = uniqueTokens(tokenize(normalizedQuery));

  if (!normalizedQuery) return [];
  if (!queryTokens.length) return [];

  return index
    .map((item) => ({
      ...item,
      _score: scoreItem(item, normalizedQuery),
    }))
    .filter((item) => item._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 50);
}