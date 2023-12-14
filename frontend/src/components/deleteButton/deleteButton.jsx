import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SERVER_URL } from "../../config.js";

export const DeleteButton = ({ type, id, closeModal }) => {
  const generateURL = () => {
    let url = `${SERVER_URL}/${type}/${id}`;
    if (type == "course") {
      url += `/event/${id}`;
    } else if (type == "semester") {
      url += `task/${id}`;
    } else {
      console.error(
        "type not defined for delete button url could not be created",
        type,
        id
      );
    }
    return url;
  };

  const handleDelete = () => {
    const url = generateURL();
    console.log(`Attempting to delete ${type} with id (${id}) at ${url}`);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => closeModal())
      .catch((err) => console.error(`ERROR: deleting ${type} with id (${id})`));
  };

  return (
    <IconButton onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};
