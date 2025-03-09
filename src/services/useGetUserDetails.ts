import { baseURL } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUserData } from "./gameService";

interface UserDetails {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

export const useGetUserDetails = (overrideUsername?: string) => {
  const storedUsername = getUserData();
  const userName = overrideUsername || storedUsername;
  
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['userDetails', userName],
    queryFn: async () => {
        const response = await axios.get<UserDetails>(`${baseURL}/api/users/username/${userName}`);
        return response.data;
      },
      enabled: !!userName,
      staleTime: overrideUsername ? 1000 * 60 * 5 : Infinity, // 5 minutes for challenger, Infinity for current user
      gcTime: overrideUsername ? 1000 * 60 * 5 : Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
  });

  return {
    userDetails: data,
    isLoading,
    isSuccess,
    error
  };
};
