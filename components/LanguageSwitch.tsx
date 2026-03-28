'use client'

import { Language, useLanguage } from './LanguageContext'

const languageOptions: Array<{ value: Language; label: string }> = [
  { value: 'ko', label: 'KO' },
  { value: 'ja', label: 'JP' },
  { value: 'en', label: 'EN' },
]

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center">
      <div className="flex items-center rounded-full border border-stone-900/10 bg-white/60 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-stone-100/10 dark:bg-stone-900/40">
        {languageOptions.map((option) => {
          const active = option.value === language

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              aria-label={`Switch language to ${option.label}`}
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
    </div>
  )
}

export default LanguageSwitch
