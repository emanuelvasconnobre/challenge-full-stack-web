const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },

  testMatch: [
    "<rootDir>/src/**/tests/unit/**/*.test.ts",
  ],

  collectCoverageFrom: ["src/**/*Service.ts", "src/**/use-cases/*.ts"],

  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
