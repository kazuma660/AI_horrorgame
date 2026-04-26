# Antigravity 指示書：Web 2Dノベル型ホラーゲーム

このドキュメントを最初から最後まで読んで、内容を理解した上で順に実装してください。
不明点があれば実装前に質問してください。アセット（画像・音）は最初はプレースホルダーで構いません。

---

## 0. ゴール

ブラウザで遊べる短編ノベル型ホラーゲームを作る。

- プレイ時間：5〜10分
- 構成：一本道＋分岐少し（エンディング3種）
- 配信：GitHub にプッシュ → Vercel に自動デプロイ
- 完成までの期間：3日

提出物は Vercel の URL ＋ 50文字程度の一言紹介。

---

## 1. 技術スタック（必ずこの構成で）

- **Next.js 15**（App Router, TypeScript）
- **Tailwind CSS**（スタイリング）
- **Framer Motion**（フェード・揺れ・グリッチ等の演出）
- **Howler.js**（BGM / SE。ループ・フェード・複数音源管理）
- **Zustand**（ゲーム状態管理：現在シーンID、フラグ、設定）
- 静的アセットは `public/` 配下

理由：Antigravity（AIエージェントIDE）と相性が良く、Vercelに `git push` だけでデプロイできる。Unityのようなビルド工程不要。

---

## 2. ディレクトリ構成

```
/app
  /page.tsx                 # タイトル画面
  /game/page.tsx            # ゲーム本編（client component）
  /ending/[id]/page.tsx     # エンディング画面（id でルート分岐）
  /layout.tsx
/components
  /Scene.tsx                # 背景＋立ち絵＋テキストボックス統合
  /TextBox.tsx              # タイプライター表示
  /ChoiceBox.tsx            # 選択肢UI
  /BackgroundLayer.tsx      # 背景画像（フィルタ・揺れ対応）
  /CharacterLayer.tsx       # 立ち絵
  /EffectLayer.tsx          # ノイズ・暗転・赤フラッシュ等
  /AudioManager.tsx         # BGM/SE 管理（context provider）
/lib
  /scenario.ts              # シナリオデータ（SceneNode[]）
  /store.ts                 # Zustand store
  /types.ts                 # SceneNode, Choice, GameState 型
/public
  /bg/                      # 背景画像
  /char/                    # 立ち絵
  /se/                      # 効果音
  /bgm/                     # BGM
```

---

## 3. 型定義（`lib/types.ts`）

```ts
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
};

export type GameState = {
  currentId: string;
  flags: Record<string, boolean>;
  bgmVolume: number;     // 0..1
  seVolume: number;      // 0..1
};
```

---

## 4. ゲーム機能要件

### タイトル画面（`app/page.tsx`）
- タイトルロゴ（テキストでOK）、「はじめる」ボタン、音量設定
- 不気味なBGMを薄く流す（ユーザー操作後に再生開始）

### ゲーム本編（`app/game/page.tsx`）
- 1文字ずつタイプライター表示（速度はconfigurable）
- クリックで「全文表示」→もう一度クリックで「次のノードへ」
- 選択肢があれば ChoiceBox を表示
- ノードに `effect` があれば該当演出を再生
- ノードに `bgm` 変更があればクロスフェード
- ノードに `se` があれば単発再生
- ノードに `ending` があれば `/ending/[id]` へ遷移

### エンディング画面（`app/ending/[id]/page.tsx`）
- エンディング名・短い後日談テキスト・「もう一度」ボタン
- エンディング3種：`bad` / `true` / `hidden`

### 演出（`components/EffectLayer.tsx`）
- `shake`：画面全体を 200ms 揺らす（Framer Motion の transform）
- `flash`：赤い半透明レイヤーを 100ms 表示
- `glitch`：CSS filter (hue-rotate / contrast) + transform を短時間ランダム適用
- `fadeBlack`：黒フェードイン → アウト
- `noise`：常時うっすらノイズ画像をオーバーレイ（CSS background）

### 音響（`components/AudioManager.tsx`）
- React Context で Howler インスタンスを管理
- BGMはクロスフェードで切り替え
- SEは即時再生
- ブラウザの自動再生制限対策：初回クリックまで `AudioContext` を suspend → resume

