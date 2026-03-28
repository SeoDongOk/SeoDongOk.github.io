import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="ambient-panel mt-20 rounded-[1.75rem] px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.32em] text-stone-500 uppercase dark:text-stone-400">
            Field Notes
          </p>
          <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
            시스템을 만들고, 실험을 기록하고, 결과를 천천히 축적하는 개발 아카이브.
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
            Quant, systems, and deliberate notes
          </div>
        </div>
      </div>
    </footer>
  )
}
