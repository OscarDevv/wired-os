import type { HTMLAttributes, ReactNode } from "react"

type StackAs = "div" | "section"
type StackDirection = "column" | "row"
type StackGap = "xs" | "sm" | "md" | "lg" | "xl"
type StackAlign = "center" | "start" | "end" | "stretch"
type StackJustify = "center" | "start" | "end" | "around" | "between" | "evenly"

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  as?: StackAs
  direction?: StackDirection
  gap?: StackGap
  align?: StackAlign
  justify?: StackJustify
  inline?: boolean
  reverse?: boolean
  wrapable?: boolean
  children: ReactNode
}
