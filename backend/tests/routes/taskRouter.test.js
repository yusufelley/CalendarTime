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
  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const mockTask = {
        name: 'New Task',
        // Include other properties of the task...
      };
      Task.create.mockResolvedValue(mockTask);
  
      const res = await request(app).post('/tasks').send(mockTask);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(mockTask);
      expect(Task.create).toHaveBeenCalledWith(mockTask);
    });
  
    it('should handle validation errors', async () => {
      Task.create.mockRejectedValue(new Error('Validation Error'));
  
      const res = await request(app).post('/tasks').send({ name: '' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation Error');
    });
  });
  
  describe('GET /tasks/:id', () => {
    it('should return a single task by ID', async () => {
      const mockTask = {
        _id: '1',
        name: 'Task 1',
        // Include other properties of the task...
      };
      Task.findById.mockResolvedValue(mockTask);
  
      const res = await request(app).get(`/tasks/${mockTask._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockTask);
      expect(Task.findById).toHaveBeenCalledWith(mockTask._id);
    });
  
    it('should handle task not found', async () => {
      Task.findById.mockResolvedValue(null);
  
      const res = await request(app).get('/tasks/1');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Cannot find task');
    });
  });
  
  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      Task.findByIdAndDelete.mockResolvedValue({});
  
      const res = await request(app).delete('/tasks/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Deleted Task');
      expect(Task.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  
    it('should handle delete errors', async () => {
      Task.findByIdAndDelete.mockRejectedValue(new Error('Internal server error'));
  
      const res = await request(app).delete('/tasks/1');
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Internal server error');
    });
  });
});
