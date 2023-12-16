import { useState } from "react";
import { SERVER_URL } from "../../config/config.js";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import CustomDurationInput from "../inputs/CustomDurationInput.jsx";
import ColorSelector from "../inputs/ColorSelector.jsx";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    deadline: "",
    startDate: "",
    description: "",
    estimatedDuration: 0,
    minTimeBlock: "",
    maxTimeBlock: "",
    canSplit: false,
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
    const createTaskURL = `${SERVER_URL}/task`;
    console.log(`sending task data to ${createTaskURL}`, formData);
    fetch(createTaskURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(`${createTaskURL} responded with`, data))
      .catch((err) =>
        console.error(`An error has occured posting to ${createTaskURL}`, err)
      );
  };

  const handleIncrement = () => {
    setFormData((prevData) => ({
      ...prevData,
      estimatedDuration: parseInt(prevData.estimatedDuration) + 1,
    }));
  };

  const handleDecrement = () => {
    if (formData.duration <= 0) return;
    setFormData((prevData) => ({
      ...prevData,
      estimatedDuration: parseInt(prevData.estimatedDuration) - 1,
    }));
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <TextField
        label="Task Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Stack direction={"row"} spacing={3}>
        <CustomDurationInput
          name={"estimatedDuration"}
          onChange={handleChange}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          duration={formData.estimatedDuration}
        />
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="canSplit"
                checked={formData.canSplit}
                onChange={handleChange}
              />
            }
            label="Split task?"
          />
        </FormControl>
      </Stack>

      <Stack direction={"row"} spacing={"1rem"}>
        <TextField
          label="Minimum Duration (mins)"
          type="number"
          name="minTimeBlock"
          value={formData.minTimeBlock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Maximum Duration (mins)"
          type="number"
          name="maxTimeBlock"
          value={formData.maxTimeBlock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Stack>

      <Stack direction={"row"} spacing={"1rem"}>
        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Due Date"
          type="date"
          name="deadline"
          value={formData.deadline}
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
        <ColorSelector handleChange={handleChange} />

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

export default TaskForm;
