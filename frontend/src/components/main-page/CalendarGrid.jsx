import React, { useState } from "react";
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

  const hasEvent = (day, hour, quarter) =>
    events.some(
      (event) =>
        event.day === day && event.hour === hour && event.quarter === quarter
    );

  const [currentWeek, setCurrentWeek] = useState(1);

  const handleWeekChange = (newWeek) => {
    setCurrentWeek(newWeek);
  };

  return (
    <div className="weekly-calendar-container">
      <div className="week-navigation">
        <button
          onClick={() => handleWeekChange(currentWeek - 1)}
          disabled={currentWeek === 1}
        >
          {"<"}
        </button>
        <span>Week {currentWeek}</span>
        <button
          onClick={() => handleWeekChange(currentWeek + 1)}
          disabled={currentWeek === 52}
        >
          {">"}
        </button>
      </div>
      <div className="scrollable-calendar">
        <div className="scrollable-weeks">
          <div className="weeks-wrapper">
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
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarGrid;
