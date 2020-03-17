exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    wordpress__wp_usersAcf: {
      avatar: {
        type: 'wordpress__wp_media',
        resolve: (source, args, context) =>
          context.nodeModel.runQuery({
            query: {
              filter: {
                wordpress_id: {
                  eq: source.avatar_id
                }
              }
            },
            type: 'wordpress__wp_media',
            firstOnly: true
          })
      }
    }
  });
};

exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      allWordpressPost {
        nodes {
          wordpress_id
          slug
          categories {
            id
          }
        }
      }
      allWordpressCategory {
        nodes {
          id
          slug
        }
      }
      allWordpressWpUsers {
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
        wordpress_id: post.wordpress_id,
        categoriesIn: post.categories.map(category => category.id)
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

  const authorTemplate = require.resolve('./src/components/author-template');
  data.allWordpressWpUsers.nodes.forEach(author => {
    actions.createPage({
      path: '/author/' + author.slug,
      component: authorTemplate,
      context: {
        id: author.id
      }
    });
  });
};
