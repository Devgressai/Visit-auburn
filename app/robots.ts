import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all search engines and AI crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/', '/private/'],
      },
      // Explicitly allow major search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // Explicitly allow AI crawlers
      {
        userAgent: 'GPTBot', // OpenAI/ChatGPT
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google Bard/Gemini
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Claude/Anthropic
        allow: '/',
      },
      {
        userAgent: 'Claude-Web', // Claude web browsing
        allow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl (used by many AI models)
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Bytespider', // ByteDance/TikTok AI
        allow: '/',
      },
      {
        userAgent: 'cohere-ai', // Cohere AI
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
