// Header.js
import * as React from 'react';
import { Modal, Box, Button } from "@mui/material";
import TaskEventContainer from "../create/TaskEventContainer";
import { useState } from "react";
import Typography from '@mui/material/Typography';
import CheckableList from './CheckableList';


import ArrowRight from '@material-ui/icons/ArrowForwardIos';
import ArrowLeft from '@material-ui/icons/ArrowBackIos';

const readMoreStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Header = ({ goToPreviousWeek, goToNextWeek }) => {
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const [openRead, setOpenRead] = React.useState(false);
  const handleOpenRead = () => setOpenRead(true);
  const handleCloseRead = () => setOpenRead(false);

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
          4 Tasks remaining for today
          <br />
          <Button onClick={handleOpenRead} className="read-more">{">"} Read More</Button>
          <Modal
            open={openRead}
            onClose={handleCloseRead}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
          <Box sx={readMoreStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <CheckableList />
            </Typography>
          </Box>
          </Modal>
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
// Header.js
