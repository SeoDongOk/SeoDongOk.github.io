import ListLayout from '@/layouts/ListLayoutWithTags'
import { getJapanPosts } from '../../../../lib/blogFilters'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(getJapanPosts().length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default async function JapanPageNumber(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = getJapanPosts()
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  // 유효하지 않은 페이지 번호는 404
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
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
