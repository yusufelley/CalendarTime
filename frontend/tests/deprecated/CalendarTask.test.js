// CalendarTask.test.js

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarTask from '../../src/deprecated/CalendarTask'; 
import CalendarItem from '../../src/deprecated/CalendarItem'; 

jest.mock('../../src/deprecated/CalendarItem', () => {
  return jest.fn(() => <div>Mocked CalendarItem</div>);
});

describe('CalendarTask', () => {
  it('passes task and itemType to CalendarItem', () => {
    const mockTask = { id: 1, title: 'Test Task', deadline: '2021-01-01T00:00:00Z' };
    render(<CalendarTask task={mockTask} />);

    expect(CalendarItem).toHaveBeenCalledWith(
      {
        item: mockTask,
        itemType: 'task'
      },
      expect.anything()
    );
  });
});
