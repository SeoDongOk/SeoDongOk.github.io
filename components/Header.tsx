import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'sticky top-0 z-40 -mx-4 mt-4 flex w-[calc(100%+2rem)] items-center justify-between rounded-[1.75rem] border border-stone-900/10 bg-[#f6efe3]/88 px-4 py-5 shadow-[0_10px_30px_rgba(76,52,32,0.08)] backdrop-blur md:px-6 dark:border-stone-100/8 dark:bg-[linear-gradient(180deg,rgba(41,31,24,0.78),rgba(24,18,14,0.88))] dark:shadow-[0_12px_28px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,236,204,0.03)]'
  if (siteMetadata.stickyNav) {
    headerClass += ' top-0'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3 rounded-full border border-amber-900/15 bg-white/70 p-1.5 dark:border-amber-100/10 dark:bg-stone-900/60">
            <Logo className="text-primary-700 dark:text-primary-300 h-7 w-7" />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-xl font-semibold tracking-[0.14em] text-stone-800 uppercase sm:block dark:text-stone-100">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
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
                className="hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 m-1 border-b border-transparent pb-1 text-sm font-medium tracking-[0.18em] text-stone-700 uppercase transition dark:text-stone-200"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
