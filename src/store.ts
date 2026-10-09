import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  fontSize: string;
  dwellClickEnabled: boolean;
  dwellTime: number;
  adminPin: string;
  setFontSize: (size: string) => void;
  setDwellClickEnabled: (enabled: boolean) => void;
  setDwellTime: (time: number) => void;
  setAdminPin: (pin: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      fontSize: 'text-4xl', // Default to very large text
      dwellClickEnabled: false,
      dwellTime: 1500, // 1.5 seconds default dwell time
      adminPin: '1234', // Default PIN
      setFontSize: (size) => set({ fontSize: size }),
      setDwellClickEnabled: (enabled) => set({ dwellClickEnabled: enabled }),
      setDwellTime: (time) => set({ dwellTime: time }),
      setAdminPin: (pin) => set({ adminPin: pin }),
    }),
    {
      name: 'eldercare-storage',
    }
  )
);
