import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';
import { tokenUtils } from '@/utils/cookies';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we have a token
        const token = tokenUtils.getToken();
        if (token) {
          // Try to get user profile with the token
          const response = await authAPI.getProfile();
          if (response.success && response.data) {
            const userData: User = {
              id: response.data.id.toString(),
              username: response.data.username,
              email: response.data.email,
            };
            setUser(userData);
            localStorage.setItem('admin_user', JSON.stringify(userData));
          }
        } else {
          // Check localStorage for saved user (fallback)
          const savedUser = localStorage.getItem('admin_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid tokens/data
        tokenUtils.removeToken();
        localStorage.removeItem('admin_user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      
      if (response.success && response.token && response.admin) {
        const { token, admin } = response;
        
        // Store token
        tokenUtils.setToken(token);
        
        // Create user object
        const userData: User = {
          id: admin.id.toString(),
          username: admin.username,
          email: admin.email,
        };
        
        setUser(userData);
        localStorage.setItem('admin_user', JSON.stringify(userData));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    tokenUtils.removeToken();
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};