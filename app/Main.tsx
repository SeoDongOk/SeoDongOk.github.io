'use client'

import { useState, useMemo } from 'react'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const CAT_COLOR: Record<string, string> = {
  quant: '#c8a06a',
  infra: '#7aabcc',
  japan: '#cc7a9a',
  misc: '#888',
}
const CAT_LABEL: Record<string, string> = {
  quant: '퀀트',
  infra: '인프라',
  japan: '일본어',
  misc: '기타',
}

const CATS = [
  { id: 'all', label: '전체' },
  { id: 'quant', label: '퀀트' },
  { id: 'infra', label: '인프라' },
  { id: 'japan', label: '일본어' },
]

type Post = {
  slug: string
  date: string
  title: string
  summary?: string
  tags?: string[]
  category?: string
  readingTime?: { text: string; minutes: number }
}

function PostCard({ post, onClick }: { post: Post; onClick: (p: Post) => void }) {
  const cc = CAT_COLOR[post.category ?? 'misc'] ?? CAT_COLOR.misc
  const catLabel = CAT_LABEL[post.category ?? 'misc'] ?? CAT_LABEL.misc
  const mins = Math.ceil(post.readingTime?.minutes ?? 5)

  return (
    <div
      onClick={() => onClick(post)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(post)}
      role="button"
      tabIndex={0}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-stone-900/10 bg-white/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-900/15 hover:bg-white/80 hover:shadow-[0_6px_28px_rgba(0,0,0,0.06)] dark:border-stone-100/8 dark:bg-[rgba(32,24,16,0.6)] dark:hover:border-stone-100/12 dark:hover:bg-[rgba(39,30,21,0.75)] dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-70" />

      <div className="mb-3.5 flex items-center gap-2">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.09em',
            color: cc,
            background: `${cc}1F`,
            border: `1px solid ${cc}4C`,
            padding: '3px 9px',
            borderRadius: 4,
          }}
        >
          {catLabel}
        </span>
        <span
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="ml-auto text-[11px] text-stone-400 dark:text-stone-500"
        >
          {formatDate(post.date, siteMetadata.locale)}
        </span>
        <span
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-[11px] text-stone-400 dark:text-stone-500"
        >
          · {mins}m
        </span>
      </div>

      <h3 className="mb-2.5 text-[15px] leading-[1.5] font-semibold text-stone-900 transition-colors duration-150 group-hover:text-[var(--color-accent)] dark:text-stone-100">
        {post.title}
      </h3>

      {post.summary && (
        <p className="mb-4 text-[13.5px] leading-[1.75] text-stone-600 dark:text-stone-400">
          {post.summary.length > 120 ? post.summary.slice(0, 120) + '…' : post.summary}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {(post.tags ?? []).slice(0, 4).map((tag) => (
          <span
            key={tag}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="rounded border border-stone-900/8 bg-stone-100/80 px-2 py-0.5 text-[10px] text-stone-500 dark:border-stone-100/8 dark:bg-stone-800/50 dark:text-stone-500"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function PostListItem({ post, onClick }: { post: Post; onClick: (p: Post) => void }) {
  const cc = CAT_COLOR[post.category ?? 'misc'] ?? CAT_COLOR.misc
  const catLabel = CAT_LABEL[post.category ?? 'misc'] ?? CAT_LABEL.misc
  const mins = Math.ceil(post.readingTime?.minutes ?? 5)

  return (
    <div
      onClick={() => onClick(post)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(post)}
      role="button"
      tabIndex={0}
      className="group flex cursor-pointer items-baseline gap-5 border-b border-stone-900/8 py-4 transition-all duration-150 hover:border-stone-900/15 dark:border-stone-100/8 dark:hover:border-stone-100/12"
    >
      <span
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        className="hidden shrink-0 text-[11px] text-stone-400 sm:block dark:text-stone-500"
      >
        {formatDate(post.date, siteMetadata.locale)}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: cc,
          background: `${cc}18`,
          padding: '2px 7px',
          borderRadius: 3,
          flexShrink: 0,
        }}
      >
        {catLabel}
      </span>
      <span className="flex-1 text-[15px] leading-[1.45] font-medium text-stone-800 transition-colors duration-150 group-hover:text-[var(--color-accent)] dark:text-stone-200">
        {post.title}
      </span>
      <span
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        className="ml-auto shrink-0 text-[11px] text-stone-400 dark:text-stone-500"
      >
        {mins}m
      </span>
    </div>
  )
}

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const cc = CAT_COLOR[post.category ?? 'misc'] ?? CAT_COLOR.misc
  const catLabel = CAT_LABEL[post.category ?? 'misc'] ?? CAT_LABEL.misc
  const mins = Math.ceil(post.readingTime?.minutes ?? 5)

  return (
    <div
      role="presentation"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      className="fixed inset-0 z-[1000] flex animate-[fadeIn_0.2s_ease] items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-2xl animate-[fadeUp_0.25s_ease] overflow-y-auto rounded-[20px] border border-stone-900/10 bg-white px-10 py-11 shadow-[0_24px_80px_rgba(0,0,0,0.3)] dark:border-stone-100/8 dark:bg-[#201810]"
      >
        <button
          onClick={onClose}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="absolute top-5 right-5 cursor-pointer rounded-lg border border-stone-900/10 bg-transparent px-3 py-1 text-[11px] text-stone-500 transition-colors hover:border-stone-900/20 dark:border-stone-100/8 dark:text-stone-500"
        >
          ESC ✕
        </button>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.09em',
              color: cc,
              background: `${cc}18`,
              padding: '3px 10px',
              borderRadius: 4,
            }}
          >
            {catLabel}
          </span>
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[11px] text-stone-400 dark:text-stone-500"
          >
            {formatDate(post.date, siteMetadata.locale)} · {mins}min read
          </span>
        </div>

        <h1 className="mb-5 text-[22px] leading-[1.4] font-bold text-stone-900 dark:text-stone-100">
          {post.title}
        </h1>

        <div className="mb-7 flex flex-wrap gap-1.5 border-b border-stone-900/8 pb-6 dark:border-stone-100/8">
          {(post.tags ?? []).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--color-accent)',
                background: 'var(--color-accent-dim)',
              }}
              className="rounded px-2.5 py-1 text-[11px]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {post.summary && (
          <p className="mb-5 text-[15px] leading-[1.85] text-stone-600 dark:text-stone-400">
            {post.summary}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          onClick={onClose}
          style={{
            color: 'var(--color-accent)',
            background: 'var(--color-accent-dim)',
            border: '1px solid var(--color-accent-bord)',
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-[9px] px-5 py-2.5 text-[13px] font-semibold no-underline transition-opacity hover:opacity-80"
        >
          전체 글 읽기 →
        </Link>
      </div>
    </div>
  )
}

