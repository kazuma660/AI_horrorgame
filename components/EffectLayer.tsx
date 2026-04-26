'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Effect } from '@/lib/types';

type Props = {
  effect?: Effect;
};

export default function EffectLayer({ effect }: Props) {
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
      </AnimatePresence>
      {/* Glitch is handled via CSS classes */}
      {effect === 'glitch' && (
        <div className="absolute inset-0 backdrop-hue-rotate-90 backdrop-contrast-150 animate-pulse mix-blend-difference bg-white/10" />
      )}
      {/* Permanent noise overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
    </div>
  );
}
