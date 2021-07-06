const pagesWP = require('./mock-wp');
const {parse} = require('../algolia-transform.js');
const baseUrl = 'https://www.apollographql.com/blog';

test('parse WP', async () => {
  const wpRecs = await parse({
    data: {
      pagesWP: pagesWP.data.pagesWP
    },
    baseUrl
  });

  const firstPost = wpRecs[0];

  expect(wpRecs.length).toBe(15);
  expect(firstPost.url.startsWith(baseUrl)).toBe(true);
  expect(firstPost).toEqual(
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
