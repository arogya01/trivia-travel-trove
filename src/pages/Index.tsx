
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { UserProvider } from '@/context/UserContext';
import { GameProvider } from '@/context/GameContext';
import { GameScreen } from '@/components/GameScreen';


// Main Index page that provides context providers
const Index: React.FC = () => {
  return (
    <UserProvider>
      <GameProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 py-6">
            <GameScreen />
          </main>
          <footer className="py-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Globetrotter - Test your destination knowledge!
          </footer>
        </div>
      </GameProvider>
    </UserProvider>
  );
};

export default Index;
