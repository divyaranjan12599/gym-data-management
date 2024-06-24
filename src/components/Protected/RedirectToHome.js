import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const RedirectToHome = () => {
  const { userAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth.token) {
      navigate("/home");
    }
  }, [userAuth, navigate]);

  return null;
};

export default RedirectToHome;
