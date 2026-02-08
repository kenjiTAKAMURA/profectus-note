# Profectus Note ブログプロジェクト仕様書

## プロジェクト概要

このプロジェクトは、Astroフレームワークを使用して構築されたブログサイトです。**中小企業の社長・経営層向け**に、IT・DX（攻め）とセキュリティ（守り）を中心とした**今すぐアクションに移せる実践的な情報**を発信するナレッジブログです。

### ブログのミッション

> **中小企業が進歩・発展し、日本のより多くの人の心を豊かにし、みんなが幸せと感じる社会の実現に貢献する**

### ブログのコンセプト

- **攻め（IT・DX）と守り（セキュリティ）のテキスト・参考書**
- 日々忙しい中小企業の経営層・従業員の「代わり」に情報収集・蓄積
- 勘所を伝え、次のアクションに活かしてもらう
- 自分のナレッジ蓄積であり、かつコンテンツとして横展開可能な資産

### 差別化要素

- **中小企業社長目線**: 「自分が社長なら欲しい情報」を起点に記事を作成
- **即アクション可能**: 読んですぐ実行に移せる具体的なステップを提示
- **攻めと守りの両面**: IT・DX（攻め）とセキュリティ（守り）を統合的にカバー
- **統合的視点**: 経営戦略・IT・セキュリティ・財務を横断的に捉える
- **実務経験**: 大手SIer・電力会社での実務経験に基づく現場感覚
- **資格裏付け**: 中小企業診断士・情報処理安全確保支援士・日商簿記1級・FP1級
- **地域特化**: 富山県という地方の文脈に根ざしたアドバイス

### 技術スタック

- **フレームワーク**: Astro 5.17.1
- **言語**: TypeScript
- **スタイリング**: CSS（カスタムCSS変数を使用）
- **コンテンツ管理**: Astro Content Collections（Markdown/MDX）
- **ビルドツール**: Astro（Viteベース）

---

## プロジェクト構造

```
profectus-note/
├── public/              # 静的ファイル（画像、フォント、ファビコンなど）
│   ├── assets/         # プレースホルダー画像（デフォルトOGP画像など）
│   ├── fonts/          # フォントファイル
│   └── images/         # ブログ記事用の画像（記事ごとの画像）
├── src/
│   ├── components/     # 再利用可能なコンポーネント
│   │   ├── BaseHead.astro    # HTMLの<head>セクション（SEO、OGP、構造化データ）
│   │   ├── Header.astro     # ヘッダーコンポーネント
│   │   ├── Footer.astro      # フッターコンポーネント
│   │   ├── FormattedDate.astro  # 日付フォーマット
│   │   ├── HeaderLink.astro     # ナビゲーションリンク
│   │   └── ThemeToggle.astro    # ダークモード/ライトモード切り替えボタン
│   ├── content/        # ブログ記事（Markdown/MDXファイル）
│   ├── layouts/        # ページレイアウト
│   │   └── BlogPost.astro    # ブログ記事専用レイアウト
│   ├── pages/          # ページファイル（ルーティング）
│   ├── styles/         # グローバルスタイル
│   └── consts.ts       # 定数定義
├── astro.config.mjs     # Astro設定ファイル
├── package.json        # 依存関係とスクリプト
├── tsconfig.json       # TypeScript設定
└── SPECIFICATION.md    # この仕様書
```

---

## ファイル説明

### 設定ファイル

#### `package.json`
プロジェクトの依存関係とnpmスクリプトを定義します。

**主要な依存関係:**
- `astro`: メインフレームワーク
- `@astrojs/mdx`: MDXファイル（Markdown + JSX）のサポート
- `@astrojs/rss`: RSSフィード生成
- `@astrojs/sitemap`: サイトマップ自動生成
- `sharp`: 画像最適化

**主要なスクリプト:**
- `npm run dev`: 開発サーバー起動（localhost:4321）
- `npm run build`: 本番用ビルド
- `npm run preview`: ビルド結果のプレビュー

#### `astro.config.mjs`
Astroの設定ファイルです。サイトURL、プラグイン、Markdown設定などを定義します。

**主な設定:**
- `site`: 本番環境のURL
- `integrations`: MDX、サイトマップなどの統合機能
- `build.inlineStylesheets`: `'always'` - すべてのCSSをインライン化してレンダリングブロックを回避
- `vite.build.cssCodeSplit`: `false` - CSSを1つのファイルにまとめてリクエスト数を削減
- `markdown`: シンタックスハイライト設定