---

## 5. シナリオ概要（本文はAIが書いて良い）

**舞台**：深夜、自宅の自室。スマホに知らない番号から通知が届く。
**コンセプト**：日常のすぐ隣にある違和感。派手なホラーではなくジワジワ系。
**ノード数**：20〜30
**エンディング**：3種
- `bad`：通知に従ってしまった末路
- `true`：違和感に気づいて翻す
- `hidden`：特定フラグの組み合わせで到達する裏ルート

文体：短文、余白多め、句点で間を取る。説明過多にしない。

---

## 6. アセット戦略（重要）

最初は **すべてプレースホルダー** で良い：
- 背景：CSSグラデーション + ノイズ
- 立ち絵：黒シルエットSVG
- BGM/SE：無音 or 短いダミー

後から差し替え可能な構造（`public/` のパスを scenario.ts から参照）にしておくこと。
有料素材は買わない。差し替え時は CC0 / 商用利用可の素材から選ぶ。

---

## 7. デプロイ要件

- GitHub にリポジトリ作成（public でも private でもOK）
- Vercel に接続して自動デプロイ
- `next build` でエラーが出ない状態を維持
- 環境変数は使わない（フロントだけで完結）

---

## 8. 3日スケジュール

### Day 1：骨組み + 初回デプロイ
- `create-next-app` でプロジェクト初期化（TS, Tailwind, App Router, ESLint）
- 必要パッケージ：`framer-motion`, `howler`, `@types/howler`, `zustand`
- `lib/types.ts` / `lib/store.ts` / `lib/scenario.ts`（ダミー5ノード）
- `components/Scene.tsx` / `TextBox.tsx` / `ChoiceBox.tsx` 最小実装
- `app/page.tsx`（タイトル）/ `app/game/page.tsx`（本編）
- `npm run dev` で疎通確認
- **GitHub に push → Vercel 初回デプロイ（必ずDay 1中に完了させる）**

### Day 2：演出 + 音 + 本編
- `EffectLayer` で shake/flash/glitch/fadeBlack/noise を実装
- `AudioManager` で BGM クロスフェード・SE再生を実装
- シナリオ20〜30ノードを書き切る
- 背景・立ち絵プレースホルダーを差し込み

### Day 3：エンディング + 仕上げ
- エンディング3種（`/ending/[id]`）実装
- テンポ・音量・演出強度の調整
- アセット差し替え（フリー素材）
- 本番デプロイ確認・提出

---

## 9. 最初に実行してほしいタスク（順番厳守）

1. `create-next-app` でプロジェクト初期化（TypeScript / Tailwind / App Router / ESLint 有効）
2. 依存追加：`framer-motion`, `howler`, `@types/howler`, `zustand`
3. `lib/types.ts` を上記の型定義どおりに作成
4. `lib/scenario.ts` にダミー5ノード（タイトル → 導入 → 選択肢 → 分岐2つ）
5. `lib/store.ts` に Zustand store（currentId, flags, 音量）
6. `components/Scene.tsx` `TextBox.tsx` `ChoiceBox.tsx` を最小実装
7. `app/page.tsx`（タイトル画面）/ `app/game/page.tsx`（本編）
8. `npm run dev` で「タイトル → ゲーム → 選択肢 → 別ノード」が動くことを確認
9. ここまで完了したら報告する（Day 2 内容は次のメッセージで指示する）

---

## 10. コーディング方針

- 過剰な抽象化はしない。3日で完成させることを優先
- コメントは必要最低限
- `'use client'` ディレクティブを忘れない（インタラクティブ部分）
- アクセシビリティはキーボード操作（Enter/Space で次へ）だけ確保
- 型は厳密に。`any` は避ける

---

## 11. こだわりポイント候補（提出時の50文字紹介に使う）

- CSS filter だけで作ったグリッチ演出
- タイプライター × 効果音 × 画面揺れの同期
- ブラウザだけで完結、URL一つで遊べる短編ホラー

実装が進んだら一番尖った要素を選んで紹介文を書く。
