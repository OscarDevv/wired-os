import type { ReactNode } from "react"

export interface ContextMenuItem {
  label: string
  onClick: () => void
}

export interface ContextMenuProps {
  items: ContextMenuItem[][]
  children: ReactNode
}

export interface ContextMenuPos {
  x: number
  y: number
}
