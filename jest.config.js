module.exports = async () => {
  return {
    verbose: true,
    testMatch: [
      "<rootDir>/test/**/*.spec.js"
    ],
    moduleNameMapper: {
      "^aurelia-binding$": "<rootDir>/node_modules/aurelia-binding",
      "\\.(css|less)$": "identity-obj-proxy"
    },
    modulePaths: [
      "<rootDir>/src",
      "<rootDir>/node_modules"
    ],
    moduleFileExtensions: [
      "js",
      "json"
    ],
    transform: {
      "^.+\\.(css|less|sass|scss|styl|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
      "^.+\\.js$": "babel-jest",
      "^.+\\.jade$": "jest-transform-pug"
    },
    setupFiles: [
      "<rootDir>/test/jest-pretest.js"
    ],
    testEnvironment: "jsdom",
    collectCoverage: false,
    collectCoverageFrom: [
      "src/**/*.js",
      "!**/*.spec.js",
      "!**/node_modules/**",
      "!**/test/**"
    ],
    coverageDirectory: "<rootDir>/test/coverage-jest",
    coverageReporters: [
      "json",
      "lcov",
      "text",
      "html"
    ]
  }
}
