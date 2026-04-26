'use client';

import { Choice } from '@/lib/types';

type Props = {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
};

export default function ChoiceBox({ choices, onSelect }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="flex flex-col gap-4 w-64">
        {choices.map((choice, i) => (
          <button
            key={i}
            className="p-4 bg-black/80 border border-white/50 text-white hover:bg-white hover:text-black transition-colors rounded shadow-lg"
            onClick={() => onSelect(choice)}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
