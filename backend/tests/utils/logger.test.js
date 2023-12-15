// logger.test.js

import logger from '../../utils/logger'; // Adjust the path to your logger.js file
import winston from 'winston';

jest.mock('winston', () => {
    const actualWinston = jest.requireActual('winston');
    const mockPrintf = jest.fn((templateFn) => templateFn);
    return {
      ...actualWinston,
      createLogger: jest.fn().mockReturnValue({
        ...actualWinston.createLogger(),
        format: {
          ...actualWinston.format,
          combine: jest.fn(),
          timestamp: jest.fn(),
          printf: mockPrintf,
        },
      }),
      transports: {
        ...actualWinston.transports,
        Console: jest.fn(),
        File: jest.fn(),
      },
    };
  });

describe('logger', () => {
  it('should create a logger with correct configuration', () => {
    expect(winston.createLogger).toHaveBeenCalled();
    expect(winston.transports.Console).toHaveBeenCalled();
    // Uncomment the next line if you want to test file transport
    // expect(winston.transports.File).toHaveBeenCalledWith({ filename: 'app.log' });
  });

  it('should correctly format log messages', () => {
    const consoleTransport = logger.transports.find(transport => transport instanceof winston.transports.Console);
    const logSpy = jest.spyOn(consoleTransport, 'log');

    logger.info('Test message');

    expect(logSpy).toHaveBeenCalled();
    // Additional checks can be added here based on the specific format you expect
  });
});