export default function Home({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')
  const [listStyle, setListStyle] = useState<'card' | 'list'>('card')
  const [selected, setSelected] = useState<Post | null>(null)

  const tagCount = useMemo(() => new Set(posts.flatMap((p) => p.tags ?? [])).size, [posts])

  const filtered = useMemo(() => {
    let p = posts
    if (cat !== 'all') p = p.filter((x) => x.category === cat)
    if (search) {
      const q = search.toLowerCase()
      p = p.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          (x.summary ?? '').toLowerCase().includes(q) ||
          (x.tags ?? []).some((g) => g.includes(q))
      )
    }
    return p
  }, [cat, search, posts])

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* ── Hero ── */}
      <section className="pt-12 pb-10" style={{ animation: 'fadeUp 0.5s ease' }}>
        <div className="max-w-[620px]">
          <p
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="mb-4 text-[11px] tracking-[0.1em] text-stone-400 uppercase dark:text-stone-500"
          >
            DONGOK SEO · BLOG
          </p>
          <h1
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(28px,3.5vw,42px)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
            className="mb-4 text-stone-900 dark:text-stone-100"
          >
            Quant · Dev ·{' '}
            <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>日本語</span>
          </h1>
          <p className="mb-7 max-w-[480px] text-[15.5px] leading-[1.8] text-stone-600 dark:text-stone-400">
            퀀트 자동매매 봇을 만들고, 서버를 고치고, 일본어 단어를 외웁니다.
            <br />그 과정에서 막히고 배운 것들을 여기에 씁니다.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#posts"
              style={{ background: 'var(--color-accent)' }}
              className="rounded-[9px] px-6 py-2.5 text-[14px] font-semibold whitespace-nowrap text-white no-underline transition-opacity hover:opacity-90"
            >
              포스트 보기
            </a>
            <a
              href="https://github.com/SeoDongOk"
              target="_blank"
              rel="noopener"
              className="rounded-[9px] border border-stone-900/12 px-6 py-2.5 text-[14px] font-medium whitespace-nowrap text-stone-600 no-underline transition-all hover:border-stone-900/20 hover:text-stone-800 dark:border-stone-100/10 dark:text-stone-400 dark:hover:border-stone-100/20 dark:hover:text-stone-200"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="mb-12 flex flex-wrap overflow-hidden rounded-xl border border-stone-900/8 bg-stone-50/80 dark:border-stone-100/6 dark:bg-[rgba(28,21,16,0.6)]">
        {[
          { k: 'Posts', v: String(posts.length) },
          { k: 'Tags', v: String(tagCount) },
          { k: '전략 백테스트', v: '12개' },
          { k: '일본어', v: 'JLPT N5' },
        ].map((s, i, a) => (
          <div
            key={s.k}
            className={`flex flex-1 basis-[100px] flex-col gap-1 px-5 py-4 ${i < a.length - 1 ? 'border-r border-stone-900/8 dark:border-stone-100/6' : ''}`}
          >
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-[9px] tracking-[0.08em] text-stone-400 uppercase dark:text-stone-500"
            >
              {s.k}
            </span>
            <span style={{ color: 'var(--color-accent)' }} className="text-xl font-bold">
              {s.v}
            </span>
          </div>
        ))}
      </div>

      {/* ── Posts section ── */}
      <section id="posts" className="pb-20">
        {/* Controls */}
        <div className="mb-9 flex flex-wrap items-center gap-1.5">
          {/* Category pills */}
          <div className="flex shrink-0 gap-1 rounded-full border border-stone-900/8 bg-stone-50/80 p-1 dark:border-stone-100/8 dark:bg-[rgba(28,21,16,0.5)]">
            {CATS.map((c) => {
              const active = cat === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-150 ${
                    active
                      ? 'border-stone-900/10 bg-white text-stone-800 shadow-[0_1px_4px_rgba(0,0,0,0.1)] dark:border-stone-100/8 dark:bg-[rgba(32,24,16,0.9)] dark:text-stone-100'
                      : 'border-transparent bg-transparent text-stone-500 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative ml-2">
            <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-[13px] text-stone-400">
              ⌕
            </span>
            <input
              placeholder="검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="w-44 rounded-[9px] border border-stone-900/10 bg-white py-2 pr-3.5 pl-8 text-[13px] text-stone-800 transition-colors focus:border-[var(--color-accent-bord)] focus:outline-none dark:border-stone-100/8 dark:bg-[rgba(32,24,16,0.6)] dark:text-stone-200 dark:placeholder:text-stone-600"
            />
          </div>

          {/* Card/List toggle */}
          <div className="ml-auto flex gap-1 rounded-[8px] border border-stone-900/8 bg-stone-50/80 p-0.5 dark:border-stone-100/8 dark:bg-[rgba(28,21,16,0.5)]">
            {(['card', 'list'] as const).map((v) => {
              const icon = v === 'card' ? '▦' : '≡'
              return (
                <button
                  key={v}
                  onClick={() => setListStyle(v)}
                  className={`cursor-pointer rounded-[6px] border px-2.5 py-1 text-[14px] transition-all duration-150 ${
                    listStyle === v
                      ? 'border-stone-900/10 bg-white text-stone-700 dark:border-stone-100/8 dark:bg-[rgba(32,24,16,0.9)] dark:text-stone-200'
                      : 'border-transparent bg-transparent text-stone-400 dark:text-stone-600'
                  }`}
                >
                  {icon}
                </button>
              )
            })}
          </div>
        </div>

        {/* Section label */}
        <div className="mb-6 flex items-center gap-3.5">
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[10px] tracking-[0.1em] text-stone-400 uppercase dark:text-stone-500"
          >
            최근 포스트
          </span>
          <div className="h-px flex-1 bg-stone-900/8 dark:bg-stone-100/8" />
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[10px] text-stone-400 dark:text-stone-500"
          >
            {filtered.length}/{posts.length}
          </span>
        </div>

        {/* Grid or List */}
        {filtered.length === 0 ? (
          <div
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="py-16 text-center text-[13px] text-stone-400 dark:text-stone-600"
          >
            검색 결과가 없습니다.
          </div>
        ) : listStyle === 'list' ? (
          <div>
            {filtered.map((post, i) => (
              <div key={post.slug} style={{ animation: `fadeUp 0.35s ease ${i * 0.03}s both` }}>
                <PostListItem post={post} onClick={setSelected} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((post, i) => (
              <div key={post.slug} style={{ animation: `fadeUp 0.35s ease ${i * 0.04}s both` }}>
                <PostCard post={post} onClick={setSelected} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-[9px] border border-stone-900/10 px-7 py-2.5 text-[14px] font-medium text-stone-500 no-underline transition-all hover:border-stone-900/20 hover:text-stone-700 dark:border-stone-100/8 dark:text-stone-500 dark:hover:border-stone-100/15 dark:hover:text-stone-300"
          >
            전체 글 보기 →
          </Link>
        </div>
      </section>

      {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
