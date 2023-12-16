import React from 'react';
import WeekCalendar from "../WeeklyCalendarPage/WeeklyCalendar.jsx";
import Settings from "../SettingsPage/Settings.jsx";
import ToDoList from "../ToDoListPage/ToDoList.jsx";

// Responsible for displaying the selected page
const PageDisplayer = ({ selectedPage = 2 }) => {
  let componentToRender;

  switch (selectedPage) {
    case 3:
      componentToRender = <ToDoList />;
      break;
    case 4:
      componentToRender = <Settings />;
      break;
    default:
      componentToRender = <WeekCalendar />;
  }

  return <div className="content-grid">{componentToRender}</div>;
};

export default PageDisplayer;
