import "./App.css";
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
        <Header />
        <ContentGrid selectedPage={selectedPage} />
      </div>
    </div>
  );
}

export default App;
