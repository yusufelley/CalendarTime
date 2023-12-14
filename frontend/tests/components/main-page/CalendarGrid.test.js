// WeeklyCalendarGrid.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeeklyCalendarGrid from '../../../src/components/main-page/CalendarGrid';

describe('WeeklyCalendarGrid', () => {
  it('renders the WeeklyCalendarGrid component', () => {
    render(<WeeklyCalendarGrid />);
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
    // Check for other days too
  });

  it('navigates to the previous and next week', () => {
    render(<WeeklyCalendarGrid />);
    const nextWeekButton = screen.getByText('>');
    const prevWeekButton = screen.getByText('<');
    const weekSpan = screen.getByText('Week 1');

    // Navigate to next week
    fireEvent.click(nextWeekButton);
    expect(weekSpan).toHaveTextContent('Week 2');

    // Navigate to previous week
    fireEvent.click(prevWeekButton);
    expect(weekSpan).toHaveTextContent('Week 1');
  });

  it('displays events correctly', () => {
    render(<WeeklyCalendarGrid />);
    // Example: Checking if an event for "Monday at 8" is displayed
    const eventCell = screen.getByText('EVENT');
    expect(eventCell).toBeInTheDocument();
  });

  // More tests can be added here to cover other aspects of the component
});
