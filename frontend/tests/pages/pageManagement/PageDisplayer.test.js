// PageDisplayer.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageDisplayer from '../../../src/pages/pageManagement/PageDisplayer'; 
import WeekCalendarDep from '../../../src/pages/WeeklyCalendarPage/WeeklyCalendar';
import Settings from '../../../src/pages/SettingsPage/Settings';
import ToDoList from '../../../src/pages/ToDoListPage/ToDoList';

jest.mock('../../../src/pages/WeeklyCalendarPage/WeeklyCalendar', () => () => <div>Mocked WeekCalendar</div>);
jest.mock('../../../src/pages/SettingsPage/Settings', () => () => <div>Mocked Settings</div>);
jest.mock('../../../src/pages/ToDoListPage/ToDoList', () => () => <div>Mocked ToDoList</div>);

describe('PageDisplayer', () => {
  it('renders WeekCalendar by default', () => {
    const { getByText } = render(<PageDisplayer />);
    expect(getByText('Mocked WeekCalendar')).toBeInTheDocument();
  });

  it('renders ToDoList when selectedPage is 3', () => {
    const { getByText } = render(<PageDisplayer selectedPage={3} />);
    expect(getByText('Mocked ToDoList')).toBeInTheDocument();
  });

  it('renders Settings when selectedPage is 4', () => {
    const { getByText } = render(<PageDisplayer selectedPage={4} />);
    expect(getByText('Mocked Settings')).toBeInTheDocument();
  });
});
