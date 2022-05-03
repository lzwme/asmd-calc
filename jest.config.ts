// @ts-check

/** @type {import('@jest/types').Config.InitialOptions } */
const config = {
  cache: true,
  //   preset: 'ts-jest',
  //   globals: {
  //     'ts-jest': {
  //       tsconfig: 'tsconfig.module.json',
  //     },
  //   },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],

  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/__test__/*.spec.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', 'src/cli.ts', 'src/index.ts', 'src/__test__'],
  collectCoverageFrom: ['src/**/!(*.d).ts'],
  maxWorkers: require('os').cpus().length,
  // watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
// module.exports = config;
export default config;
