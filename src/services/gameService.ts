import { 
  destinations, 
  Destination, 
  getRandomDestinations, 
  getRandomWrongAnswers 
} from '../data/destinations';

export interface GameQuestion {
  destination: Destination;
  clue: string;
  options: Destination[];
  correctAnswerId: string;
}

// Generate a new game question
export const generateQuestion = (numOptions: number = 4): GameQuestion => {
  // Get a random destination
  const [destination] = getRandomDestinations(1);
  
  // Get a random clue from the destination
  const clueIndex = Math.floor(Math.random() * destination.clues.length);
  const clue = destination.clues[clueIndex];
  
  // Get random wrong answers
  const wrongAnswers = getRandomWrongAnswers(destination, numOptions - 1);
  
  // Combine correct answer with wrong answers and shuffle
  const options = [...wrongAnswers, destination].sort(() => 0.5 - Math.random());
  
  return {
    destination,
    clue,
    options,
    correctAnswerId: destination.id,
  };
};

// Get a random fact from a destination
export const getRandomFact = (destination: Destination): string => {
  const factIndex = Math.floor(Math.random() * destination.facts.length);
  return destination.facts[factIndex];
};

// Check if the answer is correct
export const checkAnswer = (
  question: GameQuestion,
  answerId: string
): boolean => {
  return question.correctAnswerId === answerId;
};

// Get a destination by ID
export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};

interface UserData {
  username: string;
  stats?: {
    totalPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
  };
}

// Local storage functions for user data
export const saveUserData = (userData: UserData) => {
  localStorage.setItem('globetrotter_user', JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  const data = localStorage.getItem('globetrotter_user');
  return data ? JSON.parse(data) : null;
};

// Generate share link
export const generateShareLink = (username: string): string => {
  return `${window.location.origin}?challenge=${encodeURIComponent(username)}`;
};
