// PageSelector.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageSelector from '../../../src/pages/pageManagement/PageSelector';

describe('PageSelector', () => {
  it('changes selected page on button click', () => {
    const mockSetSelectedPage = jest.fn();
    render(<PageSelector selectedPage={2} setSelectedPage={mockSetSelectedPage} />);

    fireEvent.click(screen.getByText('To-Do List'));
    expect(mockSetSelectedPage).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText('Settings'));
    expect(mockSetSelectedPage).toHaveBeenCalledWith(4);
  });
  

});
