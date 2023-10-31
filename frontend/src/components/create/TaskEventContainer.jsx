import { useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import TaskForm from "./TaskForm";
import EventForm from "./EventForm";

const TaskEventContainer = () => {
  const [isEvent, setIsEvent] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "black",
        padding: "2rem",
        width: "30rem",
        borderRadius: "1rem",
      }}
    >
      <Typography>Add an event or task</Typography>
      <Box
        mt={2}
        mx={"auto"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFE2E3",
          padding: "0.5rem",
          width: "min-content",
          borderRadius: "3rem",
        }}
      >
        <ButtonGroup>
          <Button
            sx={{
              color: isEvent ? "white" : "black",
              backgroundColor: isEvent ? "#F76E72" : "",
              borderRadius: "3rem",
              width: "7rem",
            }}
            onClick={() => setIsEvent(true)}
            variant={isEvent ? "contained" : "text"}
          >
            Event
          </Button>
          <Button
            sx={{
              color: isEvent ? "black" : "white",
              backgroundColor: isEvent ? "" : "#F76E72",
              borderRadius: "3rem",
              width: "7rem",
            }}
            onClick={() => setIsEvent(false)}
            variant={isEvent ? "text" : "contained"}
          >
            Task
          </Button>
        </ButtonGroup>
      </Box>

      <Typography mt={2} variant="h3" fontWeight={500} align="left">
        {isEvent ? "New Event" : "New Task"}
      </Typography>
      {isEvent ? <EventForm /> : <TaskForm />}
    </Box>
  );
};

export default TaskEventContainer;
