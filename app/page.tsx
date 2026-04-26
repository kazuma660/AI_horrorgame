'use client';

import Link from 'next/link';
import { useGameStore } from '@/lib/store';
import { useEffect } from 'react';

export default function TitlePage() {
  const setCurrentId = useGameStore((state) => state.setCurrentId);

  useEffect(() => {
    // タイトルに戻ってきたら最初からにリセットする
    setCurrentId('start');
  }, [setCurrentId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white px-4 text-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <h1 className="text-4xl md:text-6xl font-bold tracking-widest mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-serif">
        午前2時のインターホン
      </h1>
      <Link 
        href="/game"
        className="px-10 py-4 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black font-semibold tracking-wider transition-all duration-300 z-10 rounded shadow-lg backdrop-blur-sm"
      >
        はじめる
      </Link>
    </div>
  );
}
