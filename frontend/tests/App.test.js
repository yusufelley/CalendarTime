// App.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App'; 
describe('App', () => {
  it('renders PageSelector and PageDisplayer', () => {
    render(<App />);
    expect(screen.getByText('Weekly Calendar')).toBeInTheDocument();
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  
  });

  it('updates selectedPage on PageSelector button click', () => {
    render(<App />);

    // Assuming "To-Do List" is a button text in PageSelector
    fireEvent.click(screen.getByText('To-Do List'));
    // Check if PageDisplayer responds to the state change

  });

});
