// Header.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../src/components/Header/Header';

// Mock TaskEventContainer component
jest.mock('../../../src/components/Header/Header', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked TaskEventContainer</div>,
  };
});

// Optionally mock iconify-icon if necessary

describe('Header', () => {
  it('renders the Header component', () => {
    render(<Header goToPreviousWeek={() => {}} goToNextWeek={() => {}} />);
    expect(screen.getByText('CalendarTime')).toBeInTheDocument();
  });

  it('navigates to the previous week when previous week button is clicked', () => {
    const goToPreviousWeekMock = jest.fn();
    render(<Header goToPreviousWeek={goToPreviousWeekMock} goToNextWeek={() => {}} />);

    const prevWeekButton = screen.getByTitle('Previous Week');
    fireEvent.click(prevWeekButton);
    expect(goToPreviousWeekMock).toHaveBeenCalled();
  });

  it('navigates to the next week when next week button is clicked', () => {
    const goToNextWeekMock = jest.fn();
    render(<Header goToPreviousWeek={() => {}} goToNextWeek={goToNextWeekMock} />);

    const nextWeekButton = screen.getByTitle('Next Week');
    fireEvent.click(nextWeekButton);
    expect(goToNextWeekMock).toHaveBeenCalled();
  });

  it('opens the create event/task modal when create button is clicked', () => {
    render(<Header goToPreviousWeek={() => {}} goToNextWeek={() => {}} />);

    const createButton = screen.getByTitle('Add Event/Task');
    fireEvent.click(createButton);
    expect(screen.getByText('Mocked TaskEventContainer')).toBeInTheDocument();
  });


});
