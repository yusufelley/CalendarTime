import React from "react";
import { useState } from "react";
import PageSelector from "./pages/pageManagement/PageSelector.jsx";
import PageDisplayer from "./pages/pageManagement/PageDisplayer.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { EventProvider } from "./EventContext";
import { TaskProvider } from "./TaskContext.jsx";

const queryClient = new QueryClient();

function App() {
  const WEEKLY_CALENDAR_PAGE = 2;
  const [selectedPage, setSelectedPage] = useState(WEEKLY_CALENDAR_PAGE);
  return (
    <EventProvider>
      <TaskProvider>
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <PageSelector
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <div className="main-content">
              <PageDisplayer selectedPage={selectedPage} />
            </div>
          </div>
        </QueryClientProvider>
      </TaskProvider>
    </EventProvider>
  );
}

export default App;
