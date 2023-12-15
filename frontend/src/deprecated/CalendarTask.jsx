import React from 'react';
import CalendarItem from './CalendarItem';

const CalendarTask = ({ task }) => {
  return <CalendarItem item={task} itemType="task" />;
};

export default CalendarTask;
