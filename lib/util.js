/**
 * decodeHtmlEntities
 */
export function stripHtml(text = '') {
  return text
    .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML tags
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&#038;/g, '&')
    .replace(/&#8212;/g, '—')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 20)
    .join(' ') + '...'
}
export function decodeHtmlEntities(text) {
  if (typeof text !== "string") {
    throw new Error(
      `Failed to decode HTML entity: invalid type ${typeof text}`
    );
  }

  let decoded = text;

  const entities = {
    "&amp;": "\u0026",
    "&quot;": "\u0022",
    "&#039;": "\u0027",
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url) {
  if (typeof url !== "string") return url;
  return url.replace(/\/$/, "");
}

export function removeExtraSpaces(text) {
  if (typeof text !== "string") return;
  return text.replace(/\s+/g, " ").trim();
}



export const homepage = "https://www.datasciencewizards.ai/";
export const faviconPath = "favicons/favicon.ico";
