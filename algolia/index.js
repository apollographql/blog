const cheerio = require('cheerio');
const path = require('path');
const {MetricsFetcher, METRICS} = require('apollo-algolia-transform');
const {stripHtmlTags} = require('../src/utils');

async function transformer({data}) {
  try {
    let allGAData = {};
    if (process.env.NODE_ENV !== 'test') {
      const metricsFetcher = new MetricsFetcher({viewId: '154056458'});
      allGAData = await metricsFetcher.fetchAll();
    }

    const {site, allWpPost} = data;
    const {siteUrl} = site.siteMetadata;
    return allWpPost.nodes.map((post, index) => {
      const $ = cheerio.load(post.content);
      const headings = $(':header')
        .get()
        .reduce((acc, el) => {
          const tagName = el.name;
          const heading = $(el);
          const payload = [
            {
              title: heading.text(),
              url: '#' + heading.find('a').attr('id')
            }
          ];
          return {
            ...acc,
            [tagName]: acc[tagName] ? acc[tagName].concat(payload) : payload
          };
        }, {});

      const url = path.join(siteUrl, post.path);
      return {
        type: 'blog',
        categories: post.categories.nodes.map((category) => category.name),
        objectID: post.id,
        title: post.title,
        slug: post.slug,
        url,
        index,
        date: post.date,
        text: stripHtmlTags(post.content),
        excerpt: stripHtmlTags(post.excerpt),
        headings,
        pageviews: allGAData[url]?.[METRICS.uniquePageViews]
      };
    });
  } catch (err) {
    console.log('There was an error saving the records to Algolia');
    console.error(err);
  }
}

module.exports = {transformer};
