import { gql } from "@apollo/client";

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    categories {
      edges {
        node {
          databaseId
          id
          name
          slug
        }
      }
    }
    excerpt
    featuredImage {
      node {
        altText
        sourceUrl
        srcSet
        sizes
      }
    }

    date
    isSticky
    slug
    title
  }
`;

export const QUERY_ALL_POSTS = gql`
  query AllPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          excerpt
          date
          isSticky
          slug
          title
          featuredImage {
            node {
              altText
              sourceUrl
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      excerpt
      id
      featuredImage {
        node {
          altText
          sourceUrl
          srcSet
          sizes
        }
      }

      categories {
        edges {
          node {
            databaseId
            id
            name
            slug
          }
        }
      }
      modified
      content
      date
      title
      slug
      isSticky
      blogAuthor {
        author
      }
    }
  }
`;

export const QUERY_POST_SEO_BY_SLUG = gql`
  query PostSEOBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
    }
  }
`;

export const QUERY_POST_PER_PAGE = gql`
  query PostPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;

export const GET_HOME_PAGE_POSTS = gql`
  query postsforHomePage {
    posts(first: 4) {
      nodes {
        featuredImage {
          node {
            sourceUrl
          }
        }
        id
        slug
        title
        date
      }
    }
  }
`;
