import { Suspense } from 'react'
import Image from 'next/image'
import ClientWorksGrid from '@/components/ClientWorksGrid'
import { getAllClientWorks } from '@/lib/content'

function ClientWorksGridWrapper() {
  const works = getAllClientWorks()

  return <ClientWorksGrid initialWorks={works} />
}

export default function ClientWorksPage() {
  return (
    <>
      <Suspense
        fallback={<div className="text-center py-8">読み込み中...</div>}
      >
        <ClientWorksGridWrapper />
      </Suspense>

      <div className="mt-12 bg-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <div className="flex-shrink-0">
          <Image
            src="/images/kayac.png"
            alt="面白法人カヤック"
            width={250}
            height={120}
            className="w-[200px] sm:w-[250px]"
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="mb-4 leading-relaxed">
            現在、面白法人カヤックで働いています。
            <br />
            会社での制作実績もぜひご覧ください。会社でのお仕事のご依頼もお待ちしております。
          </p>
          <a
            href="https://www.kayac.com/team/hirokawa-takemaru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            カヤックでの制作実績
          </a>
        </div>
      </div>
    </>
  )
}
