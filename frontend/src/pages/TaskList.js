import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { Container, Box, Typography, TextField, List, ListItem, ListItemText, Button, Stack } from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchTasks();
  }, [search]);
  const fetchTasks = async () => {
    const res = await API.get(`/tasks?search=${search}`);
    setTasks(res.data);
  };
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Tasks</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField label="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} fullWidth />
        <Button variant="contained" component={Link} to="/task/new">+ New Task</Button>
      </Stack>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id} secondaryAction={<Button component={Link} to={`/task/edit/${task._id}`}>Edit</Button>}>
            <ListItemText primary={task.title} secondary={`${task.priority} | ${task.isCompleted ? '✅ Completed' : '❌ Pending'}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
export default TaskList;