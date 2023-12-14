// frontend/jest.config.js
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|less)$": "/Users/aeyan/Documents/520/CalendarTime/frontend/tests/__mocks__/styleMock.js"
  },
    // ... other configurations
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };  