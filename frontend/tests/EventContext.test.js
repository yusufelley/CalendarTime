// EventContext.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventProvider, useEventContext } from '../src/EventContext'; // Update with the correct path

// Test component that uses the EventContext
const TestComponent = () => {
  const { triggerFetch, triggerEventFetch, resetTriggerFetch } = useEventContext();

  return (
    <div>
      <div data-testid="triggerFetch">{triggerFetch ? 'true' : 'false'}</div>
      <button onClick={triggerEventFetch} data-testid="triggerButton">Trigger</button>
      <button onClick={resetTriggerFetch} data-testid="resetButton">Reset</button>
    </div>
  );
};

describe('EventContext', () => {
  it('should provide default values', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    expect(screen.getByTestId('triggerFetch').textContent).toBe('false');
  });

  it('should update triggerFetch when triggerEventFetch is called', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    fireEvent.click(screen.getByTestId('triggerButton'));
    expect(screen.getByTestId('triggerFetch').textContent).toBe('true');
  });

  it('should reset triggerFetch when resetTriggerFetch is called', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    // First, trigger the event
    fireEvent.click(screen.getByTestId('triggerButton'));
    // Then, reset it
    fireEvent.click(screen.getByTestId('resetButton'));
    expect(screen.getByTestId('triggerFetch').textContent).toBe('false');
  });
});
