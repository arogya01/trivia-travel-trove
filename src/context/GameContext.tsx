
import React, { createContext, useContext, useState } from 'react';
import { GameQuestion, generateQuestion, checkAnswer, getRandomFact } from '../services/gameService';
import { useUser } from './UserContext';
import { toast } from '@/hooks/use-toast';

interface GameContextType {
  currentQuestion: GameQuestion | null;
  isLoading: boolean;
  isAnswered: boolean;
  isCorrect: boolean | null;
  currentFact: string;
  selectedAnswerId: string | null;
  generateNewQuestion: () => void;
  submitAnswer: (answerId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { updateStats } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentFact, setCurrentFact] = useState<string>('');
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const generateNewQuestion = () => {
    setIsLoading(true);
    setIsAnswered(false);
    setIsCorrect(null);
    setSelectedAnswerId(null);
    
    try {
      // In a real implementation, this would be an API call
      const newQuestion = generateQuestion();
      setCurrentQuestion(newQuestion);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate a new question. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = (answerId: string) => {
    if (!currentQuestion || isAnswered) return;
    
    setSelectedAnswerId(answerId);
    setIsAnswered(true);
    
    const correct = checkAnswer(currentQuestion, answerId);
    setIsCorrect(correct);
    
    // Get a random fact
    const fact = getRandomFact(currentQuestion.destination);
    setCurrentFact(fact);
    
    // Update user stats
    updateStats(correct);
    
    // Show success or error toast
    if (correct) {
      toast({
        title: "Correct!",
        description: `That's right! It's ${currentQuestion.destination.name}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was ${currentQuestion.destination.name}`,
        variant: "destructive"
      });
    }
  };

  return (
    <GameContext.Provider
      value={{
        currentQuestion,
        isLoading,
        isAnswered,
        isCorrect,
        currentFact,
        selectedAnswerId,
        generateNewQuestion,
        submitAnswer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
