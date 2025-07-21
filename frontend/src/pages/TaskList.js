import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import {
  Button,
  Typography,
  TextField,
  Box,
  Modal,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, newStatus) => {
    try {
      await API.put(`/tasks/${id}`, { isCompleted: newStatus });
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const viewTask = async (id) => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setSelectedTask(res.data);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box maxWidth="md" mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>My Tasks</Typography>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search tasks..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => navigate('/task/new')}>+ NEW TASK</Button>
      </Box>
      {filteredTasks.map(task => (
        <Box key={task._id} mb={3}>
          <Typography variant="subtitle1"><strong>{task.title}</strong></Typography>
          <Typography variant="body2">
            {task.priority} |{' '}
            {task.isCompleted ? '✔️ Completed' : '❌ Pending'}
          </Typography>
          <Box mt={1} display="flex" gap={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleStatus(task._id, !task.isCompleted)}
            >
              {task.isCompleted ? 'Mark Pending' : 'Mark Complete'}
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => navigate(`/task/edit/${task._id}`)}
            >
              EDIT
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => viewTask(task._id)}
            >
              VIEW
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => deleteTask(task._id)}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      ))}

      <Modal open={open} onClose={handleCloseModal}>
        <Paper sx={{ p: 4, m: 'auto', mt: 10, maxWidth: 500 }}>
          {selectedTask ? (
            <>
              <Typography variant="h5" gutterBottom>Task Details</Typography>
              <Typography><strong>Title:</strong> {selectedTask.title}</Typography>
              <Typography><strong>Description:</strong> {selectedTask.description || '—'}</Typography>
              <Typography><strong>Priority:</strong> {selectedTask.priority}</Typography>
              <Typography><strong>Status:</strong> {selectedTask.isCompleted ? '✔️ Completed' : '❌ Pending'}</Typography>
              <Typography><strong>Due Date:</strong> {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleString() : '—'}</Typography>
              <Typography><strong>Created:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</Typography>
              <Typography><strong>Last Updated:</strong> {new Date(selectedTask.updatedAt).toLocaleString()}</Typography>
              <Button onClick={handleCloseModal} sx={{ mt: 2 }} variant="contained">Close</Button>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default TaskList;
