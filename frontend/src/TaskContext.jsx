import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Call the doctor", completed: false },
    { id: 3, text: "Finish React project", completed: false },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
