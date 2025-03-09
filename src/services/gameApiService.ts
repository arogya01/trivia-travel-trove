import { baseURL } from "@/lib/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

// Types for the API responses
export interface GameQuestion {
  id: string;
  clues: string[];
  choices: string[];
}

export interface VerifyAnswerRequest {
  destinationId: string;
  answer: string;
  userName: string;
}

export interface VerifyAnswerResponse {
  isCorrect: boolean;
  fact: string;
  user: {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
  };
  correctAnswer: string;
}

// Hook to fetch a random question
export const useRandomQuestion = (generateNewQuestionLoading: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey:['randomQuestion'],
    queryFn: async () => {
      const response = await axios.get<GameQuestion>(`${baseURL}/api/game/random`);
      return response.data;
    },
    enabled: generateNewQuestionLoading,
    staleTime: 0,
    gcTime:0
  });

  return {
    question: data,
    error,
    isLoading,
  };
};

// Hook to verify an answer
export const useVerifyAnswer = () => {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: async (verifyRequest: VerifyAnswerRequest) => {
      const response = await axios.post<VerifyAnswerResponse>(
        `${baseURL}/api/game/verify`, 
        verifyRequest
      );
      return response.data;
    }
  });

  return {
    verifyAnswer: mutate,
    result: data,
    error,
    isPending,
    isSuccess
  };
}; 