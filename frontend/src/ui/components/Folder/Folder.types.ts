//import type { Dispatch, SetStateAction } from "react"

export type FolderDialogs = "createFile" | "createFolder" | "delete" | null

export interface FolderProps {
  id: string
  onOpen?: () => void
}

export interface FolderNameDialogProps {
  title: string
  // open: boolean
  // setOpen: Dispatch<SetStateAction<boolean>>
  onSubmit: (name: string) => void
  onCancel: () => void
}
