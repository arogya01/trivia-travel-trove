import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Globe } from 'lucide-react';
import AnswerOption from './AnswerOption';
import FeedbackModal from './FeedbackModal';
import ChallengeButton from './ChallengeButton';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import { Loading } from './ui/loading';

const GameCard: React.FC = () => {
  const { 
    currentQuestion, 
    isLoading,     
    currentFact, 
    generateNewQuestion, 
    submitAnswer, 
    answer,
    isCorrect,
    correctAnswer,
    isQueriedAns
  } = useGame();
  const { isLoggedIn } = useUser();

  if (isLoading) {
    return (
      <Card className="w-full max-w-xl mx-auto border shadow-md">
        <CardContent className="min-h-[300px]">
          <Loading text="Loading next destination..." />
        </CardContent>
      </Card>
    );
  }
  
  if (!currentQuestion) {
    return null;
  }

  if(answer !== '' && isCorrect !== null && isQueriedAns) {
    return (
      <FeedbackModal 
        isCorrect={isCorrect} 
        fact={currentFact} 
        destinationName={answer} 
        onNextQuestion={generateNewQuestion}
        correctAnswer={correctAnswer}
      />
    );
  }


  return (
    <div className="w-full max-w-xl mx-auto">      
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
              <p className="text-gray-700 italic">"{currentQuestion.clues[0]}"</p>
            </div>
            <div className="grid gap-3 mt-4">
              {currentQuestion.choices.map((option) => (
                <AnswerOption
                  key={option}
                  answer={answer}
                  destination={option}                  
                  isCorrect={isCorrect}
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
      </div>
  );
};

export default GameCard;
