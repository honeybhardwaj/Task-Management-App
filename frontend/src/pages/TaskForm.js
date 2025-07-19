import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api';
import { Container, Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => { if (id) fetchTask(); }, [id]);
  const fetchTask = async () => {
    const res = await API.get(`/tasks/${id}`);
    setTask(res.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    id ? await API.put(`/tasks/${id}`, task) : await API.post('/tasks', task);
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>{id ? 'Edit' : 'Create'} Task</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField label="Title" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} fullWidth required />
          <TextField label="Description" multiline rows={3} value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} fullWidth />
          <TextField type="date" label="Due Date" InputLabelProps={{ shrink: true }} value={task.dueDate?.split('T')[0]} onChange={e => setTask({ ...task, dueDate: e.target.value })} fullWidth />
          <TextField select label="Priority" value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })} fullWidth>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default TaskForm;