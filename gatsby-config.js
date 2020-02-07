module.exports = {
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl:
          process.env.NODE_ENV === 'production'
            ? process.env.WORDPRESS_URL_PROD
            : process.env.WORDPRESS_URL_DEV
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ]
};
