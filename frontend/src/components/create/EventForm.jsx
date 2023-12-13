import { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { SERVER_URL } from "../../config.js";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    repeating: false,
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    color: undefined,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
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
  };

  const colors = [
    "#27AE60",
    "#E74C3C",
    "#3498DB",
    "#F1C40F",
    "#9B59B6",
    "#E67E22",
  ];

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} mt={2}>
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
        <Stack direction={"row"} spacing={"0.5rem"}>
          {colors.map((color, index) => (
            <Chip
              onClick={() =>
                setFormData((prevData) => ({ ...prevData, color }))
              }
              key={index}
              sx={{
                backgroundColor: color,
                borderRadius: "100%",
                height: formData.color == color ? "1.75rem" : "1.5rem",
                width: formData.color == color ? "1.75rem" : "1.5rem",
              }}
            />
          ))}
        </Stack>

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#F76E72" }}
        >
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

export default EventForm;
