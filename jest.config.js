module.exports = {
  preset: '@shelf/jest-mongodb',
  verbose: true,
  testPathIgnorePatterns: [
    '/.next/',
    '/node_modules/',
    '/tests/',
    '/coverage/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
}
