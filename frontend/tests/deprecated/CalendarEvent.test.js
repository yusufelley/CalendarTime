// CalendarEvent.test.js

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarEvent from '../../src/deprecated/CalendarEvent'; 
import CalendarItem from '../../src/deprecated/CalendarItem'; 

jest.mock('../../src/deprecated/CalendarItem', () => {
  return jest.fn(() => <div>Mocked CalendarItem</div>);
});

describe('CalendarEvent', () => {
  it('passes event and itemType to CalendarItem', () => {
    const mockEvent = { id: 1, title: 'Test Event' };
    render(<CalendarEvent event={mockEvent} />);

    expect(CalendarItem).toHaveBeenCalledWith(
      {
        item: mockEvent,
        itemType: 'event'
      },
      expect.anything()
    );
  });
});
