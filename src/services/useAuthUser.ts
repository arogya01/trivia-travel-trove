import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { baseURL } from "@/lib/axios";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";

interface User {
  username: string;
  userId: string;
}

interface ApiErrorResponse {
  message: string;
}

export const useAuthUser = (onSuccess?: () => void) => {
  const { login } = useUser();
  const { toast } = useToast();

  const {
    mutate: authUser,
    isPending,
    error,
    isError
  } = useMutation({
    mutationFn: async (username: string) => {
      try {
        // First try to check if user exists
        const response = await axios.get<User>(`${baseURL}/api/users/username/${username.trim()}`);
        // User exists, return with isNewUser flag
        return { user: response.data, isNewUser: false };
      } catch (error) {
        const axiosError = error as AxiosError;
        // If user doesn't exist (404), create a new user
        if (axiosError.response?.status === 404) {
          const createResponse = await axios.post<User>(`${baseURL}/api/users`, {
            username: username.trim(),
            userId: ''
          });
          return { user: createResponse.data, isNewUser: true };
        }
        // For any other error, throw it to be caught by React Query
        throw error;
      }
    },
    onSuccess: (data) => {
      const { user, isNewUser } = data;
      
      // Log the user in
      login(user.username);
      
      // Show appropriate toast message
      if (isNewUser) {
        toast({
          title: "Account created!",
          description: `Your account has been created with username: ${user.username}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: `You've been logged in as ${user.username}`,
          variant: "default",
        });
      }
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || "An unexpected error occurred. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  return {
    authUser,
    isPending,
    error,
    isError
  };
}; 