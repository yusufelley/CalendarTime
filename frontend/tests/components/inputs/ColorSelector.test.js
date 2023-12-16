// ColorSelector.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorSelector from '../../../src/components/inputs/ColorSelector'; 


describe('ColorSelector', () => {
 it('renders the correct number of color chips', () => {
   render(<ColorSelector handleChange={() => {}} />);
   const chips = screen.getAllByRole('button');
   expect(chips.length).toBe(6); 
 });


 it('calls handleChange with the correct color when a chip is clicked', () => {
   const mockHandleChange = jest.fn();
   render(<ColorSelector handleChange={mockHandleChange} />);
  
   const firstChip = screen.getAllByRole('button')[0];
   fireEvent.click(firstChip);
  
   expect(mockHandleChange).toHaveBeenCalledWith({ target: { name: "color", value: "#27AE60" } });
 });


 it('does not call handleChange when disabled', () => {
   const mockHandleChange = jest.fn();
   render(<ColorSelector handleChange={mockHandleChange} disable={true} />);
  
   const firstChip = screen.getAllByRole('button')[0];
   fireEvent.click(firstChip);
  
   expect(mockHandleChange).not.toHaveBeenCalled();
 });


});
