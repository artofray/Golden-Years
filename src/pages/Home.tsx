import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import { DwellButton } from '../components/DwellButton';
import { HeartHandshake, Gamepad2, MessageSquare } from 'lucide-react';

export function Home() {
  const { speak } = useSpeech();
  const navigate = useNavigate();

  useEffect(() => {
    // Greet the user when they arrive on the home page
    speak("Welcome to Elder Care Hub. Select an option below.");
  }, [speak]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-12">
      <h1 className="text-6xl font-bold text-stone-800 text-center mb-8">
        Hello! How can we help you today?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <DwellButton
          onClick={() => navigate('/needs')}
          className="bg-rose-100 hover:bg-rose-200 border-4 border-rose-500 text-rose-900 aspect-square"
          activeColor="bg-rose-500"
        >
          <HeartHandshake className="w-32 h-32 mb-6 text-rose-600" />
          <span className="text-5xl font-bold">Needs</span>
        </DwellButton>

        <DwellButton
          onClick={() => navigate('/games')}
          className="bg-amber-100 hover:bg-amber-200 border-4 border-amber-500 text-amber-900 aspect-square"
          activeColor="bg-amber-500"
        >
          <Gamepad2 className="w-32 h-32 mb-6 text-amber-600" />
          <span className="text-5xl font-bold">Games</span>
        </DwellButton>

        <DwellButton
          onClick={() => navigate('/voice')}
          className="bg-blue-100 hover:bg-blue-200 border-4 border-blue-500 text-blue-900 aspect-square"
          activeColor="bg-blue-500"
        >
          <MessageSquare className="w-32 h-32 mb-6 text-blue-600" />
          <span className="text-5xl font-bold">Chat</span>
        </DwellButton>
      </div>
    </div>
  );
}
