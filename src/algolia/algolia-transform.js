const {parseFragment} = require('parse5');
const h2p = require('html2plaintext');
const {MetricsFetcher} = require('apollo-algolia-transform');

// GA metrics. Reference doc: https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/
const METRICS = {
  pageviews: 'ga:pageviews',
  uniquePageViews: 'ga:uniquePageViews',
  entranceRate: 'ga:entranceRate'
};

function pageToAlgoliaRecord({node}, baseUrl, allGAData) {
  const {content, ...rest} = node;
  let currentRec = {text: ''};
  const recsToSave = [];
  const headTags = ['h1', 'h2', 'h3', 'h4'];

  function cleanupAndAppendTextVal(value, currentTxt = '') {
    let newText = currentTxt;
    if (value && value !== '\n') {
      const val = value.replace(/(\r\n|\n|\r)/gm, '') || '';
      const currentTxtLen = currentTxt.length;
      if (val.length > 0) {
        if (currentTxtLen > 0) {
          if (currentTxt[currentTxtLen - 1] !== ' ' && val[0] !== ' ') {
            newText += ' ';
          }
        }
        newText += val;
      }
    }
    return newText;
  }

  function buildLink(value, slug) {
    const slugHead = value.replace(/\./g, '').replace(/ /g, '-').toLowerCase();
    return `${baseUrl}${slug}#${slugHead}`;
  }

  function splitForHeader(parent, value, rec) {
    // TODO fix nested elements in headers (like inlineCode)

    //removing headers that are "smaller" than the current one, eg if parent === h2 remove h3, h4 etc...
    const headings = {...rec.headings} || {};

    for (let i = headTags.indexOf(parent); i < headTags.length; i++) {
      delete headings[headTags[i]];
    }

    const recToPush = {...rec};

    headings[parent] = value;
    if (!recToPush.headings) {
      recToPush.headings = {};
    }

    return [
      recToPush,
      {
        text: '',
        headings,
        link: buildLink(value, node?.fields?.slug || node?.slug || '')
      }
    ];
  }

  function isHeader(parent) {
    return headTags.includes(parent) || parent.type === 'heading';
  }

  // TODO: extract code blocks into codeSnippet key
  function parseElem(parent, elem) {
    const {type, tagName, value, children, nodeName, childNodes} = elem;

    if (nodeName === '#text' || type === 'inlineCode' || type === 'text') {
      if (isHeader(parent) === false) {
        // just text, we append new chunk of text
        currentRec.text = cleanupAndAppendTextVal(value, currentRec.text);
      } else {
        // TODO: test here if header has multiple children

        // this is a header so we split
        const [recToPush, freshRec] = splitForHeader(parent, value, currentRec);

        // and we add rec to array for saving
        recsToSave.push({...recToPush});

        // reset with current headings state
        currentRec = {...freshRec};
      }
    } else if (children || childNodes) {
      // drill further down
      return children
        ? type === 'element' && traverseChildren(tagName, children)
        : traverseChildren(tagName, childNodes, 'HTMLfrag');
    }
  }

  function traverseChildren(parent, children, nodeType) {
    return {
      parent,
      children: children
        .map((child) => {
          return parseElem(parent, child, nodeType);
        })
        .filter((elem) => elem !== undefined)
    };
  }

  function getRecsAndReset(node, recs) {
    const {id, frontmatter, fields, categories, excerpt, ...rest} = node;
    const url = `${baseUrl}${node?.link || ''}`;

    const allRecs = recs.map((rec, index) => {
      return {
        objectID: `${id}_${index}`,
        index,
        type: 'blog',
        categories:
          categories?.nodes?.map((node) => node.name) || categories || [],
        url,
        excerpt: h2p(excerpt).slice(0, 100),
        pageviews: allGAData?.[url]?.[METRICS.uniquePageViews],
        ...frontmatter,
        ...fields,
        ...rest,
        ...rec
      };
    });
    return allRecs;
  }

  // start parsing
  if (content) {
    const htmlWPAst = parseFragment(content);
    traverseChildren(htmlWPAst, htmlWPAst?.childNodes || [], 'HTMLfrag');
  }

  // pushing the last record before starting the new page, if not empty
  if (currentRec.text.length) {
    recsToSave.push({...currentRec});
  }

  return getRecsAndReset(rest, recsToSave);
}

function parsePages(pages, baseUrl, allGAData) {
  return (
    pages?.edges?.flatMap((page) =>
      pageToAlgoliaRecord(page, baseUrl, allGAData)
    ) || []
  );
}

exports.parse = async function ({
  data: {pagesWP = []},
  baseUrl = 'https://www.apollographql.com/blog/',
  viewId = ''
}) {
  try {
    let allGAData = {};
    if (process.env.NODE_ENV !== 'test') {
      const metricsFetcher = new MetricsFetcher({viewId});
      allGAData = await metricsFetcher.fetchAll();
    }

    const allPages = parsePages(pagesWP, baseUrl, allGAData);
    console.log(`Saving ${allPages.length} records to Algolia`);

    return allPages;
  } catch (err) {
    console.log('There was an error saving the records to Algolia');
    console.error(err);
  }
};
