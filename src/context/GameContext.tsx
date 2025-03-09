import React, { createContext, useContext, useEffect, useState } from 'react';
import { GameQuestion, useRandomQuestion, useVerifyAnswer } from '../services/gameApiService';
import { useUser } from './UserContext';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface GameContextType {
  currentQuestion: GameQuestion | null;
  isLoading: boolean;
  isAnswered: boolean;
  isCorrect: boolean | null;
  currentFact: string;
  correctAnswer: string;
  generateNewQuestion: () => void;
  answer:string;
  isQueriedAns: boolean;
  submitAnswer: (answer: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { updateStats, username } = useUser();  
  const [answer, setAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);  
  const [currentFact, setCurrentFact] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const { question, isLoading: isQuestionLoading } = useRandomQuestion();
  const queryClient = useQueryClient();
  const { verifyAnswer, isPending: isVerifyLoading, isSuccess: isVerifySuccess } = useVerifyAnswer();
  
  
  const isLoading = isQuestionLoading;

  const generateNewQuestion = () => {
    setAnswer('');
    setIsCorrect(null);
    setCurrentFact('');
    setCorrectAnswer('');
    queryClient.invalidateQueries({ queryKey: ['randomQuestion'] });
  };  

  const submitAnswer = (answer: string) => {
    if (!question || answer === '') return;
    setAnswer(answer);
    
    verifyAnswer({
      destinationId: question.id,
      answer,
      userName: username
    }, {
      onSuccess: (data) => {
        setIsCorrect(data.isCorrect);
        setCurrentFact(data.fact);
        setCorrectAnswer(data.correctAnswer);
        const {gamesPlayed, correctAnswers, incorrectAnswers} = data.user;
        updateStats({
          gamesPlayed,
          correctAnswers,
          incorrectAnswers
        });
        if (data.isCorrect) {
          toast({
            title: "Correct!",
            description: `That's right! It's ${data.correctAnswer}`,
            variant: "default"
          });
        } else {
          toast({
            title: "Incorrect",
            description: `The correct answer was ${data.correctAnswer}`,
            variant: "destructive"
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to verify your answer. Please try again.",
          variant: "destructive"
        });
        console.error("Error verifying answer:", error);
      }
    });
  };

  return (
    <GameContext.Provider
      value={{
        currentQuestion : question,
        isLoading,
        isAnswered: answer !== '',
        isQueriedAns: isVerifySuccess,
        isCorrect,        
        currentFact,
        correctAnswer,
        generateNewQuestion,
        submitAnswer,
        answer
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
