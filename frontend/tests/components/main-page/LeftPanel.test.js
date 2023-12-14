// LeftPanel.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeftPanel from '../../../src/components/main-page/LeftPanel';

// Mock the SmallCalendar component
jest.mock('../../../src/components/main-page/SmallCalendar.jsx', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked SmallCalendar</div>,
  };
});

// Mock iconify-icon
jest.mock('@iconify/react', () => {
  return {
    Icon: () => <span>Mocked Icon</span>,
  };
});

describe('LeftPanel', () => {
  it('renders the LeftPanel component', () => {
    render(<LeftPanel selectedPage={1} setSelectedPage={() => {}} />);
    expect(screen.getByText('Weekly Calendar')).toBeInTheDocument();
  });

  it('changes selected page on button click', () => {
    const setSelectedPageMock = jest.fn();
    render(<LeftPanel selectedPage={1} setSelectedPage={setSelectedPageMock} />);
    
    const weeklyCalendarButton = screen.getByText('Weekly Calendar');
    fireEvent.click(weeklyCalendarButton);
    expect(setSelectedPageMock).toHaveBeenCalledWith(2);
  });

  it('toggles monthly calendar on button click', () => {
    render(<LeftPanel selectedPage={1} setSelectedPage={() => {}} />);
    
    const monthlyCalendarButton = screen.getByText('Monthly Calendar');
    fireEvent.click(monthlyCalendarButton);
    expect(screen.getByText('Mocked SmallCalendar')).toBeInTheDocument();

    fireEvent.click(monthlyCalendarButton);
    expect(screen.queryByText('Mocked SmallCalendar')).not.toBeInTheDocument();
  });

  // Additional tests can be added here to cover other aspects of the component
});
