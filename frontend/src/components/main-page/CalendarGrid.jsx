import React from "react";
import "./GoogleCalendarGrid.css"; // Import the CSS file

const WeeklyCalendarGrid = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const hoursOfDay = Array.from({ length: 24 * 4 }, (_, index) => index);

  // Example event data
  const events = [
    { day: "Monday", hour: 8, quarter: 0, title: "Meeting 1" },
    { day: "Wednesday", hour: 14, quarter: 3, title: "Meeting 2" },
    // Add more events as needed
  ];

  // Function to check if an event exists at a specific day, hour, and quarter
  const hasEvent = (day, hour, quarter) =>
    events.some(
      (event) =>
        event.day === day && event.hour === hour && event.quarter === quarter
    );

  return (
    <div className="weekly-calendar-container">
      <table>
        <thead>
          <tr>
            <th style={{ width: "10%" }}></th>
            {daysOfWeek.map((day, dayIndex) => (
              <th
                key={dayIndex}
                style={{ width: `${90 / daysOfWeek.length}%` }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursOfDay.map((timeSlot, timeIndex) => {
            const hour = Math.floor(timeSlot / 4);
            const quarter = (timeSlot % 4) * 15;

            return (
              <tr key={timeIndex}>
                <td className="hour-label">
                  {`${hour}:${quarter === 0 ? "00" : quarter}`}
                </td>
                {daysOfWeek.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={`calendar-cell ${
                      hasEvent(day, hour, timeSlot % 4) ? "has-event" : ""
                    }`}
                  ></td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendarGrid;
