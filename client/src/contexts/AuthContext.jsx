import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
const AuthContext = createContext({ "user": null, "login": null, "logout": null, "register": null });

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.verifyToken(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);


const login = async (email, password) => {
  const response = await authService.login(email, password);
  console.log(response, "what is the full response");
     const { token, ...user } = response;

  localStorage.setItem('token', token);
  setUser(user);
};


  const register = async (name, email, password) => {
      const response = await authService.register(name, email, password);
     const { token, ...user } = response;
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    setUser

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;