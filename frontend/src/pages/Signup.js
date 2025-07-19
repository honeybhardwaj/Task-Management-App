import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import AuthContext from '../utils/AuthContext';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/signup', { email, password });
    login(res.data.token);
    navigate('/');
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>Signup</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth />
          <Button type="submit" variant="contained">Signup</Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default Signup;