
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Globe } from 'lucide-react';
import AnswerOption from './AnswerOption';
import FeedbackModal from './FeedbackModal';
import ChallengeButton from './ChallengeButton';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';

const GameCard: React.FC = () => {
  const { 
    currentQuestion, 
    isLoading, 
    isAnswered, 
    isCorrect, 
    currentFact, 
    selectedAnswerId,
    generateNewQuestion, 
    submitAnswer 
  } = useGame();
  
  const { isLoggedIn } = useUser();
  
  useEffect(() => {
    if (!currentQuestion) {
      generateNewQuestion();
    }
  }, [currentQuestion, generateNewQuestion]);
  
  if (isLoading) {
    return (
      <Card className="w-full max-w-xl mx-auto border shadow-md">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
          <Globe className="h-16 w-16 text-travel-blue animate-pulse-scale" />
          <p className="text-gray-500 mt-4">Loading next destination...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!currentQuestion) {
    return null;
  }
  
  return (
    <div className="w-full max-w-xl mx-auto">
      {isAnswered && isCorrect !== null ? (
        <FeedbackModal
          isCorrect={isCorrect}
          fact={currentFact}
          destinationName={currentQuestion.destination.name}
          onNextQuestion={generateNewQuestion}
        />
      ) : (
        <Card className="border shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-travel-blue" />
              <span>Where am I?</span>
            </CardTitle>
            <CardDescription className="text-base">
              Read the clue and guess the destination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 mb-4 rounded-md">
              <p className="text-gray-700 italic">"{currentQuestion.clue}"</p>
            </div>
            <div className="grid gap-3 mt-4">
              {currentQuestion.options.map((option) => (
                <AnswerOption
                  key={option.id}
                  destination={option}
                  isSelected={selectedAnswerId === option.id}
                  isCorrect={isCorrect}
                  isAnswered={isAnswered}
                  onSelect={submitAnswer}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isLoggedIn && <ChallengeButton />}
            <Button 
              variant="outline" 
              onClick={generateNewQuestion}
              className="ml-auto"
            >
              Skip
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default GameCard;
