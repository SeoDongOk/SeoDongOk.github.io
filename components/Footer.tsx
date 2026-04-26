'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { Language, useLanguage } from './LanguageContext'

const footerCopy: Record<Language, { label: string; description: string; caption: string }> = {
  ko: {
    label: 'Portfolio',
    description: '퀀트 · 인프라 · 일본어. 작업 중에 막힌 곳과 배운 것을 짧게 적어둡니다.',
    caption: 'Quant · Infra · 日本語',
  },
  ja: {
    label: 'Portfolio',
    description: 'クォント・インフラ・日本語。作業で詰まった場所と学びを短く残します。',
    caption: 'Quant · Infra · 日本語',
  },
  en: {
    label: 'Portfolio',
    description: 'Quant · Infra · Japanese. Short notes from where I get stuck and what I learn.',
    caption: 'Quant · Infra · 日本語',
  },
}

export default function Footer() {
  const { language } = useLanguage()
  const copy = footerCopy[language]

  return (
    <footer>
      <div className="ambient-panel mt-20 rounded-2xl px-6 py-8">
        <div className="mb-8 text-center">
          <p
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[11px] tracking-[0.1em] text-stone-500 uppercase dark:text-stone-400"
          >
            {copy.label}
          </p>
          <p className="mx-auto mt-3 max-w-[420px] text-[15.5px] leading-[1.8] text-stone-600 dark:text-stone-400">
            {copy.description}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-3 flex space-x-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          </div>
          <div className="mb-2 flex space-x-2 text-sm text-stone-500 dark:text-stone-400">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{siteMetadata.title}</Link>
          </div>
          <div
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[11px] tracking-[0.1em] text-stone-500 uppercase dark:text-stone-400"
          >
            {copy.caption}
          </div>
        </div>
      </div>
    </footer>
  )
}
