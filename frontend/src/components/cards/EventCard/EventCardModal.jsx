import { useState } from "react";
import { Button, Box, Typography, Chip, Stack } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import EventCardModal from "./EventCardModal.jsx";

// The EventCard component displays an individual event card.
const EventCard = (event) => {
  // State to manage the open status of the modal
  const [open, setOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  return (
    // The main container for the event card
    <Box
      style={{
        backgroundColor: event.color,
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
      {/* Button to open the modal */}
      <Button
        onClick={handleOpen}
        style={{
          backgroundColor: event.color,
          height: "100%",
          width: "100%",
          color: "white",
          cursor: "pointer",
          fontSize: 10,
        }}
      >
        {/* Stack to arrange contents vertically */}
        <Stack>
          {/* Conditionally display the priority chip if priority is not low */}
          {event.priority !== "low" && (
            <Chip
              icon={event.priority === "high" && <PriorityHighIcon />}
              label={
                event.priority === "high" ? "High Priority" : "Medium Priority"
              }
              sx={{
                color: "white",
                borderColor: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
              size="small"
              variant="outlined"
            />
          )}
          {/* Event name */}
          <Typography variant="subtitle1" component="div">
            {event.name}
          </Typography>
        </Stack>
      </Button>
      {/* Modal to display event details */}
      <EventCardModal open={open} onClose={handleClose} event={event} />
    </Box>
  );
};

export default EventCard;
