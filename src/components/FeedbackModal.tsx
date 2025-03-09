
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface FeedbackModalProps {
  isCorrect: boolean;
  fact: string;
  destinationName: string;
  onNextQuestion: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isCorrect,
  fact,
  destinationName,
  onNextQuestion,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCorrect) {
      createConfetti();
    }
  }, [isCorrect]);

  const createConfetti = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-50px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      container.appendChild(confetti);
    }
  };

  return (
    <>
      {isCorrect && <div ref={containerRef} className="confetti-container" />}
      
      <Card className={`max-w-md w-full mx-auto border-4 animate-scale-in ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle className="text-green-500" />
                <span className="text-green-700">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="text-red-500" />
                <span className="text-red-700">Not quite right</span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isCorrect 
              ? `Great job! You correctly identified ${destinationName}!` 
              : `The correct answer was ${destinationName}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Did you know?</h3>
            <p className="text-gray-700">{fact}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={onNextQuestion} 
            className={`w-full ${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-travel-blue hover:bg-travel-blue/90'}`}
          >
            Next Question
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default FeedbackModal;
