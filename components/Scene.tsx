'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { scenario } from '@/lib/scenario';
import { Choice, SceneNode } from '@/lib/types';
import TextBox from './TextBox';
import ChoiceBox from './ChoiceBox';
import EffectLayer from './EffectLayer';
import { useAudio } from './AudioManager';

export default function Scene() {
  const router = useRouter();
  const currentId = useGameStore((state) => state.currentId);
  const setCurrentId = useGameStore((state) => state.setCurrentId);
  const setFlag = useGameStore((state) => state.setFlag);
  const { playBGM, playSE } = useAudio();

  const [node, setNode] = useState<SceneNode | undefined>(undefined);
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    const currentNode = scenario.find((n) => n.id === currentId);
    if (currentNode) {
      setNode(currentNode);
      setShowChoices(false);
      if (currentNode.bgm) playBGM(currentNode.bgm);
      if (currentNode.se) playSE(currentNode.se);
    }
  }, [currentId, playBGM, playSE]);

  // タイムアウトロジック: timeout が設定されているノードは一定時間後に強制遷移
  useEffect(() => {
    if (!node?.timeout || !node?.timeoutNext) return;
    const timer = setTimeout(() => {
      setCurrentId(node.timeoutNext!);
    }, node.timeout);
    return () => clearTimeout(timer);
  }, [node, setCurrentId]);

  if (!node) return null;

  const handleNext = () => {
    if (node.ending) {
      router.push(`/ending/${node.ending}`);
      return;
    }
    if (node.choices && node.choices.length > 0) {
      setShowChoices(true);
      return;
    }
    if (node.next) {
      setCurrentId(node.next);
    }
  };

  // 画面全体クリックで次へ（fadeBlack中でも進める）
  const handleScreenClick = () => {
    // 選択肢表示中はスクリーンクリックを無効化
    if (showChoices) return;
    handleNext();
  };

  const handleChoice = (choice: Choice) => {
    if (choice.setFlag) {
      setFlag(choice.setFlag, true);
    }
    setCurrentId(choice.next);
  };

  const getContainerClassName = () => {
    let className = "relative w-full h-screen overflow-hidden bg-zinc-950 text-white transition-colors duration-1000";
    if (node.effect === 'shake') {
      className += " animate-[shake_0.2s_ease-in-out_infinite]";
    }
    return className;
  };

  return (
    <div
      className={getContainerClassName()}
      onClick={handleScreenClick}
    >
      {/* Background image or gradient */}
      <div 
        className="absolute inset-0 -z-10 transition-all duration-1000 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: node.background ? `url(${node.background})` : 'none',
          backgroundColor: node.background ? 'transparent' : 'black'
        }}
      />
      {!node.background && (
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black -z-10" />
      )}
      
      <EffectLayer effect={node.effect} />

      {/* 暗転中でも「クリックで次へ」がわかるよう薄くガイド表示 */}
      {node.effect === 'fadeBlack' && !showChoices && (
        <div className="absolute bottom-8 w-full flex justify-center z-50 pointer-events-none">
          <span className="text-white/30 text-sm animate-pulse tracking-widest">- クリックして続ける -</span>
        </div>
      )}
      
      <TextBox text={node.text} onComplete={handleNext} />
      
      {showChoices && node.choices && (
        <ChoiceBox choices={node.choices} onSelect={handleChoice} />
      )}
    </div>
  );
}
