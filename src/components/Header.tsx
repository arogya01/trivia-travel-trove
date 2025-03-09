
import React from 'react';
import { Globe } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const { isLoggedIn, username, logout } = useUser();

  return (
    <header className="w-full py-4 px-6 bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-travel-blue" />
          <h1 className="text-2xl font-bold text-travel-blue">
            Globetrotter
          </h1>
        </div>
        
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, <span className="font-semibold">{username}</span></span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <span className="text-sm text-gray-600">Travel Trivia Game</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
