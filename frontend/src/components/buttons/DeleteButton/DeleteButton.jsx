import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SERVER_URL } from "../../../config/config.js";

// DeleteButton component that takes 'type', 'id', and 'closeModal' as props
const DeleteButton = ({ type, id, closeModal }) => {
  // Function to generate the delete URL based on 'type' and 'id'
  const generateURL = () => {
    let url = `${SERVER_URL}/${type}/${id}`;
    if (type === "course") {
      url += `/event/${id}`;
    } else if (type === "semester") {
      url += `/task/${id}`;
    } else {
      console.error(
        "Type not defined for delete button. URL could not be created.",
        type,
        id
      );
    }
    return url;
  };

  // Function to handle the delete action
  const handleDelete = () => {
    const url = generateURL();
    console.log(`Attempting to delete ${type} with ID (${id}) at ${url}`);
    
    // Sending a DELETE request to the generated URL
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => closeModal()) // Closing the modal after successful deletion
      .catch((err) => console.error(`ERROR: Deleting ${type} with ID (${id})`, err));
  };

  return (
    // IconButton with a click event handler that triggers the delete action
    <IconButton onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButton;
