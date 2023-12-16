// ToDoList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoList from '../../../src/pages/ToDoListPage/ToDoList';

// Mock Header component
jest.mock('../../../src/components/Header/Header', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Header</div>,
  };
});

describe('ToDoList', () => {
  it('renders the ToDoList component', () => {
    render(<ToDoList />);
    expect(screen.getByText('TO DO LIST')).toBeInTheDocument();
  });

  it('renders the Header component', () => {
    render(<ToDoList />);
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });

  // Add more tests here as needed
  // For example, if your ToDoList component interacts with other components or has specific logic,
  // you should add tests to ensure that these interactions and logic work as expected.
});

