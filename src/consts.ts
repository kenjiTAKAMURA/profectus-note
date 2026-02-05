// src/consts.ts

// サイトの基本情報
export const SITE_TITLE = 'Profectus Note';
export const SITE_DESCRIPTION = '中小企業の攻めと守りを支える実践ナレッジ。IT・DX・セキュリティの勘所を、今日から使える形でお届けします。';

// サイトURL
export const SITE_URL = 'https://profectus-note.com';

// 著者情報
export const AUTHOR = {
  name: 'プロフェクタスデザイン',
  twitter: '@profectus_d', // Twitterアカウント（あれば）
  url: 'https://profectus-design.com', // 会社サイト（あれば）
};

// SNSリンク
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/profectus_d',
  // 他のSNSがあれば追加
};

// カテゴリ定義
export const CATEGORIES = {
  'dx': {
    name: 'DX戦略',
    description: '中小企業のDX推進、デジタル化の進め方',
    type: 'attack', // 攻め
  },
  'security': {
    name: 'セキュリティ',
    description: '中小企業向けセキュリティ対策、脅威動向',
    type: 'defense', // 守り
  },
  'it-tools': {
    name: 'IT内製化',
    description: 'ノーコード/ローコード、AI活用、業務自動化',
    type: 'attack',
  },
  'subsidy': {
    name: '補助金・支援',
    description: 'IT導入補助金、県の支援制度解説',
    type: 'both',
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
} as const;

// Google Analytics ID
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // 後で設定
