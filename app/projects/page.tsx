import ProjectsPageContent from '@/components/ProjectsPageContent'
import { genPageMetadata } from 'app/seo'
import { getGithubProjects } from '../../lib/github'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const projects = await getGithubProjects()

  return <ProjectsPageContent projects={projects} />
}
