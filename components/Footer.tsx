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
            나의 소개, 관심 분야, 그리고 프로젝트를 정리한 포트폴리오입니다.
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
            Portfolio, interests, and projects
          </div>
        </div>
      </div>
    </footer>
  )
}
