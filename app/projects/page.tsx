import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { getGithubProjects } from '../../lib/github'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const projects = await getGithubProjects()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <p className="text-xs tracking-[0.3em] text-stone-500 uppercase dark:text-stone-400">
            Workbench
          </p>
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-stone-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-stone-100">
            Projects
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
            GitHub에 공개한 저장소를 기준으로 진행했던 작업과 현재 방향을 정리했습니다. 프로젝트별
            기술 스택과 관심 분야가 함께 보이도록 구성했습니다.
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
    </>
  )
}
