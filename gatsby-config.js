const {stripHtmlTags, createPostPath} = require('./src/utils');
const {decode} = require('he');
const {algoliaSettings} = require('apollo-algolia-transform');
const {transformer} = require('./algolia');

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
      resolve: 'gatsby-source-wordpress',
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
        trackingIds: ['UA-74643563-11', 'G-0BGG5V2W2K']
      }
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: ['title', 'content'],
        resolvers: {
          WpPost: {
            title: node => decode(node.title),
            content: node => stripHtmlTags(node.content),
            excerpt: node => stripHtmlTags(node.excerpt),
            path: createPostPath,
            categories: (node, getNode) =>
              node.categories.nodes.map(category => getNode(category.id)),
            author: node => node.author.node
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
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-M964NS9'
      }
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_WRITE_KEY,
        // only index when building for production on Netlify
        skipIndexing:
          process.env.CONTEXT !== 'production' &&
          process.env.SKIP_INDEXING !== 'false',
        queries: [
          {
            query: `{
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allWpPost {
                nodes {
                  id
                  title
                  content
                  excerpt
                  slug
                  path
                  date
                  categories {
                    nodes {
                      name
                    }
                  }
                }
              }
            }`,
            transformer,
            indexName: 'blog',
            settings: {
              ...algoliaSettings,
              customRanking: ['desc(date)', ...algoliaSettings.customRanking]
            }
          }
        ]
      }
    }
  ]
};
