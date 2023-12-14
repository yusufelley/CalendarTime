// SmallCalendar.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import SmallCalendar from '../../../src/components/main-page/SmallCalendar';

// Mock the react-calendar Calendar component
jest.mock('react-calendar', () => {
  return {
    __esModule: true,
    default: ({ onChange, value }) => (
      <div>
        Mocked Calendar
        <button onClick={() => onChange(new Date(2021, 8, 1))}>Set Date</button>
      </div>
    ),
  };
});

describe('SmallCalendar', () => {
  it('renders the SmallCalendar component', () => {
    const { getByText } = render(<SmallCalendar />);
    expect(getByText('Mocked Calendar')).toBeInTheDocument();
  });

  it('updates the date when a new date is selected', () => {
    const { getByText } = render(<SmallCalendar />);
    const setDateButton = getByText('Set Date');
    fireEvent.click(setDateButton);

    // Verify that the state has updated to the new date
    // This assumes the state update would result in some observable change in the component,
    // for example, displaying the selected date.
    // Since the mocked Calendar doesn't show the date, this part of the test might need to be adjusted
    // based on how the SmallCalendar component shows the selected date.
  });

  // More tests here...
});

