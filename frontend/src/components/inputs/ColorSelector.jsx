import { useState } from "react";
import { Stack, Chip } from "@mui/material";

const ColorSelector = ({ handleChange, disable, color }) => {
  const [selectedColor, setSelectedColor] = useState(color);

  const colors = [
    "#27AE60",
    "#E74C3C",
    "#3498DB",
    "#F1C40F",
    "#9B59B6",
    "#E67E22",
  ];

  const handleSelect = (color) => {
    if (disable) return;
    setSelectedColor(color);
    const changeColorEvent = { target: { name: "color", value: color } };
    handleChange(changeColorEvent);
  };

  return (
    <Stack direction={"row"} spacing={"0.5rem"}>
      {colors.map((color, index) => (
        <Chip
          onClick={() => handleSelect(color)}
          key={index}
          sx={{
            backgroundColor: color,
            borderRadius: "100%",
            height: selectedColor == color ? "1.75rem" : "1.5rem",
            width: selectedColor == color ? "1.75rem" : "1.5rem",
          }}
        />
      ))}
    </Stack>
  );
};

export default ColorSelector;
