const request = require('supertest');
const express = require('express');
const { eventRouter } = require('../../routes/eventRouter');
const Event = require('../../models/EventSchema');
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

  describe('POST /events', () => {
    it('should create a new event', async () => {
      const mockEvent = {
        name: 'New Event',
      };
      Event.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockEvent),
      }));
  
      const res = await request(app).post('/events').send(mockEvent);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(mockEvent);
      expect(Event.mock.instances[0].save).toHaveBeenCalled();
    });
  
    it('should handle validation errors', async () => {
      Event.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Validation Error')),
      }));
  
      const res = await request(app).post('/events').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation Error');
    });
  });
  
  describe('GET /events/:id', () => {
    it('should return a single event', async () => {
      const mockEvent = {
        _id: '1',
        name: 'Event 1',
      };
      Event.findById.mockResolvedValue(mockEvent);
  
      const res = await request(app).get(`/events/${mockEvent._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockEvent);
    });
  
    it('should handle event not found', async () => {
      Event.findById.mockResolvedValue(null);
  
      const res = await request(app).get('/events/1');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Cannot find event');
    });
  });
  
  describe('DELETE /events/:id', () => {
    it('should delete an event', async () => {
      Event.deleteOne.mockResolvedValue({ deletedCount: 1 });
  
      const res = await request(app).delete('/events/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Deleted Event');
    });
  
    it('should handle delete errors', async () => {
      Event.deleteOne.mockRejectedValue(new Error('Internal server error'));
  
      const res = await request(app).delete('/events/1');
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Internal server error');
    });
  });

});

