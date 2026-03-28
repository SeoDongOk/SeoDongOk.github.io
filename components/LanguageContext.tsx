'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'ko' | 'ja' | 'en'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const STORAGE_KEY = 'site-language'

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'ko' || stored === 'ja' || stored === 'en') {
      setLanguage(stored)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
