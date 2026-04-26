export type Effect = 'shake' | 'flash' | 'glitch' | 'fadeBlack' | 'noise';

export type Choice = {
  label: string;
  next: string;       // 次の SceneNode の id
  setFlag?: string;   // 選んだら立てるフラグ名
};

export type SceneNode = {
  id: string;
  background?: string;   // public/bg/xxx.png
  character?: string;    // public/char/xxx.png（任意）
  speaker?: string;      // 発話者名（任意）
  text: string;          // 本文
  bgm?: string;          // BGM切り替え（public/bgm/xxx.mp3）
  se?: string;           // 効果音（public/se/xxx.mp3）
  effect?: Effect;       // 演出
  next?: string;         // 次の id（choices がない場合）
  choices?: Choice[];    // 選択肢
  ending?: string;       // ここでエンディングへ（id を渡す）
  timeout?: number;      // ms: この時間クリックしないと timeoutNext へ強制移動
  timeoutNext?: string;  // タイムアウト時の遷移先 id
};

export type GameState = {
  currentId: string;
  flags: Record<string, boolean>;
  bgmVolume: number;     // 0..1
  seVolume: number;      // 0..1
};
