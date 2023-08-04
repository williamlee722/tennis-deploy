import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode'; // npm install jwt-decode
const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = cookies.get('Auth_TOKEN');
    if (token) {
      try {
        const decodedUser = jwt_decode(token);
        setUser(decodedUser.username);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;