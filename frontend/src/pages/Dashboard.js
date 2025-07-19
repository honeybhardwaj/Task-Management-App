import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Container, Typography, Box } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };
  const priorityData = ['High', 'Medium', 'Low'].map(level => ({
    name: level,
    value: tasks.filter(t => t.priority === level).length
  }));
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const completionRate = tasks.length ? (completedCount / tasks.length) * 100 : 0;
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-around" alignItems="center" gap={4}>
        <Box>
          <Typography variant="h6">Task Distribution</Typography>
          <PieChart width={300} height={200}>
            <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
              {priorityData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>
        <Box>
          <Typography variant="h6">Completion Rate</Typography>
          <BarChart width={300} height={150} data={[{ name: 'Tasks', value: completionRate }]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </Box>
      </Box>
    </Container>
  );
};
export default Dashboard;