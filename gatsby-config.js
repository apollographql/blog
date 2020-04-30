const {stripHtmlTags} = require('./src/utils');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  pathPrefix: '/blog',
  siteMetadata: {
    siteUrl: 'https://www.apollographql.com/blog'
  },
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    // TODO: add gatsby-wordpress-experimental-inline-images
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url: 'http://localhost:10005/graphql',
        type: {
          User: {
            excludeFieldNames: null
          }
        }
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        protocol: isProduction ? 'https' : 'http',
        baseUrl: isProduction
          ? 'wp.apollographql.com'
          : process.env.WORDPRESS_URL_DEV
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-74643563-11'
      }
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: ['title', 'content'],
        resolvers: {
          wordpress__POST: {
            title: node => node.title,
            content: node => stripHtmlTags(node.content),
            slug: node => node.slug,
            categories: (node, getNode) => node.categories___NODE.map(getNode),
            author: (node, getNode) => getNode(node.author___NODE)
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            wordpressSiteMetadata {
              title: name
              description
            }
          }
        `,
        setup: ({query, ...rest}) => {
          const {title, description} = query.wordpressSiteMetadata;
          return {
            title,
            description,
            site_url: query.site.siteMetadata.siteUrl,
            ...rest
          };
        },
        feeds: [
          {
            serialize: ({query}) => {
              const {siteUrl} = query.site.siteMetadata;
              return query.allWordpressPost.nodes.map(node => {
                const url = siteUrl + node.path;
                return {
                  title: node.title,
                  description: stripHtmlTags(node.excerpt),
                  date: node.date,
                  url,
                  guid: url,
                  custom_elements: [{'content:encoded': node.content}]
                };
              });
            },
            query: `
              {
                allWordpressPost {
                  nodes {
                    content
                    excerpt
                    title
                    date
                    path
                  }
                }
              }
            `,
            output: '/rss.xml'
          }
        ]
      }
    }
  ]
};
