import type { FSNode } from "@/app/stores/useFileSystemStore"

export type FolderDialogs = "createFile" | "createFolder" | "delete" | null

export interface FolderProps {
  node: FSNode
  onOpen?: () => void
}

export interface FolderNameDialogProps {
  title: string
  onSubmit: (name: string) => void
  onCancel: () => void
}
