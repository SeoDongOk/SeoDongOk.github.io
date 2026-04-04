'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import HeroLanguageSwitch from '@/components/HeroLanguageSwitch'
import { useLanguage, type Language } from '@/components/LanguageContext'
import { useUiCopy } from '@/components/ui-copy'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

const homeCopy: Record<
  Language,
  {
    label: string
    blogCta: string
    projectCta: string
    snapshot: string
    notes: string
    notesDescription: string
    recentLabel: string
    recentTitle: string
    recentDescription: string
    emptyMessage: string
    readMore: string
    allPosts: string
    posts: string
    tags: string
    publishedOn: string
  }
> = {
  ko: {
    label: 'Portfolio',
    blogCta: 'View Blog',
    projectCta: 'View Projects',
    snapshot: 'Snapshot',
    notes: 'Notes',
    notesDescription: '관심 있는 분야와 진행 중인 작업을 계속 정리하고 있습니다.',
    recentLabel: 'Recent Updates',
    recentTitle: '최근 업데이트',
    recentDescription: '최근에 추가한 글과 작업 기록입니다.',
    emptyMessage: '작성된 글이 없습니다.',
    readMore: '더 읽기',
    allPosts: '전체 글 보기',
    posts: 'Posts',
    tags: 'Tags',
    publishedOn: '게시일',
  },
  ja: {
    label: 'Portfolio',
    blogCta: 'View Blog',
    projectCta: 'View Projects',
    snapshot: 'Snapshot',
    notes: 'Notes',
    notesDescription: '関心のある分野と進行中の作業を継続的に整理しています。',
    recentLabel: 'Recent Updates',
    recentTitle: '最近の更新',
    recentDescription: '最近追加した記事と作業記録です。',
    emptyMessage: 'まだ投稿がありません。',
    readMore: '続きを読む',
    allPosts: 'すべての記事を見る',
    posts: 'Posts',
    tags: 'Tags',
    publishedOn: '公開日',
  },
  en: {
    label: 'Portfolio',
    blogCta: 'View Blog',
    projectCta: 'View Projects',
    snapshot: 'Snapshot',
    notes: 'Notes',
    notesDescription: 'Ongoing interests and current work are updated here over time.',
    recentLabel: 'Recent Updates',
    recentTitle: 'Recent Updates',
    recentDescription: 'Recent posts and working notes collected here.',
    emptyMessage: 'No posts available.',
    readMore: 'Read more',
    allPosts: 'View all posts',
    posts: 'Posts',
    tags: 'Tags',
    publishedOn: 'Published on',
  },
}

export default function Home({ posts }) {
  const { language } = useLanguage()
  const copy = homeCopy[language]
  const { common } = useUiCopy()
  const tagCount = new Set(posts.flatMap((post) => post.tags || [])).size

  return (
    <>
      <div className="space-y-10 pt-8">
        <section className="ambient-panel overflow-hidden rounded-[2rem] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
            <div>
              <p className="text-xs tracking-[0.34em] text-stone-500 uppercase dark:text-stone-200">
                {copy.label}
              </p>
              <HeroLanguageSwitch />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="border-primary-700 bg-primary-700 hover:bg-primary-800 rounded-full border px-5 py-2.5 text-sm tracking-[0.16em] text-white uppercase transition"
                >
                  {copy.blogCta}
                </Link>
                <Link
                  href="/projects"
                  className="hover:border-primary-500 hover:text-primary-700 rounded-full border border-stone-800/15 bg-white/70 px-5 py-2.5 text-sm tracking-[0.16em] text-stone-700 uppercase transition dark:border-stone-100/10 dark:bg-stone-900/40 dark:text-stone-100"
                >
                  {copy.projectCta}
                </Link>
              </div>
            </div>
            <div className="grid gap-4 self-end">
              <div className="ambient-surface rounded-[1.5rem] p-5">
                <p className="text-xs tracking-[0.26em] text-stone-500 uppercase dark:text-stone-200">
                  {copy.snapshot}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-stone-500 dark:text-stone-200">{copy.posts}</dt>
                    <dd className="mt-1 text-3xl font-semibold text-stone-900 dark:text-stone-100">
                      {posts.length}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-500 dark:text-stone-200">{copy.tags}</dt>
                    <dd className="mt-1 text-3xl font-semibold text-stone-900 dark:text-stone-100">
                      {tagCount}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="ambient-surface rounded-[1.5rem] p-5">
                <p className="text-xs tracking-[0.26em] text-stone-500 uppercase dark:text-stone-200">
                  {copy.notes}
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-100">
                  {copy.notesDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="divide-y divide-stone-300/70 dark:divide-stone-700/70">
          <div className="space-y-3 pb-8">
            <p className="text-xs tracking-[0.3em] text-stone-500 uppercase dark:text-stone-200">
              {copy.recentLabel}
            </p>
            <h2 className="text-3xl leading-tight font-bold tracking-tight text-stone-900 md:text-5xl dark:text-stone-100">
              {copy.recentTitle}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-100">
              {copy.recentDescription}
            </p>
          </div>
        </div>

        <ul className="divide-y divide-stone-300/70 dark:divide-stone-700/70">
          {!posts.length && copy.emptyMessage}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-3 xl:grid xl:grid-cols-[180px_minmax(0,1fr)] xl:items-start xl:gap-10 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">{copy.publishedOn}</dt>
                      <dd className="text-sm leading-6 font-medium tracking-[0.12em] text-stone-500 uppercase dark:text-stone-200">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5">
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-2xl leading-8 font-bold tracking-tight text-stone-900 dark:text-stone-100">
                            <Link
                              href={`/blog/${slug}`}
                              className="hover:text-primary-700 dark:hover:text-primary-400 transition"
                            >
                              {title}
                            </Link>
                          </h3>
                          <div className="mt-4 flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-stone-600 dark:text-stone-100">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400"
                          aria-label={`${copy.readMore}: "${title}"`}
                        >
                          {copy.readMore} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-6 text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400"
            aria-label={common.allPosts}
          >
            {copy.allPosts} &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
