'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)
const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)
const Blank = () => <span className="block h-4 w-4" />

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <div className="flex items-center">
      <div className="flex items-center rounded-full border border-stone-900/10 bg-white/60 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-stone-100/10 dark:bg-stone-900/40">
        <button
          type="button"
          aria-label="Switch to light mode"
          aria-pressed={!isDark}
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium tracking-[0.18em] uppercase transition ${
            !isDark
              ? 'bg-primary-700 text-white shadow-[0_8px_20px_rgba(92,63,33,0.26)]'
              : 'hover:text-primary-600 dark:hover:text-primary-300 text-stone-500 dark:text-stone-300'
          }`}
        >
          {mounted ? <Sun /> : <Blank />}
          <span className="hidden sm:inline">Light</span>
        </button>
        <button
          type="button"
          aria-label="Switch to dark mode"
          aria-pressed={isDark}
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium tracking-[0.18em] uppercase transition ${
            isDark
              ? 'dark:bg-primary-200 bg-stone-900 text-stone-100 shadow-[0_8px_20px_rgba(0,0,0,0.35)] dark:text-stone-900'
              : 'hover:text-primary-600 dark:hover:text-primary-300 text-stone-500 dark:text-stone-300'
          }`}
        >
          {mounted ? <Moon /> : <Blank />}
          <span className="hidden sm:inline">Dark</span>
        </button>
      </div>
    </div>
  )
}

export default ThemeSwitch
