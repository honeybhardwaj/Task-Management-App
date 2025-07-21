import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import {
  Container,
  Typography,
  Box,
  Divider
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    priorityDistribution: [],
    completionTimeline: [],
    upcomingTasks: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get('/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  const { priorityDistribution, completionTimeline, upcomingTasks } = analytics;

  const events = upcomingTasks.map(task => ({
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
  }));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-around" alignItems="center" gap={4} mb={4}>
        <Box>
          <Typography variant="h6">Task Distribution</Typography>
          <PieChart width={300} height={200}>
            <Pie data={priorityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
              {priorityDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>

        <Box>
          <Typography variant="h6">Completion Rate Over Time</Typography>
          <ResponsiveContainer width={300} height={200}>
            <LineChart data={completionTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>Upcoming Deadlines</Typography>
      <Box>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
