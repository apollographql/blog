module.exports = {
  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Wordpress',
        fieldName: 'wordpress',
        url:
          process.env.NODE_ENV === 'production'
            ? process.env.API_URL_PROD
            : process.env.API_URL_DEV
      }
    }
  ]
};
