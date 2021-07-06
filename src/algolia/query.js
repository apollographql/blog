module.exports = {
  blog: `{
    site {
      siteMetadata {
        siteUrl
      }
    }
    pagesWP: allWpPost {
      edges {
        node {
          title
          content
          slug
          categories {
            nodes {
              name
            }
          }
          id
          link
          excerpt
          date
          modified
          featuredImage {
            node {
              sourceUrl
            }
          }        
          author {
            node {
              name
            }
          }
        }
      }
    }
  }`
};
