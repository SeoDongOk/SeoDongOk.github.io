'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { Language, useLanguage } from './LanguageContext'

const footerCopy: Record<Language, { label: string; description: string; caption: string }> = {
  ko: {
    label: 'Portfolio',
    description: '관심 있는 분야와 진행 중인 프로젝트를 정리하는 공간입니다.',
    caption: 'Quant, automation, backend',
  },
  ja: {
    label: 'Portfolio',
    description: '関心のある分野と進行中のプロジェクトを整理するための場所です。',
    caption: 'Quant, automation, backend',
  },
  en: {
    label: 'Portfolio',
    description: 'A place for ongoing projects and areas of interest.',
    caption: 'Quant, automation, backend',
  },
}

export default function Footer() {
  const { language } = useLanguage()
  const copy = footerCopy[language]

  return (
    <footer>
      <div className="ambient-panel mt-20 rounded-[1.75rem] px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.32em] text-stone-500 uppercase dark:text-stone-400">
            {copy.label}
          </p>
          <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
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
          <div className="text-xs tracking-[0.24em] text-stone-500 uppercase dark:text-stone-400">
            {copy.caption}
          </div>
        </div>
      </div>
    </footer>
  )
}
