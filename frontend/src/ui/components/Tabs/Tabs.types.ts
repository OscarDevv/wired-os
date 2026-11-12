import type { ReactNode } from "react"

export interface TabItem {
  value: string
  label: ReactNode
  content?: ReactNode
}

export type TabsVariant = "pill" | "line" | "subtle" | "enclosed" | "outline" | "plain"

export type TabsAlign = "start" | "center" | "end"

export interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  variant?: TabsVariant
  align?: TabsAlign
  size?: "sm" | "md" | "lg"
  colorPalette?: string
  onValueChange?: (value: string) => void
}
