export type FolderDialogs = "createFile" | "createFolder" | "delete" | null

export interface FolderProps {
  id: string
  onOpen?: () => void
}

export interface FolderNameDialogProps {
  title: string
  onSubmit: (name: string) => void
  onCancel: () => void
}
