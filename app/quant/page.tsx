import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { getQuantPosts } from '../../lib/blogFilters'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Quant',
  description: '백테스트, 전략 검증, 시스템 트레이딩 연구 글 모음',
})

export default async function QuantPage() {
  const posts = getQuantPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Quant"
      description="Backtests, strategy research, validation notes, and systematic trading experiments."
    />
  )
}
