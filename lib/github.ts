import projectOverrides, { ProjectOverride } from '@/data/projectsData'

const GITHUB_USERNAME = 'SeoDongOk'
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`

type GithubRepo = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  fork: boolean
  private: boolean
  updated_at: string
}

export type ProjectCardData = {
  title: string
  description: string
  href: string
  imgSrc?: string
  tags: string[]
  updatedAt: string
}

function normalizeTags(repo: GithubRepo, override?: ProjectOverride) {
  const tags = new Set<string>()

  if (override?.tags) {
    override.tags.forEach((tag) => tags.add(tag))
  }

  if (repo.language) {
    tags.add(repo.language)
  }

  if (repo.topics) {
    repo.topics.forEach((topic) => {
      if (topic) {
        tags.add(topic)
      }
    })
  }

  return Array.from(tags).slice(0, 5)
}

function repoDescription(repo: GithubRepo, override?: ProjectOverride) {
  return (
    override?.description ||
    repo.description ||
    '공개 저장소입니다. 구현 방식과 기록 흐름을 정리하기 위해 유지하고 있는 프로젝트입니다.'
  )
}

function projectOrder(project: ProjectCardData) {
  return projectOverrides[project.title]?.order ?? Number.MAX_SAFE_INTEGER
}

function sortProjects(a: ProjectCardData, b: ProjectCardData) {
  const aOrder = projectOrder(a)
  const bOrder = projectOrder(b)

  if (aOrder !== bOrder) {
    return aOrder - bOrder
  }

  return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
}

export async function getGithubProjects(): Promise<ProjectCardData[]> {
  try {
    const response = await fetch(GITHUB_REPOS_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`)
    }

    const repos = (await response.json()) as GithubRepo[]

    return repos
      .filter((repo) => !repo.private && !repo.fork)
      .filter((repo) => !projectOverrides[repo.name]?.hidden)
      .map((repo) => {
        const override = projectOverrides[repo.name]

        return {
          title: repo.name,
          description: repoDescription(repo, override),
          href: repo.html_url,
          imgSrc: override?.imgSrc,
          tags: normalizeTags(repo, override),
          updatedAt: repo.updated_at,
        }
      })
      .sort(sortProjects)
  } catch {
    return Object.entries(projectOverrides)
      .filter(([, override]) => !override.hidden)
      .map(([name, override]) => ({
        title: name,
        description: override.description || '프로젝트 설명을 준비 중입니다.',
        href: `https://github.com/${GITHUB_USERNAME}/${name}`,
        imgSrc: override.imgSrc,
        tags: override.tags || [],
        updatedAt: '',
      }))
      .sort(sortProjects)
  }
}
