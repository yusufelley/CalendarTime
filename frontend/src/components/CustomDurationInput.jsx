import { TextField, IconButton, InputAdornment } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CustomDurationInput = ({
  onChange,
  onIncrement,
  onDecrement,
  duration,
}) => {
  return (
    <TextField
      label="Duration"
      type="number"
      name="duration"
      value={parseInt(duration)}
      onChange={onChange}
      margin="normal"
      InputProps={{
        autoComplete: "off",
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={onDecrement}>
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onIncrement}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomDurationInput;
