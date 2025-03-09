
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '../context/UserContext';
import { Globe } from 'lucide-react';
import { useCreateUser } from '@/services/userCreateUser';

interface UserRegistrationProps {
  onComplete: () => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const { login } = useUser();
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      createUser({ username: username.trim(), userId: '' }, {
        onSuccess: (response) => {
          console.log(response);
          login(username.trim());
          onComplete();
        }
      });
    }
  };

  const handlePlayAsGuest = () => {
    login('Guest');
    onComplete();
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
                <Label htmlFor="username">Choose a username</Label>
                <Input
                  id="username"
                  placeholder="Enter a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-travel-blue/20 focus:border-travel-blue"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-travel-blue hover:bg-travel-blue/90"
                disabled={!username.trim()}
              >
                Start Playing
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full border-travel-blue/20 text-travel-blue"
            onClick={handlePlayAsGuest}
          >
            Play as Guest
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserRegistration;
