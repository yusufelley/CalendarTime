// Header.js
import React from "react";

const Header = () => {
  return (
    <div className="header">
      CalendarTime
      <div className="toggle-container">
        <button className="toggle">Toggle Week</button>
        <button className="create-event">Create Event</button>
      </div>
      <div className="notification-bar">
        <div className="gradient-circle">
          <iconify-icon
            icon="ri:message-3-line"
            className="iconify-icon"
          ></iconify-icon>
        </div>
        <div style={{ fontSize: "large" }}>
          7 Tasks remaining for today
          <br />
          <button className="read-more">{">"} Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
