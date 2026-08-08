import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { getCfaPosts } from '../../lib/blogFilters'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'CFA',
  description: 'CFA Level 1 (2027년 2월 응시 목표) 준비 기록 — 퀀트 방법론, 윤리, 재무보고 노트',
})

export default async function CfaPage() {
  const posts = getCfaPosts()
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
      title="CFA"
      description="Studying for CFA Level 1, targeting the February 2027 sitting. Quantitative methods, ethics, and financial reporting notes as I work through the curriculum."
    />
  )
}
