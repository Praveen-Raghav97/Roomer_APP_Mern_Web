// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth.context';

const HomeProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default HomeProtectedRoute;
