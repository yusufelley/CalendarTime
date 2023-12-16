import React, { useState } from 'react';
import ToDoHeader from './ToDoHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const ToDoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Call the doctor', completed: false },
    { id: 3, text: 'Finish React project', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (event) => {
    event.preventDefault();
    if (!newTodo) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <ToDoHeader />
      <form onSubmit={addTodo} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px' }}>
        <TextField
          label="New Task"
          variant="outlined"
          size="small"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" sx={{backgroundColor:"#F76E72"}}>
          Add
        </Button>
      </form>
      <List>
        {todos.map(todo => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
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
            <ListItemText primary={todo.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ToDoList;