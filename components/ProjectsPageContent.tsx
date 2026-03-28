'use client'

import Card from '@/components/Card'
import { useUiCopy } from '@/components/ui-copy'

export default function ProjectsPageContent({ projects }) {
  const { common } = useUiCopy()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <p className="text-xs tracking-[0.3em] text-stone-500 uppercase dark:text-stone-400">
          {common.repositoryIndex}
        </p>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-stone-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-stone-100">
          {common.projects}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
          {common.projectIntro}
        </p>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {projects.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              imgSrc={project.imgSrc}
              href={project.href}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
