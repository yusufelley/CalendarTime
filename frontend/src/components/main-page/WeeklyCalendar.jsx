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
import { DeleteButton } from "../deleteButton/deleteButton.jsx";
import EventCardModal from "../eventCard/eventCardModal.jsx";

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

class WeekCalendarDep extends PureComponent {
  componentDidMount() {
    fetchEvents()
      .then((eventsData) => {
        // Update the state with the fetched events
        this.setState({ selectedIntervals: eventsData });
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }

  state = {
    firstDay: moment(),
    // selectedIntervals: selectedEvents,
    selectedIntervals: [],
    showModal: false,
    modalEvent: null,
  };

  startTime = moment().hour(0);
  endTime = moment().hour(23);

  goToNextWeek = () => {
    this.setState(() => ({
      firstDay: this.state.firstDay.clone().add(7, "days"),
    }));
  };

  goToPreviousWeek = () => {
    this.setState(() => ({
      firstDay: this.state.firstDay.clone().subtract(7, "days"),
    }));
  };

  onEventClick = (event) => {
    this.setState({
      showModal: true,
      modalEvent: event,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalEvent: null,
    });
  };

  render() {
    const { showModal, modalEvent } = this.state;

    return (
      <div>
        <Header
          goToNextWeek={this.goToNextWeek}
          goToPreviousWeek={this.goToPreviousWeek}
        />
        <WeekCalendar
          timeFormat={"h:mm a"}
          firstDay={this.state.firstDay}
          startTime={this.startTime}
          endTime={this.endTime}
          scaleUnit={60}
          eventSpacing={15}
          selectedIntervals={this.state.selectedIntervals}
          onEventClick={this.onEventClick}
          eventComponent={EventComponent}
          useModal={false}
          cellHeight={40}
          dayFormat={"ddd \n DD"}
          className="week-calendar"
        />
        {/* {showModal && modalEvent && (
          <EventModal event={modalEvent} onClose={this.closeModal} />
        )} */}
      </div>
    );
  }
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

  console.log("open", open);
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
          height: "100%",
          width: "100%",
          color: "white",
          cursor: "pointer",
          fontSize: 10,
        }}
      >
        {props.name}
      </Button>
      <EventCardModal open={open} onClose={handleClose} event={props} />
    </Button>
  );
};

export default WeekCalendarDep;
