const {stripHtmlTags} = require('./src/utils');
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
    {
      resolve: 'gatsby-plugin-apollo-onetrust',
      options: {
        autoBlockSrc: process.env.OT_AUTOBLOCK_SRC,
        otSDKStubSrc: process.env.OT_SDKSTUB_SRC,
        dataDomainScript: process.env.OT_DATA_DOMAIN_SCRIPT
      }
    },
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
        // todo: remove ua property in the nearish future
        trackingIds: ['UA-74643563-11', 'G-0BGG5V2W2K', 'G-EE5WGLBMK6']
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: /* GraphQL */ `
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
            query: /* GraphQL */ `
              {
                allWpPost(
                  filter: {
                    categories: {
                      nodes: {
                        elemMatch: {
                          slug: {nin: ["retail", "financial-services"]}
                        }
                      }
                    }
                  }
                ) {
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
        id: process.env.GTM_CONTAINER_ID
      }
    },
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        allowList: ['ALGOLIA_APP_ID', 'ALGOLIA_SEARCH_KEY']
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
            query: /* GraphQL */ `
              {
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
              }
            `,
            transformer,
            indexName: 'blog',
            settings: {
              ...algoliaSettings,
              customRanking: ['desc(date)', ...algoliaSettings.customRanking]
            }
          }
        ]
      }
    },
    'gatsby-plugin-sitemap'
  ]
};
