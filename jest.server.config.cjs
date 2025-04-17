/**
 * Server-specific Jest configuration.
 * This configuration is used exclusively for server-side tests via the `test:server` npm script.
 * It includes proper module resolution for shared code between client and server.
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
        tsconfig: "tsconfig.json",
      },
    ],
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage/server",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/../shared/$1",
  },
};
