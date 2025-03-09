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

export const useGetUserDetails = () => {
  const userName = getUserData(); 
  const { data, isLoading, error , isSuccess} = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
        const response = await axios.get<UserDetails>(`${baseURL}/api/users/username/${userName}`);
        return response.data;
      },
      enabled: !!userName,
      staleTime: Infinity,
      gcTime:Infinity,
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
