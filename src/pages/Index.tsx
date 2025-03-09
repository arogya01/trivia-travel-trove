
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { UserProvider } from '@/context/UserContext';
import { GameProvider } from '@/context/GameContext';
import { GameScreen } from '@/components/GameScreen';
import { HomeScreen } from '@/components/HomeScreen';


const Index: React.FC = () => {
  return (
    <UserProvider>
      <GameProvider>
        <HomeScreen />
      </GameProvider>
    </UserProvider>
  );
};

export default Index;
