import { useState, useEffect } from "react";
// import SmallCalendar from "../../deprecated/SmallCalendar.jsx";

const PageSelector = ({ selectedPage, setSelectedPage }) => {
  const [isMonthlyCalendarOpen, setIsMonthlyCalendarOpen] = useState(false);

  const handleMonthlyCalendarClick = () => {
    setIsMonthlyCalendarOpen(!isMonthlyCalendarOpen);
  };

  useEffect(() => {
    const closePopupOnOutsideClick = (event) => {
      if (
        isMonthlyCalendarOpen &&
        event.target.closest(".monthly-calendar-popup") === null
      ) {
        setIsMonthlyCalendarOpen(false);
      }
    };

    document.addEventListener("click", closePopupOnOutsideClick);

    return () => {
      document.removeEventListener("click", closePopupOnOutsideClick);
    };
  }, [isMonthlyCalendarOpen]);

  const handleButtonClick = (number) => {
    setSelectedPage(number);
  };

  return (
    <div className="left-panel">
      <div className="button-container">
        <button className="lp-button">
          <div style={{ textAlign: "left" }}>
            <img src="https://picsum.photos/200/300" alt="User Profile" />
          </div>
          <div className="user-details">
            <medium>Hi</medium>
            <span>John</span>
          </div>
        </button>
        <button
          className="lp-button"
          onClick={() => handleButtonClick(2)}
          style={{
            backgroundColor: selectedPage === 2 ? "#F76E72" : "transparent",
            color: selectedPage === 2 ? "white" : "black",
          }}
        >
          <iconify-icon
            icon="ion:calendar-outline"
            style={{ fontSize: "3em" }}
          ></iconify-icon>
          <br />
          Weekly Calendar
        </button>
        <button className="lp-button" onClick={() => handleButtonClick(3)}>
          <iconify-icon
            icon="icon-park-outline:list"
            style={{ fontSize: "3em" }}
          ></iconify-icon>
          <br />
          To-Do List
        </button>
        <button className="lp-button" onClick={() => handleButtonClick(4)}>
          <iconify-icon
            icon="basil:toggle-on-outline"
            style={{ fontSize: "3em" }}
          ></iconify-icon>
          <br />
          Settings
        </button>
        <button
          className="lp-button"
          id="monthlyCalendarBtn"
          onClick={handleMonthlyCalendarClick}
        >
          <iconify-icon
            icon="ph:calendar-duotone"
            style={{ fontSize: "3em" }}
          ></iconify-icon>
          <br />
          Monthly Calendar
        </button>
      </div>
      {isMonthlyCalendarOpen && (
        <div className="monthly-calendar-popup">{/* <SmallCalendar /> */}</div>
      )}
    </div>
  );
};

export default PageSelector;
