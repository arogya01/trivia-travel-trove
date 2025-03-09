import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import { useAuthUser } from '@/services/useAuthUser';
import { AxiosError } from 'axios';

interface UserRegistrationProps {
  onComplete: () => void;
}

interface ApiErrorResponse {
  message: string;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const { authUser, isPending, error } = useAuthUser(onComplete);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    // Call the authUser mutation with the username
    authUser(username.trim());
  };

  // Extract error message from the error object
  const getErrorMessage = () => {
    if (!error) return null;
    
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return axiosError.response?.data?.message || "An error occurred. Please try again.";
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4">
      <Card className="border-2 border-travel-blue/20 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Globe className="h-16 w-16 text-travel-blue animate-pulse-scale" />
          </div>
          <CardTitle className="text-3xl text-travel-blue">Welcome to Globetrotter</CardTitle>
          <CardDescription className="text-lg">
            Test your knowledge of world destinations!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Enter your username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-travel-blue/20 focus:border-travel-blue"
                  disabled={isPending}
                />
                <p className="text-xs text-gray-500">
                  New users will be registered automatically.
                </p>
                {error && (
                  <p className="text-sm text-red-500 mt-1">
                    {getErrorMessage()}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-travel-blue hover:bg-travel-blue/90"
                disabled={!username.trim() || isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegistration;
