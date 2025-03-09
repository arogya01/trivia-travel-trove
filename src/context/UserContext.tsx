import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUserData, getUserData } from '../services/gameService';
import { useGetUserDetails } from '@/services/useGetUserDetails';

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
  updateStats: ({gamesPlayed, correctAnswers, incorrectAnswers}: {
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }) => void;
  isUserDetailsLoading: boolean;
}

const initialStats: UserStats = {
  totalPlayed: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>(getUserData());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [stats, setStats] = useState<UserStats>(initialStats);
  const { userDetails, isLoading, isSuccess } = useGetUserDetails();


  // Load user data from local storage on initial render
  useEffect(() => {
    if (userDetails && isSuccess) {    
      setUsername(userDetails.username);
      setIsLoggedIn(true);
      const stats = {
        totalPlayed: userDetails.gamesPlayed,
        correctAnswers: userDetails.correctAnswers,
        incorrectAnswers: userDetails.incorrectAnswers,
      }
      setStats(stats);
    }
  }, [isSuccess, userDetails]);

  const login = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);    
    saveUserData(name);
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('globetrotter_user');
  };

  const updateStats = ({gamesPlayed, correctAnswers, incorrectAnswers}: {
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }) => {
    const newStats = {
      totalPlayed: gamesPlayed,
      correctAnswers: correctAnswers,
      incorrectAnswers: incorrectAnswers,
    };    
    setStats(newStats);    
  };

  return (
    <UserContext.Provider value={{ username, isLoggedIn, stats, login, logout, updateStats,isUserDetailsLoading: isLoading }}>
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
