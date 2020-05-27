const {stripHtmlTags} = require('./src/utils');

const isProduction = process.env.NODE_ENV === 'production';
const protocol = isProduction ? 'https' : 'http';
const baseUrl = isProduction
  ? 'wp.apollographql.com'
  : process.env.WORDPRESS_URL_DEV;

module.exports = {
  pathPrefix: '/blog',
  siteMetadata: {
    siteUrl: 'https://www.apollographql.com/blog'
  },
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url: `${protocol}://${baseUrl}/graphql`,
        debug: {
          graphql: {
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true
          }
        },
        type: {
          User: {
            excludeFieldNames: null
          },
          Post: {
            limit: process.env.CONTEXT === 'production' ? undefined : 10
          }
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
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
          WpPost: {
            title: node => node.title,
            content: node => stripHtmlTags(node.content),
            slug: node => node.slug,
            categories: (node, getNode) =>
              node.categories.nodes.map(category => getNode(category.id)),
            author: node => node.author
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
            wp {
              generalSettings {
                title
                description
              }
            }
          }
        `,
        setup: ({query, ...rest}) => {
          const {title, description} = query.wp.generalSettings;
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
              return query.allWpPost.nodes.map(node => {
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
                allWpPost {
                  nodes {
                    content
                    excerpt
                    title
                    date
                    path: uri
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
