import { t } from '@lingui/macro'
import {
  CopySimple,
  DotsThreeVertical,
  Download,
  Eye,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple
} from '@phosphor-icons/react'
import { ResumeDto } from '@reactive-resume/dto'
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@reactive-resume/ui'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { useDialog } from '@/client/stores/dialog'

import { BaseListItem } from './base-item'

type Props = {
  resume: ResumeDto
}

export const ResumeListItem = ({ resume }: Props) => {
  const navigate = useNavigate()
  const { open } = useDialog<ResumeDto>('resume')
  const { open: lockOpen } = useDialog<ResumeDto>('lock')

  const lastUpdated = dayjs().to(resume.updatedAt)
  const views = resume.statistics?.views ?? 0
  const downloads = resume.statistics?.downloads ?? 0

  const onOpen = () => {
    navigate(`/builder/${resume.id}`)
  }

  const onUpdate = () => {
    open('update', { id: 'resume', item: resume })
  }

  const onDuplicate = () => {
    open('duplicate', { id: 'resume', item: resume })
  }

  const onLockChange = () => {
    lockOpen(resume.locked ? 'update' : 'create', { id: 'lock', item: resume })
  }

  const onDelete = () => {
    open('delete', { id: 'resume', item: resume })
  }

  const statistics = (
    <>
      <div className="flex items-center ">
        <Eye className="mr-1 w-4 h-4" /> {/* 使用眼睛图标表示浏览次数 */}
        <span>{t`${views} views`}</span>
      </div>
      <div className="flex items-center ">
        <Download className="mr-1 w-4 h-4" /> {/* 使用下载图标表示下载次数 */}
        <span>{t`${downloads} downloads`}</span>
      </div>
    </>
  )

  const dropdownMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="aspect-square"
      >
        <Button
          size="icon"
          variant="ghost"
        >
          <DotsThreeVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation()
            onOpen()
          }}
        >
          <FolderOpen
            size={14}
            className="mr-2"
          />
          {t`Open`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation()
            onUpdate()
          }}
        >
          <PencilSimple
            size={14}
            className="mr-2"
          />
          {t`Rename`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation()
            onDuplicate()
          }}
        >
          <CopySimple
            size={14}
            className="mr-2"
          />
          {t`Duplicate`}
        </DropdownMenuItem>
        {resume.locked ? (
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation()
              onLockChange()
            }}
          >
            <LockOpen
              size={14}
              className="mr-2"
            />
            {t`Unlock`}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation()
              onLockChange()
            }}
          >
            <Lock
              size={14}
              className="mr-2"
            />
            {t`Lock`}
          </DropdownMenuItem>
        )}
        <ContextMenuSeparator />
        <DropdownMenuItem
          className="text-error"
          onClick={(event) => {
            event.stopPropagation()
            onDelete()
          }}
        >
          <TrashSimple
            size={14}
            className="mr-2"
          />
          {t`Delete`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <ContextMenu>
      <ContextMenuTrigger className="even:bg-secondary/20">
        <BaseListItem
          className="group"
          title={resume.title}
          description={t`Last updated ${lastUpdated}`}
          statistics={statistics}
          end={dropdownMenu}
          onClick={onOpen}
        />
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={onOpen}>
          <FolderOpen
            size={14}
            className="mr-2"
          />
          {t`Open`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onUpdate}>
          <PencilSimple
            size={14}
            className="mr-2"
          />
          {t`Rename`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate}>
          <CopySimple
            size={14}
            className="mr-2"
          />
          {t`Duplicate`}
        </ContextMenuItem>
        {resume.locked ? (
          <ContextMenuItem onClick={onLockChange}>
            <LockOpen
              size={14}
              className="mr-2"
            />
            {t`Unlock`}
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={onLockChange}>
            <Lock
              size={14}
              className="mr-2"
            />
            {t`Lock`}
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem
          className="text-error"
          onClick={onDelete}
        >
          <TrashSimple
            size={14}
            className="mr-2"
          />
          {t`Delete`}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
