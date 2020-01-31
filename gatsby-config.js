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
        url: 'http://localhost:10005/graphql'
      }
    }
  ]
};
