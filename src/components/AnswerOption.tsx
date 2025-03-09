
import React from 'react';
import { Button } from '@/components/ui/button';
import { Destination } from '../data/destinations';
import { cn } from '@/lib/utils';

interface AnswerOptionProps {
  destination: string;
  isCorrect: boolean | null;
  onSelect: (id: string) => void;
  answer: string;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ 
  destination, 
  isCorrect,   
  onSelect,
  answer 
}) => {
  let buttonVariant: "default" | "outline" | "secondary" | "destructive" = "outline";
  const isSelected = answer === destination;
  const isAnswered = answer !== '';

  if (isAnswered) {
    if (isSelected) {
      buttonVariant = isCorrect ? "default" : "destructive";
    }
  } else if (isSelected) {
    buttonVariant = "secondary";
  }

  return (
    <Button
      variant={buttonVariant}
      className={cn(
        "w-full justify-start text-left font-medium transition-all",
        isAnswered && !isSelected && "opacity-70",
        isAnswered && isSelected && isCorrect && "bg-green-500 hover:bg-green-600",
        isAnswered && isSelected && !isCorrect && "bg-red-500 hover:bg-red-600"
      )}
      onClick={() => !isAnswered && onSelect(destination)}
      disabled={isAnswered}
    >
      <span>{destination}</span>
    </Button>
  );
};

export default AnswerOption;
