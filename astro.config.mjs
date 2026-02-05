// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // サイトのURL（本番環境のURL）
  site: 'https://profectus-note.com',
  
  // 統合プラグイン
  integrations: [
    mdx(),
    sitemap({
      // サイトマップの設定
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // 除外するページ
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  
  // ビルド設定
  build: {
    // CSS/JSのインライン化しきい値
    inlineStylesheets: 'auto',
  },
  
  // Markdown設定
  markdown: {
    // シンタックスハイライト
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
