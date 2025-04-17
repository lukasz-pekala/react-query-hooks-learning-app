/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts", "tsx", "jsx"],
  rootDir: "client",
  testRegex: ".*\\.spec\\.(ts|tsx)$",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: "client/tsconfig.json",
      },
    ],
  },
  collectCoverageFrom: ["**/*.(t|j)s?(x)"],
  coverageDirectory: "../coverage/client",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@shared/(.*)$": "<rootDir>/../shared/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
