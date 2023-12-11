import React, { useState } from "react";
// import "./GoogleCalendarGrid.css"; 

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

  const hoursOfDay = Array.from({ length: 24 }, (_, index) => index);
  console.log(hoursOfDay);
  // Example event data
  const events = [
    { day: "Monday", hour: 8, title: "Meeting 1" },
    { day: "Wednesday", hour: 14, title: "Meeting 2" },
    // Add more events as needed
  ];

  const hasEvent = (day, hour) =>
    events.some(
      (event) =>
        event.day === day && event.hour === hour
    );

  const [currentWeek, setCurrentWeek] = useState(1);

  console.log("Testing hasEvent func ", hasEvent("Monday", 8)); 

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
                      {/* Add the date  */}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hoursOfDay.map((hour, timeIndex) => {
                  // const hour = Math.floor(hour / 4);
                  // const quarter = (hour % 4) * 15;

                  return (
                    <tr key={timeIndex}>
                      <td className="hour-label">
                        {/* {`${hour}:${quarter === 0 ? "00" : quarter}`} */}
                        {`${hour}:${ "00"}`}
                      </td>
                      {daysOfWeek.map((day, dayIndex) => (
                        <td
                          key={dayIndex}
                          className={`calendar-cell ${
                            hasEvent(day, hour) ? "has-event" : ""
                          }`}
                        >{hasEvent(day, hour) ? "EVENT" : ""}</td>
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
