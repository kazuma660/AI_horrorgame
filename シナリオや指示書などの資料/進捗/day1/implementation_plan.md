# Antigravity ホラーゲーム実装計画 (Day 1)

指示書 (`ANTIGRAVITY_BRIEF.md`) の内容をすべて確認しました。
まずは「Day 1：骨組み + 初回デプロイ」に向けたタスク（指示書の「9. 最初に実行してほしいタスク」）を実行するための計画を提案します。

## 実行タスク

1. **プロジェクト初期化**
   - 現在のディレクトリ (`/Users/kazuma/web3/2`) に `create-next-app` を用いて Next.js 15 (TypeScript, Tailwind, App Router, ESLint) のプロジェクトを構築します。
2. **依存パッケージの追加**
   - `framer-motion`, `howler`, `@types/howler`, `zustand` をインストールします。
3. **型定義 (`lib/types.ts`) の作成**
   - 指示書通りに `Effect`, `Choice`, `SceneNode`, `GameState` の型を定義します。
4. **シナリオデータ (`lib/scenario.ts`) の作成**
   - ダミーの5ノード（タイトル → 導入 → 選択肢 → 分岐2つ）を作成します。
5. **状態管理 (`lib/store.ts`) の作成**
   - Zustand を用いて `currentId`, `flags`, `bgmVolume`, `seVolume` を管理するストアを作成します。
6. **コンポーネントの最小実装**
   - `components/Scene.tsx`, `components/TextBox.tsx`, `components/ChoiceBox.tsx` を作成し、連携させます。
7. **ページ (`app/page.tsx`, `app/game/page.tsx`) の作成**
   - タイトル画面とゲーム本編画面を実装します。
8. **動作確認**
   - 開発サーバー (`npm run dev`) を立ち上げ、ブラウザで動作確認を行います。
   - タイトル → ゲーム本編 → 選択肢のクリックでノードが遷移することを確認します。

## ユーザーへの確認事項

> [!IMPORTANT]
> - プロジェクトは現在のディレクトリ (`/Users/kazuma/web3/2`) 直下に展開してよろしいでしょうか？（`package.json` 等がこのディレクトリに直接配置されます）
> - 問題なければ、計画を承認してください。実装を開始します。
