import React, { createContext, useContext, useEffect, useState } from 'react';
import { GameQuestion, useRandomQuestion, useVerifyAnswer } from '../services/gameApiService';
import { useUser } from './UserContext';
import { toast } from '@/hooks/use-toast';

interface GameContextType {
  currentQuestion: GameQuestion | null;
  isLoading: boolean;
  isAnswered: boolean;
  isCorrect: boolean | null;
  currentFact: string;
  generateNewQuestion: () => void;
  answer:string;
  submitAnswer: (answer: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { updateStats, username } = useUser();  
  const [answer, setAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [generateNewQuestionLoading, setGenerateNewQuestionLoading] = useState<boolean>(false);
  const [currentFact, setCurrentFact] = useState<string>('');
  const { question, isLoading: isQuestionLoading } = useRandomQuestion(
    generateNewQuestionLoading
  );
  const { verifyAnswer, isPending: isVerifyLoading } = useVerifyAnswer();

  console.log('question,',question);

  useEffect(()=>{
    setGenerateNewQuestionLoading(true);
  },[])
  
  const isLoading = isQuestionLoading;

  const generateNewQuestion = () => {
    setAnswer('');
    setIsCorrect(null);
    setCurrentFact('');
    setGenerateNewQuestionLoading(true);
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
        isCorrect,        
        currentFact,
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
