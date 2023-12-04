import React from "react";
import WeeklyCalendarGrid from "./CalendarGrid.js";
import Settings from "./Settings.js";
import ToDoList from "./ToDoList.js";

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
      componentToRender = <WeeklyCalendarGrid />;
  }

  return <div className="content-grid">{componentToRender}</div>;
};

export default ContentGrid;
