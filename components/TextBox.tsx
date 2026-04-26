'use client';

import { useState, useEffect } from 'react';

type Props = {
  text: string;
  onComplete: () => void;
};

export default function TextBox({ text, onComplete }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
    } else {
      onComplete();
    }
  };

  return (
    <div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl bg-black/80 border border-white/20 p-6 rounded-lg cursor-pointer text-white min-h-[160px]"
      onClick={handleClick}
    >
      <p className="text-xl leading-relaxed">{displayedText}</p>
      {!isTyping && (
        <div className="absolute bottom-4 right-4 animate-pulse">▼</div>
      )}
    </div>
  );
}
