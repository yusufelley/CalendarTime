// database.test.js

import mongoose from 'mongoose';
import connectDB from '../../utils/database'; 

// Mock mongoose's connect method
jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDB', () => {
  let consoleSpy;
  let processExitSpy;

  beforeEach(() => {
    // Mock implementations for console.error and process.exit
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
  });

  afterEach(() => {
    // Restore original implementations after each test
    consoleSpy.mockRestore();
    processExitSpy.mockRestore();
    mongoose.connect.mockClear();
  });

  it('should connect to the database successfully', async () => {
    const mockUri = 'mongodb://localhost:27017/testdb';
    mongoose.connect.mockResolvedValue();

    await connectDB(mockUri);

    expect(mongoose.connect).toHaveBeenCalledWith(mockUri);
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(processExitSpy).not.toHaveBeenCalled();
  });

  it('should handle connection errors', async () => {
    const mockUri = 'mongodb://invalid-uri';
    const mockError = new Error('Connection failed');
    mongoose.connect.mockRejectedValue(mockError);
  
    try {
      await connectDB(mockUri);
    } catch (error) {
      // Error handling if necessary
    }
  
    expect(mongoose.connect).toHaveBeenCalledWith(mockUri);
    // Check that console.error was called with the error message string
    expect(consoleSpy).toHaveBeenCalledWith(mockError.message); 
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
