// CalendarItem.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarItem from '../../src/deprecated/CalendarItem'; // Update with the correct path

describe('CalendarItem', () => {
  it('renders event details correctly', () => {
    const mockEvent = {
      title: 'Test Event',
      when: { date: '2021-01-01T00:00:00Z', time: '10:00 AM' },
      location: 'Test Location',
      description: 'Test Description',
      color: '#FF0000'
    };

    render(<CalendarItem item={mockEvent} itemType="event" />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText(`Time: ${new Date(mockEvent.when.date).toLocaleString()} at ${mockEvent.when.time}`)).toBeInTheDocument();
    expect(screen.getByText('Location: Test Location')).toBeInTheDocument();
    expect(screen.getByText('Description: Test Description')).toBeInTheDocument();
  });

  it('renders task details correctly', () => {
    const mockTask = {
      title: 'Test Task',
      deadline: '2021-01-01T00:00:00Z',
      maxTimeBlock: 60,
      estimatedTimeToCompletion: 2,
      description: 'Test Task Description',
      color: '#00FF00'
    };

    render(<CalendarItem item={mockTask} itemType="task" />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(`Deadline: ${new Date(mockTask.deadline).toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText('Max Time Block: 60 minutes')).toBeInTheDocument();
    expect(screen.getByText('Estimated Time to Completion: 2 hours')).toBeInTheDocument();
    expect(screen.getByText('Description: Test Task Description')).toBeInTheDocument();
  });

  // Additional tests...
});
