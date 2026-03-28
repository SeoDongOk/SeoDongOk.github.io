import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary-700 hover:border-primary-500 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200 mr-2 mb-2 inline-flex rounded-full border border-amber-900/10 bg-amber-50 px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase transition dark:border-amber-100/10 dark:bg-stone-900/70"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
