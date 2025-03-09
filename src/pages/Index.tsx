
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import UserRegistration from '@/components/UserRegistration';
import GameCard from '@/components/GameCard';
import ScoreTracker from '@/components/ScoreTracker';
import { UserProvider, useUser } from '@/context/UserContext';
import { GameProvider } from '@/context/GameContext';

// Main game component that checks user login status
const GameContent: React.FC = () => {
  const { isLoggedIn } = useUser();
  const [showGame, setShowGame] = useState(false);
  
  // Function to handle registration completion
  const handleRegistrationComplete = () => {
    setShowGame(true);
  };
  
  // Check if user is already logged in on mount
  useEffect(() => {
    if (isLoggedIn) {
      setShowGame(true);
    }
  }, [isLoggedIn]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      {!showGame ? (
        <UserRegistration onComplete={handleRegistrationComplete} />
      ) : (
        <div className="space-y-6">
          <ScoreTracker />
          <GameCard />
        </div>
      )}
    </div>
  );
};

// Main Index page that provides context providers
const Index: React.FC = () => {
  return (
    <UserProvider>
      <GameProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 py-6">
            <GameContent />
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
