import { NAV_LINKS } from "../nav-data";

const normalize = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

function toArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function tokenize(value = "") {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean);
}

function uniqueTokens(tokens = []) {
  return [...new Set(tokens.filter(Boolean))];
}

function buildNavTokens(item = {}) {
  const text = [
    item.title,
    item.description,
    item.href,
    ...(item.keywords || []),
  ]
    .filter(Boolean)
    .join(" ");

  return uniqueTokens(tokenize(text));
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
        tokens: buildNavTokens(mapped),
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
          tokens: buildNavTokens(mapped),
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

function scoreNavItem(item, queryTokens, normalizedQuery) {
  const title = normalize(item.title);
  const description = normalize(item.description);
  const href = normalize(item.href);
  const itemTokens = item.tokens || [];

  let score = 0;
  let matched = 0;

  for (const q of queryTokens) {
    let found = false;

    for (const token of itemTokens) {
      if (token === q) {
        score += 35;
        found = true;
        break;
      }

      if (q.length >= 2 && token.startsWith(q)) {
        score += 16;
        found = true;
        break;
      }
    }

    if (found) matched += 1;
  }

  if (matched === 0) return 0;
  if (matched === queryTokens.length) score += 20;

  if (title === normalizedQuery) score += 90;
  if (title.startsWith(normalizedQuery)) score += 45;
  if (normalizedQuery.length >= 2 && title.includes(normalizedQuery)) score += 18;
  if (normalizedQuery.length >= 2 && description.includes(normalizedQuery)) score += 8;
  if (normalizedQuery.length >= 2 && href.includes(normalizedQuery)) score += 6;

  return score;
}

function scoreTitleOnlyItem(item, queryTokens, normalizedQuery) {
  const title = normalize(item.title);
  const titleTokens = item.tokens || [];

  let score = 0;
  let matched = 0;

  for (const q of queryTokens) {
    let found = false;

    for (const token of titleTokens) {
      // exact full-word match
      if (token === q) {
        score += 60;
        found = true;
        break;
      }

      // robust prefix match only when user typed 3+ chars
      if (q.length >= 3 && token.startsWith(q)) {
        score += 24;
        found = true;
        break;
      }
    }

    if (found) matched += 1;
  }

  // no matched words = no result
  if (matched === 0) return 0;

  // require every meaningful query token to match the title
  if (matched !== queryTokens.length) return 0;

  // phrase boosts
  if (title === normalizedQuery) score += 140;
  else if (title.startsWith(normalizedQuery)) score += 70;
  else if (normalizedQuery.length >= 3 && title.includes(normalizedQuery)) score += 30;

  // extra boost when all tokens matched
  score += 30;

  return score;
}

export function scoreItem(item, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const queryTokens = uniqueTokens(tokenize(normalizedQuery));

  // prevent noisy 1-char and 2-char random search
  if (!queryTokens.length || queryTokens.every((t) => t.length < 2)) {
    return 0;
  }

  // Blogs + News => title only
  if (item.type === "Blog" || item.type === "News") {
    return scoreTitleOnlyItem(item, queryTokens, normalizedQuery);
  }

  // Everything else => regular nav matching
  return scoreNavItem(item, queryTokens, normalizedQuery);
}

export function searchItems(index = [], query = "") {
  const normalizedQuery = normalize(query);
  const queryTokens = uniqueTokens(tokenize(normalizedQuery));

  if (!normalizedQuery) return [];
  if (!queryTokens.length) return [];

  // For blog/news robustness, ignore pure 1-char searches
  if (queryTokens.every((t) => t.length < 2)) return [];

  return index
    .map((item) => ({
      ...item,
      _score: scoreItem(item, normalizedQuery),
    }))
    .filter((item) => item._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 50);
}