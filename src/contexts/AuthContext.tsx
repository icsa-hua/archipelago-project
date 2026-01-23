import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'professor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

// Hardcoded users
const USERS: Record<string, User & { password: string }> = {
  'student@archipelago.eu': {
    id: 'student-1',
    name: 'Maria Santos',
    email: 'student@archipelago.eu',
    password: 'student123',
    role: 'student',
    avatar: 'MS'
  },
  'professor@archipelago.eu': {
    id: 'professor-1',
    name: 'Dr. Jean Dupont',
    email: 'professor@archipelago.eu',
    password: 'professor123',
    role: 'professor',
    avatar: 'JD'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('archipelago_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    const foundUser = USERS[email];
    if (foundUser && foundUser.password === password) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('archipelago_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('archipelago_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