#### `tsconfig.json`
TypeScriptのコンパイラ設定です。Astroの厳格な型チェックを有効にしています。

#### `src/consts.ts`
サイト全体で使用する定数を定義します。

**定義されている定数:**
- `SITE_TITLE`: サイトタイトル
- `SITE_DESCRIPTION`: サイトの説明
- `SITE_URL`: サイトURL
- `AUTHOR`: 著者情報
- `SOCIAL_LINKS`: SNSリンク
- `CATEGORIES`: ブログカテゴリ定義（デジタル化、AI、サイバーセキュリティ等）
- `GA_TRACKING_ID`: Google Analytics ID

#### `src/content/config.ts`
Content Collectionsのスキーマ定義です。ブログ記事のfrontmatter（メタデータ）の構造を定義します。

**定義されているフィールド:**
- `title`: 記事タイトル
- `description`: 記事の説明
- `pubDate`: 公開日
- `updatedDate`: 更新日（オプション）
- `category`: カテゴリ（digitalization, ai, cybersecurity, ceo-interview, case-study, news, subsidy, tools）
- `tags`: タグ配列
- `heroImage`: ヒーロー画像（OGP画像）
- `draft`: 下書きフラグ

---

### ページファイル（`src/pages/`）

Astroでは、`src/pages/`ディレクトリ内のファイルが自動的にルート（URL）になります。

#### `index.astro`
トップページ（`/`）です。サイトのコンセプト、攻めと守りの説明、最新記事を表示します。

**表示内容:**
- ヒーローセクション（タイトル、タグライン「中小企業の攻めと守りを支える、実践ナレッジ」）
- コンセプト説明（攻めと守りのカード）
- このブログの特徴
- 最新記事（3件）

#### `blog/index.astro`
ブログ一覧ページ（`/blog`）です。すべてのブログ記事を日付順（新しい順）で一覧表示します。

**処理の流れ:**
1. `getCollection('blog')`でブログ記事を取得
2. 日付順にソート
3. 各記事のタイトル、カテゴリバッジ、日付を表示

**表示される情報:**
- 記事タイトル
- カテゴリバッジ（例: デジタル化、AI、サイバーセキュリティ）
- 公開日

#### `blog/[...slug].astro`
動的ルーティングを使用した個別ブログ記事ページです。`[...slug]`は「任意のパスを受け取る」という意味です。

**処理の流れ:**
1. `getStaticPaths()`で全記事のパスを生成
2. 各記事のMarkdownをHTMLにレンダリング
3. `BlogPost`レイアウトで表示

#### `about.astro`
Aboutページ（`/about`）です。サイトや著者についての情報を表示します。

#### `rss.xml.js`
RSSフィードのエンドポイントです。ブログ記事をRSS形式で配信します。

**処理の流れ:**
1. 下書き以外の記事を取得
2. 日付順にソート
3. RSS形式に変換して返す

---

### コンポーネント（`src/components/`）

#### `Header.astro`
サイトのヘッダーコンポーネントです。ナビゲーションメニューとSNSリンクを表示します。

**機能:**
- サイトタイトル（ホームへのリンク）
- ナビゲーションメニュー（Home, Blog, About）
- テーマ切り替えボタン（ダークモード/ライトモード）
- SNSリンク（X/Twitter）

#### `ThemeToggle.astro`
ダークモード/ライトモードを切り替えるボタンコンポーネントです。

**機能:**
- テーマの切り替え（ダーク/ライト）
- localStorageに保存（次回訪問時に適用）
- システム設定（prefers-color-scheme）に対応
- リフローを最小化した実装

#### `Footer.astro`
サイトのフッターコンポーネントです。コピーライトとSNSリンクを表示します。

**機能:**
- コピーライト表示（現在の年を自動取得）
- SNSリンク

#### `BaseHead.astro`
HTMLの`<head>`セクションを生成するコンポーネントです。SEOメタタグ、OGPタグ、構造化データ、ファビコンなどを設定します。

**設定されるメタタグ:**
- 基本メタタグ（charset, viewport）
- ファビコン
- サイトマップリンク
- RSSフィードリンク
- OGP（Open Graph Protocol）タグ（デフォルト画像: `/assets/ProfectusNote.png`）
- Twitter Cardタグ
- 構造化データ（JSON-LD、Schema.org）
- Google Analytics
- Google Fonts（Noto Sans JP/Serif JP）の非同期読み込み

