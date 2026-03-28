'use client'

import { useState } from 'react'

type Language = 'ko' | 'ja' | 'en'

const heroCopy: Record<
  Language,
  {
    title: string
    description: string
  }
> = {
  ko: {
    title: '퀀트, 자동화, 백엔드 작업을 기록하는 DongOk Seo의 포트폴리오.',
    description: '관심 있는 분야와 진행 중인 프로젝트를 글과 작업 기록으로 정리합니다.',
  },
  ja: {
    title: 'クオンツ、オートメーション、バックエンドの仕事を記録する DongOk Seo のポートフォリオ。',
    description: '関心のある分野と進行中のプロジェクトを、記事と作業記録としてまとめています。',
  },
  en: {
    title: "DongOk Seo's portfolio documenting work in quant, automation, and backend engineering.",
    description:
      'It brings together ongoing projects, technical interests, and implementation notes.',
  },
}

const languageOptions: Array<{ value: Language; label: string }> = [
  { value: 'ko', label: 'KO' },
  { value: 'ja', label: 'JP' },
  { value: 'en', label: 'EN' },
]

export default function HeroLanguageSwitch() {
  const [language, setLanguage] = useState<Language>('ko')
  const copy = heroCopy[language]

  return (
    <div>
      <div className="flex items-center rounded-full border border-stone-900/10 bg-white/60 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-stone-100/10 dark:bg-stone-900/40">
        {languageOptions.map((option) => {
          const active = option.value === language

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              aria-label={`Switch hero language to ${option.label}`}
              onClick={() => setLanguage(option.value)}
              className={`rounded-full px-3 py-2 text-xs font-medium tracking-[0.18em] uppercase transition ${
                active
                  ? 'bg-primary-700 text-white shadow-[0_8px_20px_rgba(92,63,33,0.26)]'
                  : 'hover:text-primary-600 dark:hover:text-primary-300 text-stone-500 dark:text-stone-300'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="mt-5">
        <h1 className="max-w-3xl text-4xl leading-tight font-bold tracking-tight text-stone-900 md:text-6xl dark:text-stone-100">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
          {copy.description}
        </p>
      </div>
    </div>
  )
}
