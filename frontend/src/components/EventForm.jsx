import { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    repeating: false,
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    color: "#ffffff",
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
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      {/* We can handle this later more advanced feature */}
      {/* <label>
        Repeating Event?
        <input
          type="checkbox"
          name="repeating"
          checked={formData.repeating}
          onChange={handleChange}
        />
      </label> */}

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>

      <label>
        Start Time:
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </label>

      <label>
        End Time:
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
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

      <label>
        Color:
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
