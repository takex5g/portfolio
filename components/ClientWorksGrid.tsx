'use client'

import { motion, AnimatePresence } from 'framer-motion'
import WorkCard from './WorkCard'
import type { WorkMetadata } from '@/lib/content'

interface ClientWorksGridProps {
  initialWorks: WorkMetadata[]
}

export default function ClientWorksGrid({ initialWorks }: ClientWorksGridProps) {
  return (
    <div className="mx-auto w-full grid gap-[15px] grid-cols-[repeat(auto-fill,minmax(160px,1fr))] auto-rows-[200px] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      <AnimatePresence mode="popLayout">
        {initialWorks.map((work) => (
          <motion.div
            key={work.slug}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: 'absolute' }}
            transition={{
              opacity: { duration: 0.3, ease: 'easeInOut' },
              layout: { duration: 0.3, ease: 'easeInOut' },
            }}
            className="h-full"
          >
            <WorkCard work={work} basePath="client-works" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
