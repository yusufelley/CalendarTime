// Settings.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../../../src/pages/SettingsPage/Settings';

// Mock the Header component
jest.mock('../../../src/components/Header/Header', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Header</div>,
  };
});

describe('Settings', () => {
  it('renders the Settings component', () => {
    render(<Settings />);
    expect(screen.getByText('SETTINGS')).toBeInTheDocument();
  });

  it('renders the Header component', () => {
    render(<Settings />);
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });

  // Add more tests here as needed
  // For example, if your Settings component interacts with other components or has specific logic,
  // you should add tests to ensure that these interactions and logic work as expected.
});

