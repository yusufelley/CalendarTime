// DeleteButton.test.js


import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DeleteButton } from '../../../src/components/buttons/DeleteButton/DeleteButton'; // Update with the correct path
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();


beforeEach(() => {
 fetchMock.resetMocks();
});


describe('DeleteButton', () => {
   it('generates the correct delete URL and calls closeModal on success', async () => {
     const mockCloseModal = jest.fn();
     const mockType = 'course';
     const mockId = '123';
     // Include the port number in the expected URL
     const expectedUrl = `http://localhost:3000/${mockType}/${mockId}/event/${mockId}`;
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });
      render(<DeleteButton type={mockType} id={mockId} closeModal={mockCloseModal} />);
    
     fireEvent.click(screen.getByRole('button'));
     expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expect.anything());
     await screen.findByRole('button'); // Wait for the fetch to resolve
     expect(mockCloseModal).toHaveBeenCalledTimes(1);
   });


});
