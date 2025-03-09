import React, { useState } from 'react';
import { Globe, Share2, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header: React.FC = () => {
  const { isLoggedIn, username, logout } = useUser();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleShareChallenge = async () => {
    if (!username) return;
    
    // Generate challenge link directly
    const url = new URL(window.location.href);
    url.searchParams.set('challenge', username);
    const challengeLink = url.toString();
    
    try {
      await navigator.clipboard.writeText(challengeLink);
      setCopied(true);
      
      toast({
        title: "Challenge link copied!",
        description: "Share this link with friends to challenge them.",
        variant: "default",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the link manually.",
        variant: "destructive",
      });
    }
  };

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
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleShareChallenge}
                      className="h-9 w-9 rounded-full"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Challenge friends</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
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
