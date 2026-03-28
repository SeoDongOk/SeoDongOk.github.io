'use client'

import { Language, useLanguage } from './LanguageContext'

const heroCopy: Record<
  Language,
  {
    title: string
    description: string
  }
> = {
  ko: {
    title: '퀀트, 자동화, 백엔드 작업을 중심으로 정리한 DongOk Seo의 포트폴리오.',
    description: '관심 있는 분야와 진행 중인 프로젝트, 작업 기록을 한곳에 모았습니다.',
  },
  ja: {
    title:
      'クオンツ、オートメーション、バックエンドの仕事を中心にまとめた DongOk Seo のポートフォリオ。',
    description: '関心のある分野、進行中のプロジェクト、作業記録をひとつにまとめています。',
  },
  en: {
    title: "DongOk Seo's portfolio centered on quant, automation, and backend work.",
    description: 'It brings together ongoing projects, technical interests, and working notes.',
  },
}

export default function HeroLanguageSwitch() {
  const { language } = useLanguage()
  const copy = heroCopy[language]

  return (
    <div className="mt-5">
      <h1 className="max-w-3xl text-4xl leading-tight font-bold tracking-tight text-stone-900 md:text-6xl dark:text-stone-100">
        {copy.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
        {copy.description}
      </p>
    </div>
  )
}
