import React from "react";
import WeekCalendar from "react-week-calendar";
import moment from "moment";
import "react-week-calendar/dist/style.css";
import "./WeekCalendar.css";
import Header from "../../components/Header/Header.jsx";
import { SERVER_URL } from "../../config/config.js";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useEventContext } from "../../EventContext.jsx";
import EventCard from "../../components/cards/EventCard/EventCard.jsx";

const fetchEventsURL = `${SERVER_URL}/event`;

const convertToMomentObjects = (events) => {
  return events.map((event) => {
    const startDate = moment.utc(event.date).format("YYYY-MM-DD");
    const startMoment = moment(`${startDate}T${event.startTime}`);
    const endMoment = moment(`${startDate}T${event.endTime}`);

    return {
      ...event,
      start: startMoment,
      end: endMoment,
    };
  });
};

const fetchEvents = async () => {
  try {
    const response = await fetch(fetchEventsURL);
    if (!response.ok) {
      throw new Error(
        `Request to ${fetchEventsURL} failed with status ${response.status}`
      );
    }
    const data = await response.json();
    // Handle the retrieved events data here
    const updatedEvents = convertToMomentObjects(data);
    console.log(updatedEvents);
    return updatedEvents;
  } catch (err) {
    console.error(`An error has occurred while fetching events:`, err);
  }
};

const WeekCalendarDep = () => {
  const [firstDay, setFirstDay] = useState(moment());
  const [selectedIntervals, setSelectedIntervals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  const { data: events, refetch } = useQuery("events", fetchEvents, {
    onSuccess: (data) => {
      setSelectedIntervals(data);
    },
  });

  const { triggerFetch, resetTriggerFetch } = useEventContext();

  useEffect(() => {
    if (triggerFetch) {
      refetch();
      resetTriggerFetch();
    }
  }, [triggerFetch, refetch, resetTriggerFetch]);

  const calendarStartTime = moment().hour(0);
  const calendarEndTime = moment().hour(23);

  const goToNextWeek = () => {
    setFirstDay((prevDay) => prevDay.clone().add(7, "days"));
  };

  const goToPreviousWeek = () => {
    setFirstDay((prevDay) => prevDay.clone().subtract(7, "days"));
  };

  const onEventClick = (event) => {
    setShowModal(true);
    setModalEvent(event);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalEvent(null);
  };

  return (
    <div>
      <Header
        month={firstDay.format("MMMM YYYY")}
        goToNextWeek={goToNextWeek}
        goToPreviousWeek={goToPreviousWeek}
      />
      <WeekCalendar
        timeFormat={"h:mm a"}
        firstDay={firstDay}
        startTime={calendarStartTime}
        endTime={calendarEndTime}
        scaleUnit={60}
        eventSpacing={15}
        selectedIntervals={selectedIntervals}
        onEventClick={onEventClick}
        eventComponent={EventCard}
        useModal={false}
        cellHeight={40}
        dayFormat={"ddd \n DD"}
        className="week-calendar"
      />
    </div>
  );
};

export default WeekCalendarDep;
