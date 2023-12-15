import { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Chip,
  Typography,
} from "@mui/material";
import { SERVER_URL } from "../../config.js";
import ColorSelector from "./colorSelector.jsx";
import moment from "moment";
import { useEventContext } from "../../EventContext.jsx";

const EventForm = ({ event }) => {
  const [disable, setDisable] = useState(event ? true : false);
  
  const { triggerEventFetch } = useEventContext();
  
  const [formData, setFormData] = useState({
    name: event?.name || "",
    repeating: event?.repeating || false,
    // using moment here to translate ISODateString to date that can be used by MUI
    date: moment(event?.date).format("YYYY-MM-DD") || "",
    startTime: event?.startTime || "",
    endTime: event?.endTime || "",
    location: event?.location || "",
    description: event?.description || "",
    color: event?.color || undefined,
  });


  const handleChange = (e) => {
    if (disable) return;
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    if (disable) return;
    e.preventDefault();
    const createEventURL = `${SERVER_URL}/event`;
    console.log(`sending event data to ${createEventURL}`, formData);
    fetch(createEventURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(`${createEventURL} responded with`, data))
      .catch((err) =>
        console.error(`An error has occured posting to ${createEventURL}`, err)
      );
      triggerEventFetch(); // Trigger event refetch after form submission

  };

  const handleUpdateEvent = () => {
    const updateEventURL = `${SERVER_URL}/event/${event._id}`;

    fetch(updateEventURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      {disable ? (
        <Typography variant="h4">{event.name}</Typography>
      ) : (
        <Stack direction={"row"} spacing={"1rem"}>
          <TextField
            label="Event Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="repeating"
                  checked={formData.repeating}
                  onChange={handleChange}
                />
              }
              label="Repeats"
            />
          </FormControl>
        </Stack>
      )}

      <Stack direction={"row"} spacing={3}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Stack>

      <Stack direction={"row"} spacing={"1rem"}>
        <TextField
          label="Start Time"
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="End Time"
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <ColorSelector handleChange={handleChange} disable={disable} />

        {disable ? (
          <Button
            onClick={() => {
              setDisable(false);
            }}
            variant="contained"
            sx={{ backgroundColor: "#F76E72" }}
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={event ? handleUpdateEvent : handleSubmit}
            variant="contained"
            sx={{ backgroundColor: "#F76E72" }}
          >
            {event ? "Update" : "Create"}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default EventForm;
