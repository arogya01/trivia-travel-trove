
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ScoreTracker: React.FC = () => {
  const { stats } = useUser();
  
  const correctPercentage = stats.totalPlayed > 0
    ? Math.round((stats.correctAnswers / stats.totalPlayed) * 100)
    : 0;

  return (
    <Card className="bg-white bg-opacity-90 shadow-md">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">Your Score</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-medium">{stats.correctAnswers}</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="font-medium">{stats.incorrectAnswers}</span>
          </div>
          <div className="text-gray-600">
            {stats.totalPlayed > 0 ? `${correctPercentage}%` : '-'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreTracker;
