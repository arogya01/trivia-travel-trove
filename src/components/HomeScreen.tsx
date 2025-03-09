import { useUser } from "@/context/UserContext";
import { GameScreen } from "./GameScreen";
import Header from "./Header";
import { Loading } from "./ui/loading";

export const HomeScreen = () => {
  const {isUserDetailsLoading} = useUser();

  if (isUserDetailsLoading) {
    return <Loading text="Loading your profile..." fullScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6">
        <GameScreen />
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Globetrotter - Test your destination knowledge!
      </footer>
    </div>
  ); 
};

