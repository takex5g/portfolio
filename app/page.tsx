import WorksGrid from '@/components/WorksGrid'
import { getAllWorks, getAllTags } from '@/lib/content'

export default function Home() {
  const works = getAllWorks()
  const allTags = ['ALL', ...getAllTags()]

  return <WorksGrid initialWorks={works} tags={allTags} />
}
