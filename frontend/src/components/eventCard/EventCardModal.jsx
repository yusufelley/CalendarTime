import { Modal, Box, Typography } from "@mui/material";
import { DeleteButton } from "../deleteButton/deleteButton.jsx";

const EventCardModal = ({ open, onClose, event }) => {
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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={"modal-modal-title"}
      aria-describedby={"modal-modal-description"}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {event.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {"Start: " + event.start.toLocaleString().substring(0, 21)}
          <br />
          {"End: " + event.end.toLocaleString().substring(0, 21)}
          <br />
          {event.description}
        </Typography>
        <DeleteButton type={"event"} id={event._id} closeModal={onClose} />
      </Box>
    </Modal>
  );
};

export default EventCardModal;
