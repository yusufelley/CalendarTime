import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { TaskContext } from "../../TaskContext";

const CheckableList = () => {
  // State to manage checked items
  const { tasks, setTasks } = useContext(TaskContext);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (!newTodo) return;
    setTasks([...tasks, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <form
        onSubmit={addTodo}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
        }}
      >
        <TextField
          label="New Task"
          variant="outlined"
          size="small"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ backgroundColor: "#F76E72" }}
        >
          Add
        </Button>
      </form>

      <List>
        {tasks.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              color="primary"
            />
            <ListItemText
              primary={todo.text}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CheckableList;
