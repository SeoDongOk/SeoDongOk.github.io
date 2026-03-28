import TagsPageContent from '@/components/TagsPageContent'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: '관심 있게 보고 있는 주제와 글의 태그 모음',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return <TagsPageContent sortedTags={sortedTags} tagCounts={tagCounts} />
}
