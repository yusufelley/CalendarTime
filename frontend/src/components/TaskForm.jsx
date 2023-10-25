import { useState } from "react";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    duration: "",
    split: false,
    minDuration: "",
    maxDuration: "",
    startDate: "",
    dueDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data, e.g., send to an API or update state
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input
          type="text"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
        />
      </label>

      <label>
        Duration (in hours):
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </label>

      <label>
        Split task?
        <input
          type="checkbox"
          name="split"
          checked={formData.split}
          onChange={handleChange}
        />
      </label>

      <label>
        Minimum Duration (in hours):
        <input
          type="number"
          name="minDuration"
          value={formData.minDuration}
          onChange={handleChange}
        />
      </label>

      <label>
        Maximum Duration (in hours):
        <input
          type="number"
          name="maxDuration"
          value={formData.maxDuration}
          onChange={handleChange}
        />
      </label>

      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </label>

      <button type="submit">Create</button>
    </form>
  );
};

export default TaskForm;
