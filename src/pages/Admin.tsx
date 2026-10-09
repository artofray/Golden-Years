import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { DwellButton } from '../components/DwellButton';
import { Lock, Unlock, ArrowLeft } from 'lucide-react';

export function Admin() {
  const navigate = useNavigate();
  const { 
    adminPin, 
    fontSize, 
    setFontSize, 
    dwellClickEnabled, 
    setDwellClickEnabled,
    dwellTime,
    setDwellTime
  } = useStore();
  
  const [inputPin, setInputPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === adminPin) {
      setIsUnlocked(true);
    } else {
      alert('Incorrect PIN');
      setInputPin('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="bg-white p-12 rounded-3xl shadow-lg border-4 border-stone-200 w-full">
          <div className="flex justify-center mb-8">
            <div className="bg-stone-100 p-6 rounded-full">
              <Lock className="w-16 h-16 text-stone-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center mb-8 text-stone-800">Admin Access</h2>
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <input
              type="password"
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              className="w-full text-center text-4xl p-4 border-4 border-stone-300 rounded-2xl focus:border-blue-500 focus:outline-none"
              placeholder="Enter PIN"
              maxLength={4}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
            >
              Unlock
            </button>
          </form>
          <p className="text-center mt-6 text-stone-500 text-xl">Default PIN is 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border-4 border-stone-200">
      <div className="flex items-center justify-between mb-12 border-b-4 border-stone-100 pb-8">
        <h2 className="text-5xl font-bold text-stone-800 flex items-center gap-4">
          <Unlock className="w-12 h-12 text-emerald-500" />
          Settings
        </h2>
        <DwellButton
          onClick={() => navigate('/')}
          className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-8 py-4 rounded-full flex items-center gap-3"
        >
          <ArrowLeft className="w-8 h-8" />
          <span className="text-2xl font-bold">Back to App</span>
        </DwellButton>
      </div>

      <div className="space-y-12">
        {/* Font Size */}
        <section>
          <h3 className="text-3xl font-bold text-stone-800 mb-6">Text Size</h3>
          <div className="flex gap-4">
            {[
              { label: 'Normal', value: 'text-2xl' },
              { label: 'Large', value: 'text-4xl' },
              { label: 'Huge', value: 'text-6xl' },
            ].map((size) => (
              <button
                key={size.value}
                onClick={() => setFontSize(size.value)}
                className={`flex-1 py-6 text-2xl font-bold rounded-2xl border-4 transition-colors ${
                  fontSize === size.value 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </section>

        {/* Eye Tracking / Dwell Click */}
        <section>
          <h3 className="text-3xl font-bold text-stone-800 mb-6">Eye Tracking / Dwell Click</h3>
          <div className="bg-stone-50 p-8 rounded-2xl border-4 border-stone-200 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-stone-800">Enable Dwell Click</div>
                <div className="text-xl text-stone-500 mt-2">Buttons will click automatically when hovered.</div>
              </div>
              <button
                onClick={() => setDwellClickEnabled(!dwellClickEnabled)}
                className={`w-24 h-12 rounded-full relative transition-colors flex items-center px-1 ${
                  dwellClickEnabled ? 'bg-emerald-500' : 'bg-stone-300'
                }`}
              >
                <div className={`w-10 h-10 bg-white rounded-full transition-transform ${
                  dwellClickEnabled ? 'translate-x-12' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {dwellClickEnabled && (
              <div className="pt-6 border-t-4 border-stone-200">
                <div className="flex justify-between mb-4">
                  <span className="text-2xl font-bold text-stone-800">Dwell Time (Speed)</span>
                  <span className="text-2xl font-bold text-blue-600">{dwellTime / 1000} seconds</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={dwellTime}
                  onChange={(e) => setDwellTime(Number(e.target.value))}
                  className="w-full h-4 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-xl text-stone-500">
                  <span>Fast (0.5s)</span>
                  <span>Slow (3.0s)</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
