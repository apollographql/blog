const pagesWP = require('./mock-wp');
const {transformer} = require('../algolia-transform.js');

test('parse WP', async () => {
  const {0: firstPost, length} = await transformer(pagesWP);

  expect(length).toBe(20);
  expect(firstPost).toEqual(
    expect.objectContaining({
      objectID: expect.any(String),
      index: expect.any(Number),
      url: expect.any(String),
      slug: expect.any(String),
      categories: expect.any(Array),
      date: expect.any(String),
      title: expect.any(String),
      excerpt: expect.any(String),
      text: expect.any(String)
    })
  );
});
