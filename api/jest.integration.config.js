const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },

  testMatch: [
    "<rootDir>/src/**/tests/integration/**/*.test.ts",
  ],

  collectCoverageFrom: ["src/**/*Controller.ts"],

  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testTimeout: 10000,
};
