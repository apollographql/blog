exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      allWordpressPost {
        nodes {
          id
          slug
        }
      }
    }
  `);

  const postTemplate = require.resolve('./src/components/post-template');
  data.allWordpressPost.nodes.forEach(post => {
    actions.createPage({
      path: '/' + post.slug,
      component: postTemplate,
      context: {
        id: post.id
      }
    });
  });
};
