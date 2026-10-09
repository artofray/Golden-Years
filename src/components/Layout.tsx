import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Gamepad2, HeartHandshake, Settings } from 'lucide-react';
import { useStore } from '../store';
import { DwellButton } from './DwellButton';
import { cn } from '../lib/utils';

export function Layout() {
  const { fontSize } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'bg-emerald-500' },
    { path: '/needs', icon: HeartHandshake, label: 'Needs', color: 'bg-rose-500' },
    { path: '/games', icon: Gamepad2, label: 'Games', color: 'bg-amber-500' },
    { path: '/voice', icon: MessageSquare, label: 'Chat', color: 'bg-blue-500' },
  ];

  return (
    <div className={cn("min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans", fontSize)}>
      {/* Top Bar */}
      <header className="bg-white shadow-sm p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="font-bold tracking-tight text-stone-800">ElderCare Hub</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="font-mono font-medium text-stone-500">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <DwellButton 
            onClick={() => navigate('/admin')}
            className="bg-stone-200 hover:bg-stone-300 text-stone-700 p-4 rounded-full"
            aria-label="Settings"
          >
            <Settings className="w-8 h-8" />
          </DwellButton>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
        <div className="max-w-5xl mx-auto flex justify-between gap-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                             (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <DwellButton
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex-1 py-6 flex flex-col items-center justify-center gap-3 transition-colors border-4",
                  isActive 
                    ? `border-stone-800 ${item.color} text-white` 
                    : "border-transparent bg-stone-100 hover:bg-stone-200 text-stone-700"
                )}
                activeColor="bg-stone-800"
              >
                <item.icon className="w-12 h-12" />
                <span className="font-bold">{item.label}</span>
              </DwellButton>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
