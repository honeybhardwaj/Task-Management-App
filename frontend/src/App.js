import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/task/new" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
        <Route path="/task/edit/:id" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
      </Routes>
    </>
  );
}
export default App;
