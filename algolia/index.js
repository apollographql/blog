const cheerio = require('cheerio');
const path = require('path');
const {
  MetricsFetcher,
  METRICS,
  createRecords
} = require('apollo-algolia-transform');

function getWpHeading(child, $) {
  const el = $(child);
  if (el.is(':header')) {
    return {
      title: el.text(),
      hash: '#' + el.find('a').attr('id'),
      depth: Number(child.name.match(/^h(\d)$/)[1])
    };
  }
}

async function transformer({data}) {
  let allGAData = {};
  if (process.env.NODE_ENV !== 'test') {
    const metricsFetcher = new MetricsFetcher({viewId: '154056458'});
    allGAData = await metricsFetcher.fetchAll();
  }

  const {site, allWpPost} = data;
  const {siteUrl} = site.siteMetadata;
  const records = allWpPost.nodes.flatMap((post) => {
    const url = siteUrl + post.path;
    const $ = cheerio.load(`<div id="root">${post.content}</div>`);

    return createRecords({
      children: $('#root > *').get(),
      // pass the cheerio instance to the WP heading function
      getHeading: (child) => getWpHeading(child, $),
      getText: (child) => $(child).text(),
      url,
      id: post.id,
      otherProperties: {
        type: 'blog',
        categories: post.categories.nodes.map((category) => category.name),
        title: post.title,
        slug: post.slug,
        date: post.date,
        pageviews: allGAData[url]?.[METRICS.uniquePageViews]
      }
    });
  });

  console.log('Created %s Algolia records', records.length);

  return records;
}

module.exports = {transformer};
