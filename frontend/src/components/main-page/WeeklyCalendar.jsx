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

const selectedEvents = [
  {
    start: moment().add(0, "days").hour(8).minute(0),
    end: moment().add(0, "days").hour(19).minute(0),
    name: "Take out trash",
    repeating: false,
    location: "Your location",
    description: "Your description",
    color: "#FFFFFF",
  },
  {
    start: moment().add(1, "days").hour(10).minute(0),
    end: moment().add(1, "days").hour(11).minute(0),
    name: "Go to Class",
    repeating: false,
    location: "Your location",
    description: "Your description",
    color: "#FFFFFF",
  },
  {
    start: moment().add(2, "days").hour(10).minute(0),
    end: moment().add(2, "days").hour(11).minute(0),
    name: "Take out trash",
    repeating: false,
    location: "Your location",
    description: "Your description",
    color: "#FFFFFF",
  },
  {
    start: moment().add(6, "days").hour(8).minute(0),
    end: moment().add(6, "days").hour(10).minute(0),
    name: "Take out trash",
    repeating: false,
    location: "Your location",
    description: "Your description",
    color: "#FFFFFF",
  },
];

class WeekCalendarDep extends PureComponent {
  state = {
    firstDay: moment(),
    selectedIntervals: selectedEvents,
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

  return (
    
    <button
      style={{
        backgroundColor: "#039BE5",
        borderRadius: "5px",
        height: "90%",
        color: "white",
        cursor: "pointer",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
        padding: "5px",
      }}
    >
      <Button onClick={handleOpen}>{props.name}</Button>
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
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </button>
  );
};

// EventComponent.propTypes = {
//   start: PropTypes.instanceOf(moment).isRequired,
//   onEventClick: PropTypes.func.isRequired,
// };

// const EventModal = ({ event, onClose }) => (
//   <div
//     className="event-modal"
//     style={{ position: "absolute", top: event.top, left: event.left, zIndex: '-1' }}
//   >
//     {/* Customize modal content based on the event */}
//     <div>{`Event Start: ${event.start.format("LLLL")}`}</div>
//     <div>{`Event End: ${event.end.format("LLLL")}`}</div>
//     <div>{`Event End: ${event.name}`}</div>
//     <button onClick={onClose}>Close</button>
//   </div>
// );

// EventModal.propTypes = {
//   event: PropTypes.shape({
//     top: PropTypes.number.isRequired,
//     left: PropTypes.number.isRequired,
//     start: PropTypes.instanceOf(moment).isRequired,
//     end: PropTypes.instanceOf(moment).isRequired,
//   }),
//   onClose: PropTypes.func.isRequired,
// };

export default WeekCalendarDep;