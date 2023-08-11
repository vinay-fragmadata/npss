const silent = process.argv.includes("--silent");

// Jest configuration

// https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
  // https://facebook.github.io/jest/docs/en/configuration.html#collectcoveragefrom-array

  collectCoverageFrom: [
    "/src/**/**/*.{tsx,ts}",
    "/src/**/*.ts",
    "!/src/stories/**/*.{ts,tsx}",
    "!/src/*.{ts,tsx}",
    "!/src/@types/**/*.*.{ts,tsx}",
    "/src/**/**/*.{jsx,js}",
    "/src/**/*.js",
    "!/src/stories/**/*.{js,jsx}",
    "!/src/*.{js,jsx}",
    "!/src/@types/**/*.*.{js,jsx}",
  ],

  // https://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string

  coverageDirectory: "<rootDir>/coverage", // [string]
  coverageReporters: ["lcov", "text", "text-summary"], // [array<string>]
  reporters: ["default", "./tools/coverage-total-reporter.js"],
  coverageThreshold: {
    "./src": {
      branches: 85,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  }, // [object]

  globals: {
    __DEV__: true,
    "ts-jest": {
      diagnostics: false,
    },
  },

  // The default extensions Jest will look for.
  // https://facebook.github.io/jest/docs/en/configuration.html#modulefileextensions-array-string

  moduleFileExtensions: ["tsx", "ts", "js", "jsx", "json", "node"], // A map from regular expressions to module names that allow to stub out resources,
  // like images or styles with a single module.

  moduleNameMapper: {
    "\\.(css|less|style|scss|sass|sss)$": "identity-obj-proxy",
  },

  modulePaths: ["node_modules", "/src"],
  clearMocks: true, // [boolean]
  setupFiles: ["<rootDir>/.environment"],
  setupFilesAfterEnv: ["<rootDir>/enzyme.config.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|ts|js)$",

  transform: {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest",
    "^(?!.*\\.(js|jsx|json|css|less|style|scss|sass|sss)$)":
      "<rootDir>/tools/lib/fileTransformer.js",
  },

  transformIgnorePatterns: ["/node_modules/"],
  silent, // [boolean],
  forceExit: true, // [boolean]
  maxConcurrency: 300,
};
