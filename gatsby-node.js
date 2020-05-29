const PAGE_SIZE = 10;

exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      allWpPost {
        nodes {
          databaseId
          slug
          categories {
            nodes {
              id
            }
          }
        }
      }
      allWpCategory(filter: {slug: {ne: "uncategorized"}}) {
        nodes {
          id
          slug
          name
          count
        }
      }
      allWpUser {
        nodes {
          id
          slug
        }
      }
    }
  `);

  const postTemplate = require.resolve('./src/components/post-template');
  data.allWpPost.nodes.forEach(post => {
    actions.createPage({
      path: '/' + post.slug,
      component: postTemplate,
      context: {
        databaseId: post.databaseId,
        categoriesIn: post.categories.nodes.map(category => category.id)
      }
    });
  });

  const categoryTemplate = require.resolve(
    './src/components/category-template'
  );
  data.allWpCategory.nodes.forEach((category, index, categories) => {
    const pageCount = Math.ceil(category.count / PAGE_SIZE);
    for (let i = 0; i < pageCount; i++) {
      actions.createPage({
        path: `/category/${category.slug}/${i + 1}`,
        component: categoryTemplate,
        context: {
          ...category,
          categories,
          limit: PAGE_SIZE,
          skip: PAGE_SIZE * i
        }
      });
    }
  });

  const authorTemplate = require.resolve('./src/components/author-template');
  data.allWpUser.nodes.forEach(author => {
    actions.createPage({
      path: '/author/' + author.slug,
      component: authorTemplate,
      context: {
        id: author.id
      }
    });
  });

  const pageCount = Math.ceil(data.allWpPost.nodes.length / PAGE_SIZE);
  const archiveTemplate = require.resolve('./src/components/archive-template');
  for (let i = 0; i < pageCount; i++) {
    actions.createPage({
      path: `/archive/${i + 1}`,
      component: archiveTemplate,
      context: {
        limit: PAGE_SIZE,
        skip: PAGE_SIZE * i
      }
    });
  }
};
