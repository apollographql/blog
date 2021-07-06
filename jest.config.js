// https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js'
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  // note about gatsby-plugin-mdx: https://chrisotto.dev/gatsby-change-from-md-to-mdx/#jest-snapshot-test-stopped-working
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/loadershim.js'],
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx}',
    '**/netlify/**/*.{js,jsx}',
    '!**/__tests__/**'
  ]
};
