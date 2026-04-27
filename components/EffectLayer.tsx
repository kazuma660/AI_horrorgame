'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Effect } from '@/lib/types';

type Props = {
  effect?: Effect;
};

export default function EffectLayer({ effect }: Props) {
  const [intercomPhase, setIntercomPhase] = useState<'doorbell' | 'knob' | 'done'>('doorbell');

  useEffect(() => {
    if (effect !== 'intercom') {
      setIntercomPhase('doorbell');
      return;
    }
    setIntercomPhase('doorbell');
    const t1 = setTimeout(() => setIntercomPhase('knob'), 2200);
    const t2 = setTimeout(() => setIntercomPhase('done'), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [effect]);

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {effect === 'flash' && (
          <motion.div
            key="flash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-red-600 mix-blend-overlay"
          />
        )}
        {effect === 'fadeBlack' && (
          <motion.div
            key="fadeBlack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-black"
          />
        )}

        {/* ─── インターホン演出 ─── */}
        {effect === 'intercom' && intercomPhase === 'doorbell' && (
          <motion.div
            key="intercom-doorbell"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.15, 1, 0.9] }}
            transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* 全画面フラッシュ */}
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ opacity: [0, 0.4, 0, 0.5, 0, 0.3, 0] }}
              transition={{ duration: 2, times: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 1] }}
            />
            <motion.p
              className="relative text-white font-black tracking-[0.3em] drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]"
              style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', textShadow: '0 0 40px #fff, 0 0 80px #fff' }}
              animate={{ scale: [1, 1.1, 1, 1.1, 1], rotate: [0, -2, 2, -1, 0] }}
              transition={{ duration: 1.8, repeat: 0 }}
            >
              ピンポーン！
            </motion.p>
            <motion.p
              className="relative mt-4 text-white/80 font-bold tracking-widest"
              style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 0.3, duration: 1.5 }}
            >
              — インターホン —
            </motion.p>
          </motion.div>
        )}

        {effect === 'intercom' && intercomPhase === 'knob' && (
          <motion.div
            key="intercom-knob"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          >
            {/* 赤みがかった揺れオーバーレイ */}
            <motion.div
              className="absolute inset-0 bg-red-950/40"
              animate={{ opacity: [0.2, 0.5, 0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            {['ガチャ', 'ガチャ', 'ガチャッ！'].map((t, i) => (
              <motion.p
                key={i}
                className="relative text-red-400 font-black drop-shadow-[0_0_20px_rgba(220,50,50,0.8)]"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', textShadow: '0 0 30px #f00' }}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 1, 1],
                  x: [0, -10, 10, -8, 8, -5, 5, 0],
                }}
                transition={{
                  delay: i * 0.6,
                  duration: 0.8,
                  x: { delay: i * 0.6 + 0.1, duration: 0.4, repeat: 3, repeatType: 'mirror' },
                }}
              >
                {t}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glitch is handled via CSS classes */}
      {effect === 'glitch' && (
        <div className="absolute inset-0 backdrop-hue-rotate-90 backdrop-contrast-150 animate-pulse mix-blend-difference bg-white/10" />
      )}
      {/* Permanent noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
    </div>
  );
}