**パフォーマンス最適化機能:**
- CSSの完全インライン化（レンダリングブロック回避）
- Google Fontsの非同期読み込み（`media="print"` + `onload`）
- フォント読み込み最適化（Font Loading API使用）
- リフローの最小化（requestAnimationFrame使用）の非同期読み込み

**パフォーマンス最適化機能:**
- CSSの完全インライン化（レンダリングブロック回避）
- Google Fontsの非同期読み込み（`media="print"` + `onload`）
- フォント読み込み最適化（Font Loading API使用）
- リフローの最小化（requestAnimationFrame使用）

**プロップス:**
- `title`: ページタイトル（オプション、デフォルトはSITE_TITLE）
- `description`: ページの説明（オプション、デフォルトはSITE_DESCRIPTION）
- `image`: OGP画像（オプション）
- `article`: 記事ページかどうか（オプション）
- `publishedTime`: 公開日時（記事の場合、オプション）
- `modifiedTime`: 更新日時（記事の場合、オプション）
- `tags`: タグ（記事の場合、オプション）

**注意:** `SEO.astro`コンポーネントは削除され、機能は`BaseHead.astro`に統合されました。

#### `FormattedDate.astro`
日付を整形して表示するコンポーネントです。

**機能:**
- 日付をロケールに応じた形式で表示
- `<time>`タグでセマンティックにマークアップ

#### `HeaderLink.astro`
ヘッダーのナビゲーションリンクコンポーネントです。現在のページに応じてアクティブ状態を表示します。

**機能:**
- 現在のページかどうかを判定
- アクティブなリンクにスタイルを適用

---

### レイアウト（`src/layouts/`）

#### `BlogPost.astro`
ブログ記事専用のレイアウトです。記事のタイトル、日付、ヒーロー画像、本文を表示します。

**構造:**
- ヒーロー画像
- カテゴリバッジと攻め/守りバッジ
- タイトルと説明文
- 公開日・更新日
- 記事本文（`<slot />`で挿入）
- 今日からできるアクションセクション（actionItemsがある場合）

**表示されるバッジ:**
- カテゴリバッジ（例: デジタル化、AI、サイバーセキュリティ）

---

### スタイル（`src/styles/`）

#### `global.css`
サイト全体のグローバルスタイルを定義します。

**主な内容:**
- CSS変数（カラーパレット、フォント、スペーシング）
- ベーススタイル（body, h1-h6, a）
- カスタムクラス（バッジ、アクションボックス）
- 共通レイアウトスタイル（mainコンテナ、post-list、post-title等）
- レスポンシブ対応（タブレット、モバイル）
- ダークモード対応
- アクセシビリティ対応（WCAG 2.1 AA準拠、コントラスト比4.5:1以上）

---

### コンテンツ（`src/content/blog/`）

ブログ記事はMarkdownまたはMDX形式で記述します。

**記事ファイルの構造:**
```markdown
---
title: 記事タイトル
description: 記事の説明
pubDate: 2024-01-01
category: digitalization
tags: ['tag1', 'tag2']
heroImage: '/assets/image.jpg'
draft: false
---

記事の本文（Markdown形式）
```

---

## データフロー

### ブログ記事の表示フロー

1. **記事作成**: `src/content/blog/`にMarkdownファイルを追加
2. **スキーマ検証**: `src/content/config.ts`で定義されたスキーマに従っているかチェック
3. **記事取得**: `getCollection('blog')`で記事を取得
4. **レンダリング**: AstroがMarkdownをHTMLに変換
5. **レイアウト適用**: `BlogPost.astro`レイアウトで表示

### ページ生成の仕組み

- **静的サイト生成（SSG）**: ビルド時にすべてのページを生成
- **動的ルーティング**: `[...slug].astro`で複数のパスを生成
- **コンテンツコレクション**: 型安全なコンテンツ管理

---

## カスタマイズ方法

### サイト情報の変更

`src/consts.ts`を編集して、サイトタイトル、説明、URLなどを変更します。

### スタイルの変更

`src/styles/global.css`のCSS変数を変更することで、サイト全体の色やフォントを変更できます。

