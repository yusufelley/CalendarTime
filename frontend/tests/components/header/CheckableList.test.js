// CheckableList.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckableList from '../../../src/components/Header/CheckableList';

describe('CheckableList', () => {
  it('renders the CheckableList component', () => {
    render(<CheckableList />);
    expect(screen.getByText('To-do')).toBeInTheDocument();
  });

  it('renders the correct number of list items', () => {
    render(<CheckableList />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('handles checkbox checking and unchecking', () => {
    render(<CheckableList />);

    // Test checking the checkbox
    const firstCheckbox = screen.getByLabelText('Take out trash');
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    // Test unchecking the checkbox
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });

 
});
