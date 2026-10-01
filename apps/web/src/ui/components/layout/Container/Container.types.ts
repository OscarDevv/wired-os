import type { HTMLAttributes, ReactNode } from "react"

type ContainerAs = "div" | "section"
type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ContainerAs
  size?: ContainerSize
  children: ReactNode
}
