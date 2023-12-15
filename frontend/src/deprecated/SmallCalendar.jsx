import React from 'react'
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function SmallCalendar() {
  const [value, onChange] = useState(new Date());

  // Custom styles for the calendar
  const calendarStyles = {
    fontFamily: "Inter",
    backgroundColor: "#fff",
    borderRadius: "18px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    color: "#7F00FC",
  };

  return (
    <div style={calendarStyles}>
      <Calendar
        onChange={onChange}
        value={value}
        navigationLabel={({ date }) => (
          <span style={{ color: "#7F00FC" }}>
            {date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        )}
      />
    </div>
  );
}

export default SmallCalendar;
