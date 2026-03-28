import Link from '@/components/Link'
import Tag from '@/components/Tag'
import HeroLanguageSwitch from '@/components/HeroLanguageSwitch'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const tagCount = new Set(posts.flatMap((post) => post.tags || [])).size

  return (
    <>
      <div className="space-y-10 pt-8">
        <section className="ambient-panel overflow-hidden rounded-[2rem] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
            <div>
              <p className="text-xs tracking-[0.34em] text-stone-500 uppercase dark:text-stone-400">
                D.Ok Seo Archive
              </p>
              <div className="mt-4">
                <HeroLanguageSwitch />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="border-primary-700 bg-primary-700 hover:bg-primary-800 rounded-full border px-5 py-2.5 text-sm tracking-[0.16em] text-white uppercase transition"
                >
                  글 보러가기
                </Link>
                <Link
                  href="/projects"
                  className="hover:border-primary-500 hover:text-primary-700 rounded-full border border-stone-800/15 bg-white/70 px-5 py-2.5 text-sm tracking-[0.16em] text-stone-700 uppercase transition dark:border-stone-100/10 dark:bg-stone-900/40 dark:text-stone-200"
                >
                  프로젝트 보기
                </Link>
              </div>
            </div>
            <div className="grid gap-4 self-end">
              <div className="ambient-surface rounded-[1.5rem] p-5">
                <p className="text-xs tracking-[0.26em] text-stone-500 uppercase dark:text-stone-400">
                  Snapshot
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-stone-500 dark:text-stone-400">Posts</dt>
                    <dd className="mt-1 text-3xl font-semibold text-stone-900 dark:text-stone-100">
                      {posts.length}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-500 dark:text-stone-400">Tags</dt>
                    <dd className="mt-1 text-3xl font-semibold text-stone-900 dark:text-stone-100">
                      {tagCount}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="ambient-surface rounded-[1.5rem] p-5">
                <p className="text-xs tracking-[0.26em] text-stone-500 uppercase dark:text-stone-400">
                  Notes
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  관심 있는 주제와 진행 중인 작업을 계속 업데이트합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="divide-y divide-stone-300/70 dark:divide-stone-700/70">
          <div className="space-y-3 pb-8">
            <p className="text-xs tracking-[0.3em] text-stone-500 uppercase dark:text-stone-400">
              Recent Notes
            </p>
            <h2 className="text-3xl leading-tight font-bold tracking-tight text-stone-900 md:text-5xl dark:text-stone-100">
              최신 기록
            </h2>
            <p className="max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-300">
              최근에 업데이트한 글과 작업 기록입니다.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-stone-300/70 dark:divide-stone-700/70">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-3 xl:grid xl:grid-cols-[180px_minmax(0,1fr)] xl:items-start xl:gap-10 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm leading-6 font-medium tracking-[0.12em] text-stone-500 uppercase dark:text-stone-400">
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
                        <div className="prose max-w-none text-stone-600 dark:text-stone-300">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          더 읽기 &rarr;
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
            aria-label="All posts"
          >
            전체 글 보기 &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
