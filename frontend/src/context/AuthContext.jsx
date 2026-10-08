import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bms_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('bms_user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('bms_user');
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const data = res.data;
    localStorage.setItem('bms_token', data.token);
    const userData = {
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem('bms_user', JSON.stringify(userData));
    setToken(data.token);
    setUser(userData);
    return userData;
  };

  const register = async (fullName, email, password, phoneNumber) => {
    const res = await api.post('/auth/register', {
      fullName,
      email,
      password,
      phoneNumber,
    });
    const data = res.data;
    localStorage.setItem('bms_token', data.token);
    const userData = {
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem('bms_user', JSON.stringify(userData));
    setToken(data.token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('bms_token');
    localStorage.removeItem('bms_user');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user && user.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
