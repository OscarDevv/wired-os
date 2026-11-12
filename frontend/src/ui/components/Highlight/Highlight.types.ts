import type { MarkProps } from "@chakra-ui/react/mark"

export interface HighlightProps extends Omit<MarkProps, "children"> {
  query: string | string[]
  children: string
  ignoreCase?: boolean
  matchAll?: boolean
}
