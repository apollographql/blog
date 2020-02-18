exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      allWordpressPost {
        nodes {
          wordpress_id
          slug
        }
      }
      allWordpressCategory {
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
        wordpress_id: post.wordpress_id
      }
    });
  });

  const categoryTemplate = require.resolve(
    './src/components/category-template'
  );
  data.allWordpressCategory.nodes.forEach(category => {
    actions.createPage({
      path: '/category/' + category.slug,
      component: categoryTemplate,
      context: {
        id: category.id
      }
    });
  });
};
