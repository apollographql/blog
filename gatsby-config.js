const {stripHtmlTags, createPostPath} = require('./src/utils');
const {decode} = require('he');
const {parse, queries, algoliaSettings} = require('apollo-algolia-transform');

module.exports = {
  // only set a path prefix if building for production
  // https://github.com/gatsbyjs/gatsby/blob/fe04b8e05eef712a433fe739f6f0943cbdf2305c/packages/gatsby/src/utils/get-public-path.ts#L15
  pathPrefix: '/blog',
  siteMetadata: {
    siteUrl: 'https://www.apollographql.com/blog'
  },
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-netlify',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url: process.env.WORDPRESS_URL,
        debug: {
          graphql: {
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true
          }
        },
        html: {
          useGatsbyImage: false
        },
        type: {
          CareersSlider2: {
            exclude: true
          },
          CareersHeroSlider: {
            exclude: true
          },
          CareersSlider3: {
            exclude: true
          },
          Collection: {
            exclude: true
          },
          FeedItem: {
            exclude: true
          },
          FeedItemType: {
            exclude: true
          },
          TeamMember: {
            exclude: true
          },
          User: {
            excludeFieldNames: null
          },
          Post: {
            limit: process.env.NODE_ENV === 'production' ? undefined : 20
          }
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'UA-74643563-11',
          'G-0BGG5V2W2K' // Unified GA4 tracking for tracking all web properties on the apollographql.com domain
        ]
      }
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: ['title', 'content'],
        resolvers: {
          WpPost: {
            title: (node) => decode(node.title),
            content: (node) => stripHtmlTags(node.content),
            excerpt: (node) => stripHtmlTags(node.excerpt),
            path: createPostPath,
            categories: (node, getNode) =>
              node.categories.nodes.map((category) => getNode(category.id)),
            author: (node) => node.author.node
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
              return query.allWpPost.nodes.map((node) => {
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
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-K95LDHB'
      }
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: [
          {
            query: queries.blog,
            transformer: ({data}) =>
              parse({
                data,
                baseUrl: data.site.siteMetadata.siteUrl
              }),
            indexName: '/blog',
            // only index when building for production on Netlify
            skipIndexing: process.env.CONTEXT !== 'production',
            settings: algoliaSettings.blog
          }
        ]
      }
    }
  ]
};
