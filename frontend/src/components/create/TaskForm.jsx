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
    "#3498DB",
    "#27AE60",
    "#E74C3C",
    "#F1C40F",
    "#9B59B6",
    "#E67E22",
  ];

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} mt={2}>
      <TextField
        label="Task Name"
        name="taskName"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Stack direction={"row"} spacing={3}>
        <CustomDurationInput
          onChange={handleChange}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          duration={formData.estimatedDuration}
        />
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="split"
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
          name="minDuration"
          value={formData.minTimeBlock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Maximum Duration (mins)"
          type="number"
          name="maxDuration"
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
          name="dueDate"
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
