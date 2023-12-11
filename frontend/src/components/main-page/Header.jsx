// Header.js
import { Modal, Box } from "@mui/material";
import TaskEventContainer from "../create/TaskEventContainer";
import { useState } from "react";

import ArrowRight from '@material-ui/icons/ArrowForwardIos';
import ArrowLeft from '@material-ui/icons/ArrowBackIos';


const Header = ({ goToPreviousWeek, goToNextWeek }) => {
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  return (
    <div className="header">
      CalendarTime
      <div className="toggle-container">
        <button className="toggle" onClick={goToPreviousWeek} title="Previous Week">
        <ArrowLeft />
        </button>
        <button className="toggle" onClick={goToNextWeek} title="Next Week">
        <ArrowRight />
        </button>
        <button className="create-event" onClick={handleOpenCreate} title="Add Event/Task">
          Create
        </button>
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
      <Modal
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="create-task-event-modal"
        aria-describedby="modal-to-create-task-or-event"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TaskEventContainer />
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
