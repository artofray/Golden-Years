import React from 'react';
import { DwellButton } from '../components/DwellButton';
import { useSpeech } from '../hooks/useSpeech';
import { 
  Droplets, 
  Utensils, 
  ThermometerSnowflake, 
  ThermometerSun, 
  Activity, 
  Users, 
  AlertCircle, 
  Bed 
} from 'lucide-react';

const NEEDS = [
  { id: 'water', label: 'I am thirsty', icon: Droplets, color: 'bg-blue-100 border-blue-500 text-blue-900' },
  { id: 'food', label: 'I am hungry', icon: Utensils, color: 'bg-orange-100 border-orange-500 text-orange-900' },
  { id: 'cold', label: 'I am cold', icon: ThermometerSnowflake, color: 'bg-cyan-100 border-cyan-500 text-cyan-900' },
  { id: 'hot', label: 'I am hot', icon: ThermometerSun, color: 'bg-red-100 border-red-500 text-red-900' },
  { id: 'pain', label: 'I am in pain', icon: Activity, color: 'bg-rose-100 border-rose-500 text-rose-900' },
  { id: 'rest', label: 'I need to rest', icon: Bed, color: 'bg-indigo-100 border-indigo-500 text-indigo-900' },
  { id: 'family', label: 'Call family', icon: Users, color: 'bg-emerald-100 border-emerald-500 text-emerald-900' },
  { id: 'help', label: 'I need help', icon: AlertCircle, color: 'bg-yellow-100 border-yellow-500 text-yellow-900' },
];

export function Needs() {
  const { speak } = useSpeech();

  const handleNeedClick = (label: string) => {
    speak(label);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-stone-800 mb-8 text-center">
        What do you need?
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
        {NEEDS.map((need) => (
          <DwellButton
            key={need.id}
            onClick={() => handleNeedClick(need.label)}
            className={`border-4 ${need.color} hover:brightness-95 transition-all`}
            activeColor="bg-stone-800"
          >
            <need.icon className="w-24 h-24 mb-4 opacity-80" />
            <span className="text-3xl font-bold text-center leading-tight">
              {need.label}
            </span>
          </DwellButton>
        ))}
      </div>
    </div>
  );
}
