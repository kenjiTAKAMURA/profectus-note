// astro.config.mjs
// Astroフレームワークの設定ファイル
// このファイルでサイトのURL、プラグイン、ビルド設定などを定義します

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx'; // MDXファイル（Markdown + JSX）のサポート
import sitemap from '@astrojs/sitemap'; // サイトマップ自動生成

export default defineConfig({
  // サイトのURL（本番環境のURL）
  // このURLはOGPタグやサイトマップで使用されます
  site: 'https://profectus-note.com',
  
  // 統合プラグイン
  // Astroの機能を拡張するプラグインをここに追加します
  integrations: [
    mdx(), // MDXファイルをサポート（Markdown内でJSXコンポーネントを使用可能）
    sitemap({
      // サイトマップの設定
      changefreq: 'weekly', // 更新頻度（週次）
      priority: 0.7, // 優先度（0.0〜1.0）
      lastmod: new Date(), // 最終更新日
      // 除外するページ（下書きページを除外）
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  
  // ビルド設定
  build: {
    // CSS/JSのインライン化しきい値
    // 'always'にすると、すべてのCSSをインライン化してレンダリングブロックを回避
    inlineStylesheets: 'always',
  },
  
  // Vite設定（パフォーマンス最適化）
  vite: {
    build: {
      cssCodeSplit: false, // CSSを1つのファイルにまとめてリクエスト数を削減
    },
  },
  
  // Markdown設定
  markdown: {
    // シンタックスハイライト設定（コードブロックの色付け）
    shikiConfig: {
      theme: 'github-dark', // テーマ（ダークモード）
      wrap: true, // 長い行を折り返す
    },
  },
});
