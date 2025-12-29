'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getToken } from '../lib/api';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (has token)
    const token = getToken();
    if (token) {
      // Token exists, but we don't have user info
      // In a real app, you might want to verify the token with the backend
      // For now, we'll just set loading to false
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await apiLogin(email, password);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const data = await apiSignup(email, password);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user || !!getToken(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

