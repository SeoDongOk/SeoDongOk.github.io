import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSwitch from './LanguageSwitch'

const Header = () => {
  let headerClass =
    'sticky top-0 z-40 -mx-4 mt-4 flex w-[calc(100%+2rem)] items-center justify-between rounded-[1.75rem] border border-stone-900/10 bg-[#f6efe3]/88 px-4 py-5 shadow-[0_10px_30px_rgba(76,52,32,0.08)] backdrop-blur md:px-6 dark:border-stone-100/8 dark:bg-[linear-gradient(180deg,rgba(41,31,24,0.78),rgba(24,18,14,0.88))] dark:shadow-[0_12px_28px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,236,204,0.03)]'
  if (siteMetadata.stickyNav) {
    headerClass += ' top-0'
  }

  return (
    <header className={headerClass}>
      {/* Design Handoff — Logo: DM Serif "DongOk" + JetBrains Mono "Seo" */}
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-baseline gap-2">
          <span
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            className="text-xl leading-none text-stone-800 sm:text-2xl dark:text-stone-100"
          >
            DongOk
          </span>
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[9px] tracking-[0.1em] text-stone-500 uppercase dark:text-stone-400"
          >
            Seo
          </span>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-accent dark:hover:text-accent m-1 pb-1 text-sm font-medium text-stone-600 transition-colors dark:text-stone-300"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <LanguageSwitch />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
