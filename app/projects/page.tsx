import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
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
            GitHub에 공개한 저장소 중 현재 방향성과 연결되는 작업을 골라 정리합니다. 자동화, 데이터
            수집, 퀀트 시스템, 백엔드 학습 흐름이 보이도록 구성했습니다.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
