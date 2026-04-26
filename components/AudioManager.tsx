'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { useGameStore } from '@/lib/store';

type AudioContextType = {
  playSE: (src: string) => void;
  playBGM: (src: string) => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioManager');
  return ctx;
};

export default function AudioManager({ children }: { children: React.ReactNode }) {
  const bgmVolume = useGameStore((state) => state.bgmVolume);
  const seVolume = useGameStore((state) => state.seVolume);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const currentBGM = useRef<Howl | null>(null);
  const currentBgmSrc = useRef<string | null>(null);

  useEffect(() => {
    const handleInteraction = () => setHasInteracted(true);
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const playSE = (src: string) => {
    if (!hasInteracted) return;
    const sound = new Howl({ src: [src], volume: seVolume });
    sound.play();
  };

  const playBGM = (src: string) => {
    if (!hasInteracted) return;
    if (currentBgmSrc.current === src) return;

    if (currentBGM.current) {
      currentBGM.current.fade(bgmVolume, 0, 1000);
      setTimeout(() => {
        currentBGM.current?.stop();
      }, 1000);
    }

    currentBgmSrc.current = src;
    const newBgm = new Howl({ src: [src], loop: true, volume: 0 });
    newBgm.play();
    newBgm.fade(0, bgmVolume, 1000);
    currentBGM.current = newBgm;
  };

  useEffect(() => {
    if (currentBGM.current) {
      currentBGM.current.volume(bgmVolume);
    }
  }, [bgmVolume]);

  return (
    <AudioContext.Provider value={{ playSE, playBGM }}>
      {children}
    </AudioContext.Provider>
  );
}
