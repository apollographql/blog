exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      wordpress {
        posts {
          nodes {
            id
            slug
          }
        }
      }
    }
  `);

  const postTemplate = require.resolve('./src/components/post-template.js');
  data.wordpress.posts.nodes.forEach(post => {
    actions.createPage({
      path: '/' + post.slug,
      component: postTemplate,
      context: {
        id: post.id
      }
    });
  });
};