**デザインコンセプト:**
- **キーワード**: 信頼感、専門性、親しみやすさ、実践的
- **カラースキーム**:
  - プライマリ: ディープブルー (#1a365d) - 信頼・専門性
  - セカンダリ: アクセントグリーン (#38a169) - 成長・進歩
  - 攻め: ブルー (#3182ce) - ビジネス成長
  - 守り: レッド (#e53e3e) - リスク対策
  - テキスト（薄）: ダークグレー (#4a5568) - WCAG AA準拠（コントラスト比4.5:1以上）
- **フォント**:
  - 見出し: Noto Sans JP（太字）
  - 本文: Noto Serif JP（読みやすさ重視）
- **アクセシビリティ**:
  - WCAG 2.1 AA基準に準拠（コントラスト比4.5:1以上）
  - すべてのテキストが十分なコントラスト比を確保

### ダークモード/ライトモード

`src/components/ThemeToggle.astro`コンポーネントでダークモードとライトモードを切り替えできます。

**機能:**
- ユーザーの選択をlocalStorageに保存
- システム設定（prefers-color-scheme）に対応
- リフローを最小化した実装
- ページ読み込み前にテーマを適用（FOUC防止）

### パフォーマンス最適化

**実装済みの最適化:**
- CSSの完全インライン化（`inlineStylesheets: 'always'`）
- Google Fontsの非同期読み込み（レンダリングブロック回避）
- フォント読み込みの最適化（Font Loading API使用）
- リフローの最小化（requestAnimationFrame使用）
- 共通スタイルの統合（global.cssに集約）

### ナビゲーションメニューの変更

`src/components/Header.astro`の`HeaderLink`コンポーネントを追加・削除します。

### ブログ記事の追加

1. `src/content/blog/`に新しいMarkdownファイルを作成
2. frontmatter（`---`で囲まれた部分）に必要な情報を記述
3. 本文をMarkdown形式で記述

### 画像の追加

**画像ファイルの配置場所:**
- **プレースホルダー画像**: `public/assets/`フォルダに配置（デフォルトOGP画像など）
- **ブログ記事用画像**: `public/images/blog/`フォルダに配置（記事ごとの画像）
- `public/`フォルダ内のファイルは、ビルド時にそのまま`dist/`のルートにコピーされます

**画像の使用方法:**

1. **ブログ記事のfrontmatterで使用する場合:**
   ```markdown
   ---
   heroImage: '/assets/blog-placeholder-1.jpg'  # プレースホルダー画像
   heroImage: '/images/blog/dx-first-step/hero.jpg'  # 記事専用画像
   ---
   ```
   文字列パスで指定します。

2. **Astroコンポーネントで使用する場合:**
   ```astro
   <img src="/assets/blog-placeholder-1.jpg" alt="説明" />
   <img src="/images/blog/dx-first-step/hero.jpg" alt="説明" />
   ```
   または、文字列パスを変数として使用します。

**画像フォルダの使い分け:**
- `public/assets/`: サイト全体で使用する共通画像（プレースホルダー、デフォルトOGP画像など）
- `public/images/blog/`: ブログ記事専用の画像（記事ごとのヒーロー画像など）

**注意:** 
- `src/assets/`は使用しません（削除済み、重複を避けるため）
- すべての画像は`public/`フォルダ内に配置します

---

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（localhost:4321）
npm run dev

# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

---

## デプロイ

ビルド後、`dist/`ディレクトリに静的ファイルが生成されます。このディレクトリを任意の静的ホスティングサービス（Netlify、Vercel、GitHub Pages等）にデプロイできます。

---

## 注意事項

- ブログ記事のfrontmatterは`src/content/config.ts`で定義されたスキーマに従う必要があります
- **画像は`public/`ディレクトリ内に配置します**（`src/assets/`は使用しません、削除済み）
  - プレースホルダー画像: `public/assets/`
  - ブログ記事用画像: `public/images/blog/`
  - ブログ記事のfrontmatterでは文字列パス（例: `'/assets/image.jpg'`、`'/images/blog/...'`）で指定
  - Astroコンポーネントでも文字列パスで参照可能
- 下書き記事は`draft: true`に設定すると、RSSフィードやサイトマップから除外されます

### リファクタリング済みの項目

**削除されたファイル:**
- `src/layouts/BaseLayout.astro` - 未使用のため削除
- `src/components/SEO.astro` - `BaseHead.astro`に統合
- `src/assets/` - `public/assets/`に統一

**統合された機能:**
- SEO設定（構造化データ、記事メタタグなど）は`BaseHead.astro`に統合
- Google AnalyticsとGoogle Fontsは`BaseHead.astro`に統合
- フォントはNoto Sans JP/Serif JPに統一（Atkinsonフォントは削除）

---

## 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Markdown記法ガイド](https://www.markdownguide.org/)
