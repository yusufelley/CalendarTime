import React from "react";
import WeeklyCalendarGrid from "./CalendarGrid.jsx";
import Settings from "./Settings.jsx";
import ToDoList from "./ToDoList.jsx";
import "./index2.css";

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
