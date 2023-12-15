import React from "react";
import CalendarItem from "./CalendarItem";

const CalendarEvent = ({ event }) => {
  return <CalendarItem item={event} itemType="event" />;
};

export default CalendarEvent;
