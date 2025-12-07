import { Suspense } from 'react'
import WorksGrid from '@/components/WorksGrid'
import { getAllWorks, getAllTags } from '@/lib/content'

function WorksGridWrapper() {
  const works = getAllWorks()
  const allTags = ['ALL', ...getAllTags()]

  return <WorksGrid initialWorks={works} tags={allTags} />
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center py-8">読み込み中...</div>}>
      <WorksGridWrapper />
    </Suspense>
  )
}
