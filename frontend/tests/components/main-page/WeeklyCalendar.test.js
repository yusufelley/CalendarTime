// WeeklyCalendar.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import WeekCalendarDep from '../../../src/components/main-page/WeeklyCalendar';
import moment from 'moment';

jest.mock('../../../src/components/main-page/Header', () => {
  return {
    __esModule: true,
    default: ({ goToNextWeek, goToPreviousWeek }) => (
      <div>
        <button onClick={goToNextWeek}>Next Week</button>
        <button onClick={goToPreviousWeek}>Previous Week</button>
      </div>
    ),
  };
});

jest.mock('react-week-calendar', () => {
  return {
    __esModule: true,
    default: () => <div>Week Calendar</div>,
  };
});
jest.mock('@mui/material/Modal', () => () => <div>Mocked Modal</div>);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      // Your mock event data
    ]),
    ok: true,
  })
);

describe('WeekCalendarDep', () => {
  it('renders correctly', () => {
    const { getByText } = render(<WeekCalendarDep />);
    expect(getByText('Week Calendar')).toBeInTheDocument();
  });

  it('navigates to the next week', () => {
    const { getByText } = render(<WeekCalendarDep />);
    const nextWeekButton = getByText('Next Week');
    fireEvent.click(nextWeekButton);
    // Assertions to check if the week has changed to next week
  });

  it('navigates to the previous week', () => {
    const { getByText } = render(<WeekCalendarDep />);
    const prevWeekButton = getByText('Previous Week');
    fireEvent.click(prevWeekButton);
    // Assertions to check if the week has changed to previous week
  });
  
  it('opens and closes the modal on event click', () => {
    render(<WeekCalendarDep />);
    // Simulate clicking an event to open the modal
    // Add assertions for the modal opening
    // Simulate closing the modal
    // Add assertions for the modal closing
  });

  // More tests here...
});
