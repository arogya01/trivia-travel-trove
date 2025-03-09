
import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUserData, getUserData } from '../services/gameService';

interface UserStats {
  totalPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

interface UserContextType {
  username: string;
  isLoggedIn: boolean;
  stats: UserStats;
  login: (username: string) => void;
  logout: () => void;
  updateStats: (correct: boolean) => void;
}

const initialStats: UserStats = {
  totalPlayed: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [stats, setStats] = useState<UserStats>(initialStats);

  // Load user data from local storage on initial render
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUsername(userData.username);
      setIsLoggedIn(true);
      setStats(userData.stats || initialStats);
    }
  }, []);

  const login = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
    const userData = { username: name, stats: initialStats };
    saveUserData(userData);
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('globetrotter_user');
  };

  const updateStats = (correct: boolean) => {
    const newStats = {
      totalPlayed: stats.totalPlayed + 1,
      correctAnswers: stats.correctAnswers + (correct ? 1 : 0),
      incorrectAnswers: stats.incorrectAnswers + (correct ? 0 : 1),
    };
    
    setStats(newStats);
    saveUserData({ username, stats: newStats });
  };

  return (
    <UserContext.Provider value={{ username, isLoggedIn, stats, login, logout, updateStats }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
