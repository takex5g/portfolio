import { Suspense } from 'react'
import ClientWorksGrid from '@/components/ClientWorksGrid'
import { getAllClientWorks, getAllClientWorkTags } from '@/lib/content'

function ClientWorksGridWrapper() {
  const works = getAllClientWorks()
  const allTags = ['ALL', ...getAllClientWorkTags()]

  return <ClientWorksGrid initialWorks={works} tags={allTags} />
}

export default function ClientWorksPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">読み込み中...</div>}>
      <ClientWorksGridWrapper />
    </Suspense>
  )
}
