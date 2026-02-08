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
  twitter: '@takamurakn', // Twitterアカウント（あれば）
  url: 'https://profectus-design.com', // 会社サイト（あれば）
};

// ============================================
// SNSリンク
// ============================================
// フッターやヘッダーに表示するSNSリンク
export const SOCIAL_LINKS = {
  twitter: 'https://x.com/takamurakn',
  // 他のSNSがあれば追加（例: facebook, instagram, linkedin等）
};

// ============================================
// カテゴリ定義
// ============================================
// ブログ記事のカテゴリとその説明を定義
// 各カテゴリは「攻め（attack）」「守り（defense）」「両方（both）」「事例（case）」に分類されます
export const CATEGORIES = {
  'digitalization': {
    name: 'デジタル化',
    description: '中小企業のDX推進、デジタル化の進め方',
    type: 'attack', // 攻め（ビジネス成長のためのIT活用）
    frequency: '週1本',
  },
  'ai': {
    name: 'AI',
    description: 'ノーコード/ローコード、AI活用、業務自動化',
    type: 'attack', // 攻め
    frequency: '月2本',
  },
  'cybersecurity': {
    name: 'サイバーセキュリティ',
    description: '中小企業向けセキュリティ対策、脅威動向',
    type: 'defense', // 守り（リスク対策）
    frequency: '月2本',
  },
  'ceo-interview': {
    name: '社長インタビュー',
    description: '中小企業社長へのインタビュー記事',
    type: 'case', // 事例
    frequency: '月1本（将来）',
  },
  'case-study': {
    name: '事例紹介',
    description: 'DX・セキュリティ対策の成功事例',
    type: 'case', // 事例
    frequency: '月1本（将来）',
  },
  'news': {
    name: '最新ニュース解説',
    description: 'DX・AI・セキュリティの最新動向',
    type: 'both', // 両方
    frequency: '週2-3本',
  },
  'subsidy': {
    name: '補助金・支援制度',
    description: 'IT導入補助金、県の支援制度解説',
    type: 'both', // 攻めと守りの両方に役立つ
    frequency: '随時',
  },
  'tools': {
    name: 'ツール活用術',
    description: '業務効率化ツールの実践Tips',
    type: 'attack', // 攻め
    frequency: '月1本',
  },
} as const; // as constで型を固定（値の変更を防ぐ）

// ============================================
// Google Analytics ID
// ============================================
// Google AnalyticsのトラッキングID
// 実際のIDに置き換えてください（例: 'G-XXXXXXXXXX'）
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // 後で設定
