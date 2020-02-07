const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        https: isProduction,
        baseUrl: isProduction
          ? process.env.WORDPRESS_URL_PROD
          : process.env.WORDPRESS_URL_DEV
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ]
};
