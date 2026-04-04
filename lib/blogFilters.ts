import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

const quantTerms = [
  'quantitative-trading',
  'backtesting',
  'optimization',
  'futures',
  'algorithm',
  'strategy',
  'signal',
  'alpha',
  'execution',
]

const infraTerms = [
  'python',
  'supabase',
  'sdo-auto-trader',
  'binance',
  'automation',
  'backend',
  'system',
  'infra',
  'pipeline',
  'monitoring',
]

const japanTerms = ['japan', 'japanese', 'hiragana', 'katakana', 'nihongo', '일본어', '日本']

function searchableText(post) {
  return [post.title, post.summary, post.slug, post.path, ...(post.tags || [])]
    .join(' ')
    .toLowerCase()
}

function filterPosts(terms: string[]) {
  const posts = allCoreContent(sortPosts(allBlogs))
  return posts.filter((post) => {
    const haystack = searchableText(post)
    return terms.some((term) => haystack.includes(term))
  })
}

export function getQuantPosts() {
  return filterPosts(quantTerms)
}

export function getInfraPosts() {
  return filterPosts(infraTerms)
}

export function getJapanPosts() {
  return filterPosts(japanTerms)
}
