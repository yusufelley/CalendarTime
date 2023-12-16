import React, { useState } from "react";

const CheckableList = () => {
  // State to manage checked items
  const [checkedItems, setCheckedItems] = useState([]);
  // List of items
  const items = ["Take out trash", "Clean Room", "Study for Finals", "Relax"];

  // Function to handle checkbox changes
  const handleCheckboxChange = (item) => {
    const isChecked = checkedItems.includes(item);
    if (isChecked) {
      // Remove item if already checked
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item));
    } else {
      // Add item if not checked
      setCheckedItems([...checkedItems, item]);
    }
  };

  return (
    <div>
      <h2>To-do</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                value={item}
                checked={checkedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                style={{ marginRight: "4px" }}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckableList;
