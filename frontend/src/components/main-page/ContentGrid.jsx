import React from "react";
import WeekCalendar from "./WeeklyCalendar.jsx";
import Settings from "./Settings.jsx";
import ToDoList from "./ToDoList.jsx";

const ContentGrid = ({ selectedPage = 2 }) => {
  let componentToRender;

  switch (selectedPage) {
    case 3:
      componentToRender = <ToDoList />;
      break;
    case 4:
      componentToRender = <Settings />;
      break;
    default:
      // componentToRender = <WeeklyCalendarGrid />;
      componentToRender = <WeekCalendar />;
  }

  return <div className="content-grid">{componentToRender}</div>;
};

export default ContentGrid;
