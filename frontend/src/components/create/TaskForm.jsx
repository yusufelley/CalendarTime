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
import CustomDurationInput from "../CustomDurationInput";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    duration: 0,
    split: false,
    minDuration: "",
    maxDuration: "",
    startDate: "",
    dueDate: "",
    description: "",
    color: "",
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
    console.log(formData);
  };

  const handleIncrement = () => {
    setFormData((prevData) => ({
      ...prevData,
      duration: prevData.duration + 1,
    }));
  };

  const handleDecrement = () => {
    if (formData.duration <= 0) return;
    setFormData((prevData) => ({
      ...prevData,
      duration: prevData.duration - 1,
    }));
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
      <TextField
        label="Task Name"
        name="taskName"
        value={formData.taskName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Stack direction={"row"} spacing={3}>
        <CustomDurationInput
          onChange={handleChange}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          duration={formData.duration}
        />
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="split"
                checked={formData.split}
                onChange={handleChange}
              />
            }
            label="Split task?"
          />
        </FormControl>
      </Stack>

      <Stack direction={"row"} spacing={"1rem"}>
        <TextField
          label="Minimum Duration (in hours)"
          type="number"
          name="minDuration"
          value={formData.minDuration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Maximum Duration (in hours)"
          type="number"
          name="maxDuration"
          value={formData.maxDuration}
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
          name="dueDate"
          value={formData.dueDate}
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

export default TaskForm;
