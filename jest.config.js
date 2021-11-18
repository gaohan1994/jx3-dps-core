module.exports = {
  roots: ['<rootDir>/src/test'],
  // testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
  testRegex: '/test/[^/]*(\\.js|\\.coffee|[^d]\\.ts)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
