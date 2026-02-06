// src/pages/rss.xml.js
// RSSフィードのエンドポイント（ルートパス: /rss.xml）
// ブログ記事をRSS形式で配信します（RSSリーダーで購読可能）

import rss from '@astrojs/rss'; // RSS生成ライブラリ
import { getCollection } from 'astro:content'; // Content Collectionsから記事を取得
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../consts';

// GET関数：RSSフィードを生成して返す
// Astroのエンドポイント機能を使用（.jsファイルはAPIエンドポイントとして機能）
export async function GET(context) {
  // 下書き以外のブログ記事を取得
  // 第2引数でフィルタリング（draftがtrueの記事を除外）
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });
  
  // 日付順にソート（新しい順）
  // valueOf()でDateオブジェクトを数値に変換して比較
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  // RSSフィードを生成
  return rss({
    title: SITE_TITLE, // フィードのタイトル
    description: SITE_DESCRIPTION, // フィードの説明
    site: SITE_URL, // サイトのURL
    // 各記事の情報をRSS形式に変換
    items: sortedPosts.map((post) => ({
      title: post.data.title, // 記事タイトル
      pubDate: post.data.pubDate, // 公開日
      description: post.data.description, // 記事の説明
      link: `/blog/${post.slug}/`, // 記事のURL
      categories: post.data.tags ?? [], // タグをカテゴリとして使用
      author: 'プロフェクタスデザイン', // 著者名
      customData: `<language>ja</language>`, // 言語設定
    })),
    customData: `<language>ja</language>`, // フィード全体の言語設定
    stylesheet: '/rss-styles.xsl', // RSSのスタイルシート（オプション）
  });
}
