'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { useGameStore } from '@/lib/store';

type AudioContextType = {
  playSE: (src: string) => void;
  playBGM: (src: string) => void;
  playIntercom: () => void;
};

const AudioCtx = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioManager');
  return ctx;
};

/** Web Audio API でインターホン音（ピンポーン）を生成する */
function synthesizeIntercom(audioCtx: AudioContext, volume: number) {
  const tones = [
    { freq: 880, start: 0,   dur: 0.18 },  // ピ
    { freq: 660, start: 0.22, dur: 0.18 }, // ン
    { freq: 880, start: 0.50, dur: 0.18 }, // ポ
    { freq: 660, start: 0.72, dur: 0.18 }, // ー
    { freq: 880, start: 1.00, dur: 0.18 }, // ン！
  ];

  tones.forEach(({ freq, start, dur }) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);

    const t0 = audioCtx.currentTime + start;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(volume * 0.6, t0 + 0.02);
    gain.gain.setValueAtTime(volume * 0.6, t0 + dur - 0.04);
    gain.gain.linearRampToValueAtTime(0, t0 + dur);

    osc.start(t0);
    osc.stop(t0 + dur + 0.01);
  });
}

export default function AudioManager({ children }: { children: React.ReactNode }) {
  const bgmVolume = useGameStore((state) => state.bgmVolume);
  const seVolume = useGameStore((state) => state.seVolume);
  const [hasInteracted, setHasInteracted] = useState(false);

  const currentBGM = useRef<Howl | null>(null);
  const currentBgmSrc = useRef<string | null>(null);
  const webAudioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      if (!webAudioCtx.current) {
        webAudioCtx.current = new AudioContext();
      }
    };
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

  const playIntercom = () => {
    if (!hasInteracted) return;
    const ctx = webAudioCtx.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    synthesizeIntercom(ctx, seVolume);
    // ドアノブ音は少し遅らせて再生
    setTimeout(() => {
      const sound = new Howl({ src: ['/se/doorknob.wav'], volume: seVolume });
      sound.play();
    }, 2400);
  };

  useEffect(() => {
    if (currentBGM.current) {
      currentBGM.current.volume(bgmVolume);
    }
  }, [bgmVolume]);

  return (
    <AudioCtx.Provider value={{ playSE, playBGM, playIntercom }}>
      {children}
    </AudioCtx.Provider>
  );
}
