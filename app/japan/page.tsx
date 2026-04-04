import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { getJapanPosts } from '../../lib/blogFilters'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Japan',
  description: '일본어, 일본 시장 관찰, 일본 핀테크 방향성과 연결되는 글 모음',
})

export default async function JapanPage() {
  const posts = getJapanPosts()
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
      title="Japan"
      description="Writing that connects Japanese language study, market context, and future Japan-facing fintech work."
    />
  )
}
