# ブログ記事追加ガイド

**対象者**: ブログ記事を執筆・公開する担当者  
**最終更新**: 2026年2月6日

## このブログのコンセプト

**Profectus Note**は、中小企業の社長・経営層向けに、IT・DX（攻め）とセキュリティ（守り）を中心とした**今すぐアクションに移せる実践的な情報**を発信するナレッジブログです。

### 記事作成時の3つのチェックポイント

記事を公開する前に、以下の3つの質問にすべて「Yes」と答えられるか確認してください：

1. **「自分が中小企業の社長なら、この情報が欲しいか？」**
2. **「読者がこの記事を読んで、明日から何かアクションに移せるか？」**
3. **「中小企業の経営・業務に直接役立つか？」**

### 掲載しない内容

- 個人の日常や私生活に関する投稿
- 趣味や嗜好に関する雑記
- 感想だけで終わる記事
- 中小企業経営に関係のない時事ネタ

---

## 目次

1. [基本的な記事追加手順](#1-基本的な記事追加手順)
2. [Frontmatter（メタデータ）の設定](#2-frontmatterメタデータの設定)
3. [目次の追加](#3-目次の追加)
4. [画像の追加](#4-画像の追加)
5. [内部リンクの追加](#5-内部リンクの追加)
6. [SNS埋め込み](#6-sns埋め込み)
7. [コードブロックの追加](#7-コードブロックの追加)
8. [引用ブロックの追加](#8-引用ブロックの追加)
9. [文字装飾（色、フォントサイズ等）](#9-文字装飾色フォントサイズ等)
10. [カテゴリとタグの設定](#10-カテゴリとタグの設定)
11. [記事の公開手順](#11-記事の公開手順)
12. [よくある質問](#12-よくある質問)

---

## 1. 基本的な記事追加手順

### 1.1 ファイルの作成

1. `src/content/blog/` フォルダに移動
2. 新しいMarkdownファイル（`.md`）またはMDXファイル（`.mdx`）を作成
3. ファイル名はスラッグ形式（例: `2026-02-06-dx-first-step.md`）

**ファイル名のルール:**
- 日付-タイトル（小文字、ハイフン区切り）の形式
- 例: `2026-02-06-dx-first-step.md`
- 日本語は使わない（英数字とハイフンのみ）

### 1.2 基本的な記事テンプレート

```markdown
---
title: "記事タイトル"
description: "記事の説明文（100-150字程度、OGPで使用されます）"
pubDate: 2026-02-06
updatedDate: 2026-02-06  # オプション
category: "dx"
tags: ["DX", "中小企業", "IT導入"]
attackOrDefense: "attack"  # "attack", "defense", "both" のいずれか
heroImage: "/images/blog/dx-first-step/hero.jpg"  # オプション
draft: false
actionItems:  # 今日からできるアクション（オプション、Frontmatterで指定も可能）
  - "アクション1"
  - "アクション2"
  - "アクション3"
---

<!-- リード文（100-150字）-->
記事の冒頭に、読者の課題を明示し、記事を読むメリットを端的に伝えます。

## はじめに

記事の導入部分です。読者の課題を明確にし、なぜこの記事が重要かを説明します。

## 本文

記事のメインコンテンツです。具体的な方法・ステップ、注意点・よくある失敗を含めます。

## ★今日からできるアクション

この記事を読んで、明日からすぐに実行できるアクションをまとめました。

### すぐできる（10分以内）
- [ ] アクション1
- [ ] アクション2

### 今週中に
- [ ] アクション3

### 今月中に
- [ ] アクション4

## まとめ

記事のまとめです。キーポイントの再確認と、次のアクションへの誘導を行います。
```

---

## 2. Frontmatter（メタデータ）の設定

記事の先頭にある `---` で囲まれた部分がFrontmatterです。ここに記事のメタデータを設定します。

### 2.1 必須項目

```yaml
title: "記事タイトル"  # 文字列、必須
description: "記事の説明文"  # 文字列、必須（OGPで使用）
pubDate: 2026-02-06  # 日付、必須（YYYY-MM-DD形式）
category: "dx"  # カテゴリ、必須（後述のカテゴリ一覧から選択）
```

### 2.2 オプション項目

```yaml
updatedDate: 2026-02-06  # 更新日（オプション）
tags: ["DX", "中小企業"]  # タグ配列（オプション、デフォルトは空配列）
attackOrDefense: "attack"  # "attack", "defense", "both"（デフォルトは"both"）
heroImage: "/images/blog/article-name/hero.jpg"  # ヒーロー画像（オプション）
ogImage: "/images/blog/article-name/og-image.jpg"  # OGP専用画像（オプション）
type: "article"  # "article", "interview", "case-study", "news"（デフォルトは"article"）
actionItems:  # 今日からできるアクション（オプション）
  - "アクション1"
  - "アクション2"
draft: false  # 下書きフラグ（デフォルトはfalse）
relatedPosts:  # 関連記事のスラッグ（オプション）
  - "dx-first-step"
  - "security-basics"
```

### 2.3 Frontmatterの注意点

- 値にコロン（`:`）が含まれる場合は、必ず引用符で囲む
- 日付は `YYYY-MM-DD` 形式で記述
- 配列は `-` で項目を列挙

**正しい例:**
```yaml
title: "DX入門: 最初の一歩"  # コロンがあるので引用符で囲む
pubDate: 2026-02-06
tags:
  - "DX"
  - "中小企業"
```

**間違った例:**
```yaml
title: DX入門: 最初の一歩  # エラー: コロンがあるのに引用符がない
pubDate: 2026/02/06  # エラー: 日付形式が違う
tags: DX, 中小企業  # エラー: 配列形式が違う
```

---

## 3. 目次の追加

### 3.1 自動目次の生成（推奨）

Astroでは、見出し（`#`, `##`, `###`など）から自動的に目次を生成できます。

**方法1: MDXファイルでAstroコンポーネントを使用**

```mdx
---
# Frontmatter
---

import { TableOfContents } from '@astrojs/starlight/components';

<TableOfContents />

## 見出し1

本文...

### 見出し1-1

本文...

## 見出し2

本文...
```

**方法2: 手動で目次を作成**

```markdown
## 目次

- [はじめに](#はじめに)
- [本文](#本文)
  - [セクション1](#セクション1)
  - [セクション2](#セクション2)
- [まとめ](#まとめ)

## はじめに

本文...
```

**アンカーリンクの生成ルール:**
- 見出しのテキストを小文字に変換
- スペースをハイフン（`-`）に変換
- 日本語の場合はそのまま使用可能

例: `## はじめに` → `#はじめに`

### 3.2 見出しの階層

```markdown
# H1 - 記事タイトル（通常は使用しない）

## H2 - 大見出し（セクション）

### H3 - 中見出し（サブセクション）

#### H4 - 小見出し

##### H5 - さらに小さい見出し

###### H6 - 最小の見出し
```

**推奨:**
- 記事本文では `##`（H2）から始める
- 階層を深くしすぎない（最大H4まで）

---

## 4. 画像の追加

### 4.1 画像ファイルの配置場所

画像は以下のフォルダに配置します：

- **記事専用画像**: `public/images/blog/記事名/`
- **プレースホルダー画像**: `public/assets/`

**推奨フォルダ構成:**
```
public/
└── images/
    └── blog/
        └── dx-first-step/
            ├── hero.jpg      # ヒーロー画像
            ├── image1.jpg    # 本文用画像1
            └── image2.png    # 本文用画像2
```

### 4.2 Markdownでの画像追加

**基本構文:**
```markdown
![代替テキスト](/images/blog/article-name/image.jpg)
```

**例:**
```markdown
![DX導入のイメージ図](/images/blog/dx-first-step/diagram.jpg)
```

### 4.3 画像のサイズ指定（HTMLを使用）

```markdown
<img src="/images/blog/article-name/image.jpg" alt="説明" width="800" height="450" />
```

### 4.4 画像にキャプションを追加

```markdown
<figure>
  <img src="/images/blog/article-name/image.jpg" alt="説明" />
  <figcaption>画像の説明文</figcaption>
</figure>
```

### 4.5 画像の配置（中央揃え）

```html
<div style="text-align: center;">
  <img src="/images/blog/article-name/image.jpg" alt="説明" />
</div>
```

### 4.6 ヒーロー画像の設定

Frontmatterで設定します：

```yaml
heroImage: "/images/blog/dx-first-step/hero.jpg"
```

**推奨サイズ:**
- 幅: 1200px以上
- 高さ: 630px（OGP画像としても使用されるため）

---

## 5. 内部リンクの追加

### 5.1 ブログ記事へのリンク

**基本構文:**
```markdown
[リンクテキスト](/blog/記事のスラッグ/)
```

**例:**
```markdown
詳しくは[こちらの記事](/blog/dx-first-step/)をご覧ください。
```

**スラッグの確認方法:**
- ファイル名から拡張子（`.md`）を除いたものがスラッグ
- 例: `dx-first-step.md` → `/blog/dx-first-step/`

### 5.2 同じ記事内のセクションへのリンク

```markdown
[まとめセクションへ](#まとめ)
```

### 5.3 外部リンク

```markdown
[リンクテキスト](https://example.com)
```

**新しいタブで開く:**
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">リンクテキスト</a>
```

### 5.4 リンクに説明を追加

```markdown
[リンクテキスト](https://example.com "マウスオーバー時に表示される説明")
```

---

## 6. SNS埋め込み

### 6.1 Twitter（X）の埋め込み

**方法1: HTMLを使用（推奨）**

```html
<blockquote class="twitter-tweet">
  <p lang="ja" dir="ltr">ツイートの内容</p>
  <a href="https://twitter.com/username/status/1234567890">ツイートのURL</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

**方法2: MDXファイルでコンポーネントを作成**

`src/components/TweetEmbed.astro` を作成：

```astro
---
interface Props {
  tweetId: string;
}

const { tweetId } = Astro.props;
---

<blockquote class="twitter-tweet">
  <a href={`https://twitter.com/anyuser/status/${tweetId}`}></a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

使用例（MDXファイル内）:
```mdx
import TweetEmbed from '../../components/TweetEmbed.astro';

<TweetEmbed tweetId="1234567890" />
```

### 6.2 YouTubeの埋め込み

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/動画ID"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

**レスポンシブ対応:**
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/動画ID"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>
```

### 6.3 その他のSNS

**Instagram:**
```html
<blockquote class="instagram-media" data-instgrm-permalink="投稿のURL" data-instgrm-version="14">
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

**Facebook:**
```html
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v18.0"></script>
<div class="fb-post" data-href="投稿のURL" data-width="500"></div>
```

---

## 7. コードブロックの追加

### 7.1 インラインコード

```markdown
`コード` のようにバッククォートで囲みます。
```

例: `npm install astro`

### 7.2 コードブロック

**基本構文:**
````markdown
```言語名
コード
```
````

**例: JavaScript**
````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

**例: TypeScript**
````markdown
```typescript
const greeting: string = "Hello, World!";
console.log(greeting);
```
````

**例: HTML**
````markdown
```html
<div class="container">
  <h1>タイトル</h1>
</div>
```
````

**例: CSS**
````markdown
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```
````

**例: Bash/Shell**
````markdown
```bash
npm install astro
npm run dev
```
````

**例: Markdown**
````markdown
```markdown
# 見出し
本文
```
````

### 7.3 コードブロックにファイル名を表示

```markdown
```javascript:src/components/Header.astro
// コード
```
```

### 7.4 行番号の表示

Astroのデフォルト設定で、コードブロックには自動的に行番号が表示されます。

### 7.5 コードブロックのハイライト行を指定

```markdown
```javascript {1,3-5}
// 1行目と3-5行目がハイライトされます
const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
```
```

---

## 8. 引用ブロックの追加

### 8.1 基本的な引用

```markdown
> 引用文です。
```

**出力:**
> 引用文です。

### 8.2 複数行の引用

```markdown
> これは複数行の引用です。
> 2行目です。
> 3行目です。
```

### 8.3 引用内でMarkdownを使用

```markdown
> これは**太字**や*斜体*、`コード`を含む引用です。
> 
> - リスト項目1
> - リスト項目2
```

### 8.4 引用元を明記

```markdown
> 引用文です。
> 
> — <cite>著者名</cite>
```

**HTMLを使用した詳細な引用:**
```html
<blockquote>
  <p>引用文です。</p>
  <footer>
    — <cite><a href="https://example.com">著者名</a>, <cite>書籍名</cite></cite>
  </footer>
</blockquote>
```

### 8.5 引用のスタイル例

**注意喚起:**
```markdown
> ⚠️ **注意**: 重要な注意事項です。
```

**ヒント:**
```markdown
> 💡 **ヒント**: 役立つ情報です。
```

**警告:**
```markdown
> ⚠️ **警告**: 注意が必要です。
```

---

## 9. 文字装飾（色、フォントサイズ等）

### 9.1 基本的な文字装飾

```markdown
**太字**
*斜体*
***太字と斜体***
`コード`
~~取り消し線~~
```

### 9.2 HTMLタグを使用した装飾

**色の変更:**
```html
<span style="color: #3182ce;">青色のテキスト</span>
<span style="color: #e53e3e;">赤色のテキスト</span>
<span style="color: #38a169;">緑色のテキスト</span>
```

**フォントサイズ:**
```html
<span style="font-size: 1.2em;">大きいテキスト</span>
<span style="font-size: 0.9em;">小さいテキスト</span>
```

**背景色:**
```html
<span style="background-color: #ebf8ff; padding: 2px 4px;">背景色付きテキスト</span>
```

**組み合わせ:**
```html
<span style="color: #3182ce; font-size: 1.1em; font-weight: bold;">装飾されたテキスト</span>
```

### 9.3 カスタムクラスの使用

`src/styles/global.css` に定義されたクラスを使用：

```html
<span class="badge-attack">攻め</span>
<span class="badge-defense">守り</span>
```

### 9.4 ハイライト

```html
<mark>ハイライトされたテキスト</mark>
```

### 9.5 上付き・下付き

```html
H<sub>2</sub>O  <!-- 下付き -->
X<sup>2</sup>   <!-- 上付き -->
```

### 9.6 キーボード入力の表示

```html
<kbd>Ctrl</kbd> + <kbd>C</kbd>
```

---

## 10. カテゴリとタグの設定

### 10.1 カテゴリ一覧

以下のカテゴリから1つ選択します：

| カテゴリ値 | 表示名 | 説明 | 攻め/守り | 頻度目安 |
|-----------|--------|------|----------|---------|
| `dx` | DX戦略 | 中小企業のDX推進、デジタル化の進め方 | 攻め | 週1本 |
| `security` | セキュリティ | 中小企業向けセキュリティ対策、脅威動向 | 守り | 月2本 |
| `it-tools` | IT内製化 | ノーコード/ローコード、AI活用、業務自動化 | 攻め | 月2本 |
| `subsidy` | 補助金・支援 | IT導入補助金、県の支援制度解説 | 両方 | 随時 |
| `news` | ニュース解説 | DX・AI・セキュリティの最新動向 | 両方 | 週2-3本 |
| `case-study` | 事例紹介 | DX・セキュリティ対策の成功事例 | 両方 | 月1本（将来） |

**注意**: カテゴリは記事の内容に応じて適切に選択してください。カテゴリに応じて自動的に攻め/守りバッジが表示されます。

**Frontmatterでの設定:**
```yaml
category: "dx"  # 上記のいずれかの値を指定
```

### 10.2 タグの設定

タグは配列形式で複数指定できます：

```yaml
tags:
  - "DX"
  - "中小企業"
  - "IT導入"
  - "クラウド"
```

**推奨:**
- 1記事あたり3-5個のタグ
- 既存のタグを再利用する
- 大文字小文字を統一する

### 10.3 攻め/守り分類

```yaml
attackOrDefense: "attack"    # 攻め（ビジネス成長、IT・DX活用）
attackOrDefense: "defense"   # 守り（リスク対策、セキュリティ）
attackOrDefense: "both"      # 両方（デフォルト）
```

**攻め/守りの判断基準:**
- **攻め（attack）**: IT・DXを活用してビジネスを成長させる内容
- **守り（defense）**: セキュリティリスクから会社を守る内容
- **両方（both）**: 攻めと守りの両面に役立つ内容

カテゴリに応じて自動的に設定されますが、記事の内容に応じて明示的に指定することもできます。

---

## 11. 記事の公開手順

### 11.1 下書きから公開への変更

1. Frontmatterの `draft: false` に変更
2. ファイルを保存

### 11.2 ローカルでの確認

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:4321/blog/記事のスラッグ/ にアクセス
```

### 11.3 本番ビルドでの確認

```bash
# ビルドを実行
npm run build

# プレビューを起動
npm run preview

# ブラウザで確認
```

### 11.4 GitHubにプッシュ

```bash
# 変更をステージング
git add .

# コミット
git commit -m "記事追加: タイトル"

# GitHubにプッシュ（自動でCloudflare Pagesにデプロイされる）
git push
```

### 11.5 公開確認

1. Cloudflare Pagesのダッシュボードでデプロイ状況を確認
2. 2-3分後、https://profectus-note.com/blog/記事のスラッグ/ で確認

---

## 12. よくある質問

### Q1: 画像が表示されない

**原因と解決方法:**
- パスが間違っている → `/images/blog/` から始まる絶対パスを使用
- ファイル名に大文字が含まれている → 小文字に統一
- ファイルが存在しない → `public/images/blog/` フォルダを確認

### Q2: Frontmatterでエラーが出る

**よくある原因:**
- 値にコロン（`:`）があるのに引用符がない
- 日付形式が間違っている（`YYYY-MM-DD`形式を使用）
- 配列の記法が間違っている（`-` で項目を列挙）

### Q3: コードブロックが正しく表示されない

**解決方法:**
- 言語名を正しく指定（`javascript`, `typescript`, `html`, `css`など）
- バッククォートが3つ連続しているか確認

### Q4: リンクが正しく動作しない

**確認ポイント:**
- 内部リンクは `/blog/スラッグ/` の形式
- スラッグはファイル名から拡張子を除いたもの
- 末尾のスラッシュ（`/`）を忘れない

### Q5: 記事が一覧に表示されない

**確認ポイント:**
- `draft: false` になっているか
- `pubDate` が正しく設定されているか
- ファイル名が正しい形式か

### Q6: OGP画像が表示されない

**確認ポイント:**
- `heroImage` が正しく設定されているか
- 画像ファイルが `public/` フォルダ内に存在するか
- 画像サイズが1200x630px以上か（推奨）

---

## 付録：記事テンプレート（完全版）

```markdown
---
title: "記事タイトル"
description: "記事の説明文（100-150字程度、OGPで使用されます）"
pubDate: 2026-02-06
updatedDate: 2026-02-06
category: "dx"
tags:
  - "DX"
  - "中小企業"
  - "IT導入"
attackOrDefense: "attack"
heroImage: "/images/blog/article-name/hero.jpg"
draft: false
actionItems:  # Frontmatterで指定すると自動的にアクションセクションが表示されます
  - "アクション1"
  - "アクション2"
  - "アクション3"
---

<!-- リード文（100-150字）-->
記事の冒頭に、読者の課題を明示し、記事を読むメリットを端的に伝えます。

## 目次

- [はじめに](#はじめに)
- [本文](#本文)
  - [セクション1](#セクション1)
  - [セクション2](#セクション2)
- [★今日からできるアクション](#今日からできるアクション)
- [まとめ](#まとめ)

## はじめに

記事の導入部分です。読者の課題を明確にし、なぜこの記事が重要かを説明します。

## 本文

### セクション1

本文の内容です。具体的な方法・ステップ、注意点・よくある失敗を含めます。

![画像の説明](/images/blog/article-name/image1.jpg)

### セクション2

> 重要な引用文です。
> 
> — <cite>著者名</cite>

詳しくは[こちらの記事](/blog/related-article/)をご覧ください。

## ★今日からできるアクション

この記事を読んで、明日からすぐに実行できるアクションをまとめました。

### すぐできる（10分以内）
- [ ] アクション1
- [ ] アクション2

### 今週中に
- [ ] アクション3

### 今月中に
- [ ] アクション4

**注意**: `actionItems`をFrontmatterで指定した場合、このセクションは自動的に表示されます。
Markdown内で手動で記述することも可能です。

## まとめ

記事のまとめです。キーポイントの再確認と、次のアクションへの誘導を行います。

---

**関連記事:**
- [関連記事1](/blog/related-article-1/)
- [関連記事2](/blog/related-article-2/)
```

## 記事作成時のチェックリスト

公開前に以下の項目を確認してください：

### 必須チェック（個人雑記防止）

- [ ] 「自分が中小企業の社長なら、この情報が欲しいか？」→ Yes
- [ ] 「読者がこの記事を読んで、明日から何かアクションに移せるか？」→ Yes
- [ ] 「中小企業の経営・業務に直接役立つか？」→ Yes
- [ ] 個人の日常・趣味・私生活に関する内容が含まれていないか？→ No
- [ ] 攻め（IT・DX）か守り（セキュリティ）か明確か？→ Yes

### コンテンツチェック

- [ ] タイトルにキーワードが含まれているか
- [ ] リード文（100-150字）で読者の課題を明示しているか
- [ ] 見出し（H2, H3）が適切に構造化されているか
- [ ] 専門用語に説明が添えられているか
- [ ] 「★今日からできるアクション」が具体的に提示されているか（3つ以上）
- [ ] 出典・参照元が明記されているか
- [ ] 誤字脱字がないか
- [ ] Frontmatterのメタデータが正しく設定されているか

---

**最終更新**: 2026年2月6日  
**作成者**: プロフェクタスデザイン
