import { useState } from "react";
import { Button } from "@mui/material";
import EventCardModal from "./EventCardModal.jsx";

const EventCard = (event) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Button
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
        {event.name}
      </Button>
      <EventCardModal open={open} onClose={handleClose} event={event} />
    </Button>
  );
};

export default EventCard;
