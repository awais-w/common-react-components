const config = {
  automock: false,
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 80,
      functions: 80,
      lines: 85,
    },
  },
  rootDir: '../../src',
  modulePaths: ['<rootDir>/node_modules', '/src/'],
  coverageDirectory: '<rootDir>/../coverage',
  transform: {
    '^.+\\.jsx?$': 'babel7-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/../node_modules/(?!(@argos/icons|@argos/utils|@cmc)/)',
    '<rootDir>/dist/',
    '<rootDir>/../tests/jest/',
  ],
  moduleFileExtensions: ['js', 'jsx'],
  setupTestFrameworkScriptFile: '<rootDir>/../node_modules/jest-enzyme/lib/index.js',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/../tests/jest/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/../tests/jest/__mocks__/styleMock.js',
  },
  testRegex: '(/__tests__/.*(^scenarios)|(\\.|/)(test|spec))\\.jsx?$',
  setupFiles: [
    '<rootDir>/../tests/jest/reactShim.js',
    '<rootDir>/../tests/jest/enzymeSetup.js',
    '<rootDir>/../tests/jest/fetchSetup.js',
    '<rootDir>/../tests/jest/polyfillSetup.js',
  ],
};

module.exports = config;
