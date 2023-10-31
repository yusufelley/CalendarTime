import { useState } from "react";
import TaskForm from "./TaskForm"; // Assuming these paths are correct
import EventForm from "./EventForm";

const TaskEventContainer = () => {
  const [isEvent, setIsEvent] = useState(false);

  return (
    <div>
      <div className="toggle-form">
        <label>
          <input
            type="checkbox"
            checked={isEvent}
            onChange={() => setIsEvent((prev) => !prev)}
          />
          Toggle to {isEvent ? "Task" : "Event"}
        </label>
      </div>

      {isEvent ? <EventForm /> : <TaskForm />}
    </div>
  );
};

export default TaskEventContainer;
