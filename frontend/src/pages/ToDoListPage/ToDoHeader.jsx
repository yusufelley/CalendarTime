import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const ToDoHeader = () => {
  return (
    <AppBar position="static" sx={{backgroundColor:"#F76E72"}}>
      <Toolbar >
        <Typography variant="h6">
          My ToDo List
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ToDoHeader;
