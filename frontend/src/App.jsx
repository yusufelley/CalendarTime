// import "./App.css";
// import CalendarEvent from "./components/CalendarEvent";
// import CalendarItem from "./components/CalendarItem";

// function App() {
//   const [count, setCount] = useState(0);
//   const dummyTask = {
//     title: "Complete React Assignment",
//     deadline: new Date(2023, 11, 5), // December 5, 2023
//     description: "Finish the calendar component for the project.",
//     maxTimeBlock: 120, // 120 minutes
//     estimatedTimeToCompletion: 5, // 5 hours
//     startDate: new Date(2023, 11, 1), // December 1, 2023
//     color: "salmon"
//   };

//   const dummyEvent = {
//     title: "Team Meeting",
//     repeating: false,
//     when: {
//       date: new Date(2023, 11, 3), // December 3, 2023
//       time: "15:00" // 3:00 PM
//     },
//     location: "Conference Room B",
//     description: "Weekly sync-up with the team.",
//     color: "#ADD8E6" // Gold color
//   };
  
//   return (
//     <div>
//       <h1>My Calendar</h1>
//       <div>
//         <h2>Tasks</h2>
//         <CalendarItem item={dummyTask} itemType="task" />
//       </div>
//       <div>
//         <h2>Events</h2>
//         <CalendarItem item={dummyEvent} itemType="event" />
//       </div>
import React, { useState } from 'react';
import TaskEventContainer from "./components/create/TaskEventContainer";
import LeftPanel from './components/main-page/LeftPanel.jsx';
import Header from './components/main-page/Header.jsx';
import ContentGrid from './components/main-page/ContentGrid.jsx';

function App() {
  const [selectedPage, setSelectedPage] = useState(2);
  return (
    // <>
    //   <h1>CalendarTime</h1>
    //   <TaskEventContainer />
    // </>
    <div className="app">
      <LeftPanel selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <div className="main-content">
        {/* <Header /> */}
        <ContentGrid selectedPage={selectedPage} />
      </div>
    </div>
  );
}

export default App;
