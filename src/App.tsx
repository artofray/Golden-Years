import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Needs } from './pages/Needs';
import { Games } from './pages/Games';
import { TicTacToe } from './pages/TicTacToe';
import { VoiceAssistant } from './pages/VoiceAssistant';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="needs" element={<Needs />} />
          <Route path="games" element={<Games />} />
          <Route path="games/tictactoe" element={<TicTacToe />} />
          <Route path="voice" element={<VoiceAssistant />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
