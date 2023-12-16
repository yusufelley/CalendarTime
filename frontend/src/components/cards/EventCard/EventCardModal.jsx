import { Modal, Box } from "@mui/material";
import { DeleteButton } from "../../buttons/DeleteButton/DeleteButton.jsx";
import EventForm from "../../forms/EventForm.jsx";

const EventCardModal = ({ open, onClose, event }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "1rem",
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
        <EventForm event={event} />
        <DeleteButton type={"event"} id={event._id} closeModal={onClose} />
      </Box>
    </Modal>
  );
};

export default EventCardModal;
