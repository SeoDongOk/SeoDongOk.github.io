'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { useUiCopy } from '@/components/ui-copy'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  description?: string
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const { common } = useUiCopy()
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-8 pb-12">
      <nav className="ambient-surface flex items-center justify-between gap-4 rounded-full border border-stone-900/10 bg-white/70 px-5 py-3 text-sm tracking-[0.16em] uppercase">
        {!prevPage && (
          <button
            className="cursor-auto text-stone-400 disabled:opacity-50 dark:text-stone-500"
            disabled={!prevPage}
          >
            {common.previous}
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200 transition"
          >
            {common.previous}
          </Link>
        )}
        <span className="text-stone-600 dark:text-stone-200">
          {currentPage} {common.of} {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto text-stone-400 disabled:opacity-50 dark:text-stone-500"
            disabled={!nextPage}
          >
            {common.next}
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200 transition"
          >
            {common.next}
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  description,
}: ListLayoutProps) {
  const { common } = useUiCopy()
  const pathname = usePathname()
  const [searchValue, setSearchValue] = useState('')
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const searchTerm = searchValue.toLowerCase()
  const filteredPosts = posts.filter((post) => {
    const searchContent = `${post.title} ${post.summary} ${post.tags?.join(' ') || ''}`
    return searchContent.toLowerCase().includes(searchTerm)
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredPosts
  const displayTitle = title === 'All Posts' ? common.allPosts : title
  const activeTag = pathname.startsWith('/tags/')
    ? decodeURI(pathname.split('/tags/')[1] || '')
    : ''
  const postCount = filteredPosts.length
  const introText =
    description ||
    (pathname.startsWith('/tags/') ? `${displayTitle} ${common.tagIntroSuffix}` : common.blogIntro)

  return (
    <div className="space-y-10 pt-8">
      <section className="ambient-panel overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.9fr)] lg:items-end">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.32em] text-stone-500 uppercase dark:text-stone-200">
              {pathname.startsWith('/tags/') ? common.tags : common.posts}
            </p>
            <h1 className="max-w-4xl text-3xl leading-tight font-bold tracking-tight text-stone-900 md:text-5xl dark:text-stone-100">
              {displayTitle}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-100">
              {introText}
            </p>
          </div>
          <div className="ambient-surface rounded-[1.5rem] p-5">
            <p className="text-xs tracking-[0.26em] text-stone-500 uppercase dark:text-stone-200">
              {searchValue ? common.searchArticles : common.posts}
            </p>
            <p className="mt-2 text-3xl font-semibold text-stone-900 dark:text-stone-100">
              {postCount}
            </p>
            <div className="relative mt-4">
              <label>
                <span className="sr-only">{common.searchArticles}</span>
                <input
                  aria-label={common.searchArticles}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={common.searchArticles}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-full border border-stone-900/10 bg-white/80 px-5 py-3 pr-12 text-sm text-stone-900 transition outline-none dark:border-stone-100/10 dark:bg-stone-950/45 dark:text-stone-100"
                />
              </label>
              <svg
                className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-stone-500 dark:text-stone-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <aside className="lg:sticky lg:top-24 lg:w-[280px] lg:min-w-[280px]">
          <div className="ambient-surface overflow-hidden rounded-[1.5rem]">
            <div className="border-b border-stone-900/10 px-6 py-4 dark:border-stone-100/8">
              <p className="text-xs tracking-[0.24em] text-stone-500 uppercase dark:text-stone-200">
                {common.tags}
              </p>
            </div>
            <div className="max-h-[70vh] overflow-auto px-4 py-4">
              <div className="mb-3">
                {pathname.startsWith('/blog') ? (
                  <h3 className="border-primary-700/20 bg-primary-100 text-primary-700 dark:border-primary-300/20 dark:bg-primary-950/30 dark:text-primary-200 inline-flex rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase">
                    {common.allPosts}
                  </h3>
                ) : (
                  <Link
                    href={`/blog`}
                    className="hover:border-primary-500 hover:text-primary-700 dark:hover:text-primary-300 inline-flex rounded-full border border-stone-900/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-stone-700 uppercase transition dark:border-stone-100/10 dark:text-stone-100"
                  >
                    {common.allPosts}
                  </Link>
                )}
              </div>
              <ul className="space-y-2">
                {sortedTags.map((t) => {
                  const isActive = activeTag === slug(t)
                  return (
                    <li key={t}>
                      {isActive ? (
                        <h3 className="inline-flex rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase dark:bg-stone-100 dark:text-stone-900">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="hover:text-primary-700 dark:hover:text-primary-300 inline-flex rounded-full px-4 py-2 text-xs font-medium tracking-[0.14em] text-stone-600 uppercase transition hover:bg-stone-900/5 dark:text-stone-200 dark:hover:bg-stone-100/8"
                          aria-label={`${common.viewPostsTagged} ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex gap-3 overflow-x-auto pb-1 lg:hidden">
            <div className="shrink-0">
              {pathname.startsWith('/blog') ? (
                <h3 className="border-primary-700/20 bg-primary-100 text-primary-700 dark:border-primary-300/20 dark:bg-primary-950/30 dark:text-primary-200 inline-flex rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase">
                  {common.allPosts}
                </h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="inline-flex rounded-full border border-stone-900/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-stone-700 uppercase dark:border-stone-100/10 dark:text-stone-100"
                >
                  {common.allPosts}
                </Link>
              )}
            </div>
            {sortedTags.slice(0, 12).map((t) => {
              const isActive = activeTag === slug(t)
              return isActive ? (
                <h3
                  key={t}
                  className="inline-flex shrink-0 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase dark:bg-stone-100 dark:text-stone-900"
                >
                  {`${t} (${tagCounts[t]})`}
                </h3>
              ) : (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  className="inline-flex shrink-0 rounded-full bg-stone-900/5 px-4 py-2 text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:bg-stone-100/8 dark:text-stone-200"
                  aria-label={`${common.viewPostsTagged} ${t}`}
                >
                  {`${t} (${tagCounts[t]})`}
                </Link>
              )
            })}
          </div>

          <ul className="space-y-5">
            {!filteredPosts.length && (
              <li className="ambient-surface rounded-[1.5rem] px-6 py-8 text-stone-600 dark:text-stone-100">
                {common.noPostsFound}
              </li>
            )}
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path}>
                  <article className="ambient-surface rounded-[1.5rem] px-6 py-6 md:px-8 md:py-7">
                    <div className="space-y-4 xl:grid xl:grid-cols-[160px_minmax(0,1fr)] xl:items-start xl:gap-8 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{common.publishedOn}</dt>
                        <dd className="text-sm leading-6 font-medium tracking-[0.12em] text-stone-500 uppercase dark:text-stone-200">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight text-stone-900 md:text-3xl dark:text-stone-100">
                            <Link
                              href={`/${path}`}
                              className="hover:text-primary-700 dark:hover:text-primary-300 transition"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-4 flex flex-wrap">
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-stone-600 dark:text-stone-100">
                          {summary}
                        </div>
                        <div className="pt-1 text-sm font-medium tracking-[0.16em] uppercase">
                          <Link
                            href={`/${path}`}
                            className="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200 transition"
                            aria-label={`${common.readArticle}: ${title}`}
                          >
                            {common.readArticle} &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && !searchValue && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
