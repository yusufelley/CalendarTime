// frontend/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|less)$": "/Users/aeyan/Documents/520/CalendarTime/frontend/tests/__mocks__/styleMock.js"
  },
    // ... other configurations
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };  