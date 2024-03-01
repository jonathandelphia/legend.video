"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconSpinner } from '@/components/ui/icons'

import { useProjects } from '@/lib/hooks/use-projects'

export default function ConceptView() {
  const { project, isGeneratingScenes } = useProjects()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Concept</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{project?.concept ?? ''}</div>
        {isGeneratingScenes && (
          <div className='mt-2 flex items-center gap-1'>
            <IconSpinner />
            <span>Generating...</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}