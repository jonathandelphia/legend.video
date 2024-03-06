'use client'

import * as React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'

import { buttonVariants } from '@/components/ui/button'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { Project } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useProjects } from '@/lib/hooks/use-projects'
import { useSidebar } from '@/lib/hooks/use-sidebar'

interface SidebarItemProps {
  index: number
  project: Project
  children: React.ReactNode
}

export function SidebarItem({ index, project, children }: SidebarItemProps) {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()
  const { isGeneratingScenes } = useProjects()

  const isActive = pathname === `/video/${project.id}`
  const [newChatId, setNewChatId] = useLocalStorage('newChatId', null)
  const shouldAnimate = index === 0 && isActive && newChatId

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) toggleSidebar()
  }

  if (!project?.id) return null

  return (
    <motion.div
      className="relative h-8"
      variants={{
        initial: {
          height: 0,
          opacity: 0
        },
        animate: {
          height: 'auto',
          opacity: 1
        }
      }}
      initial={shouldAnimate ? 'initial' : undefined}
      animate={shouldAnimate ? 'animate' : undefined}
      transition={{
        duration: 0.25,
        ease: 'easeIn'
      }}
    >
      {/* <div className="absolute left-2 top-1 flex size-6 items-center justify-center">
        {video.sharePath ? (
          <Tooltip delayDuration={1000}>
            <TooltipTrigger
              tabIndex={-1}
              className="focus:bg-muted focus:ring-1 focus:ring-ring"
            >
              <IconUsers className="mr-2" />
            </TooltipTrigger>
            <TooltipContent>This is a shared chat.</TooltipContent>
          </Tooltip>
        ) : (
          <IconMessage className="mr-2" />
        )}
      </div> */}
      {isGeneratingScenes ? (
        <div
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group w-full px-8 transition-colors cursor-not-allowed opacity-50 dark:hover:bg-neutral-950',
          )}
        >
          <div
            className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
            title={project.title ?? ""}
          >
            <span className="whitespace-nowrap">
              <span>{project.title ?? 'Untitled'}</span>
            </span>
          </div>
        </div>
      ) : (
        <Link
          href={`/video/${project.id}`}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10',
            isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
          )}
          onClick={handleLinkClick}
        >
          <div
            className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
            title={project.title ?? ""}
          >
            <span className="whitespace-nowrap">
              {shouldAnimate && project?.title ? (
                project.title!.split('').map((character, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      initial: {
                        opacity: 0,
                        x: -100
                      },
                      animate: {
                        opacity: 1,
                        x: 0
                      }
                    }}
                    initial={shouldAnimate ? 'initial' : undefined}
                    animate={shouldAnimate ? 'animate' : undefined}
                    transition={{
                      duration: 0.25,
                      ease: 'easeIn',
                      delay: index * 0.05,
                      staggerChildren: 0.05
                    }}
                    // onAnimationComplete={() => {
                    //   if (index === (project?.title?.length || 0) - 1) {
                    //     setNewChatId(null)
                    //   }
                    // }}
                  >
                    {character}
                  </motion.span>
                ))
              ) : (
                <span>{project.title ?? 'Untitled'}</span>
              )}
            </span>
          </div>
        </Link>
      )}
      {(isActive && !isGeneratingScenes) && <div className="absolute right-2 top-1">{children}</div>}
    </motion.div>
  )
}
