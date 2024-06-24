import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const ProtectedRoute = ({ children }) => {
  const { userAuth, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a loading spinner or any loading component
  }

  if (!userAuth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
