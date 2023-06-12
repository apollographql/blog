const slugify = require('slugify');
const {decode} = require('he');

function trackCustomEvent({category, action, label, value}) {
  if (window.gtag) {
    window.gtag('event', action, {
      category,
      label,
      value
    });
  }
}

exports.trackCustomEvent = trackCustomEvent;
exports.stripHtmlTags = string => decode(string.replace(/(<([^>]+)>)/g, ''));

exports.createPostPath = (node, getNode) => {
  let prefix = '';
  const categories = node.categories.nodes
    .map(category => getNode(category.id))
    .filter(Boolean);

  if (categories.length) {
    const topic = categories.find(category => category.wpParent);
    if (topic) {
      const category = getNode(topic.wpParent.node.id);
      const topicSlug = slugify(topic.name).toLowerCase();
      prefix = `/${category.slug}/${topicSlug}`;
    } else {
      prefix = '/' + categories[0].slug;
    }
  }
  return prefix + node.uri;
};
