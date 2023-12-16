// CustomDurationInput.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomDurationInput from '../../../src/components/inputs/CustomDurationInput'; // Update with the correct path
import userEvent from '@testing-library/user-event';


describe('CustomDurationInput', () => {
 it('renders the input with the correct value', () => {
   render(<CustomDurationInput name="test-duration" duration="30" onChange={() => {}} onIncrement={() => {}} onDecrement={() => {}} />);
   expect(screen.getByLabelText('Duration').value).toBe('30');
 });


 // Additional tests for onChange functionality...
});
