module.exports = {
  preset: '@nestjs/jest',
  testEnvironment: 'node',
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
};
