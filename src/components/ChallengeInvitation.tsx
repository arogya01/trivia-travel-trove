import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Award, X } from 'lucide-react';
import { useGetUserDetails } from '@/services/useGetUserDetails';
import { Loading } from './ui/loading';
import { Progress } from './ui/progress';

interface ChallengeInvitationProps {
  challengerUsername: string;
  onAccept: () => void;
  onDecline: () => void;
}

const ChallengeInvitation: React.FC<ChallengeInvitationProps> = ({
  challengerUsername,
  onAccept,
  onDecline
}) => {
  const { userDetails: challenger, isLoading } = useGetUserDetails(challengerUsername);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto animate-fade-in">
          <CardContent className="pt-6">
            <Loading text="Loading challenger details..." />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!challenger) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl text-center">Challenge Error</CardTitle>
            <CardDescription className="text-center">
              Could not find the challenger. The user may no longer exist.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={onDecline}>Close</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Calculate stats
  const totalAnswers = challenger.correctAnswers + challenger.incorrectAnswers;
  const accuracy = totalAnswers > 0 
    ? Math.round((challenger.correctAnswers / totalAnswers) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto border-2 border-travel-blue/20 shadow-xl animate-fade-in">
        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDecline}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Trophy className="h-16 w-16 text-amber-500" />
              <div className="absolute -top-2 -right-2 bg-travel-blue text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                {challenger.gamesPlayed}
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl text-travel-blue">Challenge Invitation!</CardTitle>
          <CardDescription className="text-lg">
            <span className="font-semibold text-travel-blue">{challenger.username}</span> has challenged you to beat their score!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Games Played</span>
              </div>
              <span className="font-bold text-lg">{challenger.gamesPlayed}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-500" />
                <span className="font-medium">Correct Answers</span>
              </div>
              <span className="font-bold text-lg">{challenger.correctAnswers}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                <span className="font-medium">Incorrect Answers</span>
              </div>
              <span className="font-bold text-lg">{challenger.incorrectAnswers}</span>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Accuracy</span>
                <span className="text-sm font-medium">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600">
            Can you beat their score? Accept the challenge and find out!
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2">
          <Button 
            onClick={onAccept} 
            className="w-full bg-travel-blue hover:bg-travel-blue/90"
          >
            Accept Challenge
          </Button>
          <Button 
            variant="outline" 
            onClick={onDecline}
            className="w-full border-travel-blue/20 text-travel-blue"
          >
            Maybe Later
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChallengeInvitation; 