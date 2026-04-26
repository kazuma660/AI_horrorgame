# Day 2: 演出 + 音 + 本編 実装計画

Day 1の基盤の上に、Day 2のタスク（演出・音響・シナリオ本編）を実装します。

## ユーザーへの確認事項 (Open Questions)

> [!IMPORTANT]
> - タイトルは特にご指定がなければ **『未登録の番号』** として実装を進めますがよろしいでしょうか？
> - この計画で問題なければ承認をお願いします！承認後、実装を開始します。

## 実行タスク (Proposed Changes)

### 1. 演出層 (`components/EffectLayer.tsx`) の実装
Framer Motion と CSS を用いて、シナリオノードで指定された以下のエフェクトを実装します。
- `shake`: `Scene.tsx` に適用済みのアニメーションを利用または拡張
- `flash`: 画面全体を赤く光らせる (`Framer Motion`)
- `glitch`: CSS `backdrop-filter` や `hue-rotate` を用いたノイズ・色ズレ表現
- `fadeBlack`: 画面を黒フェードイン・アウト
- `noise`: 常にうっすらと乗るフィルムノイズ（現在 `Scene.tsx` に適用済みのものを `EffectLayer` に切り出し）

### 2. 音響管理 (`components/AudioManager.tsx`) の実装
Howler.js を使用した React Context ベースの音響管理を実装します。
- `playBGM(src)`: クロスフェードでの BGM 切り替え
- `playSE(src)`: 効果音の単発再生
- ユーザー操作（最初のクリック等）をフックして AudioContext を初期化する仕組み

### 3. シナリオ本編 (`lib/scenario.ts`) の書き切り
承認いただいた「最初のシナリオ構成」に基づいて、全20〜30ノードの詳細なテキスト、選択肢、フラグ (`setFlag`)、そして `effect` / `bgm` / `se` のタイミングを記述します。

### 4. プレースホルダーアセットの設定
- 立ち絵や背景のプレースホルダー（CSSグラデーションやシルエットSVG）を用意し、シナリオから参照できるようにパス (`public/...`) を設定します。

## Verification Plan

- `npm run dev` でローカルサーバーを起動し、追加したシナリオ・演出・音が想定通りに動作することを確認します。
- 実際にブラウザで一通りプレイし、3つのエンディングルート（Bad/True/Hidden）に到達できるかテストします。
