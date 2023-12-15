import React, { useState } from 'react';
import TaskEventContainer from "./components/create/TaskEventContainer";
import LeftPanel from './components/main-page/LeftPanel.jsx';
import Header from './components/main-page/Header.jsx';
import ContentGrid from './components/main-page/ContentGrid.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { EventProvider } from './EventContext';

const queryClient = new QueryClient();


function App() {
  const [selectedPage, setSelectedPage] = useState(2);
  return (
    <EventProvider>
      <QueryClientProvider client={queryClient}>
      <div className="app">
        <LeftPanel selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        <div className="main-content">
          {/* <Header /> */}
          <ContentGrid selectedPage={selectedPage} />
        </div>
      </div>
      </QueryClientProvider>
    </EventProvider>

  );
}

export default App;
