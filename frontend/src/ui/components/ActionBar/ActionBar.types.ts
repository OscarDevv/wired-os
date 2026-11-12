import type { ActionBarCloseTriggerProps as ChakraActionBarCloseTriggerProps, ActionBarOpenChangeDetails } from "@chakra-ui/react/action-bar"
import type { ReactNode } from "react"

export type CornerPlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end"

export type ActionBarRelativeTo = "viewport" | "parent"

export interface ActionBarRootProps {
  placement?: CornerPlacement
  relativeTo?: ActionBarRelativeTo
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: ActionBarOpenChangeDetails) => void
  children: ReactNode
}

export type ActionBarCloseTriggerProps = ChakraActionBarCloseTriggerProps
