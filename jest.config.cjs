/**
 * Base Jest configuration file.
 * This configuration serves as a foundation and may be extended by specific test configurations.
 * It's primarily maintained for compatibility with the Jest CLI's default config lookup.
 * For server-specific tests, use jest.server.config.cjs instead.
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "server",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
