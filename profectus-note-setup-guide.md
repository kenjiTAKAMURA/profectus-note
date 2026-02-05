# Profectus Note ブログ構築手順書

**作成日**: 2026年2月3日  
**対象者**: プログラミング初心者  
**所要時間**: 約4〜6時間（初回構築時）

---

## 目次

1. [はじめに：全体像の理解](#1-はじめに全体像の理解)
2. [事前準備：必要なアカウントとツール](#2-事前準備必要なアカウントとツール)
3. [Step 1：開発環境の構築](#3-step-1開発環境の構築)
4. [Step 2：Astroプロジェクトの作成](#4-step-2astroプロジェクトの作成)
5. [Step 3：ブログテーマのカスタマイズ](#5-step-3ブログテーマのカスタマイズ)
6. [Step 4：SEO対策の実装](#6-step-4seo対策の実装)
7. [Step 5：GitHubリポジトリの作成と連携](#7-step-5githubリポジトリの作成と連携)
8. [Step 6：Cloudflare Pagesへのデプロイ](#8-step-6cloudflare-pagesへのデプロイ)
9. [Step 7：独自ドメインとSSLの設定](#9-step-7独自ドメインとsslの設定)
10. [Step 8：Google Analytics・Search Consoleの設定](#10-step-8google-analyticssearch-consoleの設定)
11. [Step 9：Obsidianとの連携設定](#11-step-9obsidianとの連携設定)
12. [Step 10：Cursorでの執筆環境構築](#12-step-10cursorでの執筆環境構築)
13. [Step 11：自動化ワークフローの構築](#13-step-11自動化ワークフローの構築)
14. [運用ガイド：記事の書き方と公開方法](#14-運用ガイド記事の書き方と公開方法)
15. [トラブルシューティング](#15-トラブルシューティング)
16. [付録：コマンド早見表](#16-付録コマンド早見表)

---

## 1. はじめに：全体像の理解

### 1.1 システム構成図

```
┌─────────────────────────────────────────────────────────────────────┐
│                        執筆・管理環境                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│   │   Obsidian   │ ───▶ │    Cursor    │ ───▶ │    GitHub    │    │
│   │ (ナレッジ管理) │      │  (記事編集)   │      │ (バージョン管理) │    │
│   └──────────────┘      └──────────────┘      └──────────────┘    │
│                                                      │              │
└──────────────────────────────────────────────────────│──────────────┘
                                                       │
                                                       │ 自動デプロイ
                                                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        公開・配信環境                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│   │    Astro     │ ───▶ │  Cloudflare  │ ───▶ │   ブラウザ    │    │
│   │ (静的サイト生成)│      │    Pages     │      │   (読者)     │    │
│   └──────────────┘      │ + SSL + CDN  │      └──────────────┘    │
│                         └──────────────┘                           │
│                               ▲                                    │
│                               │                                    │
│                    profectus-note.com                              │
│                       (独自ドメイン)                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 各ツールの役割

| ツール | 役割 | なぜ使うのか |
|--------|------|-------------|
| **Obsidian** | ナレッジ管理・アイデア蓄積 | Markdownで書ける、ローカル保存、リンク機能が強力 |
| **Cursor** | 記事執筆・コード編集 | AI支援で執筆が効率化、VSCode互換 |
| **Astro** | 静的サイト生成 | 高速、SEOに強い、Markdownをそのまま使える |
| **GitHub** | バージョン管理・自動デプロイ連携 | 変更履歴が残る、Cloudflareと連携できる |
| **Cloudflare Pages** | ホスティング・CDN | 無料、高速、SSL自動設定 |

### 1.3 この手順書で作るもの

- ✅ SEO対策済みのブログサイト
- ✅ 独自ドメイン（profectus-note.com）での公開
- ✅ SSL（https）対応
- ✅ Google Analytics / Search Console連携
- ✅ Obsidianで書いた記事をブログに公開できる仕組み
- ✅ GitHubにpushするだけで自動公開される仕組み

---

## 2. 事前準備：必要なアカウントとツール

### 2.1 作成が必要なアカウント（すべて無料）

以下のアカウントを事前に作成してください。

| サービス | URL | 用途 |
|----------|-----|------|
| GitHub | https://github.com | コード管理・自動デプロイ |
| Cloudflare | https://cloudflare.com | ホスティング・CDN |
| Google | https://google.com | Analytics・Search Console |

### 2.2 インストールが必要なソフトウェア

#### 2.2.1 Node.js（必須）

Node.jsはJavaScriptをパソコン上で動かすためのソフトウェアです。Astroを動かすために必要です。

**インストール手順（Windows）**

1. https://nodejs.org にアクセス
2. 「LTS」と書かれた緑色のボタンをクリック（推奨版をダウンロード）
3. ダウンロードしたファイル（`node-v○○-x64.msi`）をダブルクリック
4. 「Next」を押し続けてインストール完了

**インストール手順（Mac）**

1. https://nodejs.org にアクセス
2. 「LTS」と書かれた緑色のボタンをクリック
3. ダウンロードしたファイル（`node-v○○.pkg`）をダブルクリック
4. 画面の指示に従ってインストール

**確認方法**

インストール後、以下のコマンドで確認します。

```bash
# ターミナル（Mac）またはコマンドプロンプト（Windows）を開いて実行
node --version
# → v20.x.x のように表示されればOK

npm --version
# → 10.x.x のように表示されればOK
```

#### 2.2.2 Git（必須）

Gitはファイルのバージョン管理ツールです。GitHubと連携するために必要です。

**インストール手順（Windows）**

1. https://git-scm.com にアクセス
2. 「Download for Windows」をクリック
3. ダウンロードしたファイルを実行
4. すべてデフォルト設定のまま「Next」を押し続けてインストール

**インストール手順（Mac）**

Macには最初からGitが入っています。入っていない場合は以下を実行：

```bash
xcode-select --install
```

**確認方法**

```bash
git --version
# → git version 2.x.x のように表示されればOK
```

#### 2.2.3 Cursor（推奨）

AIアシスタント付きのコードエディタです。

1. https://cursor.sh にアクセス
2. 「Download」をクリック
3. ダウンロードしたファイルを実行してインストール

#### 2.2.4 Obsidian（推奨）

ナレッジ管理ツールです。

1. https://obsidian.md にアクセス
2. 「Get Obsidian」をクリック
3. お使いのOSに合わせてダウンロード・インストール

### 2.3 独自ドメインの取得

`profectus-note.com` ドメインを取得します。

**おすすめのドメイン取得サービス**

| サービス | URL | 特徴 |
|----------|-----|------|
| お名前.com | https://www.onamae.com | 国内最大手、日本語サポート |
| Cloudflare Registrar | https://www.cloudflare.com/products/registrar/ | 原価販売で安い、Cloudflare連携が簡単 |
| Google Domains | https://domains.google | シンプル、Google連携しやすい |

**ドメイン取得手順（お名前.comの例）**

1. https://www.onamae.com にアクセス
2. 検索ボックスに `profectus-note` と入力して検索
3. `.com` が取得可能か確認
4. カートに入れて購入手続き
5. Whois情報公開代行を「利用する」に設定（個人情報保護のため）
6. 支払い完了

> **💡 ポイント**: Cloudflare Registrarで取得すると、後のDNS設定が楽になります。

---

## 3. Step 1：開発環境の構築

### 3.1 作業フォルダの作成

まず、ブログ関連のファイルを置くフォルダを作成します。

**Windows の場合**

```bash
# コマンドプロンプトを開く（Windowsキー + R → cmd と入力 → Enter）
cd %USERPROFILE%
mkdir Projects
cd Projects
```

**Mac の場合**

```bash
# ターミナルを開く（Command + Space → terminal と入力 → Enter）
cd ~
mkdir Projects
cd Projects
```

### 3.2 Gitの初期設定

GitHubと連携するために、Gitに自分の情報を設定します。

```bash
# 名前を設定（GitHubに表示される名前）
git config --global user.name "あなたの名前"

# メールアドレスを設定（GitHubアカウントと同じメールアドレス）
git config --global user.email "your-email@example.com"

# 設定の確認
git config --global --list
```

### 3.3 GitHubとの認証設定

GitHubにコードをアップロードするための認証設定を行います。

**方法1: GitHub CLIを使う（推奨・簡単）**

```bash
# GitHub CLIのインストール
# Windows（PowerShellを管理者権限で開いて実行）
winget install GitHub.cli

# Mac
brew install gh

# 認証（ブラウザが開きます）
gh auth login
# → 「GitHub.com」を選択
# → 「HTTPS」を選択
# → 「Login with a web browser」を選択
# → 表示されるコードをブラウザに入力
```

**方法2: Personal Access Tokenを使う**

1. https://github.com/settings/tokens にアクセス
2. 「Generate new token (classic)」をクリック
3. Note: `profectus-note-blog` など任意の名前
4. Expiration: 90 daysまたはNo expiration
5. Scopeで `repo` にチェック
6. 「Generate token」をクリック
7. 表示されたトークンをコピー（この画面を閉じると二度と見れません）

---

## 4. Step 2：Astroプロジェクトの作成

### 4.1 Astroプロジェクトの初期化

ブログ用のAstroプロジェクトを作成します。

```bash
# Projectsフォルダにいることを確認
cd ~/Projects  # Mac
cd %USERPROFILE%\Projects  # Windows

# Astroプロジェクトを作成
npm create astro@latest profectus-note

# 質問に答えていきます
# ┌  astro   v4.x.x
# │
# ◆  Where should we create your new project?
# │  ./profectus-note（そのままEnter）
# │
# ◆  How would you like to start your new project?
# │  Use blog template（↑↓キーで選択してEnter）
# │
# ◆  Do you plan to write TypeScript?
# │  Yes（Enterで選択）
# │
# ◆  How strict should TypeScript be?
# │  Strict（Enterで選択）
# │
# ◆  Install dependencies?
# │  Yes（Enterで選択）
# │
# ◆  Initialize a new git repository?
# │  Yes（Enterで選択）
```

### 4.2 プロジェクトフォルダに移動

```bash
cd profectus-note
```

### 4.3 必要なパッケージのインストール

SEO対策やRSS生成に必要なパッケージをインストールします。

```bash
# SEO・サイトマップ・RSS用パッケージ
npm install @astrojs/sitemap @astrojs/rss astro-seo

# 画像最適化パッケージ
npm install @astrojs/image sharp
```

### 4.4 開発サーバーの起動確認

```bash
npm run dev
```

ブラウザで http://localhost:4321 にアクセスして、ブログが表示されることを確認します。

> **💡 確認ポイント**: ブログのトップページが表示されればOKです。確認後は `Ctrl + C` でサーバーを停止します。

---

## 5. Step 3：ブログテーマのカスタマイズ

### 5.1 フォルダ構成の確認

Cursorでプロジェクトを開きます。

```bash
# Cursorでプロジェクトを開く
cursor .
```

フォルダ構成は以下のようになっています：

```
profectus-note/
├── public/              # 静的ファイル（画像、favicon等）
│   └── favicon.svg
├── src/
│   ├── components/      # 再利用可能なコンポーネント
│   ├── content/         # ブログ記事（Markdown）
│   │   └── blog/
│   ├── layouts/         # ページレイアウト
│   ├── pages/           # 各ページ
│   └── styles/          # スタイルシート
├── astro.config.mjs     # Astroの設定ファイル
├── package.json         # プロジェクト情報
└── tsconfig.json        # TypeScript設定
```

### 5.2 サイト基本設定の変更

`astro.config.mjs` を以下の内容に書き換えます：

```javascript
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
```

### 5.3 サイト情報の設定ファイル作成

`src/consts.ts` を以下の内容に書き換えます：

```typescript
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
```

### 5.4 デザインカラーの設定

`src/styles/global.css` を作成/編集します：

```css
/* src/styles/global.css */

:root {
  /* Profectus Noteのカラースキーム */
  --color-primary: #1a365d;      /* ディープブルー - 信頼・専門性 */
  --color-secondary: #38a169;    /* アクセントグリーン - 成長・進歩 */
  --color-background: #f7fafc;   /* クリーンホワイト */
  --color-text: #2d3748;         /* テキスト色 */
  --color-text-light: #718096;   /* 薄いテキスト色 */
  --color-border: #e2e8f0;       /* ボーダー色 */
  --color-attack: #3182ce;       /* 攻め（IT・DX）のアクセント色 */
  --color-defense: #e53e3e;      /* 守り（セキュリティ）のアクセント色 */
  
  /* フォント */
  --font-heading: 'Noto Sans JP', sans-serif;
  --font-body: 'Noto Serif JP', serif;
  
  /* スペーシング */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
}

/* ベーススタイル */
body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-background);
  line-height: 1.8;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--color-primary);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  color: var(--color-secondary);
}

/* 攻め・守りのバッジ */
.badge-attack {
  background-color: var(--color-attack);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-defense {
  background-color: var(--color-defense);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 今日からできるアクションボックス */
.action-box {
  background-color: #ebf8ff;
  border-left: 4px solid var(--color-secondary);
  padding: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  border-radius: 0 0.5rem 0.5rem 0;
}

.action-box h3 {
  color: var(--color-secondary);
  margin-top: 0;
}
```

### 5.5 ブログ記事のスキーマ定義

`src/content/config.ts` を以下の内容に書き換えます：

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // 基本情報
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    
    // カテゴリとタグ
    category: z.enum(['dx', 'security', 'it-tools', 'subsidy', 'news', 'case-study']),
    tags: z.array(z.string()).default([]),
    
    // 攻め/守り分類
    attackOrDefense: z.enum(['attack', 'defense', 'both']).default('both'),
    
    // OGP画像
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    
    // 記事タイプ
    type: z.enum(['article', 'interview', 'case-study', 'news']).default('article'),
    
    // 今日からできるアクション
    actionItems: z.array(z.string()).optional(),
    
    // 下書きフラグ
    draft: z.boolean().default(false),
    
    // 関連記事
    relatedPosts: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

---

## 6. Step 4：SEO対策の実装

### 6.1 SEOコンポーネントの作成

`src/components/SEO.astro` を作成します：

```astro
---
// src/components/SEO.astro
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, AUTHOR } from '../consts';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
  canonical?: string;
}

const {
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  image = '/og-default.png',
  article = false,
  publishedTime,
  modifiedTime,
  tags = [],
  canonical,
} = Astro.props;

const pageTitle = title === SITE_TITLE ? title : `${title} | ${SITE_TITLE}`;
const canonicalURL = canonical || new URL(Astro.url.pathname, SITE_URL).href;
const ogImageURL = new URL(image, SITE_URL).href;
---

<!-- 基本メタタグ -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content={description} />
<meta name="author" content={AUTHOR.name} />

<!-- canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- OGP (Open Graph Protocol) -->
<meta property="og:type" content={article ? 'article' : 'website'} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageURL} />
<meta property="og:site_name" content={SITE_TITLE} />
<meta property="og:locale" content="ja_JP" />

{article && publishedTime && (
  <meta property="article:published_time" content={publishedTime.toISOString()} />
)}
{article && modifiedTime && (
  <meta property="article:modified_time" content={modifiedTime.toISOString()} />
)}
{article && tags.length > 0 && tags.map((tag) => (
  <meta property="article:tag" content={tag} />
))}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content={AUTHOR.twitter} />
<meta name="twitter:creator" content={AUTHOR.twitter} />
<meta name="twitter:title" content={pageTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageURL} />

<!-- タイトル -->
<title>{pageTitle}</title>

<!-- RSS -->
<link
  rel="alternate"
  type="application/rss+xml"
  title={`${SITE_TITLE} RSS Feed`}
  href={`${SITE_URL}/rss.xml`}
/>

<!-- ファビコン -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- 構造化データ (JSON-LD) -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": article ? "BlogPosting" : "WebSite",
  "name": pageTitle,
  "description": description,
  "url": canonicalURL,
  "image": ogImageURL,
  ...(article ? {
    "author": {
      "@type": "Organization",
      "name": AUTHOR.name,
      "url": AUTHOR.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": AUTHOR.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
      },
    },
    "datePublished": publishedTime?.toISOString(),
    "dateModified": modifiedTime?.toISOString() || publishedTime?.toISOString(),
  } : {
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }),
})} />
```

### 6.2 robots.txt の作成

`public/robots.txt` を作成します：

```
# robots.txt for profectus-note.com

User-agent: *
Allow: /

# サイトマップの場所を指定
Sitemap: https://profectus-note.com/sitemap-index.xml

# 下書きページは除外
Disallow: /draft/

# 検索結果ページは除外（もしあれば）
Disallow: /search?

# 管理ページは除外（もしあれば）
Disallow: /admin/
```

### 6.3 RSS フィードの作成

`src/pages/rss.xml.js` を作成します：

```javascript
// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../consts';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });
  
  // 日付順にソート（新しい順）
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
      author: 'プロフェクタスデザイン',
      customData: `<language>ja</language>`,
    })),
    customData: `<language>ja</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
```

### 6.4 レイアウトへのSEOコンポーネント組み込み

`src/layouts/BaseLayout.astro` を作成/編集します：

```astro
---
// src/layouts/BaseLayout.astro
import SEO from '../components/SEO.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { GA_TRACKING_ID } from '../consts';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
}

const props = Astro.props;
---

<!doctype html>
<html lang="ja">
  <head>
    <SEO {...props} />
    
    <!-- Google Analytics -->
    {GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX' && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '{GA_TRACKING_ID}');
        </script>
      </>
    )}
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### 6.5 OGP画像のデフォルト作成

`public/og-default.png` として、1200×630ピクセルのOGP画像を作成して配置します。

> **💡 ヒント**: Canvaなどのツールで作成できます。サイト名「Profectus Note」とタグライン「中小企業の攻めと守りを支える実践ナレッジ」を入れた画像がおすすめです。

---

## 7. Step 5：GitHubリポジトリの作成と連携

### 7.1 GitHubでリポジトリを作成

1. https://github.com にログイン
2. 右上の「+」ボタン → 「New repository」をクリック
3. 以下の情報を入力：
   - Repository name: `profectus-note`
   - Description: `Profectus Note - 中小企業の攻めと守りを支える実践ナレッジブログ`
   - Public/Private: どちらでもOK（Privateでも無料でCloudflare Pages連携可能）
   - 「Add a README file」: チェックしない
4. 「Create repository」をクリック

### 7.2 ローカルリポジトリとGitHubを連携

```bash
# プロジェクトフォルダで実行
cd ~/Projects/profectus-note

# リモートリポジトリを追加
git remote add origin https://github.com/あなたのユーザー名/profectus-note.git

# 現在の変更をコミット
git add .
git commit -m "Initial commit: Astroブログの初期設定"

# GitHubにプッシュ
git push -u origin main
```

> **💡 エラーが出た場合**: `main` を `master` に変えてみてください。または以下を実行：
> ```bash
> git branch -M main
> git push -u origin main
> ```

---

## 8. Step 6：Cloudflare Pagesへのデプロイ

### 8.1 Cloudflare Pagesプロジェクトの作成

1. https://dash.cloudflare.com にログイン
2. 左メニューの「Workers & Pages」をクリック
3. 「Create application」→「Pages」→「Connect to Git」をクリック
4. 「GitHub」を選択し、GitHubアカウントを連携
5. `profectus-note` リポジトリを選択
6. 以下の設定を入力：

| 項目 | 設定値 |
|------|--------|
| Project name | `profectus-note` |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |

7. 「Save and Deploy」をクリック

### 8.2 デプロイの確認

デプロイが完了すると、`profectus-note.pages.dev` のようなURLでアクセスできます。

> **💡 確認ポイント**: サイトが正しく表示されることを確認してください。

---

## 9. Step 7：独自ドメインとSSLの設定

### 9.1 Cloudflareにドメインを追加

**ドメインをCloudflareで管理していない場合**

1. Cloudflareダッシュボードで「Websites」→「Add a site」
2. `profectus-note.com` を入力
3. 無料プランを選択
4. 表示されるネームサーバー（ns1.cloudflare.com, ns2.cloudflare.com など）をメモ
5. ドメイン取得サービス（お名前.comなど）の管理画面で、ネームサーバーをCloudflareのものに変更

### 9.2 カスタムドメインの設定

1. Cloudflare Pagesのプロジェクトページを開く
2. 「Custom domains」タブをクリック
3. 「Set up a custom domain」をクリック
4. `profectus-note.com` を入力
5. 「Continue」をクリック
6. DNS設定が自動的に追加される場合は「Activate domain」をクリック

**www サブドメインも設定する場合**

同様の手順で `www.profectus-note.com` も追加します。

### 9.3 SSL/HTTPS設定の確認

Cloudflare Pagesでは、SSLが自動的に設定されます。

1. Cloudflareダッシュボードで「SSL/TLS」→「Overview」を開く
2. 暗号化モードが「Full」または「Full (strict)」になっていることを確認

### 9.4 HTTPSリダイレクトの設定

HTTPでアクセスした場合に自動的にHTTPSにリダイレクトされるよう設定します。

1. Cloudflareダッシュボードで「SSL/TLS」→「Edge Certificates」を開く
2. 「Always Use HTTPS」をオンにする

---

## 10. Step 8：Google Analytics・Search Consoleの設定

### 10.1 Google Analytics 4 の設定

**アカウント作成**

1. https://analytics.google.com にアクセス
2. 「測定を開始」をクリック
3. アカウント名: `Profectus Design` など
4. プロパティ名: `Profectus Note`
5. タイムゾーン: 日本
6. 通貨: 日本円
7. 「詳細オプションを表示」→「ユニバーサルアナリティクスプロパティの作成」はオフのまま
8. ビジネス情報を入力して「作成」

**トラッキングIDの取得**

1. 作成後、「データストリーム」→「ウェブ」を選択
2. WebサイトのURL: `https://profectus-note.com`
3. ストリーム名: `Profectus Note`
4. 「ストリームを作成」をクリック
5. 表示される「測定ID」（G-XXXXXXXXXX形式）をコピー

**サイトへの設定**

`src/consts.ts` の `GA_TRACKING_ID` を取得したIDに書き換えます：

```typescript
// src/consts.ts
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // 実際のIDに置き換え
```

### 10.2 Google Search Console の設定

**プロパティの追加**

1. https://search.google.com/search-console にアクセス
2. 「プロパティを追加」をクリック
3. 「URL プレフィックス」を選択
4. `https://profectus-note.com` を入力
5. 「続行」をクリック

**所有権の確認（DNS方式・推奨）**

1. 「その他の確認方法」→「DNS レコード」を選択
2. 表示されるTXTレコードをコピー
3. Cloudflareダッシュボードで「DNS」→「Records」→「Add record」
4. 以下を入力：
   - Type: TXT
   - Name: @
   - Content: コピーしたTXTレコード
   - TTL: Auto
5. 「Save」をクリック
6. Search Consoleに戻り「確認」をクリック

**サイトマップの登録**

1. Search Console左メニューの「サイトマップ」をクリック
2. 「新しいサイトマップの追加」に `sitemap-index.xml` と入力
3. 「送信」をクリック

---

## 11. Step 9：Obsidianとの連携設定

### 11.1 Obsidian Vaultの設定

Obsidianでブログ記事を管理するための設定を行います。

**Vaultのフォルダ構成**

```
Obsidian Vault/
├── 01_Inbox/
├── 02_Memo/
├── 03_Knowledge/
├── 04_Templates/
│   └── blog-post-template.md    # ブログ記事テンプレート
├── 05_Output/
│   └── ProfectusNote/           # ← ここがブログ記事の保存場所
│       ├── drafts/              # 下書き
│       └── published/           # 公開済み
└── .obsidian/
```

### 11.2 ブログ記事テンプレートの作成

`04_Templates/blog-post-template.md` を作成します：

```markdown
---
title: "{{title}}"
description: ""
pubDate: {{date}}
category: "dx"
tags: []
attackOrDefense: "both"
heroImage: ""
type: "article"
actionItems:
  - ""
draft: true
---

<!-- リード文（100-150字）-->



## はじめに



## 本文



## ★今日からできるアクション

この記事を読んで、明日からすぐに実行できるアクションをまとめました。

### すぐできる（10分以内）
- [ ] 

### 今週中に
- [ ] 

### 今月中に
- [ ] 

## まとめ


```

### 11.3 Obsidianプラグインの設定

以下のプラグインをインストールします（Obsidian設定 → コミュニティプラグイン）：

1. **Templater**: テンプレート機能の強化
2. **Linter**: Markdownの整形
3. **Git**: Git連携（任意）

### 11.4 シンボリックリンクの作成

ObsidianのブログフォルダとAstroプロジェクトを連携させます。

**Mac の場合**

```bash
# Astroプロジェクトのcontentフォルダに移動
cd ~/Projects/profectus-note/src/content

# blogフォルダを削除（既存のサンプルを削除）
rm -rf blog

# ObsidianのProfectusNoteフォルダへのシンボリックリンクを作成
ln -s ~/Documents/Obsidian/Vault名/05_Output/ProfectusNote/published blog
```

**Windows の場合（管理者権限のコマンドプロンプトで実行）**

```cmd
cd %USERPROFILE%\Projects\profectus-note\src\content
rmdir /s /q blog
mklink /D blog "C:\Users\あなたのユーザー名\Documents\Obsidian\Vault名\05_Output\ProfectusNote\published"
```

> **💡 代替方法**: シンボリックリンクがうまくいかない場合は、記事をコピーするスクリプトを後で作成します（Step 11参照）。

---

## 12. Step 10：Cursorでの執筆環境構築

### 12.1 CursorでAstroプロジェクトを開く

```bash
cd ~/Projects/profectus-note
cursor .
```

### 12.2 MDCファイルの作成

`.cursor/rules/` フォルダを作成し、AIアシスタントのルールを設定します。

**.cursor/rules/me.mdc**

```markdown
---
description: 著者の人格、専門性、価値観を定義
globs: src/content/**/*.md
alwaysApply: true
---

# 著者プロファイル

## 基本情報
- 社名: プロフェクタスデザイン株式会社
- 所在地: 富山県
- 事業内容: 経営・IT・セキュリティ・財務の統合的戦略顧問

## 保有資格
- 中小企業診断士
- 情報処理安全確保支援士
- 日商簿記1級
- FP1級技能士

## 価値観
- 中小企業の進歩・発展を通じて日本を豊かにしたい
- 「自分が中小企業の社長なら」という視点を常に持つ
- 専門用語を振りかざさず、本質を平易に伝える
- 「今日からできること」を必ず提示する

## 文体
- 「です・ます」調
- 温かみがありつつも専門家としての信頼感
- 読者を尊重する姿勢
```

**.cursor/rules/writing-rule.mdc**

```markdown
---
description: ブログ記事のライティングルール
globs: src/content/**/*.md
alwaysApply: true
---

# ライティングルール

## 記事構成（必須）
1. リード文（100-150字）
2. 本文
3. ★今日からできるアクション（必須・3つ以上）
4. まとめ

## 文体
- 「です・ます」調
- 使用OK: 「〜が重要です」「〜をおすすめします」
- 使用NG: 「〜すべきです」「当然ですが」

## 公開前チェック
- 「自分が中小企業の社長なら、この情報が欲しいか？」
- 「読者が明日からアクションに移せるか？」
- 「個人雑記になっていないか？」
```

### 12.3 Cursor拡張機能のインストール

Cursorで以下の拡張機能をインストールします（左サイドバーの拡張機能アイコン）：

1. **Astro**: Astroファイルのシンタックスハイライト
2. **MDX**: MDXファイルのサポート
3. **Markdown All in One**: Markdownの編集支援
4. **Japanese Language Pack**: 日本語化

---

## 13. Step 11：自動化ワークフローの構築

### 13.1 記事公開の自動化スクリプト

ObsidianからAstroへ記事をコピーするスクリプトを作成します。

**scripts/sync-posts.js** を作成：

```javascript
// scripts/sync-posts.js
const fs = require('fs');
const path = require('path');

// 設定
const OBSIDIAN_PUBLISHED_DIR = process.env.OBSIDIAN_PUBLISHED_DIR 
  || path.join(process.env.HOME || process.env.USERPROFILE, 'Documents/Obsidian/Vault名/05_Output/ProfectusNote/published');
const ASTRO_BLOG_DIR = path.join(__dirname, '../src/content/blog');

// メイン処理
function syncPosts() {
  console.log('📝 記事の同期を開始します...');
  console.log(`   ソース: ${OBSIDIAN_PUBLISHED_DIR}`);
  console.log(`   宛先: ${ASTRO_BLOG_DIR}`);

  // 宛先フォルダがなければ作成
  if (!fs.existsSync(ASTRO_BLOG_DIR)) {
    fs.mkdirSync(ASTRO_BLOG_DIR, { recursive: true });
  }

  // ソースフォルダの存在確認
  if (!fs.existsSync(OBSIDIAN_PUBLISHED_DIR)) {
    console.error('❌ Obsidianの公開フォルダが見つかりません');
    console.log('   OBSIDIAN_PUBLISHED_DIR 環境変数を設定してください');
    process.exit(1);
  }

  // Markdownファイルを取得
  const files = fs.readdirSync(OBSIDIAN_PUBLISHED_DIR)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

  if (files.length === 0) {
    console.log('📭 同期する記事がありません');
    return;
  }

  // ファイルをコピー
  let syncedCount = 0;
  files.forEach(file => {
    const sourcePath = path.join(OBSIDIAN_PUBLISHED_DIR, file);
    const destPath = path.join(ASTRO_BLOG_DIR, file);
    
    // ファイルの内容を読み込み
    let content = fs.readFileSync(sourcePath, 'utf-8');
    
    // Obsidian特有の記法をAstro/Markdown標準に変換
    content = convertObsidianToAstro(content);
    
    // ファイルを書き込み
    fs.writeFileSync(destPath, content);
    console.log(`   ✅ ${file}`);
    syncedCount++;
  });

  console.log(`\n🎉 ${syncedCount}件の記事を同期しました`);
}

// Obsidian記法の変換
function convertObsidianToAstro(content) {
  // Obsidianの内部リンク [[ページ名]] を通常のリンクに変換
  content = content.replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (match, link, alias) => {
    const displayText = alias || link;
    const slug = link.toLowerCase().replace(/\s+/g, '-');
    return `[${displayText}](/blog/${slug}/)`;
  });
  
  // その他の変換があれば追加
  
  return content;
}

// 実行
syncPosts();
```

**package.json にスクリプトを追加**：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "sync": "node scripts/sync-posts.js",
    "sync-and-build": "npm run sync && npm run build"
  }
}
```

### 13.2 Git Hooks による自動同期

コミット前に自動で記事を同期するフックを設定します。

**.husky/pre-commit** を作成（huskyをインストール後）：

```bash
# huskyのインストール
npm install -D husky
npx husky init

# pre-commitフックを作成
echo 'npm run sync' > .husky/pre-commit
```

### 13.3 GitHub Actionsによる自動デプロイ

GitHubにpushするたびに自動でビルド・デプロイされる設定は、Cloudflare Pagesが自動で行っています。追加の設定は不要です。

---

## 14. 運用ガイド：記事の書き方と公開方法

### 14.1 新しい記事を書く手順

**Step 1: Obsidianで下書きを作成**

1. Obsidianを開く
2. `05_Output/ProfectusNote/drafts/` フォルダに移動
3. 新しいノートを作成
4. テンプレート（Templater）を適用
5. 記事を執筆

**Step 2: 記事を公開フォルダに移動**

1. 記事が完成したら、Frontmatterの `draft: false` に変更
2. ファイルを `drafts/` から `published/` に移動
3. ファイル名をslug形式に変更（例: `2026-02-03-dx-first-step.md`）

**Step 3: GitHubにpush**

```bash
cd ~/Projects/profectus-note

# 記事を同期
npm run sync

# 変更をコミット
git add .
git commit -m "記事追加: DX最初の一歩"

# GitHubにプッシュ（自動でCloudflare Pagesにデプロイされる）
git push
```

### 14.2 記事のFrontmatter例

```yaml
---
title: "中小企業がDXを始める最初の一歩：何から手をつけるべきか"
description: "DXに取り組みたいけど何から始めればいいかわからない...そんな中小企業の社長向けに、今日からできる具体的なステップを解説します。"
pubDate: 2026-02-03
category: "dx"
tags: ["DX", "中小企業", "IT導入"]
attackOrDefense: "attack"
heroImage: "/images/blog/dx-first-step.jpg"
type: "article"
actionItems:
  - "社内の紙業務を3つ書き出す"
  - "無料のクラウドツールを1つ試す"
  - "IT導入補助金の公募情報を確認する"
draft: false
---
```

### 14.3 公開確認

1. GitHubにpushすると、Cloudflare Pagesが自動でビルドを開始
2. 2〜3分後、https://profectus-note.com で記事が公開される
3. Cloudflareダッシュボードの「Deployments」で状況を確認可能

---

## 15. トラブルシューティング

### 15.1 よくあるエラーと解決方法

#### ビルドエラー：「Frontmatter is invalid」

**原因**: 記事のFrontmatter（先頭の---で囲まれた部分）に文法エラーがある

**解決方法**:
```yaml
# NG: 値にコロンがある場合は引用符で囲む
title: DX入門: 最初の一歩

# OK
title: "DX入門: 最初の一歩"
```

#### デプロイエラー：「Build failed」

**原因**: ビルド時にエラーが発生

**解決方法**:
1. Cloudflareダッシュボードでエラーログを確認
2. ローカルで `npm run build` を実行してエラーを再現
3. エラーメッセージを確認して修正

#### 画像が表示されない

**原因**: 画像パスが間違っている

**解決方法**:
```markdown
# NG: 相対パス
![画像](./images/photo.jpg)

# OK: publicフォルダからの絶対パス
![画像](/images/photo.jpg)
```

### 15.2 ローカルでの確認方法

公開前にローカルで確認する習慣をつけましょう。

```bash
# 開発サーバーで確認
npm run dev
# → http://localhost:4321 で確認

# 本番ビルドで確認
npm run build
npm run preview
# → http://localhost:4321 で本番と同じ状態を確認
```

---

## 16. 付録：コマンド早見表

### 日常的に使うコマンド

| 目的 | コマンド |
|------|---------|
| 開発サーバー起動 | `npm run dev` |
| 記事を同期 | `npm run sync` |
| 本番ビルド | `npm run build` |
| ビルド結果を確認 | `npm run preview` |
| GitHubにプッシュ | `git add . && git commit -m "メッセージ" && git push` |

### Gitコマンド

| 目的 | コマンド |
|------|---------|
| 変更状況を確認 | `git status` |
| 変更をステージング | `git add .` |
| コミット | `git commit -m "コミットメッセージ"` |
| プッシュ | `git push` |
| 変更を取り消し | `git checkout -- ファイル名` |
| 直前のコミットを修正 | `git commit --amend` |

### トラブル時のコマンド

| 目的 | コマンド |
|------|---------|
| node_modulesを再インストール | `rm -rf node_modules && npm install` |
| キャッシュをクリア | `npm run build -- --force` |
| Gitの状態をリセット | `git reset --hard HEAD` |

---

## 完了チェックリスト

すべての設定が完了したか確認しましょう。

### 環境構築
- [ ] Node.jsがインストールされている
- [ ] Gitがインストールされている
- [ ] Cursorがインストールされている
- [ ] Obsidianがインストールされている

### アカウント・サービス
- [ ] GitHubアカウントを作成した
- [ ] Cloudflareアカウントを作成した
- [ ] Googleアカウントを準備した
- [ ] 独自ドメインを取得した

### Astroプロジェクト
- [ ] Astroプロジェクトを作成した
- [ ] 必要なパッケージをインストールした
- [ ] サイト設定（astro.config.mjs）を完了した
- [ ] SEOコンポーネントを作成した
- [ ] robots.txtを作成した
- [ ] RSSフィードを作成した

### デプロイ
- [ ] GitHubリポジトリを作成した
- [ ] Cloudflare Pagesにデプロイした
- [ ] 独自ドメインを設定した
- [ ] SSLが有効になっている

### アナリティクス
- [ ] Google Analyticsを設定した
- [ ] Google Search Consoleを設定した
- [ ] サイトマップを登録した

### Obsidian連携
- [ ] Obsidianのフォルダ構成を設定した
- [ ] テンプレートを作成した
- [ ] 同期スクリプトをテストした

---

**お疲れさまでした！🎉**

これで Profectus Note ブログの基盤が完成しました。

あとは記事を書いて、`git push` するだけで自動的に公開されます。

質問や問題があれば、いつでもお気軽にご相談ください。

---

**作成日**: 2026年2月3日  
**最終更新**: 2026年2月3日  
**作成者**: プロフェクタスデザイン
