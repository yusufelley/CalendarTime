import "./App.css";
import TaskEventContainer from "./components/create/TaskEventContainer";
import LeftPanel from './components/main-page/LeftPanel.jsx';
import Header from './components/main-page/Header.jsx';
import ContentGrid from './components/main-page/ContentGrid.jsx';

function App() {
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
