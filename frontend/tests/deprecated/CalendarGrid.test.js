// WeeklyCalendarGrid.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeeklyCalendarGrid from '../../src/deprecated/CalendarGrid';

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
  
    const eventCell = screen.getByText('EVENT');
    expect(eventCell).toBeInTheDocument();
  });

});
