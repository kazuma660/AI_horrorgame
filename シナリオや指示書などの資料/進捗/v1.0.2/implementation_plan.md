# 実装計画 v1.0.2: 背景画像の追加

## 概要
シナリオの状況を視覚的に補強するため、AI生成の背景画像を2枚追加。

## 変更内容

### 画像生成・配置
- `public/bg/bed_phone.png`: 深夜のベッドで、布団の中からスマホを見ている一人称視点の画像（冒頭シーン用）。
- `public/bg/peephole_woman.png`: 覗き穴越しに黒髪の女性が片目だけでこちらを覗き込んでいるホラー画像（ドアを叩かれるシーン用）。

### シナリオ更新 (`lib/scenario.ts`)
- `id: 'start'` の `background` を `dark_room.png` → `bed_phone.png` に変更。
- `id: 'door_check6'` の `background` を `peephole.png` → `peephole_woman.png` に変更。

## 対応ファイル
- `public/bg/bed_phone.png` （新規生成）
- `public/bg/peephole_woman.png` （新規生成）
- `lib/scenario.ts`
