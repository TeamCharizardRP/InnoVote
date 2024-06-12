import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Check if user is authenticated
// const ProtectedRoute = ({ children, isAuthenticated }) => {
//   return isAuthenticated ? children : <Navigate to='/login' />;
// };

const ProtectedRoute = ({ children }) => {
  return useSelector((state) => state.auth.token) ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
