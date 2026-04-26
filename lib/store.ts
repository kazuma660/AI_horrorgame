import { create } from 'zustand';
import { GameState } from './types';

interface StoreState extends GameState {
  setCurrentId: (id: string) => void;
  setFlag: (flag: string, value: boolean) => void;
  setBgmVolume: (volume: number) => void;
  setSeVolume: (volume: number) => void;
}

export const useGameStore = create<StoreState>((set) => ({
  currentId: 'start',
  flags: {},
  bgmVolume: 0.5,
  seVolume: 0.5,
  setCurrentId: (id) => set({ currentId: id }),
  setFlag: (flag, value) => set((state) => ({ flags: { ...state.flags, [flag]: value } })),
  setBgmVolume: (volume) => set({ bgmVolume: volume }),
  setSeVolume: (volume) => set({ seVolume: volume }),
}));
