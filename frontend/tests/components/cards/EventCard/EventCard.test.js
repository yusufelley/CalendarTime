// EventCard.test.js


import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCard from '../../../../src/components/cards/EventCard/EventCard'; 
import EventCardModal from '../../../../src/components/cards/EventCard/EventCardModal'; 

jest.mock('../../../../src/components/cards/EventCard/EventCardModal', () => (props) => (
 props.open ? <div>Mocked EventCardModal</div> : null
));


describe('EventCard', () => {
 const mockEvent = {
   name: 'Test Event',
   color: '#FF0000'
 };


 it('displays the event name', () => {
   render(<EventCard {...mockEvent} />);
   expect(screen.getByText('Test Event')).toBeInTheDocument();
 });


 it('opens EventCardModal on click', () => {
   render(<EventCard {...mockEvent} />);


   const cardButton = screen.getByRole('button', { name: 'Test Event' });
   fireEvent.click(cardButton);


   expect(screen.getByText('Mocked EventCardModal')).toBeInTheDocument();
 });


});
