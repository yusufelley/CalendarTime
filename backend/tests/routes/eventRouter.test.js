const request = require('supertest');
const express = require('express');
const { eventRouter } = require('../../routes/eventRouter');
const Event = require('../../models/EventSchema'); // Adjust the path as necessary
const app = express();

app.use(express.json());
app.use('/events', eventRouter);

// Mock the Event model methods
jest.mock('../../models/EventSchema', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  deleteOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));

describe('eventRouter', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  describe('GET /events', () => {
    it('should return all events', async () => {
      Event.find.mockResolvedValue([{ name: 'Event 1' }, { name: 'Event 2' }]);
      const res = await request(app).get('/events');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([{ name: 'Event 1' }, { name: 'Event 2' }]);
      expect(Event.find).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      Event.find.mockRejectedValue(new Error('Internal server error'));
      const res = await request(app).get('/events');
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Internal server error');
    });
  });

  // Add more tests for POST, GET by ID, DELETE, PUT...
});

