import React, { useState, useEffect } from 'react';
import { DwellButton } from '../components/DwellButton';
import { useSpeech } from '../hooks/useSpeech';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;

export function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const { speak } = useSpeech();

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  useEffect(() => {
    if (winner) {
      speak(`Player ${winner} wins!`);
    } else if (isDraw) {
      speak("It's a draw!");
    }
  }, [winner, isDraw, speak]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-stone-800 mb-8">
        {winner ? `Winner: ${winner}` : isDraw ? "Draw!" : `Turn: ${isXNext ? 'X' : 'O'}`}
      </h2>

      <div className="grid grid-cols-3 gap-4 bg-stone-800 p-4 rounded-3xl w-full max-w-2xl aspect-square">
        {board.map((cell, index) => (
          <DwellButton
            key={index}
            onClick={() => handleClick(index)}
            className="bg-stone-100 hover:bg-white text-7xl font-bold"
            activeColor="bg-stone-300"
          >
            <span className={cell === 'X' ? 'text-blue-600' : 'text-rose-600'}>
              {cell}
            </span>
          </DwellButton>
        ))}
      </div>

      <DwellButton
        onClick={resetGame}
        className="mt-12 bg-stone-200 hover:bg-stone-300 border-4 border-stone-400 text-stone-800 px-12 py-6 rounded-full flex flex-row gap-4"
        activeColor="bg-stone-500"
      >
        <RotateCcw className="w-12 h-12" />
        <span className="text-4xl font-bold">Play Again</span>
      </DwellButton>
    </div>
  );
}
