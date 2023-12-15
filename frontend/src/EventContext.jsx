// EventContext.js
import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [triggerFetch, setTriggerFetch] = useState(false);

  const triggerEventFetch = () => {
    setTriggerFetch(true);
  };

  const resetTriggerFetch = () => {
    setTriggerFetch(false);
  };

  return (
    <EventContext.Provider value={{ triggerFetch, triggerEventFetch, resetTriggerFetch }}>
      {children}
    </EventContext.Provider>
  );
};
