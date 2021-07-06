const pagesWP = require('./mock-wp');
const {parse} = require('../algolia-transform.js');
const baseUrl = 'https://www.apollographql.com/blog/';

const wpRecs = parse({
  data: {
    pagesWP: pagesWP.data.pagesWP
  },
  baseUrl
});

test('parse WP', () => {
  expect(wpRecs.length).toBeGreaterThan(0);

  expect(wpRecs[0].url.includes(baseUrl)).toBe(true);

  expect(wpRecs[0]).toEqual(
    expect.objectContaining({
      objectID: expect.any(String),
      index: expect.any(Number),
      url: expect.any(String),
      categories: expect.any(Array),
      date: expect.any(String),
      title: expect.any(String),
      excerpt: expect.any(String),
      text: expect.any(String),
      link: expect.any(String)
    })
  );
});
