import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse, AuthContextType } from '../types/auth';
import { authApi } from '../utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedToken = localStorage.getItem('ssp_token');
    const storedRole = localStorage.getItem('ssp_role');
    const storedStatus = localStorage.getItem('ssp_status');
    
    if (storedToken && storedRole && storedStatus) {
      setToken(storedToken);
      // Try to get current user from backend
      loadCurrentUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadCurrentUser = async (authToken: string) => {
    try {
      const userData = await authApi.getCurrentUser();
      setUser(userData);
      setToken(authToken);
    } catch (error) {
      console.error('Failed to load current user:', error);
      // Clear invalid session
      clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.login(username, password);
      
      // Store session info
      localStorage.setItem('ssp_token', response.token);
      localStorage.setItem('ssp_role', response.role);
      localStorage.setItem('ssp_status', response.status);
      
      setToken(response.token);
      setUser(response.user);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.register(username, password);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    clearSession();
    setUser(null);
    setToken(null);
  };

  const clearSession = (): void => {
    localStorage.removeItem('ssp_token');
    localStorage.removeItem('ssp_role');
    localStorage.removeItem('ssp_status');
  };

  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};