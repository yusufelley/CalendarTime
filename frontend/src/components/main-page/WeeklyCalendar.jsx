import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import WeekCalendar from "react-week-calendar";
import moment from "moment";

import "react-week-calendar/dist/style.css";
import "./WeekCalendar.css";
import Header from "./Header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { fontSize } from "@mui/system";
import { SERVER_URL } from "../../config.js";
import { useQuery } from 'react-query';
import { useState, useEffect } from "react";
import { useEventContext } from '../../EventContext.jsx';



import { DeleteButton } from "../deleteButton/deleteButton.jsx";

const selectedEvents = [
  {
    start: moment().add(0, "days").hour(8).minute(0),
    end: moment().add(0, "days").hour(19).minute(0),
    name: "Take out trash",
    repeating: false,
    location: "Your location",
    description: "Attend the ball",
    color: "salmon",
  },
  {
    start: moment().add(1, "days").hour(10).minute(0),
    end: moment().add(1, "days").hour(14).minute(0),
    name: "Go to Class",
    repeating: false,
    location: "Your location",
    description: "Class is class is class is class is class",
    color: "lightblue",
  },
  {
    start: moment().add(2, "days").hour(10).minute(0),
    end: moment().add(2, "days").hour(13).minute(0),
    name: "Take out trash",
    repeating: false,
    location: "Your location",
    description: "Attend the local ball",
    color: "#CBC3E3",
  },
  {
    start: moment().add(6, "days").hour(8).minute(0),
    end: moment().add(6, "days").hour(10).minute(0),
    name: "Take out trash",
    repeating: false,
    location: "Your location",
    description: "Your description",
    color: "#CBC3E3",
  },
];

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

const fetchEventsURL = `${SERVER_URL}/event`;

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
    console.log(`Events fetched successfully:`, data);
    const updatedEvents = convertToMomentObjects(data);
    console.log(updatedEvents);
    return updatedEvents;
  } catch (err) {
    console.error(`An error has occurred while fetching events:`, err);
  }
};


// class WeekCalendarDep extends PureComponent {
  const WeekCalendarDep = () => {
    const [firstDay, setFirstDay] = useState(moment());
    const [selectedIntervals, setSelectedIntervals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalEvent, setModalEvent] = useState(null);

    const { data: events, refetch } = useQuery('events', fetchEvents, {
      onSuccess: (data) => {
        setSelectedIntervals(data);
      }
    });

    const { triggerFetch, resetTriggerFetch } = useEventContext();

    useEffect(() => {
      if (triggerFetch) {
        refetch();
        resetTriggerFetch();
      }
    }, [triggerFetch, refetch, resetTriggerFetch]);
    

    console.log("Selected Intervals: ", selectedIntervals);

  const startTime = moment().hour(0);
  const endTime = moment().hour(23);

  const goToNextWeek = () => {
    setFirstDay(prevDay => prevDay.clone().add(7, "days"));
  };

  const goToPreviousWeek = () => {
    setFirstDay(prevDay => prevDay.clone().subtract(7, "days"));
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
          goToNextWeek={goToNextWeek} // Use the function directly
          goToPreviousWeek={goToPreviousWeek} // Use the function directly
        />
        <WeekCalendar
          timeFormat={"h:mm a"}
          firstDay={firstDay} // Use the state variable
          startTime={startTime}
          endTime={endTime}
          scaleUnit={60}
          eventSpacing={15}
          selectedIntervals={selectedIntervals} // Use the state variable
          onEventClick={onEventClick} // Use the function directly
          eventComponent={EventComponent}
          useModal={false}
          cellHeight={40}
          dayFormat={"ddd \n DD"}
          className="week-calendar"
        />
        {/* {showModal && modalEvent && (
          <EventModal event={modalEvent} onClose={closeModal} />
        )} */}
      </div>
    );
}

const EventComponent = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Button
      style={{
        backgroundColor: props.color,
        borderRadius: "5px",
        height: "100%",
        width: "109%",
        alignContent: "center",
        color: "white",
        cursor: "pointer",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
        padding: "5px",
      }}
    >
      <Button
        onClick={handleOpen}
        style={{
          backgroundColor: props.color,
          // borderRadius: "5px",
          height: "100%",
          width: "100%",
          color: "white",
          cursor: "pointer",
          fontSize: 10,
          // boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
          // padding: "5px",
        }}
      >
        {props.name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Start: " + props.start.toLocaleString().substring(0, 21)}
            <br />
            {"End: " + props.end.toLocaleString().substring(0, 21)}
            <br />
            {props.description}
          </Typography>
          <DeleteButton
            type={"event"}
            id={props._id}
            closeModal={handleClose}
          />
        </Box>
      </Modal>
    </Button>
  );
};


export default WeekCalendarDep;
