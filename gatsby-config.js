const {stripHtmlTags} = require('./src/utils');

const isProduction = true; // process.env.NODE_ENV === 'production';

module.exports = {
  pathPrefix: '/blog',
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({query}) => {
              return query.allWordpressPost.nodes.map(node => ({
                title: node.title,
                description: node.excerpt,
                date: node.date,
                url: node.slug,
                guid: node.slug,
                custom_elements: [{'content:encoded': node.content}]
              }));
            },
            query: `
              {
                allWordpressPost {
                  nodes {
                    content
                    excerpt
                    title
                    date
                    slug
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Your Site's RSS Feed"
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        protocol: isProduction ? 'https' : 'http',
        baseUrl: isProduction
          ? process.env.WORDPRESS_URL_PROD
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
    }
  ]
};
