// TaskForm.test.js


import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../../../src/components/forms/TaskForm'; // Update with the correct path
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();


beforeEach(() => {
 fetchMock.resetMocks();
});


describe('TaskForm', () => {
 it('renders correctly with all fields', () => {
   render(<TaskForm />);
   expect(screen.getByLabelText('Task Name')).toBeInTheDocument();
   expect(screen.getByLabelText('Minimum Duration (mins)')).toBeInTheDocument();
   // Check for other fields...
 });


 it('updates fields on user input', () => {
   render(<TaskForm />);


   fireEvent.change(screen.getByLabelText('Task Name'), {
     target: { value: 'New Task' }
   });
   expect(screen.getByLabelText('Task Name').value).toBe('New Task');
   // Test other fields similarly...
 });


 it('sends a POST request on form submission', async () => {
   const mockFormData = {
     name: 'New Task',
     deadline: '',
     startDate: '',
     description: '',
     estimatedDuration: 0,
     minTimeBlock: '',
     maxTimeBlock: '',
     canSplit: false,
     color: undefined,
   };
   const createTaskURL = 'http://localhost:3000/task'; // Update the URL to match the one used in the component
   fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });
    render(<TaskForm />);
   fireEvent.change(screen.getByLabelText('Task Name'), { target: { value: mockFormData.name } });
   // Update other fields similarly if necessary...
    fireEvent.click(screen.getByText('Create'));
   expect(fetchMock).toHaveBeenCalledWith(createTaskURL, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(mockFormData)
   });
 });
  // Additional tests...
});
