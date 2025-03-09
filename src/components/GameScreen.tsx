import { useEffect, useState } from "react";
import UserRegistration from "./UserRegistration";
import ScoreTracker from "./ScoreTracker";
import GameCard from "./GameCard";
import { useUser } from "@/context/UserContext";

// Main game component that checks user login status
export const GameScreen: React.FC = () => {
    const { isLoggedIn, username } = useUser();
    const [showGame, setShowGame] = useState(false);
    
    // Function to handle registration completion
    const handleRegistrationComplete = () => {
      setShowGame(true);
    };
    
    // Check if user is already logged in on mount
    useEffect(() => {
      if (isLoggedIn && username) {
        setShowGame(true);
      }
      else {
        setShowGame(false);
      }
    }, [isLoggedIn, username]);
    
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
  