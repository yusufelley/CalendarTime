import React, { useState } from "react";

const CheckableList = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const items = ["Take out trash", "Clean Room", "Study for Finals", "Relax"];

  const handleCheckboxChange = (item) => {
    const isChecked = checkedItems.includes(item);
    if (isChecked) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    } else {
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
