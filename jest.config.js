module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/bin.ts',
    '!src/bin*/index.ts',
    '!src/lib/log.ts',
    '!src/option.ts',
  ],
  coverageReporters: ['html', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 82,
      lines: 87,
      statements: 86,
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  setupFiles: ['<rootDir>/test/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/test/scenarios/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  },
};
