// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
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
    
    // OGP画像（文字列パス（publicフォルダ）または画像オブジェクト（src/assets）の両方を受け付ける）
    heroImage: z.union([z.string(), image()]).optional(),
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
