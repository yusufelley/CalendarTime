import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// Allows user to select the priority of their events
const PrioritySelector = ({ onSelect, disable, selectedPriority }) => {
  const [priority, setPriority] = useState(
    selectedPriority ? selectedPriority : ""
  );

  const handleChange = (event) => {
    if (disable) return;
    setPriority(event.target.value);
    const changePriorityEvent = {
      target: { name: "priority", value: event.target.value },
    };
    onSelect(changePriorityEvent);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="priority-select-label">Priority</InputLabel>
      <Select
        labelId="priority-select-label"
        id="priority-select"
        value={priority}
        label="Priority"
        onChange={handleChange}
      >
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PrioritySelector;
