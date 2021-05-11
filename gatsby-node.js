const slugify = require('slugify');

const PAGE_SIZE = 10;

exports.createResolvers = ({createResolvers, getNode}) => {
  createResolvers({
    WpPost: {
      path: {
        type: 'String',
        resolve(node) {
          let prefix = '';
          if (node.categories.nodes.length) {
            const categories = node.categories.nodes.map((category) =>
              getNode(category.id)
            );
            const topic = categories.find((category) => category.wpParent);
            if (topic) {
              const category = getNode(topic.wpParent.node.id);
              const topicSlug = slugify(topic.name).toLowerCase();
              prefix = `/${category.slug}/${topicSlug}`;
            } else {
              prefix = '/' + categories[0].slug;
            }
          }
          return prefix + node.uri;
        }
      }
    },
    WpCategory: {
      path: {
        type: 'String',
        resolve(node) {
          const prefix = node.wpParent
            ? slugify(node.name).toLowerCase() +
              '/' +
              getNode(node.wpParent.node.id).slug
            : node.slug;
          return `/${prefix}/`;
        }
      }
    }
  });
};

exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      allWpPost {
        nodes {
          id
          path
          categories {
            nodes {
              id
              wpParent {
                node {
                  id
                }
              }
            }
          }
        }
      }
      allWpCategory(filter: {slug: {ne: "uncategorized"}}) {
        nodes {
          id
          name
          path
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
  data.allWpPost.nodes.forEach((post) => {
    actions.createPage({
      path: post.path,
      component: postTemplate,
      context: {
        id: post.id,
        categoriesIn: post.categories.nodes.flatMap((category) =>
          category.wpParent
            ? [category.id, category.wpParent.node.id]
            : [category.id]
        )
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
        path: category.path + (i + 1),
        component: categoryTemplate,
        context: {
          id: category.id,
          categories,
          limit: PAGE_SIZE,
          skip: PAGE_SIZE * i
        }
      });
    }
  });

  const authorTemplate = require.resolve('./src/components/author-template');
  data.allWpUser.nodes.forEach((author) => {
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
