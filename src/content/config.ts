// src/content/config.ts
// Content Collectionsのスキーマ定義ファイル
// ブログ記事のfrontmatter（メタデータ）の構造を定義します
// このスキーマに従わない記事はエラーになります

import { defineCollection, z } from 'astro:content';

// ブログ記事コレクションの定義
const blog = defineCollection({
  type: 'content', // Markdown/MDXファイルとして扱う
  schema: ({ image }) => z.object({
    // ============================================
    // 基本情報（必須）
    // ============================================
    title: z.string(), // 記事タイトル（必須）
    description: z.string(), // 記事の説明文（必須、OGPで使用）
    pubDate: z.coerce.date(), // 公開日（必須、文字列から自動変換）
    updatedDate: z.coerce.date().optional(), // 更新日（オプション）
    
    // ============================================
    // カテゴリとタグ
    // ============================================
    category: z.enum(['digitalization', 'ai', 'cybersecurity', 'ceo-interview', 'case-study', 'news', 'subsidy', 'tools']), // カテゴリ（必須、指定された値のみ許可）
    tags: z.array(z.string()).default([]), // タグ配列（デフォルトは空配列）

    // ============================================
    // 画像設定
    // ============================================
    // ヒーロー画像（記事のトップに表示される画像、OGP画像としても使用）
    // 文字列パス（publicフォルダ）または画像オブジェクト（src/assets）の両方を受け付けます
    heroImage: z.union([z.string(), image()]).optional(),
    // OGP専用画像（オプション、指定しない場合はheroImageが使用される）
    ogImage: z.string().optional(),
    
    // ============================================
    // 記事タイプ
    // ============================================
    // 記事の種類を指定（構造化データで使用）
    type: z.enum(['article', 'interview', 'case-study', 'news']).default('article'),
    
    // ============================================
    // 今日からできるアクション
    // ============================================
    // 読者が今日から実践できるアクション項目のリスト（オプション）
    actionItems: z.array(z.string()).optional(),
    
    // ============================================
    // 下書きフラグ
    // ============================================
    // trueにすると、RSSフィードやサイトマップから除外されます
    draft: z.boolean().default(false),
    
    // ============================================
    // 関連記事
    // ============================================
    // 関連する記事のID（スラッグ）のリスト（オプション）
    relatedPosts: z.array(z.string()).optional(),
  }),
});

// コレクションをエクスポート（Astroが自動的に認識します）
export const collections = { blog };
