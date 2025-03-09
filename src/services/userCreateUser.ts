import { baseURL } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


type User = {
    username: string;
    userId: string;
}

export const useCreateUser = () => {
    const { mutate, error, isPending } = useMutation({
        mutationFn: async (user: User) => {
            const response = await axios.post(`${baseURL}/api/users`, user);
            return response.data;
        }
    });

    return {
        mutate,
        error,
        isPending
    }
}