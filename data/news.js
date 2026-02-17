// import { gql } from "@apollo/client";

// export const QUERY_ALL_NEWS = gql`
//   query AllNews {
//     allNews {
//       edges {
//         node {
//           excerpt
//           title
//           slug
//           featuredImage {
//             node {
//               altText
//               srcSet
//               sourceUrl
//               sizes
//             }
//           }
//           date
//         }
//       }
//     }
//   }
// `;

// export const QUERY_NEWS_BY_SLUG = gql`
//   query NewsBySlug($slug: ID!) {
//     news(id: $slug, idType: SLUG) {
//       content
//       excerpt
//       featuredImage {
//         node {
//           altText
//           sourceUrl
//           srcSet
//           sizes
//         }
//       }
//       slug
//       title
//       id
//       date
//     }
//   }
// `;

// export const QUERY_NEWS_SEO_BY_SLUG = gql`
//   query NewsSEOBySlug($slug: ID!) {
//     news(id: $slug, idType: SLUG) {
//       id
//     }
//   }
// `;

// export const QUERY_NEWS_PER_PAGE = gql`
//   query NewsPerPage {
//     allSettings {
//       readingSettingsNewsPerPage
//     }
//   }
// `;

import { gql } from "@apollo/client";

// Query all news posts (assuming 'news' is a custom post type)
export const QUERY_ALL_NEWS = gql`
  query AllNews {
    allNews(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          excerpt
          title
          slug
          featuredImage {
            node {
              altText
              srcSet
              sourceUrl
              sizes
            }
          }
          date
          newsDate {
            newsDate
          }
        }
      }
    }
  }
`;

// Query single news post by slug
export const QUERY_NEWS_BY_SLUG = gql`
  query NewsBySlug($slug: ID!) {
    news(id: $slug, idType: SLUG) {
      id
      content
      excerpt
      featuredImage {
        node {
          altText
          sourceUrl
          srcSet
          sizes
        }
      }
      slug
      title
      date
      modified
      newsDate {
        newsDate
      }
    }
  }
`;

// Query SEO data for news post
export const QUERY_NEWS_SEO_BY_SLUG = gql`
  query NewsSEOBySlug($slug: ID!) {
    news(id: $slug, idType: SLUG) {
      id
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// Query posts per page setting
export const QUERY_NEWS_PER_PAGE = gql`
  query NewsPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;
