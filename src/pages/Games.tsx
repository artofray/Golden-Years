import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DwellButton } from '../components/DwellButton';
import { Grid3X3, Crown, CircleDot } from 'lucide-react';

export function Games() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-stone-800 mb-12 text-center">
        Choose a Game
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <DwellButton
          onClick={() => navigate('/games/tictactoe')}
          className="bg-amber-100 hover:bg-amber-200 border-4 border-amber-500 text-amber-900 aspect-square"
          activeColor="bg-amber-500"
        >
          <Grid3X3 className="w-32 h-32 mb-6 text-amber-600" />
          <span className="text-5xl font-bold text-center">Tic Tac Toe</span>
        </DwellButton>

        <DwellButton
          onClick={() => alert("Checkers coming soon!")}
          className="bg-stone-200 hover:bg-stone-300 border-4 border-stone-400 text-stone-600 aspect-square opacity-70"
          activeColor="bg-stone-500"
        >
          <CircleDot className="w-32 h-32 mb-6 text-stone-500" />
          <span className="text-5xl font-bold text-center">Checkers<br/><span className="text-2xl">(Coming Soon)</span></span>
        </DwellButton>

        <DwellButton
          onClick={() => alert("Chess coming soon!")}
          className="bg-stone-200 hover:bg-stone-300 border-4 border-stone-400 text-stone-600 aspect-square opacity-70"
          activeColor="bg-stone-500"
        >
          <Crown className="w-32 h-32 mb-6 text-stone-500" />
          <span className="text-5xl font-bold text-center">Chess<br/><span className="text-2xl">(Coming Soon)</span></span>
        </DwellButton>
      </div>
    </div>
  );
}
