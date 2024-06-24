import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const ProtectedRoute = ({ children }) => {
  const { userAuth, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (!userAuth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
