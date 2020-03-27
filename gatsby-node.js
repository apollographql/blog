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

const PAGE_SIZE = 10;

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
      allWordpressCategory(filter: {slug: {ne: "uncategorized"}}) {
        nodes {
          id
          slug
          name
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
  data.allWordpressCategory.nodes.forEach((category, index, categories) => {
    actions.createPage({
      path: '/category/' + category.slug,
      component: categoryTemplate,
      context: {
        ...category,
        categories
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

  const pageCount = Math.ceil(data.allWordpressPost.nodes.length / PAGE_SIZE);
  const archiveTemplate = require.resolve('./src/components/archive-template');
  for (let i = 0; i < pageCount; i++) {
    actions.createPage({
      path: '/archive/' + (i + 1),
      component: archiveTemplate,
      context: {
        limit: PAGE_SIZE,
        skip: PAGE_SIZE * i
      }
    });
  }
};
