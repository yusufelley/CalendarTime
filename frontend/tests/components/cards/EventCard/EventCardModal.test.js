// EventCardModal.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCardModal from '../../../../src/components/cards/EventCard/EventCardModal'; 
import EventForm from '../../../../src/components/forms/EventForm'; 
import { DeleteButton } from '../../../../src/components/buttons/DeleteButton/DeleteButton'; 


jest.mock('../../../../src/components/forms/EventForm', () => () => <div>Mocked EventForm</div>);
jest.mock('../../../../src/components/buttons/DeleteButton/DeleteButton', () => () => <button>Delete Event</button>);


describe('EventCardModal', () => {
 const mockEvent = {
   _id: '1',
   name: 'Test Event'
 };


 it('renders correctly when open', () => {
   const handleClose = jest.fn();
   render(<EventCardModal open={true} onClose={handleClose} event={mockEvent} />);
  
   expect(screen.getByText('Mocked EventForm')).toBeInTheDocument();
   expect(screen.getByText('Delete Event')).toBeInTheDocument();
 });


 it('calls onClose when the modal is closed', () => {
   const handleClose = jest.fn();
   render(<EventCardModal open={true} onClose={handleClose} event={mockEvent} />);
  
   // Assuming the modal can be closed by clicking on its backdrop
   fireEvent.click(document.querySelector('.MuiBackdrop-root'));
   expect(handleClose).toHaveBeenCalledTimes(1);
 });


 // Additional tests...
});
