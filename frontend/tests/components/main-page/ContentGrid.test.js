// ContentGrid.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentGrid from '../../../src/components/main-page/ContentGrid';

// Mock child components
jest.mock('../../../src/components/main-page/WeeklyCalendar.jsx', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked WeekCalendar</div>,
  };
});

jest.mock('../../../src/components/main-page/Settings.jsx', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Settings</div>,
  };
});

jest.mock('../../../src/components/main-page/ToDoList.jsx', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked ToDoList</div>,
  };
});

describe('ContentGrid', () => {
  it('renders WeekCalendar by default', () => {
    render(<ContentGrid />);
    expect(screen.getByText('Mocked WeekCalendar')).toBeInTheDocument();
  });

  it('renders ToDoList when selectedPage is 3', () => {
    render(<ContentGrid selectedPage={3} />);
    expect(screen.getByText('Mocked ToDoList')).toBeInTheDocument();
  });

  it('renders Settings when selectedPage is 4', () => {
    render(<ContentGrid selectedPage={4} />);
    expect(screen.getByText('Mocked Settings')).toBeInTheDocument();
  });

  // Additional tests can be added here for any other logic or behavior that ContentGrid might have.
});
