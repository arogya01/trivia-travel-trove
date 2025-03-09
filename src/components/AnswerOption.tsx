
import React from 'react';
import { Button } from '@/components/ui/button';
import { Destination } from '../data/destinations';
import { cn } from '@/lib/utils';

interface AnswerOptionProps {
  destination: Destination;
  isSelected: boolean;
  isCorrect: boolean | null;
  isAnswered: boolean;
  onSelect: (id: string) => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ 
  destination, 
  isSelected, 
  isCorrect, 
  isAnswered, 
  onSelect 
}) => {
  let buttonVariant: "default" | "outline" | "secondary" | "destructive" = "outline";
  
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
      onClick={() => !isAnswered && onSelect(destination.id)}
      disabled={isAnswered}
    >
      <span>{destination.name}, {destination.country}</span>
    </Button>
  );
};

export default AnswerOption;
