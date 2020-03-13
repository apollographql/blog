const {stripHtmlTags} = require('./src/utils');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        protocol: isProduction ? 'https' : 'http',
        baseUrl: isProduction
          ? process.env.WORDPRESS_URL_PROD
          : process.env.WORDPRESS_URL_DEV,
        restApiRoutePrefix: 'wp-json/'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-74643563-9'
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
