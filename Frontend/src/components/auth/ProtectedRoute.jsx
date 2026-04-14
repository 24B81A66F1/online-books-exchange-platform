import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // NOTE: This is a simple token check via localStorage.
  // In a robust application, you might use a React Context with state verified by the backend.
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login page,
    // saving the current location they were trying to go to.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
