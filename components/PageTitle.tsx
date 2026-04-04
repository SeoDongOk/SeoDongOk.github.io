import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-2xl leading-8 font-extrabold tracking-tight text-stone-900 sm:text-3xl sm:leading-9 md:text-4xl md:leading-tight dark:text-stone-100">
      {children}
    </h1>
  )
}
