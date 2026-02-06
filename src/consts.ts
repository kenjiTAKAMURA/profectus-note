// src/consts.ts
// サイト全体で使用する定数を定義するファイル
// サイト情報を変更する場合は、このファイルを編集してください

// ============================================
// サイトの基本情報
// ============================================
// サイトのタイトル（ブラウザのタブに表示される）
export const SITE_TITLE = 'Profectus Note';

// サイトの説明文（SEOやOGPで使用される）
export const SITE_DESCRIPTION = '中小企業の攻めと守りを支える実践ナレッジ。IT・DX・セキュリティの勘所を、今日から使える形でお届けします。';

// ============================================
// サイトURL
// ============================================
// 本番環境のURL（OGPタグやRSSフィードで使用）
export const SITE_URL = 'https://profectus-note.com';

// ============================================
// 著者情報
// ============================================
// ブログの著者情報（構造化データやOGPで使用）
export const AUTHOR = {
  name: 'プロフェクタスデザイン', // 著者名
  twitter: '@profectus_d', // Twitterアカウント（あれば）
  url: 'https://profectus-design.com', // 会社サイト（あれば）
};

// ============================================
// SNSリンク
// ============================================
// フッターやヘッダーに表示するSNSリンク
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/profectus_d',
  // 他のSNSがあれば追加（例: facebook, instagram, linkedin等）
};

// ============================================
// カテゴリ定義
// ============================================
// ブログ記事のカテゴリとその説明を定義
// 各カテゴリは「攻め（attack）」「守り（defense）」「両方（both）」に分類されます
export const CATEGORIES = {
  'dx': {
    name: 'DX戦略',
    description: '中小企業のDX推進、デジタル化の進め方',
    type: 'attack', // 攻め（ビジネス成長のためのIT活用）
  },
  'security': {
    name: 'セキュリティ',
    description: '中小企業向けセキュリティ対策、脅威動向',
    type: 'defense', // 守り（リスク対策）
  },
  'it-tools': {
    name: 'IT内製化',
    description: 'ノーコード/ローコード、AI活用、業務自動化',
    type: 'attack', // 攻め
  },
  'subsidy': {
    name: '補助金・支援',
    description: 'IT導入補助金、県の支援制度解説',
    type: 'both', // 攻めと守りの両方に役立つ
  },
  'news': {
    name: 'ニュース解説',
    description: 'DX・AI・セキュリティの最新動向',
    type: 'both',
  },
  'case-study': {
    name: '事例紹介',
    description: 'DX・セキュリティ対策の成功事例',
    type: 'both',
  },
} as const; // as constで型を固定（値の変更を防ぐ）

// ============================================
// Google Analytics ID
// ============================================
// Google AnalyticsのトラッキングID
// 実際のIDに置き換えてください（例: 'G-XXXXXXXXXX'）
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // 後で設定
