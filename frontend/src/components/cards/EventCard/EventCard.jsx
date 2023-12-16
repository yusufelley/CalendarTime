import React from "react";
import { useState } from "react";
import { Button, Box, Typography, Chip, Stack } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import EventCardModal from "./EventCardModal.jsx";

// Reusable event card component
const EventCard = (event) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
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
        <Stack>
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
          <Typography variant="subtitle1" component="div">
            {event.name}
          </Typography>
        </Stack>
      </Button>
      <EventCardModal open={open} onClose={handleClose} event={event} />
    </Box>
  );
};

export default EventCard;
