import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, XCircle } from 'lucide-react';
import ReactConfetti from 'react-confetti';

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
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Update window dimensions when the component mounts
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Show confetti if the answer is correct
    if (isCorrect) {
      setShowConfetti(true);
      
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isCorrect]);

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
        />
      )}
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
