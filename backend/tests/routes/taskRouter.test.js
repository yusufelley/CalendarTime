// taskRouter.test.js

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { taskRouter } = require('../../routes/taskRouter');

const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);

// Mock the Task model methods
jest.mock('../../models/TaskSchema', () => {
  return {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
});

// Import the Task model after it's been mocked
const Task = require('../../models/TaskSchema');

describe('taskRouter', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    Task.find.mockClear();
    Task.findById.mockClear();
    Task.create.mockClear();
    Task.findByIdAndUpdate.mockClear();
    Task.findByIdAndDelete.mockClear();
  });

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      Task.find.mockResolvedValue([{ name: 'Task 1' }, { name: 'Task 2' }]);
      const res = await request(app).get('/tasks');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([{ name: 'Task 1' }, { name: 'Task 2' }]);
      expect(Task.find).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      Task.find.mockRejectedValue(new Error('Internal server error'));
      const res = await request(app).get('/tasks');
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Internal server error');
    });
  });

  // Tests for POST /tasks and other routes...
});

// Continue with other describe blocks and their respective tests
