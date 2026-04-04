import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { getInfraPosts } from '../../lib/blogFilters'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Infra',
  description: '자동화, 데이터 파이프라인, 트레이딩 시스템 인프라 글 모음',
})

export default async function InfraPage() {
  const posts = getInfraPosts()
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
      title="Infra"
      description="Automation, data workflows, backend tooling, and trading system implementation notes."
    />
  )
}
